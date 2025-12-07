'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Save, ArrowLeft, Upload, FileJson, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { GameMode, ChatMessage, StageVariant, StageError } from '@/lib/types';
import { stagesStore, jsonFormatExample } from '@/lib/stagesStore';

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

type InputMode = 'single' | 'bulk';

function createEmptyVariant(mode: GameMode, index: number): VariantUI {
  return {
    id: `v${Date.now()}_${index}`,
    expanded: index === 0,
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
      id: `err${Date.now()}_${index}`,
      wrongText: '',
      correctText: '',
      explanation: '',
      location: '',
    },
  };
}

export default function NewStagePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Input mode (single/bulk)
  const [inputMode, setInputMode] = useState<InputMode>('single');
  const [copied, setCopied] = useState(false);

  // Bulk upload
  const [bulkJson, setBulkJson] = useState('');
  const [bulkErrors, setBulkErrors] = useState<string[]>([]);
  const [bulkSuccess, setBulkSuccess] = useState<string | null>(null);

  // Basic info
  const [level, setLevel] = useState(1);
  const [mode, setMode] = useState<GameMode>('chat');
  const [timeLimit, setTimeLimit] = useState(60);

  // Variants
  const [variants, setVariants] = useState<VariantUI[]>([
    createEmptyVariant('chat', 0),
    createEmptyVariant('chat', 1),
    createEmptyVariant('chat', 2),
  ]);

  // Handle mode change - reset variants
  const handleModeChange = (newMode: GameMode) => {
    setMode(newMode);
    setVariants([
      createEmptyVariant(newMode, 0),
      createEmptyVariant(newMode, 1),
      createEmptyVariant(newMode, 2),
    ]);
  };

  // Add new variant
  const addVariant = () => {
    if (variants.length >= 5) {
      alert('변형은 최대 5개까지 추가할 수 있습니다.');
      return;
    }

    const newIndex = variants.length;
    let newVariant: VariantUI;

    if (variants.length > 0) {
      // Copy from first variant
      const first = variants[0];
      newVariant = {
        id: `v${Date.now()}`,
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
      newVariant = createEmptyVariant(mode, newIndex);
    }

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

  // Copy content from first variant to all others
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

  // Save single stage
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

    stagesStore.add({
      level,
      mode,
      timeLimit,
      variants: stageVariants,
    });

    alert('스테이지가 저장되었습니다.');
    router.push('/stages');
  };

  // Bulk upload
  const handleBulkUpload = () => {
    setBulkErrors([]);
    setBulkSuccess(null);

    if (!bulkJson.trim()) {
      setBulkErrors(['JSON 데이터를 입력해주세요.']);
      return;
    }

    const result = stagesStore.importFromJSON(bulkJson);

    if (result.success) {
      setBulkSuccess(`${result.count}개의 스테이지가 성공적으로 추가되었습니다.`);
      if (result.errors.length > 0) {
        setBulkErrors(result.errors);
      }
      setBulkJson('');
    } else {
      setBulkErrors(result.errors);
    }
  };

  // File upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setBulkJson(content);
    };
    reader.readAsText(file);
  };

  // Copy format
  const handleCopyFormat = () => {
    navigator.clipboard.writeText(jsonFormatExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/stages"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">새 스테이지 추가</h1>
      </div>

      {/* Input mode selection */}
      <div className="card mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setInputMode('single')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
              inputMode === 'single'
                ? 'border-primary bg-pink-50 text-primary'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-semibold">단일 스테이지 추가</div>
            <div className="text-sm text-gray-500 mt-1">하나씩 직접 입력</div>
          </button>
          <button
            onClick={() => setInputMode('bulk')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
              inputMode === 'bulk'
                ? 'border-primary bg-pink-50 text-primary'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-semibold flex items-center justify-center gap-2">
              <Upload size={18} />
              일괄 업로드
            </div>
            <div className="text-sm text-gray-500 mt-1">JSON 파일로 여러 개 추가</div>
          </button>
        </div>
      </div>

      {/* Bulk upload mode */}
      {inputMode === 'bulk' && (
        <div className="space-y-6">
          {/* JSON format guide */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileJson size={20} />
                JSON 양식 (변형 기반 구조)
              </h2>
              <button
                onClick={handleCopyFormat}
                className="btn-secondary text-sm flex items-center gap-1"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? '복사됨!' : '양식 복사'}
              </button>
            </div>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap">{jsonFormatExample}</pre>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium mb-2">필드 설명:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-500">
                <li><code className="bg-gray-100 px-1 rounded">level</code>: 스테이지 레벨 (숫자)</li>
                <li><code className="bg-gray-100 px-1 rounded">mode</code>: &quot;chat&quot; | &quot;article&quot; | &quot;text&quot;</li>
                <li><code className="bg-gray-100 px-1 rounded">timeLimit</code>: 제한시간 (초)</li>
                <li><code className="bg-gray-100 px-1 rounded">variants</code>: 변형 배열 (최소 3개)</li>
                <li className="ml-4"><code className="bg-gray-100 px-1 rounded">content</code>: 해당 변형의 지문 (오류 포함)</li>
                <li className="ml-4"><code className="bg-gray-100 px-1 rounded">error</code>: 오류 정보 (wrongText, correctText, explanation, location)</li>
              </ul>
            </div>
          </div>

          {/* JSON input */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">JSON 데이터 입력</h2>
              <div>
                <input
                  type="file"
                  accept=".json"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-secondary text-sm flex items-center gap-1"
                >
                  <Upload size={16} />
                  파일 선택
                </button>
              </div>
            </div>

            <textarea
              value={bulkJson}
              onChange={(e) => setBulkJson(e.target.value)}
              className="input resize-none font-mono text-sm"
              rows={15}
              placeholder="JSON 데이터를 붙여넣거나 파일을 선택하세요..."
            />

            {/* Error messages */}
            {bulkErrors.length > 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-medium text-red-700 mb-2">오류가 발생했습니다:</p>
                <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                  {bulkErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Success message */}
            {bulkSuccess && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700">{bulkSuccess}</p>
              </div>
            )}

            <div className="mt-4 flex gap-4">
              <button
                onClick={handleBulkUpload}
                className="btn-primary flex items-center gap-2"
              >
                <Upload size={18} />
                일괄 업로드
              </button>
              <Link href="/stages" className="btn-secondary">
                목록으로
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Single stage input mode */}
      {inputMode === 'single' && (
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="card">
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
                  onChange={(e) => handleModeChange(e.target.value as GameMode)}
                  className="input"
                >
                  <option value="chat">카톡 대화형</option>
                  <option value="article">잡지/기사형</option>
                  <option value="text">비문학형</option>
                </select>
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
          <div className="flex items-center justify-between">
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

          <p className="text-sm text-gray-500">
            각 변형은 동일한 지문에 다른 오류가 포함된 버전입니다. 플레이 시 무작위로 하나가 선택됩니다.
            <br />
            <strong>팁:</strong> 첫 번째 변형에 기본 지문을 작성한 뒤 &quot;콘텐츠 동기화&quot;를 클릭하면 다른 변형에 복사됩니다. 그 후 각 변형에서 오류 부분만 수정하세요.
          </p>

          {/* Variants */}
          <div className="space-y-4">
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
                스테이지 저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
