import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './firebase';
import { Stage, GameMode } from '../types';

// Firestore 데이터를 Stage 타입으로 변환
const convertToStage = (id: string, data: Record<string, unknown>): Stage => {
  return {
    ...data,
    id,
    createdAt: (data.createdAt as { toDate: () => Date })?.toDate?.(),
    updatedAt: (data.updatedAt as { toDate: () => Date })?.toDate?.(),
  } as Stage;
};

// 특정 스테이지 조회
export const getStage = async (stageId: string): Promise<Stage | null> => {
  const stageRef = doc(db, 'stages', stageId);
  const stageSnap = await getDoc(stageRef);

  if (stageSnap.exists()) {
    return convertToStage(stageSnap.id, stageSnap.data());
  }

  return null;
};

// 레벨별 스테이지 목록 조회
export const getStagesByLevel = async (level: number): Promise<Stage[]> => {
  const stagesRef = collection(db, 'stages');
  const q = query(stagesRef, where('level', '==', level), orderBy('createdAt', 'desc'));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => convertToStage(doc.id, doc.data()));
};

// 특정 레벨의 랜덤 스테이지 조회
export const getRandomStageByLevel = async (level: number): Promise<Stage | null> => {
  const stages = await getStagesByLevel(level);

  if (stages.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * stages.length);
  return stages[randomIndex];
};

// 모드별 스테이지 조회
export const getStagesByMode = async (mode: GameMode, maxCount: number = 10): Promise<Stage[]> => {
  const stagesRef = collection(db, 'stages');
  const q = query(
    stagesRef,
    where('mode', '==', mode),
    orderBy('level', 'asc'),
    limit(maxCount)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => convertToStage(doc.id, doc.data()));
};

// 다음 플레이할 스테이지 조회 (레벨 기반)
export const getNextStage = async (currentLevel: number): Promise<Stage | null> => {
  // 현재 레벨의 스테이지 중 랜덤 선택
  let stage = await getRandomStageByLevel(currentLevel);

  // 현재 레벨에 스테이지가 없으면 이전 레벨에서 찾기
  if (!stage && currentLevel > 1) {
    stage = await getRandomStageByLevel(currentLevel - 1);
  }

  // 그래도 없으면 레벨 1에서 찾기
  if (!stage) {
    stage = await getRandomStageByLevel(1);
  }

  return stage;
};

// 오류 후보 중 하나를 랜덤으로 활성화
export const selectRandomError = (stage: Stage): string => {
  const { errorCandidates } = stage;

  if (errorCandidates.length === 0) {
    throw new Error('No error candidates in this stage');
  }

  const randomIndex = Math.floor(Math.random() * errorCandidates.length);
  return errorCandidates[randomIndex].id;
};
