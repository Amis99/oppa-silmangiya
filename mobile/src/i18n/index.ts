import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ko from './locales/ko.json';
import en from './locales/en.json';
import ja from './locales/ja.json';
import zhCN from './locales/zh-CN.json';
import ar from './locales/ar.json';

// 지원 언어 목록
export const supportedLanguages = {
  ko: { name: '한국어', nativeName: '한국어' },
  en: { name: 'English', nativeName: 'English' },
  ja: { name: 'Japanese', nativeName: '日本語' },
  'zh-CN': { name: 'Chinese (Simplified)', nativeName: '简体中文' },
  ar: { name: 'Arabic', nativeName: 'العربية' },
};

// userStore에서 저장된 언어 불러오기
const getStoredLanguage = async (): Promise<string | null> => {
  try {
    const userStorageStr = await AsyncStorage.getItem('user-storage');
    if (userStorageStr) {
      const userStorage = JSON.parse(userStorageStr);
      if (userStorage.state && userStorage.state.language) {
        return userStorage.state.language;
      }
    }
    return null;
  } catch {
    return null;
  }
};

// 기기 언어 감지
const getDeviceLanguage = (): string => {
  try {
    const locales = Localization.getLocales();
    const locale = locales?.[0]?.languageCode || 'en';

    // 지원하는 언어인지 확인
    if (locale in supportedLanguages) {
      return locale;
    }

    // 중국어 특수 처리
    if (locale.startsWith('zh')) {
      return 'zh-CN';
    }

    // 기본값은 영어
    return 'en';
  } catch {
    return 'en';
  }
};

// i18n 초기화
export const initI18n = async () => {
  const storedLanguage = await getStoredLanguage();
  const deviceLanguage = getDeviceLanguage();
  const initialLanguage = storedLanguage || deviceLanguage;

  console.log('i18n initializing with language:', initialLanguage);

  await i18n.use(initReactI18next).init({
    resources: {
      ko: { translation: ko },
      en: { translation: en },
      ja: { translation: ja },
      'zh-CN': { translation: zhCN },
      ar: { translation: ar },
    },
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  return i18n;
};

// 언어 변경
export const changeLanguage = async (language: string): Promise<void> => {
  console.log('Changing language to:', language);
  await i18n.changeLanguage(language);
};

export default i18n;
