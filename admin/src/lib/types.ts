// 게임 모드 타입
export type GameMode = 'chat' | 'article' | 'text';

// 오류 정보 타입
export interface StageError {
  id: string;
  wrongText: string;      // 지문에 포함된 틀린 표현
  correctText: string;    // 올바른 표현
  explanation: string;    // 설명
  location?: string;      // 오류 위치 (chat 모드에서만 사용: messageId)
}

// 카톡 메시지 타입
export interface ChatMessage {
  id: string;
  sender: 'left' | 'right';
  avatar?: string;
  name?: string;
  text: string;
}

// 카톡 모드 콘텐츠
export interface ChatContent {
  messages: ChatMessage[];
}

// 잡지/기사 모드 콘텐츠
export interface ArticleContent {
  title: string;
  subtitle?: string;
  author?: string;
  source?: string;
  text: string;  // 단일 지문 텍스트
}

// 비문학 모드 콘텐츠
export interface TextContent {
  title?: string;
  text: string;  // 단일 지문 텍스트
}

// 스테이지 변형 (각 오류별 지문 세트)
export interface StageVariant {
  id: string;
  content: ChatContent | ArticleContent | TextContent;  // 오류가 포함된 지문
  error: StageError;  // 이 변형의 오류 정보
}

// 스테이지 타입 (새 구조)
export interface Stage {
  id?: string;
  level: number;
  mode: GameMode;
  timeLimit: number;
  variants: StageVariant[];  // 3~5개의 변형
  createdAt?: Date;
  updatedAt?: Date;
}

// 유저 타입
export interface User {
  id: string;
  nickname: string;
  currentLevel: number;
  totalScore: number;
  weeklyScore: number;
  lives: number;
  region: string;
  country: string;
  language: string;
  createdAt?: Date;
  lastPlayedAt?: Date;
}

// =====================================
// 하위 호환성을 위한 레거시 타입 (제거 예정)
// =====================================
export interface ErrorCandidate {
  id: string;
  wrongText: string;
  correctText: string;
  explanation: string;
}
