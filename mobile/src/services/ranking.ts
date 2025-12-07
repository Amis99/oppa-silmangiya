import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { RankingEntry, Region, RankingFilter } from '../types';

// 게임 기록 저장 (플레이 세션 기준)
export const saveGameRecord = async (
  nickname: string,
  finalLevel: number,
  totalScore: number,
  region: Region,
  country: string
): Promise<string> => {
  const recordId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const recordRef = doc(db, 'rankings', recordId);

  await setDoc(recordRef, {
    id: recordId,
    nickname,
    finalLevel,
    totalScore,
    region,
    country,
    playedAt: serverTimestamp(),
    createdAt: new Date().toISOString(),
  });

  return recordId;
};

// 최고 기록 업데이트 (유저별)
export const updateUserBestRecord = async (
  oderId: string,
  nickname: string,
  finalLevel: number,
  totalScore: number,
  region: Region,
  country: string
): Promise<void> => {
  const userRef = doc(db, 'users', oderId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const currentData = userDoc.data();
    // 기존 최고 점수보다 높을 때만 업데이트
    if (totalScore > (currentData.highScore || 0)) {
      await setDoc(userRef, {
        ...currentData,
        nickname,
        highScore: totalScore,
        bestLevel: finalLevel,
        region,
        country,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }
  } else {
    // 새 유저 생성
    await setDoc(userRef, {
      id: oderId,
      nickname,
      highScore: totalScore,
      bestLevel: finalLevel,
      region,
      country,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
};

// Firestore 데이터를 RankingEntry로 변환
const convertToRankingEntry = (
  data: Record<string, unknown>,
  rank: number
): RankingEntry => {
  // playedAt 변환 (Firestore Timestamp -> Date)
  let playedAt = new Date();
  if (data.playedAt) {
    const timestamp = data.playedAt as { toDate?: () => Date };
    if (timestamp.toDate) {
      playedAt = timestamp.toDate();
    } else if (typeof data.playedAt === 'string') {
      playedAt = new Date(data.playedAt as string);
    }
  }

  return {
    id: data.id as string,
    userId: data.id as string,
    nickname: data.nickname as string,
    finalLevel: data.finalLevel as number,
    totalScore: data.totalScore as number,
    region: data.region as Region,
    country: data.country as string,
    playedAt,
    rank,
  };
};

// 전세계 랭킹 조회
export const getGlobalRanking = async (
  maxCount: number = 100
): Promise<RankingEntry[]> => {
  const rankingsRef = collection(db, 'rankings');

  const q = query(rankingsRef, orderBy('totalScore', 'desc'), limit(maxCount));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc, index) =>
    convertToRankingEntry(doc.data(), index + 1)
  );
};

// 지역별 랭킹 조회
export const getRegionalRanking = async (
  region: Region,
  maxCount: number = 100
): Promise<RankingEntry[]> => {
  const rankingsRef = collection(db, 'rankings');

  const q = query(
    rankingsRef,
    where('region', '==', region),
    orderBy('totalScore', 'desc'),
    limit(maxCount)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc, index) =>
    convertToRankingEntry(doc.data(), index + 1)
  );
};

// 국가별 랭킹 조회
export const getCountryRanking = async (
  country: string,
  maxCount: number = 100
): Promise<RankingEntry[]> => {
  const rankingsRef = collection(db, 'rankings');

  const q = query(
    rankingsRef,
    where('country', '==', country),
    orderBy('totalScore', 'desc'),
    limit(maxCount)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc, index) =>
    convertToRankingEntry(doc.data(), index + 1)
  );
};

// 사용자의 랭킹 정보 조회
export const getUserRanking = async (
  nickname: string,
  filter: RankingFilter = 'global',
  region?: Region,
  country?: string
): Promise<{ rank: number; total: number } | null> => {
  let rankings: RankingEntry[];

  switch (filter) {
    case 'global':
      rankings = await getGlobalRanking(10000);
      break;
    case 'regional':
      if (!region) return null;
      rankings = await getRegionalRanking(region, 10000);
      break;
    case 'country':
      if (!country) return null;
      rankings = await getCountryRanking(country, 10000);
      break;
    default:
      rankings = await getGlobalRanking(10000);
  }

  const userRankIndex = rankings.findIndex((entry) => entry.nickname === nickname);

  if (userRankIndex === -1) {
    return null;
  }

  return {
    rank: userRankIndex + 1,
    total: rankings.length,
  };
};
