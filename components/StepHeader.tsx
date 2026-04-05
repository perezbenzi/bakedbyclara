'use client';

interface StepHeaderProps {
  title: string;
  onBack?: () => void;
}

export function StepHeader({ title, onBack }: StepHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-4 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-100">
      {onBack && (
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0 active:scale-90 transition-transform"
          aria-label="Back"
        >
          ←
        </button>
      )}
      <h1 className="font-inter font-semibold text-gray-900 text-lg">{title}</h1>
    </header>
  );
}
