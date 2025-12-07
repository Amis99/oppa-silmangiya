'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Play, Download, RefreshCw } from 'lucide-react';
import { Stage, ChatContent } from '@/lib/types';
import { stagesStore } from '@/lib/stagesStore';

const modeLabels: Record<string, string> = {
  chat: '카톡',
  article: '기사',
  text: '비문학',
};

const modeColors: Record<string, string> = {
  chat: 'bg-pink-100 text-pink-700',
  article: 'bg-amber-100 text-amber-700',
  text: 'bg-blue-100 text-blue-700',
};

// 스테이지 제목 추출 함수 (첫 번째 variant 기준)
function getStageTitle(stage: Stage): string {
  if (!stage.variants || stage.variants.length === 0) return '스테이지';

  const firstVariant = stage.variants[0];

  if (stage.mode === 'chat') {
    const content = firstVariant.content as ChatContent;
    const firstMsg = content.messages[0]?.text || '';
    return firstMsg.length > 20 ? firstMsg.slice(0, 20) + '...' : firstMsg || '대화 스테이지';
  } else {
    const content = firstVariant.content as { title?: string; paragraphs: string[] };
    return content.title || content.paragraphs[0]?.slice(0, 20) + '...' || '스테이지';
  }
}

export default function StagesPage() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modeFilter, setModeFilter] = useState<string>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 데이터 로드
  useEffect(() => {
    loadStages();
  }, []);

  const loadStages = () => {
    setLoading(true);
    const data = stagesStore.getAll();
    setStages(data);
    setLoading(false);
  };

  // 삭제 처리
  const handleDelete = (id: string) => {
    stagesStore.delete(id);
    loadStages();
    setDeleteConfirmId(null);
  };

  // JSON 내보내기
  const handleExport = () => {
    const json = stagesStore.exportToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stages-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 데이터 초기화
  const handleReset = () => {
    if (confirm('모든 스테이지 데이터를 초기 샘플 데이터로 리셋하시겠습니까?')) {
      stagesStore.reset();
      loadStages();
    }
  };

  const filteredStages = stages
    .filter((stage) => {
      const title = getStageTitle(stage);
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMode = modeFilter === 'all' || stage.mode === modeFilter;
      return matchesSearch && matchesMode;
    })
    .sort((a, b) => a.level - b.level);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400">로딩 중...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">스테이지 관리</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="btn-secondary flex items-center gap-2"
            title="JSON 내보내기"
          >
            <Download size={18} />
            내보내기
          </button>
          <button
            onClick={handleReset}
            className="btn-secondary flex items-center gap-2 text-orange-600 hover:text-orange-700"
            title="데이터 초기화"
          >
            <RefreshCw size={18} />
            리셋
          </button>
          <Link href="/stages/new" className="btn-primary flex items-center gap-2">
            <Plus size={20} />
            새 스테이지
          </Link>
        </div>
      </div>

      {/* 필터 & 검색 */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 검색 */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="스테이지 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* 모드 필터 */}
          <select
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value)}
            className="input w-full md:w-48"
          >
            <option value="all">모든 모드</option>
            <option value="chat">카톡</option>
            <option value="article">기사</option>
            <option value="text">비문학</option>
          </select>
        </div>
      </div>

      {/* 스테이지 목록 */}
      <div className="card">
        <div className="mb-4 text-sm text-gray-500">
          총 {filteredStages.length}개의 스테이지
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3">레벨</th>
              <th className="pb-3">모드</th>
              <th className="pb-3">제목/내용</th>
              <th className="pb-3">변형 수</th>
              <th className="pb-3">제한시간</th>
              <th className="pb-3">생성일</th>
              <th className="pb-3 text-right">작업</th>
            </tr>
          </thead>
          <tbody>
            {filteredStages.map((stage) => (
              <tr key={stage.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-4 font-medium">Lv.{stage.level}</td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${modeColors[stage.mode]}`}
                  >
                    {modeLabels[stage.mode]}
                  </span>
                </td>
                <td className="py-4 text-gray-700">{getStageTitle(stage)}</td>
                <td className="py-4 text-gray-500">{stage.variants?.length || 0}개</td>
                <td className="py-4 text-gray-500">{stage.timeLimit}초</td>
                <td className="py-4 text-sm text-gray-400">
                  {stage.createdAt ? new Date(stage.createdAt).toLocaleDateString() : '-'}
                </td>
                <td className="py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/stages/${stage.id}/play`}
                      className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors"
                      title="시험 플레이"
                    >
                      <Play size={18} />
                    </Link>
                    <Link
                      href={`/stages/${stage.id}`}
                      className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                      title="수정"
                    >
                      <Edit size={18} />
                    </Link>
                    {deleteConfirmId === stage.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(stage.id!)}
                          className="px-2 py-1 text-xs bg-red-500 text-white rounded"
                        >
                          삭제
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1 text-xs bg-gray-300 text-gray-700 rounded"
                        >
                          취소
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(stage.id!)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="삭제"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStages.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
