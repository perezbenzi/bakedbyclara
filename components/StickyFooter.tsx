'use client';

export function StickyFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[480px] md:max-w-[780px] bg-white/90 backdrop-blur-sm border-t border-gray-100 px-5 py-4 z-20">
      {children}
    </div>
  );
}
