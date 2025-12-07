import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList, SupportedLanguage } from '../types';
import { changeLanguage, supportedLanguages } from '../i18n';
import { colors } from '../utils/theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LanguageSelect'>;
};

const FIRST_LAUNCH_KEY = '@first_launch';

interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

const languages: LanguageOption[] = [
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'zh-CN', name: 'Chinese', nativeName: '简体中文' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
];

export default function LanguageSelectScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();

  const handleLanguageSelect = async (languageCode: SupportedLanguage) => {
    try {
      // 언어 변경
      await changeLanguage(languageCode);

      // 첫 실행 표시 저장
      await AsyncStorage.setItem(FIRST_LAUNCH_KEY, 'true');

      // 로그인 화면으로 이동
      navigation.replace('Login');
    } catch (error) {
      console.error('Error selecting language:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('language.select')}</Text>
        <Text style={styles.subtitle}>Select your language</Text>
      </View>

      <ScrollView style={styles.languageList} contentContainerStyle={styles.languageListContent}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageItem,
              i18n.language === lang.code && styles.languageItemSelected,
            ]}
            onPress={() => handleLanguageSelect(lang.code)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.languageNativeName,
                i18n.language === lang.code && styles.languageTextSelected,
              ]}
            >
              {lang.nativeName}
            </Text>
            <Text
              style={[
                styles.languageName,
                i18n.language === lang.code && styles.languageTextSelectedSecondary,
              ]}
            >
              {lang.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  languageList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  languageListContent: {
    paddingBottom: 40,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  languageItemSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight + '20',
  },
  languageNativeName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  languageName: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  languageTextSelected: {
    color: colors.primary,
  },
  languageTextSelectedSecondary: {
    color: colors.primaryDark,
  },
});
