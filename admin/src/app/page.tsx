'use client';

import { FileText, Users, TrendingUp, Clock } from 'lucide-react';

const stats = [
  {
    label: '총 스테이지',
    value: '156',
    icon: FileText,
    color: 'bg-blue-500',
    change: '+12 이번 주',
  },
  {
    label: '총 유저',
    value: '3,482',
    icon: Users,
    color: 'bg-green-500',
    change: '+234 이번 주',
  },
  {
    label: '일일 활성 유저',
    value: '892',
    icon: TrendingUp,
    color: 'bg-purple-500',
    change: '+15%',
  },
  {
    label: '평균 플레이 시간',
    value: '12분',
    icon: Clock,
    color: 'bg-orange-500',
    change: '+2분',
  },
];

const recentStages = [
  { id: 1, level: 45, mode: 'chat', title: '카톡 대화 - 띄어쓰기', createdAt: '2024-01-15' },
  { id: 2, level: 46, mode: 'article', title: '기사형 - 맞춤법', createdAt: '2024-01-14' },
  { id: 3, level: 47, mode: 'text', title: '비문학 - 논리 일관성', createdAt: '2024-01-14' },
  { id: 4, level: 48, mode: 'chat', title: '카톡 대화 - 표준어', createdAt: '2024-01-13' },
];

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

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">대시보드</h1>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 최근 스테이지 */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">최근 추가된 스테이지</h2>
          <a href="/stages" className="text-sm text-primary hover:underline">
            전체 보기
          </a>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3">레벨</th>
              <th className="pb-3">모드</th>
              <th className="pb-3">제목</th>
              <th className="pb-3">생성일</th>
            </tr>
          </thead>
          <tbody>
            {recentStages.map((stage) => (
              <tr key={stage.id} className="border-b last:border-0">
                <td className="py-3 font-medium">Lv.{stage.level}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${modeColors[stage.mode]}`}
                  >
                    {modeLabels[stage.mode]}
                  </span>
                </td>
                <td className="py-3 text-gray-600">{stage.title}</td>
                <td className="py-3 text-sm text-gray-400">{stage.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
