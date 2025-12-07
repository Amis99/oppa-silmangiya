import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { ErrorCandidate } from '../../types';
import { colors } from '../../utils/theme';

interface Props {
  visible: boolean;
  isCorrect: boolean;
  candidate: ErrorCandidate | null;
  onClose: () => void;
}

export default function ExplanationModal({
  visible,
  isCorrect,
  candidate,
  onClose,
}: Props) {
  const { t } = useTranslation();

  if (!candidate) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Surface style={styles.container}>
          {/* 결과 아이콘 */}
          <View
            style={[
              styles.resultIconContainer,
              isCorrect ? styles.correctContainer : styles.wrongContainer,
            ]}
          >
            <Icon
              name={isCorrect ? 'check-circle' : 'close-circle'}
              size={48}
              color="#FFFFFF"
            />
          </View>

          {/* 결과 텍스트 */}
          <Text
            style={[
              styles.resultText,
              isCorrect ? styles.correctText : styles.wrongText,
            ]}
          >
            {isCorrect ? t('game.correct') : t('game.wrong')}
          </Text>

          {/* 틀린 표현 → 올바른 표현 */}
          <View style={styles.correctionContainer}>
            <View style={styles.correctionItem}>
              <Text style={styles.correctionLabel}>틀린 표현</Text>
              <Text style={styles.wrongExpression}>{candidate.wrongText}</Text>
            </View>
            <Icon name="arrow-down" size={24} color={colors.textSecondary} />
            <View style={styles.correctionItem}>
              <Text style={styles.correctionLabel}>올바른 표현</Text>
              <Text style={styles.correctExpression}>{candidate.correctText}</Text>
            </View>
          </View>

          {/* 설명 */}
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationLabel}>{t('game.explanation')}</Text>
            <Text style={styles.explanationText}>{candidate.explanation}</Text>
          </View>

          {/* 확인 버튼 */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>{t('common.confirm')}</Text>
          </TouchableOpacity>
        </Surface>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  resultIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  correctContainer: {
    backgroundColor: colors.success,
  },
  wrongContainer: {
    backgroundColor: colors.error,
  },
  resultText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  correctText: {
    color: colors.success,
  },
  wrongText: {
    color: colors.error,
  },
  correctionContainer: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  correctionItem: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  correctionLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  wrongExpression: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.error,
    textDecorationLine: 'line-through',
  },
  correctExpression: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.success,
  },
  explanationContainer: {
    width: '100%',
    backgroundColor: colors.primaryLight + '20',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  explanationLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
