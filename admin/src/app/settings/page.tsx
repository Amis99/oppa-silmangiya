'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    defaultTimeLimit: 60,
    defaultLives: 3,
    maxLives: 5,
    baseScore: 10,
    clearBonus: 50,
    timeBonusMultiplier: 2,
  });

  const handleSave = () => {
    console.log('저장할 설정:', settings);
    alert('설정이 저장되었습니다.');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">설정</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 게임 기본 설정 */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">게임 기본 설정</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                기본 제한 시간 (초)
              </label>
              <input
                type="number"
                value={settings.defaultTimeLimit}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultTimeLimit: Number(e.target.value),
                  })
                }
                className="input"
              />
              <p className="text-xs text-gray-400 mt-1">
                새 스테이지 생성 시 기본값
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                기본 라이프
              </label>
              <input
                type="number"
                value={settings.defaultLives}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultLives: Number(e.target.value),
                  })
                }
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                최대 라이프
              </label>
              <input
                type="number"
                value={settings.maxLives}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxLives: Number(e.target.value),
                  })
                }
                className="input"
              />
            </div>
          </div>
        </div>

        {/* 점수 설정 */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">점수 설정</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                기본 점수 (정답 시)
              </label>
              <input
                type="number"
                value={settings.baseScore}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    baseScore: Number(e.target.value),
                  })
                }
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                클리어 보너스
              </label>
              <input
                type="number"
                value={settings.clearBonus}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    clearBonus: Number(e.target.value),
                  })
                }
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                시간 보너스 배율
              </label>
              <input
                type="number"
                value={settings.timeBonusMultiplier}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    timeBonusMultiplier: Number(e.target.value),
                  })
                }
                className="input"
              />
              <p className="text-xs text-gray-400 mt-1">
                남은 시간 × 배율 = 시간 보너스
              </p>
            </div>
          </div>
        </div>

        {/* Firebase 설정 */}
        <div className="card lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Firebase 연결 정보</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Project ID:</span>
                <span className="ml-2 font-mono">oppa-silmangiya</span>
              </div>
              <div>
                <span className="text-gray-500">상태:</span>
                <span className="ml-2 text-green-600">연결됨</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Firebase 설정은 환경 변수를 통해 관리됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="btn-primary flex items-center gap-2"
        >
          <Save size={18} />
          설정 저장
        </button>
      </div>
    </div>
  );
}
