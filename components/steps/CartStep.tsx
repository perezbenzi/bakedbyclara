'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CartItem, Product } from '@/lib/types';
import { config } from '@/lib/config';
import { StepHeader } from '../StepHeader';
import { StickyFooter } from '../StickyFooter';
import { VariantSheet } from '../VariantSheet';

interface CartStepProps {
  cart: CartItem[];
  products: Product[];
  onUpdateQty: (productId: string, variant: string | undefined, delta: number) => void;
  onAddToCart: (product: Product, variant?: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function CartStep({ cart, products, onUpdateQty, onAddToCart, onContinue, onBack }: CartStepProps) {
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const cartProductIds = new Set(cart.map((item) => item.product.id));
  const upsellProducts = products
    .filter((p) => !cartProductIds.has(p.id))
    .slice(0, 5);

  const handleUpsellAdd = (product: Product) => {
    if (product.variants.length > 0) {
      setPendingProduct(product);
    } else {
      onAddToCart(product);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <StepHeader title="Your order" onBack={onBack} />

      <div className="pt-4 pb-48 flex-1">
        {cart.length === 0 ? (
          <div className="pb-48">
            {/* Empty state hero */}
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <span className="text-5xl mb-4">🛒</span>
              <p className="font-inter font-bold text-xl text-gray-900">Your cart is empty</p>
              <p className="font-inter text-sm text-gray-400 mt-1">Add some items to get started</p>
            </div>

            {/* Suggestions section */}
            <div className="bg-white border-t border-gray-100">
              <p className="font-inter font-semibold text-sm text-gray-900 px-4 pt-4 pb-3">
                You might like
              </p>
              <div className="flex flex-col gap-0">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className={`px-4 py-3 flex items-center gap-3 ${index < products.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-inter font-semibold text-gray-900 text-sm leading-snug truncate">
                        {product.name}
                      </p>
                      <p className="font-inter text-gray-400 text-xs mt-0.5 line-clamp-1">
                        {product.description}
                      </p>
                      <p className="font-inter font-bold text-gray-900 text-sm mt-1">
                        ${product.price.toLocaleString('en-AU')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleUpsellAdd(product)}
                      className="w-8 h-8 flex-shrink-0 rounded-full text-white text-lg font-bold flex items-center justify-center shadow-sm active:scale-90 transition-transform"
                      style={{ backgroundColor: config.primaryColor }}
                      aria-label={`Add ${product.name}`}
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="px-4 flex flex-col gap-3">
              {cart.map((item) => {
                const key = `${item.product.id}-${item.variant ?? ''}`;
                const lineTotal = item.product.price * item.quantity;
                return (
                  <div
                    key={key}
                    className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3"
                  >
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      <Image
                        src={item.product.image_url}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-inter font-semibold text-gray-900 text-sm leading-snug truncate">
                        {item.product.name}
                      </p>
                      {item.variant && (
                        <p className="font-inter text-gray-400 text-xs mt-0.5">
                          {item.variant}
                        </p>
                      )}
                      <p
                        className="font-inter font-bold text-sm mt-1"
                        style={{ color: config.primaryColor }}
                      >
                        ${lineTotal.toLocaleString('en-AU')}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() =>
                          onUpdateQty(item.product.id, item.variant, -1)
                        }
                        className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-base active:scale-90 transition-transform"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="font-inter font-semibold text-gray-900 w-4 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQty(item.product.id, item.variant, 1)
                        }
                        className="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-base active:scale-90 transition-transform"
                        style={{ backgroundColor: config.primaryColor }}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Upsell section */}
            {upsellProducts.length > 0 && (
              <div className="mt-6">
                <p className="font-inter font-semibold text-gray-900 text-sm px-4 mb-3">
                  Add something else?
                </p>
                <div className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
                  {upsellProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl shadow-sm overflow-hidden flex-shrink-0 w-[120px] flex flex-col"
                    >
                      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      </div>
                      <div className="p-2 flex flex-col flex-1">
                        <p className="font-inter font-semibold text-gray-900 text-xs leading-snug line-clamp-2 flex-1">
                          {product.name}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-inter font-bold text-gray-900 text-xs">
                            ${product.price.toLocaleString('en-AU')}
                          </span>
                          <button
                            onClick={() => handleUpsellAdd(product)}
                            className="w-7 h-7 rounded-full text-white text-base font-bold flex items-center justify-center shadow-sm active:scale-90 transition-transform flex-shrink-0"
                            style={{ backgroundColor: config.primaryColor }}
                            aria-label={`Add ${product.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Fixed footer — sits above the bottom navbar */}
      <StickyFooter>
        <div className="flex items-center justify-between mb-3">
          <span className="font-inter text-gray-500 text-sm">Total</span>
          <span className="font-inter font-bold text-gray-900 text-xl">
            ${total.toLocaleString('en-AU')}
          </span>
        </div>
        <button
          onClick={onContinue}
          disabled={cart.length === 0}
          className="w-full py-4 rounded-full text-white font-inter font-semibold text-sm disabled:opacity-40 active:scale-[0.98] transition-transform"
          style={{ backgroundColor: config.primaryColor }}
        >
          Continue
        </button>
      </StickyFooter>

      {/* Variant sheet for upsell products with variants */}
      {pendingProduct && (
        <VariantSheet
          product={pendingProduct}
          onSelect={(product, variant) => {
            onAddToCart(product, variant);
            setPendingProduct(null);
          }}
          onClose={() => setPendingProduct(null)}
        />
      )}
    </div>
  );
}
