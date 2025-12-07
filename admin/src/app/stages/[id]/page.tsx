'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Plus, Trash2, Save, ArrowLeft, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { GameMode, ChatMessage, ChatContent, ArticleContent, TextContent, StageVariant, StageError } from '@/lib/types';
import { stagesStore } from '@/lib/stagesStore';

interface VariantUI {
  id: string;
  expanded: boolean;
  // Chat mode
  messages: ChatMessage[];
  // Article/Text mode
  title: string;
  subtitle: string;
  author: string;
  source: string;
  paragraphs: string[];
  // Error info
  error: StageError;
}

export default function EditStagePage() {
  const router = useRouter();
  const params = useParams();
  const stageId = params.id as string;

  // Basic info
  const [level, setLevel] = useState(1);
  const [mode, setMode] = useState<GameMode>('chat');
  const [timeLimit, setTimeLimit] = useState(60);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Variants
  const [variants, setVariants] = useState<VariantUI[]>([]);

  // Load data
  useEffect(() => {
    const loadStage = async () => {
      setLoading(true);

      const stage = stagesStore.getById(stageId);

      if (!stage) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLevel(stage.level);
      setMode(stage.mode);
      setTimeLimit(stage.timeLimit);

      // Convert variants to UI format
      const uiVariants: VariantUI[] = stage.variants.map((v, index) => {
        if (stage.mode === 'chat') {
          const chatContent = v.content as ChatContent;
          return {
            id: v.id,
            expanded: index === 0,
            messages: chatContent.messages,
            title: '',
            subtitle: '',
            author: '',
            source: '',
            paragraphs: [],
            error: v.error,
          };
        } else if (stage.mode === 'article') {
          const articleContent = v.content as ArticleContent;
          return {
            id: v.id,
            expanded: index === 0,
            messages: [],
            title: articleContent.title || '',
            subtitle: articleContent.subtitle || '',
            author: articleContent.author || '',
            source: articleContent.source || '',
            paragraphs: articleContent.paragraphs || [''],
            error: v.error,
          };
        } else {
          const textContent = v.content as TextContent;
          return {
            id: v.id,
            expanded: index === 0,
            messages: [],
            title: textContent.title || '',
            subtitle: '',
            author: '',
            source: '',
            paragraphs: textContent.paragraphs || [''],
            error: v.error,
          };
        }
      });

      setVariants(uiVariants);
      setLoading(false);
    };

    loadStage();
  }, [stageId]);

  // Add new variant (copy from first variant)
  const addVariant = () => {
    if (variants.length >= 5) {
      alert('변형은 최대 5개까지 추가할 수 있습니다.');
      return;
    }

    const newId = `v${Date.now()}`;
    let newVariant: VariantUI;

    if (variants.length > 0) {
      // Copy from first variant
      const first = variants[0];
      newVariant = {
        id: newId,
        expanded: true,
        messages: first.messages.map(m => ({ ...m })),
        title: first.title,
        subtitle: first.subtitle,
        author: first.author,
        source: first.source,
        paragraphs: [...first.paragraphs],
        error: {
          id: `err${Date.now()}`,
          wrongText: '',
          correctText: '',
          explanation: '',
          location: '',
        },
      };
    } else {
      // Create empty variant
      newVariant = {
        id: newId,
        expanded: true,
        messages: mode === 'chat' ? [
          { id: 'msg1', sender: 'left', name: '', text: '' },
          { id: 'msg2', sender: 'right', text: '' },
        ] : [],
        title: '',
        subtitle: '',
        author: '',
        source: '',
        paragraphs: mode !== 'chat' ? [''] : [],
        error: {
          id: `err${Date.now()}`,
          wrongText: '',
          correctText: '',
          explanation: '',
          location: '',
        },
      };
    }

    // Collapse others
    setVariants([
      ...variants.map(v => ({ ...v, expanded: false })),
      newVariant,
    ]);
  };

  // Remove variant
  const removeVariant = (index: number) => {
    if (variants.length <= 3) {
      alert('변형은 최소 3개 이상 필요합니다.');
      return;
    }
    setVariants(variants.filter((_, i) => i !== index));
  };

  // Toggle variant expansion
  const toggleVariant = (index: number) => {
    setVariants(variants.map((v, i) => ({
      ...v,
      expanded: i === index ? !v.expanded : v.expanded,
    })));
  };

  // Copy content from first variant to all others (keeping errors)
  const syncContentFromFirst = () => {
    if (variants.length < 2) return;

    const first = variants[0];
    setVariants(variants.map((v, i) => {
      if (i === 0) return v;
      return {
        ...v,
        messages: first.messages.map(m => ({ ...m })),
        title: first.title,
        subtitle: first.subtitle,
        author: first.author,
        source: first.source,
        paragraphs: [...first.paragraphs],
      };
    }));
    alert('첫 번째 변형의 콘텐츠가 다른 변형에 복사되었습니다. 각 변형에서 오류 부분을 수정하세요.');
  };

  // Update variant message
  const updateVariantMessage = (variantIndex: number, msgIndex: number, field: keyof ChatMessage, value: string) => {
    setVariants(variants.map((v, i) => {
      if (i !== variantIndex) return v;
      const newMessages = [...v.messages];
      (newMessages[msgIndex] as any)[field] = value;
      return { ...v, messages: newMessages };
    }));
  };

  // Add message to variant
  const addVariantMessage = (variantIndex: number) => {
    setVariants(variants.map((v, i) => {
      if (i !== variantIndex) return v;
      const lastSender = v.messages[v.messages.length - 1]?.sender || 'right';
      return {
        ...v,
        messages: [
          ...v.messages,
          {
            id: `msg${v.messages.length + 1}_${Date.now()}`,
            sender: lastSender === 'left' ? 'right' : 'left',
            name: '',
            text: '',
          },
        ],
      };
    }));
  };

  // Remove message from variant
  const removeVariantMessage = (variantIndex: number, msgIndex: number) => {
    setVariants(variants.map((v, i) => {
      if (i !== variantIndex) return v;
      if (v.messages.length <= 2) return v;
      return {
        ...v,
        messages: v.messages.filter((_, mi) => mi !== msgIndex),
      };
    }));
  };

  // Update variant paragraph
  const updateVariantParagraph = (variantIndex: number, paraIndex: number, value: string) => {
    setVariants(variants.map((v, i) => {
      if (i !== variantIndex) return v;
      const newParagraphs = [...v.paragraphs];
      newParagraphs[paraIndex] = value;
      return { ...v, paragraphs: newParagraphs };
    }));
  };

  // Add paragraph to variant
  const addVariantParagraph = (variantIndex: number) => {
    setVariants(variants.map((v, i) => {
      if (i !== variantIndex) return v;
      return { ...v, paragraphs: [...v.paragraphs, ''] };
    }));
  };

  // Remove paragraph from variant
  const removeVariantParagraph = (variantIndex: number, paraIndex: number) => {
    setVariants(variants.map((v, i) => {
      if (i !== variantIndex) return v;
      if (v.paragraphs.length <= 1) return v;
      return {
        ...v,
        paragraphs: v.paragraphs.filter((_, pi) => pi !== paraIndex),
      };
    }));
  };

  // Update variant field
  const updateVariantField = (variantIndex: number, field: keyof VariantUI, value: string) => {
    setVariants(variants.map((v, i) => {
      if (i !== variantIndex) return v;
      return { ...v, [field]: value };
    }));
  };

  // Update variant error
  const updateVariantError = (variantIndex: number, field: keyof StageError, value: string) => {
    setVariants(variants.map((v, i) => {
      if (i !== variantIndex) return v;
      return {
        ...v,
        error: { ...v.error, [field]: value },
      };
    }));
  };

  // Save
  const handleSave = async () => {
    if (variants.length < 3) {
      alert('변형은 최소 3개 이상 필요합니다.');
      return;
    }

    // Validate errors
    const hasEmptyError = variants.some(
      v => !v.error.wrongText || !v.error.correctText || !v.error.explanation || !v.error.location
    );
    if (hasEmptyError) {
      alert('모든 변형의 오류 정보를 입력해주세요.');
      return;
    }

    // Build variants
    const stageVariants: StageVariant[] = variants.map(v => {
      let content;
      if (mode === 'chat') {
        content = {
          messages: v.messages.map(m => ({
            id: m.id,
            sender: m.sender,
            name: m.name || undefined,
            text: m.text,
          })),
        };
      } else if (mode === 'article') {
        content = {
          title: v.title,
          subtitle: v.subtitle || undefined,
          author: v.author || undefined,
          source: v.source || undefined,
          paragraphs: v.paragraphs,
        };
      } else {
        content = {
          title: v.title || undefined,
          paragraphs: v.paragraphs,
        };
      }

      return {
        id: v.id,
        content,
        error: v.error,
      };
    });

    const result = stagesStore.update(stageId, {
      level,
      mode,
      timeLimit,
      variants: stageVariants,
    });

    if (result) {
      alert('스테이지가 수정되었습니다.');
      router.push('/stages');
    } else {
      alert('스테이지 수정에 실패했습니다.');
    }
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
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/stages"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">스테이지 수정</h1>
        <span className="text-sm text-gray-400">ID: {stageId}</span>
      </div>

      {/* Basic Info */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold mb-4">기본 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              레벨
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              모드
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as GameMode)}
              className="input"
              disabled
            >
              <option value="chat">카톡 대화형</option>
              <option value="article">잡지/기사형</option>
              <option value="text">비문학형</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">
              모드는 변경할 수 없습니다
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제한 시간 (초)
            </label>
            <input
              type="number"
              min={30}
              max={180}
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Variants Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          변형 목록 ({variants.length}/5)
        </h2>
        <div className="flex gap-2">
          {variants.length >= 2 && (
            <button
              onClick={syncContentFromFirst}
              className="btn-secondary text-sm flex items-center gap-1"
              title="첫 번째 변형의 콘텐츠를 다른 변형에 복사"
            >
              <Copy size={16} />
              콘텐츠 동기화
            </button>
          )}
          <button
            onClick={addVariant}
            className="btn-primary text-sm flex items-center gap-1"
            disabled={variants.length >= 5}
          >
            <Plus size={16} />
            변형 추가
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        각 변형은 동일한 지문에 다른 오류가 포함된 버전입니다. 플레이 시 무작위로 하나가 선택됩니다.
      </p>

      {/* Variants */}
      <div className="space-y-4 mb-6">
        {variants.map((variant, vIndex) => (
          <div key={variant.id} className="card">
            {/* Variant Header */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleVariant(vIndex)}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-primary">
                  변형 {vIndex + 1}
                </span>
                {variant.error.wrongText && (
                  <span className="text-sm text-gray-500">
                    오류: &quot;{variant.error.wrongText}&quot; → &quot;{variant.error.correctText}&quot;
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {variants.length > 3 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeVariant(vIndex);
                    }}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                {variant.expanded ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </div>
            </div>

            {/* Variant Content (Expanded) */}
            {variant.expanded && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Content */}
                  <div className="lg:col-span-2">
                    {/* Chat Mode */}
                    {mode === 'chat' && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-gray-700">대화 내용</h3>
                          <button
                            onClick={() => addVariantMessage(vIndex)}
                            className="text-sm text-primary hover:underline"
                          >
                            + 메시지 추가
                          </button>
                        </div>
                        <div className="space-y-3">
                          {variant.messages.map((msg, mIndex) => (
                            <div
                              key={msg.id}
                              className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <select
                                  value={msg.sender}
                                  onChange={(e) =>
                                    updateVariantMessage(vIndex, mIndex, 'sender', e.target.value as 'left' | 'right')
                                  }
                                  className="input w-24 text-sm"
                                >
                                  <option value="left">왼쪽</option>
                                  <option value="right">오른쪽</option>
                                </select>
                                {msg.sender === 'left' && (
                                  <input
                                    type="text"
                                    placeholder="이름"
                                    value={msg.name || ''}
                                    onChange={(e) =>
                                      updateVariantMessage(vIndex, mIndex, 'name', e.target.value)
                                    }
                                    className="input w-24 text-sm"
                                  />
                                )}
                                <span className="text-xs text-gray-400">{msg.id}</span>
                                <div className="flex-1" />
                                {variant.messages.length > 2 && (
                                  <button
                                    onClick={() => removeVariantMessage(vIndex, mIndex)}
                                    className="p-1 text-gray-400 hover:text-red-500"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </div>
                              <textarea
                                value={msg.text}
                                onChange={(e) =>
                                  updateVariantMessage(vIndex, mIndex, 'text', e.target.value)
                                }
                                className="input text-sm resize-none"
                                rows={2}
                                placeholder="메시지 내용 (오류가 포함된 텍스트 입력)"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Article/Text Mode */}
                    {(mode === 'article' || mode === 'text') && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            제목
                          </label>
                          <input
                            type="text"
                            value={variant.title}
                            onChange={(e) => updateVariantField(vIndex, 'title', e.target.value)}
                            className="input"
                            placeholder={mode === 'article' ? '기사 제목' : '지문 제목 (선택)'}
                          />
                        </div>

                        {mode === 'article' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                부제목 (선택)
                              </label>
                              <input
                                type="text"
                                value={variant.subtitle}
                                onChange={(e) => updateVariantField(vIndex, 'subtitle', e.target.value)}
                                className="input"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  기자/작성자
                                </label>
                                <input
                                  type="text"
                                  value={variant.author}
                                  onChange={(e) => updateVariantField(vIndex, 'author', e.target.value)}
                                  className="input"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  출처
                                </label>
                                <input
                                  type="text"
                                  value={variant.source}
                                  onChange={(e) => updateVariantField(vIndex, 'source', e.target.value)}
                                  className="input"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              본문 문단
                            </label>
                            <button
                              onClick={() => addVariantParagraph(vIndex)}
                              className="text-sm text-primary hover:underline"
                            >
                              + 문단 추가
                            </button>
                          </div>
                          <div className="space-y-3">
                            {variant.paragraphs.map((para, pIndex) => (
                              <div key={pIndex} className="flex items-start gap-2">
                                <span className="text-sm text-gray-400 pt-2">p{pIndex}</span>
                                <div className="flex-1">
                                  <textarea
                                    value={para}
                                    onChange={(e) =>
                                      updateVariantParagraph(vIndex, pIndex, e.target.value)
                                    }
                                    className="input resize-none text-sm"
                                    rows={3}
                                    placeholder={`${pIndex + 1}번 문단 (오류가 포함된 텍스트 입력)`}
                                  />
                                  {variant.paragraphs.length > 1 && (
                                    <button
                                      onClick={() => removeVariantParagraph(vIndex, pIndex)}
                                      className="text-xs text-red-500 hover:underline mt-1"
                                    >
                                      삭제
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Error Info */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">오류 정보</h3>
                    <div className="p-4 bg-pink-50 rounded-lg border border-pink-200 space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          틀린 표현 *
                        </label>
                        <input
                          type="text"
                          value={variant.error.wrongText}
                          onChange={(e) => updateVariantError(vIndex, 'wrongText', e.target.value)}
                          className="input text-sm"
                          placeholder="예: 안해도"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          올바른 표현 *
                        </label>
                        <input
                          type="text"
                          value={variant.error.correctText}
                          onChange={(e) => updateVariantError(vIndex, 'correctText', e.target.value)}
                          className="input text-sm"
                          placeholder="예: 안 해도"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          오류 위치 *
                        </label>
                        <input
                          type="text"
                          value={variant.error.location}
                          onChange={(e) => updateVariantError(vIndex, 'location', e.target.value)}
                          className="input text-sm"
                          placeholder={mode === 'chat' ? '예: msg2' : '예: p0'}
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          {mode === 'chat' ? '메시지 ID (msg1, msg2...)' : '문단 번호 (p0, p1...)'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          설명 *
                        </label>
                        <textarea
                          value={variant.error.explanation}
                          onChange={(e) => updateVariantError(vIndex, 'explanation', e.target.value)}
                          className="input text-sm resize-none"
                          rows={3}
                          placeholder="왜 틀렸는지 설명..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {variants.length < 3 ? (
              <span className="text-red-500">최소 3개의 변형이 필요합니다</span>
            ) : (
              <span className="text-green-600">{variants.length}개의 변형이 준비되었습니다</span>
            )}
          </div>
          <button
            onClick={handleSave}
            className="btn-primary flex items-center gap-2"
            disabled={variants.length < 3}
          >
            <Save size={18} />
            변경사항 저장
          </button>
        </div>
      </div>
    </div>
  );
}
