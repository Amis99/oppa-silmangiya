import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform, Animated, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import { RootStackParamList, Stage, ChatContent, ArticleContent, TextContent } from '../types';
import { colors } from '../utils/theme';
import { useGameStore } from '../stores/gameStore';
import { useUserStore } from '../stores/userStore';
import { useSettingsStore } from '../stores/settingsStore';
import { sampleStages } from '../data/stages';

import GameHUD from '../components/game/GameHUD';
import ExplanationModal from '../components/game/ExplanationModal';
import ChatMode from '../components/modes/ChatMode';
import ArticleMode from '../components/modes/ArticleMode';
import TextMode from '../components/modes/TextMode';
import { HeartRestoreAnimation, CorrectAnimation, WrongAnimation } from '../components/animations';
import { TouchableOpacity } from 'react-native';

// Image imports
const oppaCharacter = require('../../assets/images/oppa-character.jpg');
const sadEmoji = require('../../assets/images/sad-emoji.jpg');
const heartImage = require('../../assets/images/heart.png');
const brokenHeartImage = require('../../assets/images/broken-heart.png');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Game'>;
  route: RouteProp<RootStackParamList, 'Game'>;
};

export default function GameScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { hapticEnabled } = useSettingsStore();
  const userLives = useUserStore((state) => state.lives);
  const currentLevel = useUserStore((state) => state.currentLevel);
  const levelUp = useUserStore((state) => state.levelUp);
  const addScore = useUserStore((state) => state.addScore);
  const updateHighScore = useUserStore((state) => state.updateHighScore);

  const {
    status,
    currentStage,
    selectedVariant,
    sessionScore,
    timeLeft,
    lives,
    showExplanation,
    isCorrect,
    initGame,
    startGame,
    tickTimer,
    handleCorrect,
    handleWrong,
    endGame,
    resetSession,
    setShowExplanation,
    getResult,
    getSessionScore,
  } = useGameStore();

  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [gameResult, setGameResult] = useState<any>(null);

  // Animation states
  const [showCorrectAnim, setShowCorrectAnim] = useState(false);
  const [showWrongAnim, setShowWrongAnim] = useState(false);
  const [showHeartRestoreAnim, setShowHeartRestoreAnim] = useState(false);
  const [correctAnimScore, setCorrectAnimScore] = useState(0);
  const [wrongAnimLives, setWrongAnimLives] = useState(0);

  // Legacy animation refs (kept for fallback)
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const flashAnim = useRef(new Animated.Value(0)).current;
  const isFirstLoad = useRef(true);

  // Load stage - 최초 진입 시에만 실행
  useEffect(() => {
    if (!isFirstLoad.current) return;
    isFirstLoad.current = false;

    const loadStage = async () => {
      setLoading(true);
      setShowResult(false);
      setGameResult(null);

      // route.params.startLevel이 있으면 해당 레벨로 시작, 없으면 currentLevel 사용
      const startLevel = route.params?.startLevel || currentLevel;
      const maxLevel = sampleStages.length;
      const adjustedLevel = ((startLevel - 1) % maxLevel) + 1;
      const stage = sampleStages.find((s) => s.level === adjustedLevel) || sampleStages[0];

      // 첫 진입 시에만 userLives 사용
      initGame(stage, userLives, 0, -1);
      setLoading(false);

      setTimeout(() => {
        startGame();
      }, 500);
    };

    loadStage();

    return () => {
      // Don't reset session on unmount - only reset when going home
    };
  }, []);

  // Timer
  useEffect(() => {
    if (status !== 'playing') return;

    const timer = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(timer);
  }, [status, tickTimer]);

  // Game end detection
  useEffect(() => {
    if ((status === 'success' || status === 'failed') && !showResult && !showCorrectAnim && !showWrongAnim) {
      const result = getResult();
      setGameResult(result);
      setShowResult(true);
    }
  }, [status, showResult, showCorrectAnim, showWrongAnim, getResult]);

  // Correct selection handler
  const onCorrectSelection = useCallback(() => {
    if (status !== 'playing' || showExplanation || showResult) return;

    const result = handleCorrect();
    const stageResult = getResult();

    // Calculate score for animation
    const stageScore = stageResult.stageScore || (timeLeft + (currentStage?.level || 1));
    setCorrectAnimScore(stageScore);
    setShowCorrectAnim(true);

    if (hapticEnabled) {
      Platform.OS !== 'web' && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    // Check if heart was restored
    if (result.lifeRestored) {
      // Show heart restore animation after correct animation
      setTimeout(() => {
        setShowHeartRestoreAnim(true);
      }, 1500);
    }
  }, [status, showExplanation, showResult, handleCorrect, hapticEnabled, timeLeft, currentStage, getResult]);

  // Wrong selection handler - 하트 감소, 하트가 0이 되면 게임 오버
  const onWrongSelection = useCallback(() => {
    const gameState = useGameStore.getState();
    if (gameState.status !== 'playing' || gameState.showExplanation || showResult) return;

    // handleWrong will decrease lives and check for game over
    handleWrong();

    // Get updated lives after handleWrong
    const updatedState = useGameStore.getState();
    setWrongAnimLives(updatedState.lives);
    setShowWrongAnim(true);
  }, [showResult, handleWrong]);

  // Animation complete handlers
  const handleCorrectAnimComplete = useCallback(() => {
    setShowCorrectAnim(false);
    setShowExplanation(true);
  }, [setShowExplanation]);

  const handleWrongAnimComplete = useCallback(() => {
    setShowWrongAnim(false);

    const gameState = useGameStore.getState();

    // 하트가 0이면 게임 오버, 아니면 게임 계속 진행
    if (gameState.lives <= 0) {
      const result = getResult();
      setGameResult(result);
      setShowResult(true);
    }
    // 하트가 남아있으면 그냥 게임 계속 (설명 모달 없음)
  }, [getResult]);

  const handleHeartRestoreAnimComplete = useCallback(() => {
    setShowHeartRestoreAnim(false);
  }, []);

  // Close explanation modal
  const handleCloseExplanation = useCallback(() => {
    const currentIsCorrect = useGameStore.getState().isCorrect;

    setShowExplanation(false);

    if (currentIsCorrect) {
      endGame(true);
    }
  }, [setShowExplanation, endGame]);

  // Render content
  const renderContent = () => {
    if (!currentStage || !selectedVariant) return null;

    const commonProps = {
      error: selectedVariant.error,
      isCorrect,
      onCorrect: onCorrectSelection,
      onWrong: onWrongSelection,
      disabled: showExplanation || status !== 'playing' || showCorrectAnim || showWrongAnim,
    };

    switch (currentStage.mode) {
      case 'chat':
        return <ChatMode content={selectedVariant.content as ChatContent} {...commonProps} />;
      case 'article':
        return <ArticleMode content={selectedVariant.content as ArticleContent} {...commonProps} />;
      case 'text':
        return <TextMode content={selectedVariant.content as TextContent} {...commonProps} />;
      default:
        return null;
    }
  };

  // Go home
  const handleGoHome = useCallback(() => {
    // 세션 점수로 최고 점수 업데이트
    updateHighScore(sessionScore);
    setShowResult(false);
    setGameResult(null);
    resetSession();
    navigation.replace('Home');
  }, [navigation, resetSession, sessionScore, updateHighScore]);

  // Next stage or retry
  const handleNextOrRetry = useCallback((isSuccess: boolean) => {
    if (isSuccess && gameResult) {
      levelUp();
      addScore(gameResult.stageScore || 0);
      // 성공 시 세션 점수로 최고 점수 업데이트
      updateHighScore(sessionScore);
    } else {
      // 실패 시에도 현재 세션 점수로 최고 점수 업데이트
      updateHighScore(sessionScore);
    }

    setShowResult(false);
    setGameResult(null);
    setLoading(true);

    const nextLevel = isSuccess ? currentLevel + 1 : currentLevel;
    const maxLevel = sampleStages.length;
    const adjustedLevel = ((nextLevel - 1) % maxLevel) + 1;
    const stage = sampleStages.find((s) => s.level === adjustedLevel) || sampleStages[0];

    if (isSuccess) {
      // 성공 시: 세션 점수와 현재 라이프 유지
      const gameState = useGameStore.getState();
      initGame(stage, gameState.lives, gameState.sessionScore, gameState.lastBonusThreshold);
    } else {
      // 실패 후 이어하기: 점수 0점, 라이프 5개로 새로 시작
      initGame(stage, 5, 0, -1);
    }

    setLoading(false);
    setTimeout(() => startGame(), 500);
  }, [currentLevel, initGame, startGame, levelUp, addScore, gameResult, sessionScore, updateHighScore]);

  // Result screen
  if (showResult && gameResult) {
    return (
      <SafeAreaView style={styles.resultContainer}>
        <View style={styles.resultContent}>
          <Image
            source={gameResult.success ? oppaCharacter : sadEmoji}
            style={styles.resultCharacterImage}
            resizeMode="contain"
          />

          <Text style={[
            styles.resultTitle,
            gameResult.success ? styles.successText : styles.failedText
          ]}>
            {gameResult.success ? t('result.success') : t('result.failed')}
          </Text>

          {!gameResult.success && gameResult.failureReason && (
            <Text style={styles.failureReason}>
              {gameResult.failureReason === 'timeout'
                ? t('result.timeout')
                : '하트가 모두 소진되었습니다!'}
            </Text>
          )}

          <View style={styles.scoreCard}>
            {gameResult.success && (
              <>
                <View style={styles.scoreRow}>
                  <Text style={styles.scoreLabel}>스테이지 점수</Text>
                  <Text style={styles.scoreValue}>+{gameResult.stageScore}</Text>
                </View>
                <View style={styles.scoreDivider} />
              </>
            )}

            <View style={styles.scoreRow}>
              <Text style={styles.scoreLabel}>세션 총점</Text>
              <Text style={styles.totalValue}>{sessionScore}</Text>
            </View>

            <View style={[styles.scoreRow, { marginTop: 12 }]}>
              <View style={styles.livesLabelRow}>
                <Image source={heartImage} style={styles.smallHeartIcon} resizeMode="contain" />
                <Text style={styles.scoreLabel}> {t('result.remainingLives')}</Text>
              </View>
              <View style={styles.livesValueRow}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Image
                    key={index}
                    source={index < gameResult.remainingLives ? heartImage : brokenHeartImage}
                    style={[styles.heartIconResult, { marginLeft: 4, opacity: index < gameResult.remainingLives ? 1 : 0.4 }]}
                    resizeMode="contain"
                  />
                ))}
              </View>
            </View>
          </View>

          <View style={styles.resultButtonContainer}>
            <TouchableOpacity style={styles.retryButton} onPress={() => handleNextOrRetry(gameResult.success)}>
              <Text style={styles.retryButtonText}>
                {gameResult.success ? t('result.nextStage') : t('common.retry')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
              <Text style={styles.homeButtonText}>{t('result.goHome')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (loading || !currentStage) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.gameContainer}>
        <GameHUD
          score={sessionScore}
          lives={lives}
          maxLives={5}
          timeLeft={timeLeft}
          totalTime={currentStage.timeLimit}
          level={currentStage.level}
        />

        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            {t(`game.instruction.${currentStage.mode}`)}
          </Text>
        </View>

        <View style={styles.contentContainer}>{renderContent()}</View>

        <ExplanationModal
          visible={showExplanation}
          isCorrect={isCorrect || false}
          candidate={selectedVariant ? {
            id: selectedVariant.error.id,
            wrongText: selectedVariant.error.wrongText,
            correctText: selectedVariant.error.correctText,
            explanation: selectedVariant.error.explanation,
          } : null}
          onClose={handleCloseExplanation}
        />
      </View>

      {/* Animations */}
      <CorrectAnimation
        visible={showCorrectAnim}
        score={correctAnimScore}
        onComplete={handleCorrectAnimComplete}
      />

      <WrongAnimation
        visible={showWrongAnim}
        remainingLives={wrongAnimLives}
        onComplete={handleWrongAnimComplete}
      />

      <HeartRestoreAnimation
        visible={showHeartRestoreAnim}
        onComplete={handleHeartRestoreAnimComplete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gameContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
  },
  instructionContainer: {
    backgroundColor: colors.primaryLight + '30',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  instructionText: {
    fontSize: 14,
    color: colors.primary,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  resultContent: {
    width: '100%',
    alignItems: 'center',
  },
  resultCharacterImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
  },
  smallHeartIcon: {
    width: 20,
    height: 20,
  },
  heartIconResult: {
    width: 28,
    height: 28,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  successText: {
    color: colors.success,
  },
  failedText: {
    color: colors.error,
  },
  failureReason: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  scoreCard: {
    width: '100%',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    backgroundColor: colors.surface,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  scoreDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  livesLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  livesValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultButtonContainer: {
    width: '100%',
  },
  retryButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  retryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  homeButton: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
});
