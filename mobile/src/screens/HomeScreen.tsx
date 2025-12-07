import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Image, Modal, TextInput } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList } from '../types';
import { colors } from '../utils/theme';
import { useUserStore } from '../stores/userStore';
import { sampleStages } from '../data/stages';

const MAX_STAGES = sampleStages.length; // 현재 스테이지 수 (동적)

// 이미지 import
const backgroundImage = require('../../assets/images/background-cloud.jpg');
const oppaCharacter = require('../../assets/images/oppa-character.jpg');
const heartImage = require('../../assets/images/heart.png');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const { currentLevel, highScore, lives, resetProgress, resetLives, language } = useUserStore();
  const [showStageModal, setShowStageModal] = useState(false);
  const [stageInput, setStageInput] = useState('');

  // userStore의 language가 변경되면 i18n 동기화
  React.useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  // 게임 시작 핸들러 - 라이프가 0이면 리셋
  const handleStartGame = () => {
    if (lives <= 0) {
      resetLives();
    }
    navigation.navigate('Game', {});
  };

  // 특정 스테이지에서 시작
  const handleStartFromStage = () => {
    const stage = parseInt(stageInput, 10);
    if (isNaN(stage) || stage < 1 || stage > MAX_STAGES) {
      return; // 유효하지 않은 입력
    }
    resetProgress();
    resetLives();
    setShowStageModal(false);
    setStageInput('');
    navigation.navigate('Game', { startLevel: stage });
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowStageModal(false);
    setStageInput('');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Image source={oppaCharacter} style={styles.characterImage} resizeMode="contain" />
          <Text style={styles.title}>{t('app.name')}</Text>
          <Text style={styles.tagline}>{t('app.tagline')}</Text>
        </View>

        {/* 유저 정보 카드 */}
        <Surface style={styles.statsCard}>
          <View style={styles.statItem}>
            <Icon name="star" size={24} color={colors.warning} />
            <Text style={styles.statValue}>{currentLevel}</Text>
            <Text style={styles.statLabel}>{t('home.currentLevel')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Icon name="trophy" size={24} color={colors.secondary} />
            <Text style={styles.statValue}>{highScore.toLocaleString()}</Text>
            <Text style={styles.statLabel}>{t('home.highScore')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Image source={heartImage} style={styles.heartIcon} resizeMode="contain" />
            <Text style={styles.statValue}>{lives}</Text>
            <Text style={styles.statLabel}>{t('game.lives')}</Text>
          </View>
        </Surface>

        {/* 메인 버튼들 */}
        <View style={styles.buttonContainer}>
          {/* 새로하기 버튼 - 레벨 2 이상일 때만 표시 */}
          {currentLevel > 1 && (
            <TouchableOpacity
              style={styles.newGameButton}
              onPress={() => {
                resetProgress();
                navigation.navigate('Game', {});
              }}
              activeOpacity={0.8}
            >
              <Icon name="restart" size={28} color={colors.primary} />
              <Text style={styles.newGameButtonText}>{t('home.newGame')}</Text>
            </TouchableOpacity>
          )}

          {/* 이어하기/게임시작 버튼 */}
          <TouchableOpacity
            style={styles.mainButton}
            onPress={handleStartGame}
            activeOpacity={0.8}
          >
            <Icon name="play" size={32} color="#FFFFFF" />
            <Text style={styles.mainButtonText}>
              {currentLevel > 1 ? t('home.continueGame') : t('home.startGame')}
            </Text>
          </TouchableOpacity>

          <View style={styles.secondaryButtons}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Ranking')}
              activeOpacity={0.7}
            >
              <Icon name="podium" size={28} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>{t('home.ranking')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Settings')}
              activeOpacity={0.7}
            >
              <Icon name="cog" size={28} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>{t('home.settings')}</Text>
            </TouchableOpacity>
          </View>

          {/* 스테이지 선택 버튼 */}
          <TouchableOpacity
            style={styles.stageSelectButton}
            onPress={() => setShowStageModal(true)}
            activeOpacity={0.7}
          >
            <Icon name="format-list-numbered" size={20} color={colors.textSecondary} />
            <Text style={styles.stageSelectButtonText}>{t('home.stageSelect')}</Text>
          </TouchableOpacity>
        </View>

        {/* 스테이지 선택 모달 */}
        <Modal
          visible={showStageModal}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t('home.stageSelect')}</Text>
              <Text style={styles.modalSubtitle}>
                {t('home.stageSelectDesc')} (1~{MAX_STAGES})
              </Text>

              <View style={styles.stageInputContainer}>
                <TextInput
                  style={styles.stageInput}
                  value={stageInput}
                  onChangeText={setStageInput}
                  keyboardType="number-pad"
                  placeholder={`1~${MAX_STAGES}`}
                  placeholderTextColor={colors.textSecondary}
                  maxLength={3}
                  autoFocus={true}
                />
              </View>

              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={handleCloseModal}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalCancelButtonText}>{t('common.cancel')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modalStartButton,
                    (!stageInput || parseInt(stageInput, 10) < 1 || parseInt(stageInput, 10) > MAX_STAGES) && styles.modalStartButtonDisabled
                  ]}
                  onPress={handleStartFromStage}
                  activeOpacity={0.7}
                  disabled={!stageInput || parseInt(stageInput, 10) < 1 || parseInt(stageInput, 10) > MAX_STAGES}
                >
                  <Text style={styles.modalStartButtonText}>{t('home.startGame')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  characterImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  heartIcon: {
    width: 48,
    height: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  statsCard: {
    flexDirection: 'row',
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 20,
    backgroundColor: colors.surface,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.divider,
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  newGameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  newGameButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 12,
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  mainButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingVertical: 20,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 8,
  },
  stageSelectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 12,
  },
  stageSelectButtonText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  stageInputContainer: {
    marginBottom: 24,
  },
  stageInput: {
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 8,
  },
  modalCancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  modalStartButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginLeft: 8,
  },
  modalStartButtonDisabled: {
    backgroundColor: colors.primaryLight,
    opacity: 0.5,
  },
  modalStartButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
