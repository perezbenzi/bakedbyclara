'use client';

import { config } from '@/lib/config';

export type NavTab = 'menu' | 'cart' | 'info';

interface BottomNavProps {
  activeTab: NavTab;
  cartItemCount: number;
  onNavigate: (tab: NavTab) => void;
}

export function BottomNav({ activeTab, cartItemCount, onNavigate }: BottomNavProps) {
  const active = config.primaryColor;
  const inactive = '#9CA3AF'; // gray-400

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-14 bg-white border-t border-gray-100 flex items-center z-30 shadow-[0_-1px_8px_rgba(0,0,0,0.06)]">
      {/* Inicio */}
      <button
        onClick={() => onNavigate('menu')}
        className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full active:opacity-70 transition-opacity"
        aria-label="Home"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'menu' ? active : inactive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="text-[10px] font-inter font-medium" style={{ color: activeTab === 'menu' ? active : inactive }}>
          Home
        </span>
      </button>

      {/* Mi pedido */}
      <button
        onClick={() => onNavigate('cart')}
        className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full active:opacity-70 transition-opacity relative"
        aria-label="My order"
      >
        <div className="relative">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'cart' ? active : inactive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartItemCount > 0 && (
            <span
              className="absolute -top-1.5 -right-2 min-w-[16px] h-4 rounded-full text-white text-[9px] font-inter font-bold flex items-center justify-center px-0.5"
              style={{ backgroundColor: active }}
            >
              {cartItemCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-inter font-medium" style={{ color: activeTab === 'cart' ? active : inactive }}>
          My order
        </span>
      </button>

      {/* Info */}
      <button
        onClick={() => onNavigate('info')}
        className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full active:opacity-70 transition-opacity"
        aria-label="Info"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={activeTab === 'info' ? active : inactive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span className="text-[10px] font-inter font-medium" style={{ color: activeTab === 'info' ? active : inactive }}>
          Info
        </span>
      </button>
    </nav>
  );
}
