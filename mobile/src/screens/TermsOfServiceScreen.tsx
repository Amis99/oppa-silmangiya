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
  navigation: NativeStackNavigationProp<RootStackParamList, 'TermsOfService'>;
};

export default function TermsOfServiceScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const isKorean = i18n.language === 'ko';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('settings.terms')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {isKorean ? (
          <>
            <Text style={styles.sectionTitle}>이용약관</Text>
            <Text style={styles.lastUpdated}>최종 업데이트: 2024년 1월</Text>

            <Text style={styles.subTitle}>제1조 (목적)</Text>
            <Text style={styles.paragraph}>
              이 약관은 "오빠 실망이야" 앱(이하 "앱")이 제공하는 서비스의 이용과 관련하여 앱과 이용자 간의 권리, 의무 및 책임 사항 등을 규정함을 목적으로 합니다.
            </Text>

            <Text style={styles.subTitle}>제2조 (서비스의 내용)</Text>
            <Text style={styles.paragraph}>
              앱은 다음과 같은 서비스를 제공합니다:{'\n'}
              • 한국어 맞춤법/표현 학습 게임{'\n'}
              • 랭킹 시스템{'\n'}
              • 게임 진행 데이터 저장 및 동기화
            </Text>

            <Text style={styles.subTitle}>제3조 (회원가입)</Text>
            <Text style={styles.paragraph}>
              • 서비스 이용을 위해 회원가입이 필요합니다.{'\n'}
              • 게스트 모드로도 이용 가능하나, 진행 상황이 저장되지 않습니다.{'\n'}
              • 회원가입 시 정확한 정보를 제공해야 합니다.
            </Text>

            <Text style={styles.subTitle}>제4조 (이용자의 의무)</Text>
            <Text style={styles.paragraph}>
              이용자는 다음 행위를 해서는 안 됩니다:{'\n'}
              • 타인의 정보 도용{'\n'}
              • 앱의 운영을 방해하는 행위{'\n'}
              • 부정한 방법으로 점수 조작{'\n'}
              • 욕설, 비방 등 부적절한 닉네임 사용
            </Text>

            <Text style={styles.subTitle}>제5조 (서비스 이용 제한)</Text>
            <Text style={styles.paragraph}>
              앱은 이용자가 본 약관을 위반한 경우 서비스 이용을 제한할 수 있습니다.
            </Text>

            <Text style={styles.subTitle}>제6조 (계정 삭제)</Text>
            <Text style={styles.paragraph}>
              • 이용자는 언제든지 계정을 삭제할 수 있습니다.{'\n'}
              • 계정 삭제 시 모든 데이터가 영구 삭제됩니다.{'\n'}
              • 삭제된 데이터는 복구할 수 없습니다.
            </Text>

            <Text style={styles.subTitle}>제7조 (면책)</Text>
            <Text style={styles.paragraph}>
              • 앱은 천재지변, 시스템 장애 등 불가항력적인 사유로 인한 서비스 중단에 대해 책임지지 않습니다.{'\n'}
              • 이용자의 귀책 사유로 인한 서비스 이용 장애에 대해 책임지지 않습니다.
            </Text>

            <Text style={styles.subTitle}>제8조 (약관 변경)</Text>
            <Text style={styles.paragraph}>
              앱은 약관을 변경할 경우 변경 내용을 앱 내에 공지합니다.
            </Text>

            <Text style={styles.subTitle}>제9조 (문의)</Text>
            <Text style={styles.paragraph}>
              서비스 관련 문의: support@oppasilmangiya.com
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Terms of Service</Text>
            <Text style={styles.lastUpdated}>Last Updated: January 2024</Text>

            <Text style={styles.subTitle}>Article 1 (Purpose)</Text>
            <Text style={styles.paragraph}>
              These Terms govern the rights, obligations, and responsibilities between "Oppa Silmangiya" (the "App") and its users regarding the use of services provided by the App.
            </Text>

            <Text style={styles.subTitle}>Article 2 (Service Description)</Text>
            <Text style={styles.paragraph}>
              The App provides the following services:{'\n'}
              • Korean spelling/expression learning game{'\n'}
              • Ranking system{'\n'}
              • Game progress data storage and synchronization
            </Text>

            <Text style={styles.subTitle}>Article 3 (Registration)</Text>
            <Text style={styles.paragraph}>
              • Registration is required to use the service.{'\n'}
              • Guest mode is available, but progress will not be saved.{'\n'}
              • Accurate information must be provided during registration.
            </Text>

            <Text style={styles.subTitle}>Article 4 (User Obligations)</Text>
            <Text style={styles.paragraph}>
              Users must not engage in the following:{'\n'}
              • Identity theft{'\n'}
              • Interfering with App operations{'\n'}
              • Manipulating scores through fraudulent means{'\n'}
              • Using inappropriate nicknames
            </Text>

            <Text style={styles.subTitle}>Article 5 (Service Restrictions)</Text>
            <Text style={styles.paragraph}>
              The App may restrict service access if users violate these Terms.
            </Text>

            <Text style={styles.subTitle}>Article 6 (Account Deletion)</Text>
            <Text style={styles.paragraph}>
              • Users may delete their account at any time.{'\n'}
              • All data will be permanently deleted upon account deletion.{'\n'}
              • Deleted data cannot be recovered.
            </Text>

            <Text style={styles.subTitle}>Article 7 (Disclaimer)</Text>
            <Text style={styles.paragraph}>
              • The App is not responsible for service interruptions due to force majeure such as natural disasters or system failures.{'\n'}
              • The App is not responsible for service issues caused by user negligence.
            </Text>

            <Text style={styles.subTitle}>Article 8 (Terms Modification)</Text>
            <Text style={styles.paragraph}>
              Any changes to these Terms will be announced within the App.
            </Text>

            <Text style={styles.subTitle}>Article 9 (Contact)</Text>
            <Text style={styles.paragraph}>
              Service inquiries: support@oppasilmangiya.com
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
