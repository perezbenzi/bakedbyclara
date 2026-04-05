'use client';

import Image from 'next/image';
import { Product } from '@/lib/types';
import { config } from '@/lib/config';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  onView?: (product: Product) => void;
}

export function ProductCard({ product, onAdd, onView }: ProductCardProps) {
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
          <button
            onClick={() => onAdd(product)}
            className="w-8 h-8 rounded-full text-white text-lg font-bold flex items-center justify-center shadow-sm active:scale-90 transition-transform"
            style={{ backgroundColor: config.primaryColor }}
            aria-label={`Add ${product.name}`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
