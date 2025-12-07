const fs = require('fs');
const path = './src/screens/GameScreen.tsx';

const content = `import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import { RootStackParamList, Stage, ChatContent, ArticleContent, TextContent, ErrorCandidate } from '../types';
import { colors } from '../utils/theme';
import { useGameStore } from '../stores/gameStore';
import { useUserStore } from '../stores/userStore';
import { useSettingsStore } from '../stores/settingsStore';

import GameHUD from '../components/game/GameHUD';
import ExplanationModal from '../components/game/ExplanationModal';
import ChatMode from '../components/modes/ChatMode';
import ArticleMode from '../components/modes/ArticleMode';
import TextMode from '../components/modes/TextMode';
import ResultScreen from './ResultScreen';

// 샘플 데이터 (Firebase 연동 전)
const sampleStages: Stage[] = [
  {
    id: 'stage1',
    level: 1,
    mode: 'chat',
    timeLimit: 60,
    content: {
      messages: [
        { id: 'msg1', sender: 'left', name: '민수', text: '오늘 뭐해?' },
        { id: 'msg2', sender: 'right', text: '별로 안해도 돼' },
        { id: 'msg3', sender: 'left', name: '민수', text: '그럼 같이 영화 볼래?' },
        { id: 'msg4', sender: 'right', text: '좋아! 몇 시에 볼까?' },
      ],
    } as ChatContent,
    errorCandidates: [
      {
        id: 'msg2',
        wrongText: '별로 안해도 돼',
        correctText: '별로 안 해도 돼',
        explanation: '"안"은 부정을 나타내는 부사로, 뒤의 동사와 띄어 씁니다. "안 해도"가 올바른 표현입니다.',
      },
      {
        id: 'msg3',
        wrongText: '영화 볼래',
        correctText: '영화 볼래',
        explanation: '이 문장은 올바르게 작성되어 있습니다.',
      },
      {
        id: 'msg4',
        wrongText: '몇 시에',
        correctText: '몇 시에',
        explanation: '이 문장은 올바르게 작성되어 있습니다.',
      },
    ],
  },
  {
    id: 'stage2',
    level: 2,
    mode: 'article',
    timeLimit: 75,
    content: {
      title: '청소년 독서량, 10년 새 절반으로 감소',
      subtitle: '스마트폰 사용 증가가 주요 원인으로 지목',
      author: '김기자',
      source: '교육신문',
      paragraphs: [
        '최근 조사 결과에 따르면 청소년들의 월평균 독서량이 10년 전에 비해 절반 가까이 줄어든것으로 나타났다.',
        '전문가들은 스마트폰과 SNS 사용 시간이 늘어나면서 책 읽을 시간이 줄어든 것이 주요 원인이라고 분석했다.',
        '교육부는 이러한 상황을 개선하기 위해 학교 도서관 활성화 정책을 추진할계획이다.',
      ],
    } as ArticleContent,
    errorCandidates: [
      {
        id: 'p0_1',
        wrongText: '줄어든것으로',
        correctText: '줄어든것으로',
        explanation: '"것"은 의존 명사이므로 앞말과 띄어 씁니다. "줄어든 것으로"가 올바른 표현입니다.',
      },
      {
        id: 'p1_1',
        wrongText: '늘어나면서',
        correctText: '늘어나면서',
        explanation: '이 문장은 올바르게 작성되어 있습니다.',
      },
      {
        id: 'p2_1',
        wrongText: '추진할계획이다',
        correctText: '추진할계획이다',
        explanation: '"계획"은 명사이므로 앞말과 띄어 씁니다. "추진할 계획이다"가 올바른 표현입니다.',
      },
    ],
  },
  {
    id: 'stage3',
    level: 3,
    mode: 'chat',
    timeLimit: 55,
    content: {
      messages: [
        { id: 'msg1', sender: 'left', name: '지영', text: '내일 시험인데 공부했어?' },
        { id: 'msg2', sender: 'right', text: '아니 아직안했어' },
        { id: 'msg3', sender: 'left', name: '지영', text: '나도 별로 못했어' },
        { id: 'msg4', sender: 'right', text: '같이 도서관 갈래?' },
      ],
    } as ChatContent,
    errorCandidates: [
      {
        id: 'msg1',
        wrongText: '공부했어',
        correctText: '공부했어',
        explanation: '이 문장은 올바르게 작성되어 있습니다.',
      },
      {
        id: 'msg2',
        wrongText: '아직안했어',
        correctText: '아직 안 했어',
        explanation: '"아직"과 "안" 사이는 띄어쓰기를 합니다. "아직 안 했어"가 올바른 표현입니다.',
      },
      {
        id: 'msg3',
        wrongText: '못했어',
        correctText: '못했어',
        explanation: '이 문장은 올바르게 작성되어 있습니다.',
      },
    ],
  },
  {
    id: 'stage4',
    level: 4,
    mode: 'chat',
    timeLimit: 50,
    content: {
      messages: [
        { id: 'msg1', sender: 'left', name: '철수', text: '점심 뭐먹을까?' },
        { id: 'msg2', sender: 'right', text: '나는 아무거나 괜찮아' },
        { id: 'msg3', sender: 'left', name: '철수', text: '그럼 김치찌개 어때?' },
        { id: 'msg4', sender: 'right', text: '좋아 거기로 가자!' },
      ],
    } as ChatContent,
    errorCandidates: [
      {
        id: 'msg1',
        wrongText: '뭐먹을까',
        correctText: '뭐 먹을까',
        explanation: '"뭐"와 "먹을까" 사이는 띄어쓰기를 합니다. "뭐 먹을까"가 올바른 표현입니다.',
      },
      {
        id: 'msg2',
        wrongText: '아무거나',
        correctText: '아무거나',
        explanation: '이 문장은 올바르게 작성되어 있습니다.',
      },
      {
        id: 'msg3',
        wrongText: '김치찌개',
        correctText: '김치찌개',
        explanation: '이 문장은 올바르게 작성되어 있습니다.',
      },
    ],
  },
  {
    id: 'stage5',
    level: 5,
    mode: 'article',
    timeLimit: 70,
    content: {
      title: '국내 여행객 증가세 뚜렷',
      subtitle: '코로나 이후 국내 관광 산업 회복 중',
      author: '박기자',
      source: '여행뉴스',
      paragraphs: [
        '올해 상반기 국내 여행객 수가 전년대비 30% 증가한 것으로 나타났다.',
        '특히 제주도와 강원도 등 자연 경관이 뛰어난 지역의 방문객이 크게 늘었다.',
        '관광업계는 이러한 추세가 당분간 계속될것으로 전망하고 있다.',
      ],
    } as ArticleContent,
    errorCandidates: [
      {
        id: 'p0_1',
        wrongText: '전년대비',
        correctText: '전년대비',
        explanation: '"대비"는 의존 명사가 아니므로 붙여 쓸 수 있습니다. 이 문장은 올바릅니다.',
      },
      {
        id: 'p1_1',
        wrongText: '뛰어난',
        correctText: '뛰어난',
        explanation: '이 문장은 올바르게 작성되어 있습니다.',
      },
      {
        id: 'p2_1',
        wrongText: '계속될것으로',
        correctText: '계속될것으로',
        explanation: '"것"은 의존 명사이므로 앞말과 띄어 씁니다. "계속될 것으로"가 올바른 표현입니다.',
      },
    ],
  },
  {
    id: 'stage6',
    level: 6,
    mode: 'text',
    timeLimit: 65,
    content: {
      title: '우리말 바르게 쓰기',
      paragraphs: [
        '한글은 세종대왕이 창제한 우리나라의 고유 문자입니다.',
        '올바른 띄어쓰기와 맞춤법은 의사소통을 원활하게해줍니다.',
        '우리 모두 아름다운 우리말을 바르게 사용합시다.',
      ],
    } as TextContent,
    errorCandidates: [
      {
        id: 'p0_1',
        wrongText: '세종대왕이',
        correctText: '세종대왕이',
        explanation: '이 문장은 올바르게 작성되어 있습니다.',
      },
      {
        id: 'p1_1',
        wrongText: '원활하게해줍니다',
        correctText: '원활하게해줍니다',
        explanation: '"원활하게"와 "해 줍니다" 사이는 띄어쓰기를 합니다. "원활하게 해 줍니다"가 올바른 표현입니다.',
      },
      {
        id: 'p2_1',
        wrongText: '사용합시다',
        correctText: '사용합시다',
        explanation: '이 문장은 올바르게 작성되어 있습니다.',
      },
    ],
  },
  {
    id: 'stage7',
    level: 7,
    mode: 'chat',
    timeLimit: 50,
    content: {
      messages: [
        { id: 'msg1', sender: 'left', name: '수진', text: '오늘 날씨 진짜 좋다!' },
        { id: 'msg2', sender: 'right', text: '그러게 산책하러갈까?' },
        { id: 'msg3', sender: 'left', name: '수진', text: '좋아! 한강 공원 어때?' },
        { id: 'msg4', sender: 'right', text: '완전 좋지!' },
      ],
    } as ChatContent,
    errorCandidates: [
      {
        id: 'msg1',
        wrongText: '진짜',
        correctText: '진짜',
        explanation: '이 문장은 올바르게 작성되어 있습니다.',
      },
      {
        id: 'msg2',
        wrongText: '산책하러갈까',
        correctText: '산책하러 갈까',
        explanation: '"산책하러"와 "갈까" 사이는 띄어쓰기를 합니다. "산책하러 갈까"가 올바른 표현입니다.',
      },
      {
        id: 'msg3',
        wrongText: '한강 공원',
        correctText: '한강 공원',
        explanation: '이 문장은 올바르게 작성되어 있습니다.',
      },
    ],
  },
  {
    id: 'stage8',
    level: 8,
    mode: 'article',
    timeLimit: 65,
    content: {
      title: '신재생 에너지 투자 확대',
      subtitle: '정부, 2030년까지 태양광 발전 비중 20%로',
      author: '이기자',
      source: '에너지타임스',
      paragraphs: [
        '정부가 신재생에너지 분야에 대한 투자를 대폭 확대하기로 했다.',
        '이에따라 태양광과 풍력 발전소 건설이 가속화될 전망이다.',
        '전문가들은 이러한 정책이 탄소 중립 목표 달성에 기여할 것으로 보고있다.',
      ],
    } as ArticleContent,
    errorCandidates: [
      {
        id: 'p0_1',
        wrongText: '신재생에너지',
        correctText: '신재생에너지',
        explanation: '이 문장은 올바르게 작성되어 있습니다.',
      },
      {
        id: 'p1_1',
        wrongText: '이에따라',
        correctText: '이에따라',
        explanation: '"이에"와 "따라" 사이는 띄어쓰기를 합니다. "이에 따라"가 올바른 표현입니다.',
      },
      {
        id: 'p2_1',
        wrongText: '보고있다',
        correctText: '보고있다',
        explanation: '"보고"와 "있다" 사이는 띄어쓰기를 합니다. "보고 있다"가 올바른 표현입니다.',
      },
    ],
  },
];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Game'>;
  route: RouteProp<RootStackParamList, 'Game'>;
};

export default function GameScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { hapticEnabled } = useSettingsStore();
  const userLives = useUserStore((state) => state.lives);
  const currentLevel = useUserStore((state) => state.currentLevel);

  const {
    status,
    currentStage,
    activeErrorId,
    score,
    timeLeft,
    lives,
    selectedCandidateId,
    showExplanation,
    isCorrect,
    initGame,
    startGame,
    tickTimer,
    selectCandidate,
    endGame,
    resetGame,
    setShowExplanation,
    getResult,
  } = useGameStore();

  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<ErrorCandidate | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameResult, setGameResult] = useState<any>(null);

  // 스테이지 로드
  useEffect(() => {
    const loadStage = async () => {
      setLoading(true);
      setShowResult(false);
      setGameResult(null);

      // 샘플 데이터에서 현재 레벨에 맞는 스테이지 선택
      const maxLevel = sampleStages.length;
      const adjustedLevel = ((currentLevel - 1) % maxLevel) + 1;
      const stage = sampleStages.find((s) => s.level === adjustedLevel) || sampleStages[0];

      initGame(stage, userLives);
      setLoading(false);

      // 게임 시작
      setTimeout(() => {
        startGame();
      }, 500);
    };

    loadStage();

    return () => {
      resetGame();
    };
  }, [currentLevel]);

  // 타이머
  useEffect(() => {
    if (status !== 'playing') return;

    const timer = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(timer);
  }, [status, tickTimer]);

  // 게임 종료 감지 - 결과 화면 표시
  useEffect(() => {
    if ((status === 'success' || status === 'failed') && !showResult) {
      const result = getResult();
      setGameResult(result);
      setShowResult(true);
    }
  }, [status, showResult, getResult]);

  // 후보 선택 핸들러
  const handleSelectCandidate = useCallback(
    (candidateId: string) => {
      if (status !== 'playing' || showExplanation) return;

      const { isCorrect: correct, candidate } = selectCandidate(candidateId);

      if (candidate) {
        setSelectedCandidate(candidate);
      }

      // 햅틱 피드백
      if (hapticEnabled) {
        if (correct) {
          Platform.OS !== 'web' && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
          Platform.OS !== 'web' && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
      }
    },
    [status, showExplanation, selectCandidate, hapticEnabled]
  );

  // 설명 모달 닫기
  const handleCloseExplanation = useCallback(() => {
    const currentIsCorrect = useGameStore.getState().isCorrect;

    setShowExplanation(false);
    setSelectedCandidate(null);

    // 정답인 경우 게임 성공
    if (currentIsCorrect) {
      endGame(true);
    }
  }, [setShowExplanation, endGame]);

  // 콘텐츠 렌더링
  const renderContent = () => {
    if (!currentStage || !activeErrorId) return null;

    const commonProps = {
      errorCandidates: currentStage.errorCandidates,
      activeErrorId,
      selectedCandidateId,
      isCorrect,
      onSelectCandidate: handleSelectCandidate,
      disabled: showExplanation || status !== 'playing',
    };

    switch (currentStage.mode) {
      case 'chat':
        return <ChatMode content={currentStage.content as ChatContent} {...commonProps} />;
      case 'article':
        return <ArticleMode content={currentStage.content as ArticleContent} {...commonProps} />;
      case 'text':
        return <TextMode content={currentStage.content as TextContent} {...commonProps} />;
      default:
        return null;
    }
  };

  // 결과 화면 표시
  if (showResult && gameResult && currentStage) {
    return (
      <ResultScreen
        navigation={navigation as any}
        route={{
          key: 'Result',
          name: 'Result',
          params: {
            result: gameResult,
            stage: currentStage,
          },
        }}
      />
    );
  }

  if (loading || !currentStage) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* HUD */}
      <GameHUD
        score={score}
        lives={lives}
        maxLives={3}
        timeLeft={timeLeft}
        totalTime={currentStage.timeLimit}
        level={currentStage.level}
      />

      {/* 게임 안내 */}
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          {t(\`game.instruction.\${currentStage.mode}\`)}
        </Text>
      </View>

      {/* 게임 콘텐츠 */}
      <View style={styles.contentContainer}>{renderContent()}</View>

      {/* 설명 모달 */}
      <ExplanationModal
        visible={showExplanation}
        isCorrect={isCorrect || false}
        candidate={selectedCandidate}
        onClose={handleCloseExplanation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
  },
  instructionContainer: {
    backgroundColor: colors.primaryLight + '30',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  instructionText: {
    fontSize: 14,
    color: colors.primary,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
  },
});
`;

fs.writeFileSync(path, content);
console.log('GameScreen.tsx updated with inline result display!');
