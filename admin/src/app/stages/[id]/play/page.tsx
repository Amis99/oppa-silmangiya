'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Play, RotateCcw, Home, CheckCircle, XCircle, Clock, Heart } from 'lucide-react';
import { Stage, ChatContent, ArticleContent, TextContent, StageVariant, StageError } from '@/lib/types';
import { stagesStore } from '@/lib/stagesStore';

type GameStatus = 'ready' | 'playing' | 'success' | 'failed';

// Split text into segments, identifying the error word
function splitTextWithError(text: string, wrongText: string, isErrorLocation: boolean): { segment: string; isError: boolean }[] {
  if (!isErrorLocation || !wrongText) {
    return [{ segment: text, isError: false }];
  }

  const errorIndex = text.indexOf(wrongText);
  if (errorIndex === -1) {
    return [{ segment: text, isError: false }];
  }

  const result: { segment: string; isError: boolean }[] = [];

  if (errorIndex > 0) {
    result.push({ segment: text.substring(0, errorIndex), isError: false });
  }

  result.push({ segment: wrongText, isError: true });

  if (errorIndex + wrongText.length < text.length) {
    result.push({ segment: text.substring(errorIndex + wrongText.length), isError: false });
  }

  return result;
}

export default function PlayStagePage() {
  const params = useParams();
  const stageId = params.id as string;

  const [stage, setStage] = useState<Stage | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Game state
  const [gameStatus, setGameStatus] = useState<GameStatus>('ready');
  const [selectedVariant, setSelectedVariant] = useState<StageVariant | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [lives, setLives] = useState(5);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [clickedSegment, setClickedSegment] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  // Load stage
  useEffect(() => {
    const loadStage = () => {
      setLoading(true);
      const data = stagesStore.getById(stageId);

      if (!data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setStage(data);
      setTimeLeft(data.timeLimit);
      setLoading(false);
    };

    loadStage();
  }, [stageId]);

  // Start game
  const startGame = useCallback(() => {
    if (!stage || !stage.variants || stage.variants.length === 0) return;

    // Randomly select one variant
    const randomIndex = Math.floor(Math.random() * stage.variants.length);
    const variant = stage.variants[randomIndex];

    setSelectedVariant(variant);
    setTimeLeft(stage.timeLimit);
    setLives(5);
    setSelectedId(null);
    setClickedSegment(null);
    setShowResult(false);
    setIsCorrect(null);
    setAnsweredCorrectly(false);
    setGameStatus('playing');
  }, [stage]);

  // Timer
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameStatus('failed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStatus]);

  // Handle selection - requires clicking the exact error word
  // For article/text mode, locationId is not needed (error is in single text)
  // For chat mode, locationId identifies which message contains the error
  const handleSelect = (segment: string, isErrorSegment: boolean, locationId?: string) => {
    if (gameStatus !== 'playing' || showResult || !selectedVariant) return;

    setClickedSegment(segment);

    // For chat mode, check both segment and location
    // For article/text mode, only check segment (locationId is undefined)
    const errorLocation = selectedVariant.error.location;
    const isMatch = locationId
      ? (isErrorSegment && locationId === errorLocation)
      : isErrorSegment;

    if (isMatch) {
      // Correct!
      if (locationId) {
        setSelectedId(locationId);
      }
      setAnsweredCorrectly(true);
      setIsCorrect(true);
      setShowResult(true);
      setTimeout(() => {
        setGameStatus('success');
      }, 1500);
    } else {
      // Wrong
      setIsCorrect(false);
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setShowResult(true);
        setTimeout(() => {
          setGameStatus('failed');
        }, 1500);
      } else {
        setTimeout(() => {
          setClickedSegment(null);
          setIsCorrect(null);
        }, 500);
      }
    }
  };

  // Render Chat content
  const renderChatContent = () => {
    if (!stage || stage.mode !== 'chat' || !selectedVariant) return null;
    const content = selectedVariant.content as ChatContent;
    const errorLocation = selectedVariant.error.location;
    const wrongText = selectedVariant.error.wrongText;

    return (
      <div className="bg-[#E5DDD5] rounded-lg p-4 space-y-3">
        {content.messages.map((message) => {
          const isLeft = message.sender === 'left';
          const isErrorMessage = message.id === errorLocation;
          const segments = splitTextWithError(message.text, wrongText, isErrorMessage);

          return (
            <div
              key={message.id}
              className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[70%] ${isLeft ? 'order-2' : 'order-1'}`}>
                {isLeft && message.name && (
                  <div className="text-xs text-gray-500 mb-1 ml-1">{message.name}</div>
                )}
                <div
                  className={`
                    px-4 py-2 rounded-2xl text-left
                    ${isLeft ? 'bg-white rounded-tl-sm' : 'bg-[#DCF8C6] rounded-tr-sm'}
                  `}
                >
                  {segments.map((item, index) => {
                    const isClicked = clickedSegment === item.segment;
                    const isAnswerClicked = selectedId === errorLocation && item.isError;

                    let highlightClass = '';
                    if (isAnswerClicked) {
                      highlightClass = isCorrect ? 'bg-green-300 rounded' : 'bg-red-300 rounded';
                    } else if (isClicked && isCorrect === false) {
                      highlightClass = 'bg-red-300 rounded';
                    }

                    return (
                      <span
                        key={index}
                        onClick={() => handleSelect(item.segment, item.isError, message.id)}
                        className={`
                          text-gray-800 cursor-pointer transition-all
                          ${highlightClass}
                          ${gameStatus === 'playing' && !showResult ? 'hover:bg-pink-100' : ''}
                        `}
                      >
                        {item.segment}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render Article content
  const renderArticleContent = () => {
    if (!stage || stage.mode !== 'article' || !selectedVariant) return null;
    const content = selectedVariant.content as ArticleContent;
    const wrongText = selectedVariant.error.wrongText;
    const segments = splitTextWithError(content.text, wrongText, true);

    return (
      <div className="bg-white rounded-lg p-6 shadow-md">
        {content.source && (
          <div className="text-xs text-pink-600 font-semibold mb-2">{content.source}</div>
        )}
        <h2 className="text-xl font-bold text-gray-800 mb-2">{content.title}</h2>
        {content.subtitle && (
          <p className="text-gray-600 mb-2">{content.subtitle}</p>
        )}
        {content.author && (
          <p className="text-sm text-gray-500 mb-4">{content.author}</p>
        )}
        <hr className="mb-4" />
        <div className="p-3">
          {segments.map((item, index) => {
            const isClicked = clickedSegment === item.segment;
            const isAnswerClicked = answeredCorrectly && item.isError;

            let highlightClass = '';
            if (isAnswerClicked) {
              highlightClass = isCorrect ? 'bg-green-300 rounded' : 'bg-red-300 rounded';
            } else if (isClicked && isCorrect === false) {
              highlightClass = 'bg-red-300 rounded';
            }

            return (
              <span
                key={index}
                onClick={() => handleSelect(item.segment, item.isError)}
                className={`
                  text-gray-700 leading-relaxed cursor-pointer transition-all
                  ${highlightClass}
                  ${gameStatus === 'playing' && !showResult ? 'hover:bg-pink-100' : ''}
                `}
              >
                {item.segment}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Text content
  const renderTextContent = () => {
    if (!stage || stage.mode !== 'text' || !selectedVariant) return null;
    const content = selectedVariant.content as TextContent;
    const wrongText = selectedVariant.error.wrongText;
    const segments = splitTextWithError(content.text, wrongText, true);

    return (
      <div className="bg-white rounded-lg p-6 shadow-md">
        {content.title && (
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">{content.title}</h2>
            <div className="w-16 h-0.5 bg-gray-800 mx-auto mt-2" />
          </div>
        )}
        <div className="p-3">
          {segments.map((item, index) => {
            const isClicked = clickedSegment === item.segment;
            const isAnswerClicked = answeredCorrectly && item.isError;

            let highlightClass = '';
            if (isAnswerClicked) {
              highlightClass = isCorrect ? 'bg-green-300 rounded' : 'bg-red-300 rounded';
            } else if (isClicked && isCorrect === false) {
              highlightClass = 'bg-red-300 rounded';
            }

            return (
              <span
                key={index}
                onClick={() => handleSelect(item.segment, item.isError)}
                className={`
                  text-gray-700 leading-relaxed cursor-pointer transition-all
                  ${highlightClass}
                  ${gameStatus === 'playing' && !showResult ? 'hover:bg-pink-100' : ''}
                `}
              >
                {item.segment}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400">로딩 중...</div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-gray-400 mb-4">스테이지를 찾을 수 없습니다.</div>
        <Link href="/stages" className="btn-primary">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/stages"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">시험 플레이</h1>
          <p className="text-sm text-gray-500">
            Lv.{stage?.level} - {stage?.mode === 'chat' ? '카톡' : stage?.mode === 'article' ? '기사' : '비문학'}
          </p>
        </div>
      </div>

      {/* Ready Screen */}
      {gameStatus === 'ready' && (
        <div className="card text-center py-12">
          <div className="text-6xl mb-6">🎮</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">시험 플레이 준비</h2>
          <p className="text-gray-500 mb-6">
            틀린 단어를 정확히 찾아 클릭하세요!
          </p>
          <div className="flex flex-col gap-2 text-sm text-gray-600 mb-8">
            <p>⏱️ 제한시간: {stage?.timeLimit}초</p>
            <p>❤️ 라이프: 5개</p>
            <p>🎲 변형: {stage?.variants?.length || 0}개 중 1개 랜덤 선택</p>
          </div>
          <button
            onClick={startGame}
            className="btn-primary text-lg px-8 py-3 inline-flex items-center gap-2"
          >
            <Play size={24} />
            게임 시작
          </button>
        </div>
      )}

      {/* Playing Screen */}
      {gameStatus === 'playing' && (
        <div>
          {/* HUD */}
          <div className="card mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-gray-500" />
                  <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
                    {timeLeft}초
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Heart
                      key={i}
                      size={20}
                      className={i < lives ? 'text-red-500 fill-red-500' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Game Content */}
          <div className="card">
            {stage?.mode === 'chat' && renderChatContent()}
            {stage?.mode === 'article' && renderArticleContent()}
            {stage?.mode === 'text' && renderTextContent()}
          </div>

          {/* Result Overlay */}
          {showResult && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className={`
                p-8 rounded-2xl text-center
                ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
              `}>
                {isCorrect ? (
                  <>
                    <CheckCircle size={64} className="text-white mx-auto mb-4" />
                    <div className="text-2xl font-bold text-white">정답!</div>
                  </>
                ) : (
                  <>
                    <XCircle size={64} className="text-white mx-auto mb-4" />
                    <div className="text-2xl font-bold text-white">오답!</div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Result Screen */}
      {(gameStatus === 'success' || gameStatus === 'failed') && !showResult && (
        <div className="card text-center py-12">
          <div className="text-6xl mb-6">
            {gameStatus === 'success' ? '🎉' : '😢'}
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${gameStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {gameStatus === 'success' ? '성공!' : '실패'}
          </h2>
          <p className="text-gray-500 mb-6">
            {gameStatus === 'success'
              ? '정답을 찾았습니다!'
              : lives <= 0
                ? '라이프가 모두 소진되었습니다.'
                : '시간이 초과되었습니다.'}
          </p>

          {/* Answer Info */}
          {selectedVariant && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left max-w-md mx-auto">
              <h3 className="font-semibold text-gray-700 mb-2">정답 정보</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">틀린 표현:</span>{' '}
                  <span className="text-red-600 font-medium">{selectedVariant.error.wrongText}</span>
                </p>
                <p>
                  <span className="text-gray-500">올바른 표현:</span>{' '}
                  <span className="text-green-600 font-medium">{selectedVariant.error.correctText}</span>
                </p>
                {selectedVariant.error.location && (
                  <p>
                    <span className="text-gray-500">위치:</span>{' '}
                    <span className="text-blue-600">{selectedVariant.error.location}</span>
                  </p>
                )}
                <p>
                  <span className="text-gray-500">설명:</span>{' '}
                  {selectedVariant.error.explanation}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={startGame}
              className="btn-primary inline-flex items-center gap-2"
            >
              <RotateCcw size={18} />
              다시 하기
            </button>
            <Link href="/stages" className="btn-secondary inline-flex items-center gap-2">
              <Home size={18} />
              목록으로
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
