import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';

import { RootStackParamList } from '../types';
import { colors } from '../utils/theme';
import { useUserStore } from '../stores/userStore';
import { useSettingsStore } from '../stores/settingsStore';
import { saveGameRecord } from '../services/ranking';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Result'>;
  route: RouteProp<RootStackParamList, 'Result'>;
};

export default function ResultScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { result, stage } = route.params;
  const { hapticEnabled } = useSettingsStore();
  const { addScore, levelUp, setLives, decreaseLives, nickname, currentLevel, highScore, region, country } = useUserStore();

  // 애니메이션
  const scaleAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // 결과에 따른 사용자 데이터 업데이트
    if (result.success) {
      addScore(result.totalScore);
      levelUp();

      if (hapticEnabled) {
        Platform.OS !== 'web' && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } else {
      setLives(result.remainingLives);

      if (hapticEnabled) {
        Platform.OS !== 'web' && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }

      // 게임 오버 시 (목숨 0) Firebase에 기록 저장
      if (result.remainingLives === 0) {
        const totalScore = highScore + result.totalScore;
        saveGameRecord(
          nickname || 'Player',
          currentLevel,
          totalScore,
          region,
          country
        ).catch(err => console.error('Failed to save game record:', err));
      }
    }

    // 애니메이션 실행
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleNextStage = () => {
    navigation.replace('Game', {});
  };

  const handleGoHome = () => {
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* 결과 아이콘 */}
        <View
          style={[
            styles.iconContainer,
            result.success ? styles.successContainer : styles.failedContainer,
          ]}
        >
          <Icon
            name={result.success ? 'trophy' : 'emoticon-sad'}
            size={64}
            color="#FFFFFF"
          />
        </View>

        {/* 결과 텍스트 */}
        <Text
          style={[
            styles.resultText,
            result.success ? styles.successText : styles.failedText,
          ]}
        >
          {result.success ? t('result.success') : t('result.failed')}
        </Text>

        {/* 실패 원인 */}
        {!result.success && result.failureReason && (
          <Text style={styles.failureReason}>
            {result.failureReason === 'timeout'
              ? t('result.timeout')
              : t('result.noLives')}
          </Text>
        )}

        {/* 점수 카드 */}
        <Surface style={styles.scoreCard}>
          {result.success && (
            <>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>{t('result.baseScore')}</Text>
                <Text style={styles.scoreValue}>+{result.baseScore}</Text>
              </View>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>{t('result.timeBonus')}</Text>
                <Text style={styles.scoreValue}>+{result.timeBonus}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.scoreRow}>
                <Text style={styles.totalLabel}>{t('result.totalScore')}</Text>
                <Text style={styles.totalValue}>+{result.totalScore}</Text>
              </View>
            </>
          )}

          <View style={[styles.scoreRow, !result.success && { marginTop: 0 }]}>
            <View style={styles.livesLabel}>
              <Icon name="heart" size={20} color={colors.error} />
              <Text style={styles.scoreLabel}> {t('result.remainingLives')}</Text>
            </View>
            <View style={styles.livesValue}>
              {Array.from({ length: 3 }).map((_, index) => (
                <Icon
                  key={index}
                  name={index < result.remainingLives ? 'heart' : 'heart-outline'}
                  size={24}
                  color={index < result.remainingLives ? colors.error : colors.textLight}
                  style={{ marginLeft: 4 }}
                />
              ))}
            </View>
          </View>
        </Surface>

        {/* 버튼들 */}
        <View style={styles.buttonContainer}>
          {result.success && (
            <Animated.View style={styles.buttonWrapper}>
              <View style={styles.primaryButton}>
                <Text style={styles.primaryButtonText} onPress={handleNextStage}>
                  {t('result.nextStage')}
                </Text>
              </View>
            </Animated.View>
          )}

          {!result.success && result.remainingLives > 0 && (
            <Animated.View style={styles.buttonWrapper}>
              <View style={styles.primaryButton}>
                <Text style={styles.primaryButtonText} onPress={handleNextStage}>
                  {t('common.retry')}
                </Text>
              </View>
            </Animated.View>
          )}

          <Animated.View style={styles.buttonWrapper}>
            <View style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText} onPress={handleGoHome}>
                {t('result.goHome')}
              </Text>
            </View>
          </Animated.View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  successContainer: {
    backgroundColor: colors.success,
  },
  failedContainer: {
    backgroundColor: colors.error,
  },
  resultText: {
    fontSize: 31,
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
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  scoreCard: {
    width: '100%',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    backgroundColor: colors.surface,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreLabel: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  totalValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
  },
  livesLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  livesValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  buttonWrapper: {
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary,
  },
});
