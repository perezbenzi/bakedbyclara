'use client';

import { useState, useEffect } from 'react';
import { Product, CartItem, Step, OrderDetails } from '@/lib/types';
import { fetchProducts } from '@/lib/sheets';
import { MenuStep } from '@/components/steps/MenuStep';
import { ProductDetailStep } from '@/components/steps/ProductDetailStep';
import { CartStep } from '@/components/steps/CartStep';
import { OrderDetailsStep } from '@/components/steps/OrderDetailsStep';
import { PaymentStep } from '@/components/steps/PaymentStep';
import { ConfirmationStep } from '@/components/steps/ConfirmationStep';
import { InfoStep } from '@/components/steps/InfoStep';
import { BottomNav, NavTab } from '@/components/BottomNav';

export default function Home() {
  const [step, setStep] = useState<Step>('menu');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    name: '',
    slot: '',
  });

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [step]);

  const addToCart = (product: Product, variant?: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.variant === variant,
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.variant === variant
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, variant, quantity: 1 }];
    });
  };

  const updateQty = (
    productId: string,
    variant: string | undefined,
    delta: number,
  ) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.variant === variant
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setStep('product');
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const activeNavTab: NavTab =
    step === 'info' ? 'info' :
    step === 'cart' || step === 'details' || step === 'payment' ? 'cart' :
    'menu';

  const handleNavNavigate = (tab: NavTab) => {
    if (tab === 'menu') setStep('menu');
    else if (tab === 'cart') setStep('cart');
    else if (tab === 'info') setStep('info');
  };

  const showNav = step !== 'confirmation';

  const renderStep = () => {
    switch (step) {
      case 'menu':
        return (
          <MenuStep
            products={products}
            isLoading={isLoading}
            cart={cart}
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
          />
        );
      case 'product':
        return selectedProduct ? (
          <ProductDetailStep
            product={selectedProduct}
            products={products}
            cart={cart}
            onBack={() => setStep('menu')}
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
          />
        ) : null;
      case 'cart':
        return (
          <CartStep
            cart={cart}
            products={products}
            onUpdateQty={updateQty}
            onAddToCart={addToCart}
            onContinue={() => setStep('details')}
            onBack={() => setStep('menu')}
          />
        );
      case 'details':
        return (
          <OrderDetailsStep
            onContinue={(details) => {
              setOrderDetails(details);
              setStep('payment');
            }}
            onBack={() => setStep('cart')}
          />
        );
      case 'payment':
        return (
          <PaymentStep
            cart={cart}
            orderDetails={orderDetails}
            onConfirm={() => setStep('confirmation')}
            onBack={() => setStep('details')}
          />
        );
      case 'confirmation':
        return (
          <ConfirmationStep
            cart={cart}
            orderDetails={orderDetails}
            onNewOrder={() => {
              setCart([]);
              setOrderDetails({ name: '', slot: '' });
              setStep('menu');
            }}
          />
        );
      case 'info':
        return <InfoStep />;
    }
  };

  return (
    <main className="min-h-screen bg-cream flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen relative bg-cream shadow-xl">
        {/* key= forces remount on step change, triggering the step-enter animation */}
        <div key={step} className="step-enter">
          {renderStep()}
        </div>

        {showNav && (
          <BottomNav
            activeTab={activeNavTab}
            cartItemCount={cartItemCount}
            onNavigate={handleNavNavigate}
          />
        )}
      </div>
    </main>
  );
}
