import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import { auth, db } from './firebase';
import { Region, SupportedLanguage } from '../types';

// 유저 프로필 타입
export interface UserProfile {
  uid: string;
  email: string;
  nickname: string;
  currentLevel: number;
  totalScore: number;
  weeklyScore: number;
  lives: number;
  maxLives: number;
  region: Region;
  country: string;
  language: SupportedLanguage;
  createdAt: Date;
  lastPlayedAt: Date;
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
}

// 회원가입
export async function registerWithEmail(
  email: string,
  password: string,
  nickname: string,
  region: Region,
  language: SupportedLanguage
): Promise<UserProfile> {
  // 닉네임 중복 체크
  const nicknameExists = await checkNicknameExists(nickname);
  if (nicknameExists) {
    throw new Error('이미 사용 중인 닉네임입니다.');
  }

  // Firebase Auth에 사용자 생성
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // 프로필 업데이트
  await updateProfile(user, { displayName: nickname });

  // Firestore에 유저 데이터 저장
  const userProfile: UserProfile = {
    uid: user.uid,
    email: email,
    nickname: nickname,
    currentLevel: 1,
    totalScore: 0,
    weeklyScore: 0,
    lives: 5,
    maxLives: 5,
    region: region,
    country: 'KR', // 기본값, 나중에 위치 기반으로 설정
    language: language,
    createdAt: new Date(),
    lastPlayedAt: new Date(),
    agreedToTerms: true,
    agreedToPrivacy: true,
  };

  await setDoc(doc(db, 'users', user.uid), {
    ...userProfile,
    createdAt: serverTimestamp(),
    lastPlayedAt: serverTimestamp(),
  });

  return userProfile;
}

// 이메일 로그인
export async function loginWithEmail(email: string, password: string): Promise<UserProfile> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Firestore에서 유저 데이터 가져오기
  const userDoc = await getDoc(doc(db, 'users', user.uid));

  if (!userDoc.exists()) {
    throw new Error('사용자 데이터를 찾을 수 없습니다.');
  }

  const userData = userDoc.data();

  return {
    uid: user.uid,
    email: userData.email,
    nickname: userData.nickname,
    currentLevel: userData.currentLevel,
    totalScore: userData.totalScore,
    weeklyScore: userData.weeklyScore,
    lives: userData.lives,
    maxLives: userData.maxLives,
    region: userData.region,
    country: userData.country,
    language: userData.language,
    createdAt: userData.createdAt?.toDate() || new Date(),
    lastPlayedAt: userData.lastPlayedAt?.toDate() || new Date(),
    agreedToTerms: userData.agreedToTerms,
    agreedToPrivacy: userData.agreedToPrivacy,
  };
}

// 로그아웃
export async function logout(): Promise<void> {
  await signOut(auth);
}

// 비밀번호 재설정 이메일 전송
export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

// 닉네임 중복 체크
export async function checkNicknameExists(nickname: string): Promise<boolean> {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('nickname', '==', nickname));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

// 유저 프로필 가져오기
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userDoc = await getDoc(doc(db, 'users', uid));

  if (!userDoc.exists()) {
    return null;
  }

  const userData = userDoc.data();

  return {
    uid: uid,
    email: userData.email,
    nickname: userData.nickname,
    currentLevel: userData.currentLevel,
    totalScore: userData.totalScore,
    weeklyScore: userData.weeklyScore,
    lives: userData.lives,
    maxLives: userData.maxLives,
    region: userData.region,
    country: userData.country,
    language: userData.language,
    createdAt: userData.createdAt?.toDate() || new Date(),
    lastPlayedAt: userData.lastPlayedAt?.toDate() || new Date(),
    agreedToTerms: userData.agreedToTerms,
    agreedToPrivacy: userData.agreedToPrivacy,
  };
}

// 유저 프로필 업데이트
export async function updateUserProfile(
  uid: string,
  updates: Partial<Omit<UserProfile, 'uid' | 'email' | 'createdAt'>>
): Promise<void> {
  await setDoc(doc(db, 'users', uid), updates, { merge: true });
}

