'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product, CartItem } from '@/lib/types';
import { config } from '@/lib/config';
import { ProductCard } from '../ProductCard';
import { ProductSkeleton } from '../ProductSkeleton';
import { VariantSheet } from '../VariantSheet';

interface MenuStepProps {
  products: Product[];
  isLoading: boolean;
  cart: CartItem[];
  onAddToCart: (product: Product, variant?: string) => void;
  onViewProduct: (product: Product) => void;
}

export function MenuStep({
  products,
  isLoading,
  cart,
  onAddToCart,
  onViewProduct,
}: MenuStepProps) {
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

  const handleAdd = (product: Product) => {
    if (product.variants.length > 0) {
      setPendingProduct(product);
    } else {
      onAddToCart(product);
    }
  };

  const handleVariantSelect = (product: Product, variant: string) => {
    onAddToCart(product, variant);
    setPendingProduct(null);
  };

  const featuredProduct = !isLoading
    ? (config.featuredProductName
        ? products.find((p) => p.name === config.featuredProductName)
        : undefined) ?? products[0]
    : null;

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 pt-10 pb-4">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
          style={{ backgroundColor: config.primaryColor }}
        >
          🍪
        </div>
        <div>
          <h1 className="font-inter font-bold text-base text-gray-900 leading-none">
            {config.businessName}
          </h1>
          <p className="font-inter text-gray-400 text-xs mt-0.5">{config.tagline}</p>
        </div>
      </div>

      {/* Hero featured product */}
      <div className="px-4 mb-6">
        {isLoading || !featuredProduct ? (
          <div className="w-full h-[220px] rounded-2xl bg-gray-200 animate-pulse" />
        ) : (
          <div className="relative w-full h-[220px] overflow-hidden rounded-2xl">
            <Image
              src={featuredProduct.image_url}
              alt={featuredProduct.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 480px) calc(100vw - 32px), 448px"
            />
            {/* Dark gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            {/* Content overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-inter text-white/70 text-xs font-medium mb-0.5 uppercase tracking-wide">
                  Destacado
                </p>
                <h2 className="font-inter font-bold text-white text-lg leading-tight truncate">
                  {featuredProduct.name}
                </h2>
                <p className="font-inter font-bold text-white text-base mt-0.5">
                  ${featuredProduct.price.toLocaleString('es-AR')}
                </p>
              </div>
              <button
                onClick={() => handleAdd(featuredProduct)}
                className="flex-shrink-0 px-4 py-2.5 rounded-full text-white font-inter font-semibold text-sm active:scale-95 transition-transform shadow-lg"
                style={{ backgroundColor: config.primaryColor }}
              >
                Agregar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Section title */}
      <div className="px-4 mb-4">
        <h2 className="font-inter font-bold text-gray-900 text-base">Nuestros productos</h2>
      </div>

      {/* Product grid */}
      <div className="px-4 grid grid-cols-2 gap-3 pb-20">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAdd}
                onView={onViewProduct}
              />
            ))}
      </div>

      {/* Variant bottom sheet */}
      {pendingProduct && (
        <VariantSheet
          product={pendingProduct}
          onSelect={handleVariantSelect}
          onClose={() => setPendingProduct(null)}
        />
      )}
    </div>
  );
}
