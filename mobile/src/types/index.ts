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
  image?: string;  // 이미지 파일명 (예: "yorkshire_terrier.jpg")
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
  id: string;
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
  highScore: number;         // 게임오버까지의 최고 점수 (랭킹 기준)
  lives: number;
  region: Region;
  country: string;
  language: SupportedLanguage;
  createdAt?: Date;
  lastPlayedAt?: Date;
}

// 지역 타입
export type Region =
  | 'korea'
  | 'asia'
  | 'europe'
  | 'north_america'
  | 'south_america'
  | 'middle_east_africa'
  | 'oceania';

// 지원 언어 타입
export type SupportedLanguage = 'ko' | 'en' | 'ja' | 'zh-CN' | 'zh-TW' | 'ar';

// 랭킹 항목 타입 (플레이 세션 기준 - 한 유저가 여러 순위 가능)
export interface RankingEntry {
  id: string;                // 플레이 세션 ID
  userId: string;            // 유저 ID
  nickname: string;
  finalLevel: number;        // 게임오버 시 도달한 레벨
  totalScore: number;        // 게임오버까지의 총 점수
  region: Region;
  country: string;
  playedAt: Date;            // 플레이 일시
  rank?: number;
}

// 랭킹 필터 타입
export type RankingFilter = 'global' | 'regional' | 'country';

// 게임 상태 타입
export type GameStatus = 'idle' | 'playing' | 'paused' | 'success' | 'failed';

// 실패 원인 타입
export type FailureReason = 'timeout' | 'no_lives' | null;

// 게임 결과 타입
export interface GameResult {
  success: boolean;
  stageScore: number;       // 이번 스테이지 점수 (남은시간 + 레벨)
  remainingTime: number;
  remainingLives: number;
  level: number;
  failureReason?: FailureReason;
}

// 네비게이션 파라미터 타입
export type RootStackParamList = {
  Splash: undefined;
  LanguageSelect: undefined;
  Auth: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  Game: { stageId?: string; startLevel?: number };
  Result: { result: GameResult; stage: Stage };
  Ranking: undefined;
  Settings: undefined;
  PrivacyPolicy: undefined;
  TermsOfService: undefined;
};

// 설정 타입
export interface Settings {
  language: SupportedLanguage;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  notificationsEnabled: boolean;
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

export interface ActiveError {
  candidateId: string;
  wrongText: string;
  correctText: string;
  explanation: string;
}
