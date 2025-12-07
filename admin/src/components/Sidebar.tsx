'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  BarChart3,
  PlusCircle
} from 'lucide-react';

const menuItems = [
  { href: '/', label: '대시보드', icon: LayoutDashboard },
  { href: '/stages', label: '스테이지 관리', icon: FileText },
  { href: '/stages/new', label: '새 스테이지', icon: PlusCircle },
  { href: '/users', label: '유저 관리', icon: Users },
  { href: '/settings', label: '설정', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50">
      {/* 로고 */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-primary">
          오빠 실망이야
        </h1>
        <p className="text-sm text-gray-500 mt-1">관리자 대시보드</p>
      </div>

      {/* 메뉴 */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 하단 정보 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Version 1.0.0
        </p>
      </div>
    </aside>
  );
}
