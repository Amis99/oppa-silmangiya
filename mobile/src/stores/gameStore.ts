import { create } from 'zustand';
import { Stage, GameStatus, FailureReason, GameResult, StageVariant } from '../types';

// 하트 부활 점수 임계값 (이 점수를 넘으면 하트 +1)
const LIFE_BONUS_THRESHOLDS = [
  200, 500, 900, 1400, 2000,
  2700, 3500, 4400, 5400, 6500,
  7700, 9000, 10500, 12000, 14000,
  16000, 18500, 21000, 24000, 27000,
  30500, 34000, 38000, 42000, 47000,
];

interface GameState {
  // Game state
  status: GameStatus;
  currentStage: Stage | null;
  selectedVariant: StageVariant | null;
  timeLeft: number;
  lives: number;
  failureReason: FailureReason;

  // Session state (플레이 세션 - 게임오버까지 누적)
  sessionScore: number;           // 세션 누적 점수
  lastBonusThreshold: number;     // 마지막으로 달성한 보너스 임계값 인덱스

  // Game progress state
  showExplanation: boolean;
  isCorrect: boolean | null;

  // Actions
  initGame: (stage: Stage, lives: number, sessionScore?: number, lastBonusThreshold?: number) => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  tickTimer: () => void;
  handleCorrect: () => { lifeRestored: boolean };
  handleWrong: () => void;
  endGame: (success: boolean, reason?: FailureReason) => void;
  resetSession: () => void;
  setShowExplanation: (show: boolean) => void;
  getResult: () => GameResult;
  getSessionScore: () => number;
}

const initialState = {
  status: 'idle' as GameStatus,
  currentStage: null,
  selectedVariant: null,
  timeLeft: 0,
  lives: 5,
  failureReason: null as FailureReason,
  sessionScore: 0,
  lastBonusThreshold: -1,
  showExplanation: false,
  isCorrect: null,
};

export const useGameStore = create<GameState>((set, get) => ({
  ...initialState,

  initGame: (stage, lives, sessionScore = 0, lastBonusThreshold = -1) => {
    if (!stage.variants || stage.variants.length === 0) {
      console.error('Stage has no variants!');
      return;
    }

    const randomIndex = Math.floor(Math.random() * stage.variants.length);
    const selectedVariant = stage.variants[randomIndex];

    console.log('initGame: Selected variant', selectedVariant.id);

    set({
      status: 'idle',
      currentStage: stage,
      selectedVariant,
      timeLeft: stage.timeLimit,
      lives,
      failureReason: null,
      sessionScore,
      lastBonusThreshold,
      showExplanation: false,
      isCorrect: null,
    });
  },

  startGame: () => {
    set({ status: 'playing' });
  },

  pauseGame: () => {
    set({ status: 'paused' });
  },

  resumeGame: () => {
    set({ status: 'playing' });
  },

  tickTimer: () => {
    const { timeLeft, status } = get();

    if (status !== 'playing') return;

    if (timeLeft <= 1) {
      get().endGame(false, 'timeout');
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  handleCorrect: () => {
    const { currentStage, timeLeft, sessionScore, lives, lastBonusThreshold } = get();
    const level = currentStage?.level || 1;

    // 스테이지 점수 = 남은 시간 + 레벨
    const stageScore = timeLeft + level;
    const newSessionScore = sessionScore + stageScore;

    // 하트 부활 체크
    let lifeRestored = false;
    let newLives = lives;
    let newThresholdIndex = lastBonusThreshold;

    // 다음 임계값을 넘었는지 체크
    for (let i = lastBonusThreshold + 1; i < LIFE_BONUS_THRESHOLDS.length; i++) {
      if (newSessionScore >= LIFE_BONUS_THRESHOLDS[i]) {
        if (newLives < 5) {
          newLives++;
          lifeRestored = true;
        }
        newThresholdIndex = i;
      } else {
        break;
      }
    }

    set({
      isCorrect: true,
      showExplanation: true,
      sessionScore: newSessionScore,
      lives: newLives,
      lastBonusThreshold: newThresholdIndex,
    });

    return { lifeRestored };
  },

  handleWrong: () => {
    const { lives } = get();
    const newLives = lives - 1;

    set({
      isCorrect: false,
      lives: newLives,
    });

    // 하트가 다 떨어지면 게임 오버
    if (newLives <= 0) {
      set({ showExplanation: true });
      get().endGame(false, 'no_lives');
    }
  },

  endGame: (success, reason = null) => {
    console.log('endGame called:', { success, reason });
    set({
      status: success ? 'success' : 'failed',
      failureReason: reason,
    });
  },

  resetSession: () => {
    set(initialState);
  },

  setShowExplanation: (show) => {
    set({ showExplanation: show });
  },

  getResult: () => {
    const { currentStage, timeLeft, lives, sessionScore } = get();
    const success = get().status === 'success';
    const level = currentStage?.level || 1;

    // 스테이지 점수 = 남은 시간 + 레벨
    const stageScore = success ? timeLeft + level : 0;

    return {
      success,
      stageScore,
      remainingTime: timeLeft,
      remainingLives: lives,
      level,
      failureReason: get().failureReason,
    };
  },

  getSessionScore: () => {
    return get().sessionScore;
  },
}));

// 하트 부활 임계값 export
export { LIFE_BONUS_THRESHOLDS };
