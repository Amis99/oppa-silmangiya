import { signInAnonymously, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { User, SupportedLanguage, Region } from '../types';

// 익명 로그인
export const signInAnonymous = async (): Promise<FirebaseUser> => {
  const userCredential = await signInAnonymously(auth);
  return userCredential.user;
};

// 인증 상태 변경 리스너
export const onAuthChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// 유저 프로필 생성
export const createUserProfile = async (
  userId: string,
  nickname: string,
  language: SupportedLanguage,
  region: Region = 'asia',
  country: string = 'KR'
): Promise<User> => {
  const userRef = doc(db, 'users', userId);

  const newUser: Omit<User, 'createdAt' | 'lastPlayedAt'> & {
    createdAt: ReturnType<typeof serverTimestamp>;
    lastPlayedAt: ReturnType<typeof serverTimestamp>;
  } = {
    id: userId,
    nickname,
    currentLevel: 1,
    totalScore: 0,
    weeklyScore: 0,
    lives: 3,
    region,
    country,
    language,
    createdAt: serverTimestamp(),
    lastPlayedAt: serverTimestamp(),
  };

  await setDoc(userRef, newUser);

  return {
    ...newUser,
    createdAt: new Date(),
    lastPlayedAt: new Date(),
  } as User;
};

// 유저 프로필 조회
export const getUserProfile = async (userId: string): Promise<User | null> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    return {
      ...data,
      id: userSnap.id,
      createdAt: data.createdAt?.toDate(),
      lastPlayedAt: data.lastPlayedAt?.toDate(),
    } as User;
  }

  return null;
};

// 유저 프로필 업데이트
export const updateUserProfile = async (
  userId: string,
  updates: Partial<Omit<User, 'id' | 'createdAt'>>
): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await setDoc(
    userRef,
    {
      ...updates,
      lastPlayedAt: serverTimestamp(),
    },
    { merge: true }
  );
};