// 계정 삭제 (앱스토어 심사 필수 요구사항)
export async function deleteAccount(password: string): Promise<void> {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error('로그인이 필요합니다.');
  }

  // 재인증
  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);

  // Firestore 데이터 삭제
  await deleteDoc(doc(db, 'users', user.uid));

  // Firebase Auth 계정 삭제
  await deleteUser(user);
}

// 게스트 모드로 시작 (로그인 없이 플레이)
export function getGuestProfile(language: SupportedLanguage, region: Region): UserProfile {
  return {
    uid: 'guest',
    email: '',
    nickname: 'Guest',
    currentLevel: 1,
    totalScore: 0,
    weeklyScore: 0,
    lives: 5,
    maxLives: 5,
    region: region,
    country: 'KR',
    language: language,
    createdAt: new Date(),
    lastPlayedAt: new Date(),
    agreedToTerms: true,
    agreedToPrivacy: true,
  };
}

// Auth 상태 변경 리스너
export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// 현재 유저 가져오기
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

// Google 로그인
export async function signInWithGoogle(
  idToken: string,
  region: Region,
  language: SupportedLanguage
): Promise<UserProfile> {
  const credential = GoogleAuthProvider.credential(idToken);
  const userCredential = await signInWithCredential(auth, credential);
  const user = userCredential.user;

  // 기존 사용자인지 확인
  const existingProfile = await getUserProfile(user.uid);
  if (existingProfile) {
    return existingProfile;
  }

  // 새 사용자 프로필 생성
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    nickname: user.displayName || `Player${Math.floor(Math.random() * 10000)}`,
    currentLevel: 1,
    totalScore: 0,
    weeklyScore: 0,
    lives: 5,
    maxLives: 5,
    region: region,
    country: 'KR',
    language: language,
    createdAt: new Date(),
    lastPlayedAt: new Date(),
    agreedToTerms: true,
    agreedToPrivacy: true,
  };

  await setDoc(doc(db, 'users', user.uid), {
    ...userProfile,
    createdAt: serverTimestamp(),
    lastPlayedAt: serverTimestamp(),
  });

  return userProfile;
}

// Apple 로그인
export async function signInWithApple(
  identityToken: string,
  nonce: string,
  region: Region,
  language: SupportedLanguage,
  fullName?: { givenName?: string | null; familyName?: string | null } | null
): Promise<UserProfile> {
  const provider = new OAuthProvider('apple.com');
  const credential = provider.credential({
    idToken: identityToken,
    rawNonce: nonce,
  });

  const userCredential = await signInWithCredential(auth, credential);
  const user = userCredential.user;

  // 기존 사용자인지 확인
  const existingProfile = await getUserProfile(user.uid);
  if (existingProfile) {
    return existingProfile;
  }

  // Apple에서 받은 이름 또는 기본값 사용
  let nickname = `Player${Math.floor(Math.random() * 10000)}`;
  if (fullName?.givenName) {
    nickname = fullName.givenName;
    if (fullName.familyName) {
      nickname += ` ${fullName.familyName}`;
    }
  }

  // 새 사용자 프로필 생성
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    nickname: nickname,
    currentLevel: 1,
    totalScore: 0,
    weeklyScore: 0,
    lives: 5,
    maxLives: 5,
    region: region,
    country: 'KR',
    language: language,
    createdAt: new Date(),
    lastPlayedAt: new Date(),
    agreedToTerms: true,
    agreedToPrivacy: true,
  };

  await setDoc(doc(db, 'users', user.uid), {
    ...userProfile,
    createdAt: serverTimestamp(),
    lastPlayedAt: serverTimestamp(),
  });

  return userProfile;
}

// Nonce 생성 (Apple 로그인용)
export async function generateNonce(): Promise<string> {
  const randomBytes = await Crypto.getRandomBytesAsync(32);
  const nonce = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return nonce;
}

// SHA256 해시 생성 (Apple 로그인용)
export async function sha256(input: string): Promise<string> {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    input
  );
  return digest;
}
