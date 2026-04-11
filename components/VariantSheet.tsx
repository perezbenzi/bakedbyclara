'use client';

import { useEffect } from 'react';
import { Product } from '@/lib/types';

interface VariantSheetProps {
  product: Product;
  onSelect: (product: Product, variant: string) => void;
  onClose: () => void;
}

export function VariantSheet({ product, onSelect, onClose }: VariantSheetProps) {
  // Lock body scroll while sheet is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full max-w-[480px] md:max-w-[780px] bg-white rounded-t-3xl px-5 pt-5 pb-10 animate-slide-up">
        {/* Drag handle */}
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

        <div className="flex items-center justify-between mb-1">
          <h3 className="font-inter font-semibold text-gray-900 text-lg">
            {product.name}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm active:scale-90 transition-transform"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="font-inter text-gray-400 text-sm mb-5">
          Choose a variant to add to your order
        </p>

        <div className="flex flex-col gap-3">
          {product.variants.map((variant) => (
            <button
              key={variant}
              onClick={() => onSelect(product, variant)}
              className="w-full py-4 px-5 rounded-xl text-left font-inter font-medium text-gray-800 bg-cream border-2 border-transparent hover:border-primary focus:border-primary transition-colors active:scale-[0.98]"
            >
              {variant}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

