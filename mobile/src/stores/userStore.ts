import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { Region, SupportedLanguage } from '../types';
import i18n from '../i18n';

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

interface UserState {
  // 유저 정보
  id: string | null;
  nickname: string;
  currentLevel: number;
  totalScore: number;
  highScore: number;
  weeklyScore: number;
  lives: number;
  maxLives: number;
  region: Region;
  country: string;
  language: SupportedLanguage;

  // 액션
  setUserId: (id: string) => void;
  setNickname: (nickname: string) => void;
  setCurrentLevel: (level: number) => void;
  addScore: (score: number) => void;
  updateHighScore: (score: number) => void;
  setLives: (lives: number) => void;
  decreaseLives: () => void;
  increaseLives: () => void;
  resetLives: () => void;
  setRegion: (region: Region) => void;
  setCountry: (country: string) => void;
  setLanguage: (language: SupportedLanguage) => void;
  levelUp: () => void;
  resetProgress: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      id: null,
      nickname: '',
      currentLevel: 1,
      totalScore: 0,
      highScore: 0,
      weeklyScore: 0,
      lives: 5,
      maxLives: 5,
      region: 'asia',
      country: 'KR',
      language: 'ko',

      // 액션
      setUserId: (id) => set({ id }),

      setNickname: (nickname) => set({ nickname }),

      setCurrentLevel: (level) => set({ currentLevel: level }),

      addScore: (score) =>
        set((state) => ({
          totalScore: state.totalScore + score,
          weeklyScore: state.weeklyScore + score,
        })),

      updateHighScore: (score) =>
        set((state) => ({
          highScore: Math.max(state.highScore, score),
        })),

      setLives: (lives) => set({ lives }),

      decreaseLives: () =>
        set((state) => ({
          lives: Math.max(0, state.lives - 1),
        })),

      increaseLives: () =>
        set((state) => ({
          lives: Math.min(state.maxLives, state.lives + 1),
        })),

      resetLives: () =>
        set((state) => ({
          lives: state.maxLives,
        })),

      setRegion: (region) => set({ region }),

      setCountry: (country) => set({ country }),

      setLanguage: (language) => set({ language }),

      levelUp: () =>
        set((state) => ({
          currentLevel: Math.min(100, state.currentLevel + 1),
        })),

      resetProgress: () =>
        set((state) => ({
          currentLevel: 1,
          totalScore: 0,
          weeklyScore: 0,
          lives: state.maxLives,
        })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => storage),
      onRehydrateStorage: () => (state) => {
        // 저장된 라이프가 0이면 자동으로 리셋
        if (state && state.lives <= 0) {
          console.log('Lives was 0, resetting to max');
          state.resetLives();
        }
        // 저장된 언어로 i18n 동기화
        if (state && state.language && i18n.language !== state.language) {
          console.log('Syncing i18n language to:', state.language);
          i18n.changeLanguage(state.language);
        }
      },
    }
  )
);
