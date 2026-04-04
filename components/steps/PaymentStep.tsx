'use client';

import { CartItem, OrderDetails } from '@/lib/types';
import { config } from '@/lib/config';
import { StepHeader } from '../StepHeader';

interface PaymentStepProps {
  cart: CartItem[];
  orderDetails: OrderDetails;
  onConfirm: () => void;
  onBack: () => void;
}

export function PaymentStep({
  cart,
  orderDetails,
  onConfirm,
  onBack,
}: PaymentStepProps) {
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <StepHeader title="Transferencia" onBack={onBack} />

      <div className="px-4 pt-4 pb-36 flex flex-col gap-5">
        {/* Big total */}
        <div className="text-center py-7">
          <p className="font-inter text-gray-400 text-sm mb-2">Total a transferir</p>
          <p className="font-inter font-bold text-gray-900 leading-none"
            style={{ fontSize: '3.5rem' }}>
            ${total.toLocaleString('es-AR')}
          </p>
        </div>

        {/* Bank details card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🏦</span>
            <h2 className="font-inter font-semibold text-gray-900 text-base">
              Datos bancarios
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-inter text-gray-400 text-sm">Número de cuenta</span>
              <span className="font-inter font-semibold text-gray-900 text-sm tracking-wide">
                {config.bankAccount.number}
              </span>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex items-center justify-between">
              <span className="font-inter text-gray-400 text-sm">Titular</span>
              <span className="font-inter font-semibold text-gray-900 text-sm">
                {config.bankAccount.holder}
              </span>
            </div>
          </div>
        </div>

        {/* Instruction banner */}
        <div
          className="rounded-2xl px-5 py-4 text-center"
          style={{ backgroundColor: `${config.primaryColor}12` }}
        >
          <p
            className="font-inter text-sm leading-relaxed"
            style={{ color: config.primaryColor }}
          >
            Transferí el monto exacto y luego confirmá tu pedido.
          </p>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-inter font-semibold text-gray-900 text-sm mb-3">
            Resumen del pedido
          </p>
          <div className="space-y-2">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.variant ?? ''}`}
                className="flex items-center justify-between"
              >
                <span className="font-inter text-gray-500 text-sm">
                  {item.quantity}× {item.product.name}
                  {item.variant && (
                    <span className="text-gray-400"> ({item.variant})</span>
                  )}
                </span>
                <span className="font-inter text-gray-900 text-sm font-medium">
                  ${(item.product.price * item.quantity).toLocaleString('es-AR')}
                </span>
              </div>
            ))}
          </div>
          <div className="h-px bg-gray-100 my-3" />
          <div className="flex items-center justify-between">
            <span className="font-inter font-semibold text-gray-900 text-sm">
              Para: {orderDetails.name}
            </span>
            <span className="font-inter text-gray-400 text-xs">
              Turno {orderDetails.slot}
            </span>
          </div>
        </div>
      </div>

      {/* Fixed footer CTA — sits above the bottom navbar */}
      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/90 backdrop-blur-sm border-t border-gray-100 px-5 py-4 z-20">
        <button
          onClick={onConfirm}
          className="w-full py-4 rounded-full text-white font-inter font-semibold text-sm active:scale-[0.98] transition-transform shadow-lg"
          style={{ backgroundColor: config.primaryColor }}
        >
          Ya transferí, confirmar pedido ✓
        </button>
      </div>
    </div>
  );
}
