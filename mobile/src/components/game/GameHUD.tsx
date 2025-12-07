import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors } from '../../utils/theme';

// 이미지 import
const heartImage = require('../../../assets/images/heart.png');
const brokenHeartImage = require('../../../assets/images/broken-heart.png');

interface Props {
  score: number;
  lives: number;
  maxLives: number;
  timeLeft: number;
  totalTime: number;
  level: number;
}

export default function GameHUD({
  score,
  lives,
  maxLives,
  timeLeft,
  totalTime,
  level,
}: Props) {
  const { t } = useTranslation();
  const timeProgress = timeLeft / totalTime;
  const isTimeWarning = timeLeft <= 10;

  return (
    <View style={styles.container}>
      {/* 상단 정보 */}
      <View style={styles.topRow}>
        {/* 레벨 */}
        <View style={styles.infoItem}>
          <Icon name="star" size={18} color={colors.warning} />
          <Text style={styles.infoLabel}>Lv.{level}</Text>
        </View>

        {/* 점수 */}
        <View style={styles.scoreContainer}>
          <Icon name="trophy" size={18} color={colors.secondary} />
          <Text style={styles.scoreText}>{score}</Text>
        </View>

        {/* 라이프 */}
        <View style={styles.livesContainer}>
          {Array.from({ length: maxLives }).map((_, index) => (
            <Image
              key={index}
              source={index < lives ? heartImage : brokenHeartImage}
              style={[styles.heartIcon, { opacity: index < lives ? 1 : 0.4 }]}
              resizeMode="contain"
            />
          ))}
        </View>
      </View>

      {/* 타이머 바 */}
      <View style={styles.timerContainer}>
        <Icon
          name="timer-outline"
          size={18}
          color={isTimeWarning ? colors.error : colors.textSecondary}
        />
        <View style={styles.timerBarContainer}>
          <ProgressBar
            progress={timeProgress}
            color={isTimeWarning ? colors.error : colors.primary}
            style={styles.timerBar}
          />
        </View>
        <Text
          style={[styles.timerText, isTimeWarning && styles.timerTextWarning]}
        >
          {timeLeft}s
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryLight + '30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    marginLeft: 6,
  },
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    width: 24,
    height: 24,
    marginLeft: 2,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerBarContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  timerBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.divider,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    minWidth: 36,
    textAlign: 'right',
  },
  timerTextWarning: {
    color: colors.error,
  },
});
