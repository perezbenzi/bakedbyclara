'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { config } from '@/lib/config';
import { StickyFooter } from '../StickyFooter';

interface ProductDetailStepProps {
  product: Product;
  products: Product[];
  onBack: () => void;
  onAddToCart: (product: Product, variant?: string) => void;
  onViewProduct: (product: Product) => void;
}

export function ProductDetailStep({
  product,
  products,
  onBack,
  onAddToCart,
  onViewProduct,
}: ProductDetailStepProps) {
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants[0] ?? '',
  );
  const [added, setAdded] = useState(false);

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 5);

  const handleAdd = () => {
    if (product.variants.length > 0 && !selectedVariant) return;
    onAddToCart(product, product.variants.length > 0 ? selectedVariant : undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Hero image */}
      <div className="relative h-[280px] w-full overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 480px) 100vw, 480px"
        />
        {/* Top gradient for legibility */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/30 to-transparent" />
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-700 shadow-md active:scale-90 transition-transform"
          aria-label="Back"
        >
          ←
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 px-4 pt-5 pb-36">
        {/* Name & price */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h1 className="font-inter font-bold text-2xl text-gray-900 leading-tight flex-1">
            {product.name}
          </h1>
          <span
            className="font-inter font-bold text-xl flex-shrink-0 pt-0.5"
            style={{ color: config.primaryColor }}
          >
            ${product.price.toLocaleString('en-AU')}
          </span>
        </div>

        {/* Description */}
        <p className="font-inter text-gray-500 text-sm leading-relaxed mb-5">
          {product.description}
        </p>

        {/* Variant selector */}
        {product.variants.length > 0 && (
          <div className="mb-6">
            <p className="font-inter font-semibold text-gray-900 text-sm mb-3">
              Variant
            </p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVariant(v)}
                  className="px-4 py-2 rounded-full font-inter text-sm font-medium border-2 transition-all active:scale-95"
                  style={
                    selectedVariant === v
                      ? { backgroundColor: config.primaryColor, borderColor: config.primaryColor, color: '#fff' }
                      : { backgroundColor: '#fff', borderColor: '#E5E7EB', color: '#374151' }
                  }
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* También te puede interesar */}
        {relatedProducts.length > 0 && (
          <div className="mt-2">
            <p className="font-inter font-semibold text-gray-900 text-sm mb-3">
              You may also like
            </p>
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
              {relatedProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onViewProduct(p)}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden flex-shrink-0 w-[120px] flex flex-col text-left active:opacity-80 transition-opacity"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                    <Image
                      src={p.image_url}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </div>
                  <div className="p-2">
                    <p className="font-inter font-semibold text-gray-900 text-xs leading-snug line-clamp-2">
                      {p.name}
                    </p>
                    <p className="font-inter font-bold text-xs mt-1" style={{ color: config.primaryColor }}>
                      ${p.price.toLocaleString('en-AU')}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky CTA — above the bottom navbar */}
      <StickyFooter>
        <button
          onClick={handleAdd}
          disabled={product.variants.length > 0 && !selectedVariant}
          className="w-full py-4 rounded-full text-white font-inter font-semibold text-sm disabled:opacity-40 active:scale-[0.98] transition-all shadow-lg"
          style={{ backgroundColor: added ? '#22C55E' : config.primaryColor }}
        >
          {added ? 'Added! ✓' : 'Add to cart'}
        </button>
      </StickyFooter>
    </div>
  );
}
