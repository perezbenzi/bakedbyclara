'use client';

import Image from 'next/image';
import { Product } from '@/lib/types';
import { config } from '@/lib/config';

interface ProductCardProps {
  product: Product;
  quantity: number;
  variant?: string;
  onAdd: (product: Product) => void;
  onRemove: (product: Product, variant?: string) => void;
  onView?: (product: Product) => void;
}

export function ProductCard({ product, quantity, variant, onAdd, onRemove, onView }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Clickable image area */}
      <div
        className="relative aspect-square w-full overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => onView?.(product)}
      >
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 480px) calc(50vw - 28px), 232px"
        />
      </div>

      <div className="p-3 flex flex-col flex-1">
        {/* Clickable name */}
        <h3
          className="font-inter font-semibold text-gray-900 text-sm leading-snug cursor-pointer"
          onClick={() => onView?.(product)}
        >
          {product.name}
        </h3>
        <p className="text-gray-400 text-xs mt-1 flex-1 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-inter font-bold text-gray-900 text-sm">
            ${product.price.toLocaleString('en-AU')}
          </span>

          {/* Animated quantity pill */}
          <div
            className="flex items-center justify-end overflow-hidden rounded-full transition-all duration-200 ease-out shadow-sm"
            style={{
              backgroundColor: config.primaryColor,
              width: quantity > 0 ? 96 : 32,
              height: 32,
            }}
          >
            {/* Left: trash (qty=1) or − (qty>1) */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemove(product, variant); }}
              className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-white transition-opacity duration-150"
              style={{ opacity: quantity > 0 ? 1 : 0, pointerEvents: quantity > 0 ? 'auto' : 'none' }}
              aria-label="Remove"
            >
              {quantity === 1 ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6h14z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              ) : (
                <span className="text-base font-bold leading-none">−</span>
              )}
            </button>

            {/* Center: quantity */}
            <span
              className="flex-shrink-0 text-white font-inter font-bold text-sm text-center transition-opacity duration-150"
              style={{ width: 32, opacity: quantity > 0 ? 1 : 0 }}
            >
              {quantity || ''}
            </span>

            {/* Right: + */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onAdd(product); }}
              className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-white text-lg font-bold"
              aria-label={`Add ${product.name}`}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
