'use client';

import { useState } from 'react';
import { Search, Eye, Ban, MoreVertical } from 'lucide-react';

// 샘플 유저 데이터
const sampleUsers = [
  {
    id: '1',
    nickname: '국어왕',
    level: 45,
    totalScore: 12500,
    region: 'asia',
    country: 'KR',
    lastPlayedAt: '2024-01-15 14:30',
    createdAt: '2023-10-01',
  },
  {
    id: '2',
    nickname: 'KoreanMaster',
    level: 42,
    totalScore: 11200,
    region: 'asia',
    country: 'JP',
    lastPlayedAt: '2024-01-15 12:15',
    createdAt: '2023-11-15',
  },
  {
    id: '3',
    nickname: '문법요정',
    level: 38,
    totalScore: 9800,
    region: 'asia',
    country: 'KR',
    lastPlayedAt: '2024-01-14 20:45',
    createdAt: '2023-09-20',
  },
  {
    id: '4',
    nickname: 'HangeulPro',
    level: 35,
    totalScore: 8500,
    region: 'north_america',
    country: 'US',
    lastPlayedAt: '2024-01-14 08:30',
    createdAt: '2023-12-01',
  },
  {
    id: '5',
    nickname: '맞춤법달인',
    level: 33,
    totalScore: 7200,
    region: 'asia',
    country: 'KR',
    lastPlayedAt: '2024-01-13 19:00',
    createdAt: '2023-08-15',
  },
];

const countryFlags: Record<string, string> = {
  KR: '🇰🇷',
  JP: '🇯🇵',
  US: '🇺🇸',
  CN: '🇨🇳',
  DE: '🇩🇪',
};

const regionLabels: Record<string, string> = {
  asia: '아시아',
  europe: '유럽',
  north_america: '북미',
  south_america: '남미',
  middle_east_africa: '중동/아프리카',
  oceania: '오세아니아',
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');

  const filteredUsers = sampleUsers.filter((user) => {
    const matchesSearch = user.nickname
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion =
      regionFilter === 'all' || user.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">유저 관리</h1>
        <span className="text-sm text-gray-500">
          총 {sampleUsers.length}명
        </span>
      </div>

      {/* 필터 & 검색 */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 검색 */}
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="닉네임으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* 지역 필터 */}
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="input w-full md:w-48"
          >
            <option value="all">모든 지역</option>
            <option value="asia">아시아</option>
            <option value="europe">유럽</option>
            <option value="north_america">북미</option>
            <option value="south_america">남미</option>
            <option value="middle_east_africa">중동/아프리카</option>
            <option value="oceania">오세아니아</option>
          </select>
        </div>
      </div>

      {/* 유저 목록 */}
      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3">유저</th>
              <th className="pb-3">레벨</th>
              <th className="pb-3">총 점수</th>
              <th className="pb-3">지역</th>
              <th className="pb-3">마지막 접속</th>
              <th className="pb-3">가입일</th>
              <th className="pb-3 text-right">작업</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {countryFlags[user.country] || '🌍'}
                    </span>
                    <span className="font-medium">{user.nickname}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Lv.{user.level}
                  </span>
                </td>
                <td className="py-4 font-medium">
                  {user.totalScore.toLocaleString()}
                </td>
                <td className="py-4 text-gray-600">
                  {regionLabels[user.region]}
                </td>
                <td className="py-4 text-sm text-gray-500">
                  {user.lastPlayedAt}
                </td>
                <td className="py-4 text-sm text-gray-400">{user.createdAt}</td>
                <td className="py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title="상세 보기"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="차단"
                    >
                      <Ban size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
