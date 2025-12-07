import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { SupportedLanguage } from '../types';

// 웹에서는 localStorage, 네이티브에서는 AsyncStorage 사용
const storage: StateStorage = Platform.OS === 'web'
  ? {
      getItem: (name: string) => {
        const value = localStorage.getItem(name);
        return value ?? null;
      },
      setItem: (name: string, value: string) => {
        localStorage.setItem(name, value);
      },
      removeItem: (name: string) => {
        localStorage.removeItem(name);
      },
    }
  : {
      getItem: async (name: string) => {
        const value = await AsyncStorage.getItem(name);
        return value ?? null;
      },
      setItem: async (name: string, value: string) => {
        await AsyncStorage.setItem(name, value);
      },
      removeItem: async (name: string) => {
        await AsyncStorage.removeItem(name);
      },
    };

interface SettingsState {
  // 설정
  language: SupportedLanguage;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  notificationsEnabled: boolean;

  // 액션
  setLanguage: (language: SupportedLanguage) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setHapticEnabled: (enabled: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  resetSettings: () => void;
}

const defaultSettings = {
  language: 'ko' as SupportedLanguage,
  soundEnabled: true,
  hapticEnabled: true,
  notificationsEnabled: true,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // 초기 상태
      ...defaultSettings,

      // 액션
      setLanguage: (language) => set({ language }),

      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),

      setHapticEnabled: (enabled) => set({ hapticEnabled: enabled }),

      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),

      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => storage),
    }
  )
);
