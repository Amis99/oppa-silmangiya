import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  UserProfile,
  registerWithEmail,
  loginWithEmail,
  logout as firebaseLogout,
  sendPasswordReset,
  getUserProfile,
  updateUserProfile,
  deleteAccount as firebaseDeleteAccount,
  getGuestProfile,
  onAuthStateChange,
  getCurrentUser,
  signInWithGoogle as firebaseSignInWithGoogle,
  signInWithApple as firebaseSignInWithApple,
} from '../services/authService';
import { Region, SupportedLanguage } from '../types';
import { useUserStore } from './userStore';

// userStore와 동기화하는 헬퍼 함수
const syncUserStore = (profile: UserProfile) => {
  const userStore = useUserStore.getState();
  userStore.setUserId(profile.uid);
  userStore.setNickname(profile.nickname);
  userStore.setRegion(profile.region);
  userStore.setLanguage(profile.language);
  userStore.setCurrentLevel(profile.currentLevel);
  userStore.setLives(profile.lives);
};

interface AuthState {
  // 상태
  user: UserProfile | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;

  // 액션
  initialize: () => Promise<void>;
  register: (
    email: string,
    password: string,
    nickname: string,
    region: Region,
    language: SupportedLanguage
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (
    idToken: string,
    region: Region,
    language: SupportedLanguage
  ) => Promise<void>;
  loginWithApple: (
    identityToken: string,
    nonce: string,
    region: Region,
    language: SupportedLanguage,
    fullName?: { givenName?: string | null; familyName?: string | null } | null
  ) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  startAsGuest: (language: SupportedLanguage, region: Region) => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  clearError: () => void;

  // 게임 관련
  updateScore: (score: number) => Promise<void>;
  levelUp: () => Promise<void>;
  useLife: () => Promise<boolean>;
  restoreLives: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isGuest: false,
      isLoading: false,
      error: null,
      initialized: false,

      initialize: async () => {
        set({ isLoading: true });

        try {
          const currentUser = getCurrentUser();

          if (currentUser) {
            const profile = await getUserProfile(currentUser.uid);
            if (profile) {
              syncUserStore(profile);
              set({
                user: profile,
                isAuthenticated: true,
                isGuest: false,
                initialized: true,
                isLoading: false,
              });
              return;
            }
          }

          // 로그인되어 있지 않으면 상태만 초기화
          set({
            initialized: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({
            initialized: true,
            isLoading: false,
            error: '초기화 중 오류가 발생했습니다.',
          });
        }
      },

      register: async (email, password, nickname, region, language) => {
        set({ isLoading: true, error: null });

        try {
          const userProfile = await registerWithEmail(
            email,
            password,
            nickname,
            region,
            language
          );

          syncUserStore(userProfile);
          set({
            user: userProfile,
            isAuthenticated: true,
            isGuest: false,
            isLoading: false,
          });
        } catch (error: any) {
          let errorMessage = '회원가입 중 오류가 발생했습니다.';

          if (error.code === 'auth/email-already-in-use') {
            errorMessage = '이미 사용 중인 이메일입니다.';
          } else if (error.code === 'auth/invalid-email') {
            errorMessage = '유효하지 않은 이메일 형식입니다.';
          } else if (error.code === 'auth/weak-password') {
            errorMessage = '비밀번호는 6자 이상이어야 합니다.';
          } else if (error.message) {
            errorMessage = error.message;
          }

          set({ isLoading: false, error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          const userProfile = await loginWithEmail(email, password);

          syncUserStore(userProfile);
          set({
            user: userProfile,
            isAuthenticated: true,
            isGuest: false,
            isLoading: false,
          });
        } catch (error: any) {
          let errorMessage = '로그인 중 오류가 발생했습니다.';

          if (error.code === 'auth/user-not-found') {
            errorMessage = '존재하지 않는 계정입니다.';
          } else if (error.code === 'auth/wrong-password') {
            errorMessage = '비밀번호가 올바르지 않습니다.';
          } else if (error.code === 'auth/invalid-email') {
            errorMessage = '유효하지 않은 이메일 형식입니다.';
          } else if (error.code === 'auth/too-many-requests') {
            errorMessage = '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
          } else if (error.code === 'auth/invalid-credential') {
            errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
          }

          set({ isLoading: false, error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      loginWithGoogle: async (idToken, region, language) => {
        set({ isLoading: true, error: null });

        try {
          const userProfile = await firebaseSignInWithGoogle(idToken, region, language);

          syncUserStore(userProfile);
          set({
            user: userProfile,
            isAuthenticated: true,
            isGuest: false,
            isLoading: false,
          });
        } catch (error: any) {
          const errorMessage = error.message || 'Google 로그인 중 오류가 발생했습니다.';
          set({ isLoading: false, error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      loginWithApple: async (identityToken, nonce, region, language, fullName) => {
        set({ isLoading: true, error: null });

        try {
          const userProfile = await firebaseSignInWithApple(
            identityToken,
            nonce,
            region,
            language,
            fullName
          );

          syncUserStore(userProfile);
          set({
            user: userProfile,
            isAuthenticated: true,
            isGuest: false,
            isLoading: false,
          });
        } catch (error: any) {
          const errorMessage = error.message || 'Apple 로그인 중 오류가 발생했습니다.';
          set({ isLoading: false, error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });

        try {
          await firebaseLogout();
          set({
            user: null,
            isAuthenticated: false,
            isGuest: false,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false, error: '로그아웃 중 오류가 발생했습니다.' });
        }
      },

      resetPassword: async (email) => {
        set({ isLoading: true, error: null });

        try {
          await sendPasswordReset(email);
          set({ isLoading: false });
        } catch (error: any) {
          let errorMessage = '비밀번호 재설정 이메일 전송 중 오류가 발생했습니다.';

          if (error.code === 'auth/user-not-found') {
            errorMessage = '등록되지 않은 이메일입니다.';
          } else if (error.code === 'auth/invalid-email') {
            errorMessage = '유효하지 않은 이메일 형식입니다.';
          }

          set({ isLoading: false, error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      startAsGuest: (language, region) => {
        const guestProfile = getGuestProfile(language, region);
        syncUserStore(guestProfile);
        set({
          user: guestProfile,
          isAuthenticated: false,
          isGuest: true,
        });
      },

      updateProfile: async (updates) => {
        const { user, isGuest } = get();
        if (!user) return;

        try {
          if (!isGuest) {
            await updateUserProfile(user.uid, updates);
          }

          set({
            user: { ...user, ...updates },
          });
        } catch (error) {
          set({ error: '프로필 업데이트 중 오류가 발생했습니다.' });
        }
      },

      deleteAccount: async (password) => {
        set({ isLoading: true, error: null });

        try {
          await firebaseDeleteAccount(password);
          set({
            user: null,
            isAuthenticated: false,
            isGuest: false,
            isLoading: false,
          });
        } catch (error: any) {
          let errorMessage = '계정 삭제 중 오류가 발생했습니다.';

          if (error.code === 'auth/wrong-password') {
            errorMessage = '비밀번호가 올바르지 않습니다.';
          }

          set({ isLoading: false, error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      clearError: () => set({ error: null }),

      // 게임 관련 액션
      updateScore: async (score) => {
        const { user, isGuest } = get();
        if (!user) return;

        const newTotalScore = user.totalScore + score;
        const newWeeklyScore = user.weeklyScore + score;

        set({
          user: {
            ...user,
            totalScore: newTotalScore,
            weeklyScore: newWeeklyScore,
          },
        });

        if (!isGuest) {
          await updateUserProfile(user.uid, {
            totalScore: newTotalScore,
            weeklyScore: newWeeklyScore,
          });
        }
      },

      levelUp: async () => {
        const { user, isGuest } = get();
        if (!user) return;

        const newLevel = user.currentLevel + 1;

        set({
          user: {
            ...user,
            currentLevel: newLevel,
          },
        });

        if (!isGuest) {
          await updateUserProfile(user.uid, {
            currentLevel: newLevel,
          });
        }
      },

      useLife: async () => {
        const { user, isGuest } = get();
        if (!user || user.lives <= 0) return false;

        const newLives = user.lives - 1;

        set({
          user: {
            ...user,
            lives: newLives,
          },
        });

        if (!isGuest) {
          await updateUserProfile(user.uid, {
            lives: newLives,
          });
        }

        return newLives >= 0;
      },

      restoreLives: async () => {
        const { user, isGuest } = get();
        if (!user) return;

        set({
          user: {
            ...user,
            lives: user.maxLives,
          },
        });

        if (!isGuest) {
          await updateUserProfile(user.uid, {
            lives: user.maxLives,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isGuest: state.isGuest,
      }),
    }
  )
);
