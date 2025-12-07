import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList } from '../types';
import { colors } from '../utils/theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PrivacyPolicy'>;
};

export default function PrivacyPolicyScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const isKorean = i18n.language === 'ko';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('settings.privacy')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {isKorean ? (
          <>
            <Text style={styles.sectionTitle}>개인정보 처리방침</Text>
            <Text style={styles.lastUpdated}>최종 업데이트: 2024년 1월</Text>

            <Text style={styles.paragraph}>
              "오빠 실망이야" (이하 "앱")는 사용자의 개인정보를 중요하게 생각하며, 개인정보 보호법에 따라 사용자의 개인정보를 보호하고 있습니다.
            </Text>

            <Text style={styles.subTitle}>1. 수집하는 개인정보</Text>
            <Text style={styles.paragraph}>
              • 필수 정보: 이메일 주소, 닉네임, 비밀번호{'\n'}
              • 선택 정보: 지역 정보{'\n'}
              • 자동 수집 정보: 게임 진행 데이터, 점수, 레벨 정보
            </Text>

            <Text style={styles.subTitle}>2. 개인정보의 수집 목적</Text>
            <Text style={styles.paragraph}>
              • 회원 관리 및 서비스 제공{'\n'}
              • 게임 진행 상황 저장 및 동기화{'\n'}
              • 랭킹 시스템 운영{'\n'}
              • 서비스 개선 및 통계 분석
            </Text>

            <Text style={styles.subTitle}>3. 개인정보의 보유 및 이용 기간</Text>
            <Text style={styles.paragraph}>
              사용자의 개인정보는 회원 탈퇴 시까지 보관되며, 탈퇴 즉시 모든 데이터가 삭제됩니다.
            </Text>

            <Text style={styles.subTitle}>4. 개인정보의 제3자 제공</Text>
            <Text style={styles.paragraph}>
              앱은 사용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
            </Text>

            <Text style={styles.subTitle}>5. 개인정보의 안전성 확보</Text>
            <Text style={styles.paragraph}>
              • Firebase Authentication을 통한 안전한 인증 시스템{'\n'}
              • 비밀번호 암호화 저장{'\n'}
              • SSL/TLS를 통한 데이터 전송 암호화
            </Text>

            <Text style={styles.subTitle}>6. 사용자의 권리</Text>
            <Text style={styles.paragraph}>
              • 개인정보 열람, 수정, 삭제 요청 권리{'\n'}
              • 언제든지 계정 삭제 가능{'\n'}
              • 마케팅 수신 거부 권리
            </Text>

            <Text style={styles.subTitle}>7. 문의처</Text>
            <Text style={styles.paragraph}>
              개인정보 관련 문의: support@oppasilmangiya.com
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Privacy Policy</Text>
            <Text style={styles.lastUpdated}>Last Updated: January 2024</Text>

            <Text style={styles.paragraph}>
              "Oppa Silmangiya" (the "App") values your privacy and protects your personal information in accordance with applicable privacy laws.
            </Text>

            <Text style={styles.subTitle}>1. Information We Collect</Text>
            <Text style={styles.paragraph}>
              • Required: Email address, nickname, password{'\n'}
              • Optional: Region information{'\n'}
              • Automatically collected: Game progress data, scores, level information
            </Text>

            <Text style={styles.subTitle}>2. Purpose of Collection</Text>
            <Text style={styles.paragraph}>
              • Member management and service provision{'\n'}
              • Saving and syncing game progress{'\n'}
              • Operating the ranking system{'\n'}
              • Service improvement and statistical analysis
            </Text>

            <Text style={styles.subTitle}>3. Retention Period</Text>
            <Text style={styles.paragraph}>
              Your personal information is retained until account deletion. All data is immediately deleted upon account deletion.
            </Text>

            <Text style={styles.subTitle}>4. Third-Party Disclosure</Text>
            <Text style={styles.paragraph}>
              We do not share your personal information with third parties without your consent.
            </Text>

            <Text style={styles.subTitle}>5. Data Security</Text>
            <Text style={styles.paragraph}>
              • Secure authentication through Firebase Authentication{'\n'}
              • Encrypted password storage{'\n'}
              • SSL/TLS encrypted data transmission
            </Text>

            <Text style={styles.subTitle}>6. Your Rights</Text>
            <Text style={styles.paragraph}>
              • Right to access, modify, and delete your personal information{'\n'}
              • Right to delete your account at any time{'\n'}
              • Right to opt-out of marketing communications
            </Text>

            <Text style={styles.subTitle}>7. Contact Us</Text>
            <Text style={styles.paragraph}>
              Privacy inquiries: support@oppasilmangiya.com
            </Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
  },
});
