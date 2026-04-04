'use client';

import { useEffect } from 'react';
import { CartItem, OrderDetails } from '@/lib/types';
import { config } from '@/lib/config';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface ConfirmationStepProps {
  cart: CartItem[];
  orderDetails: OrderDetails;
  onNewOrder: () => void;
}

export function ConfirmationStep({ cart, orderDetails, onNewOrder }: ConfirmationStepProps) {
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const waUrl = buildWhatsAppUrl(cart, total, orderDetails);

  // Open WhatsApp automatically shortly after mounting
  useEffect(() => {
    const t = setTimeout(() => window.open(waUrl, '_blank'), 600);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-cream pb-10">
      {/* Top navbar */}
      <header className="flex items-center px-4 py-3 bg-cream sticky top-0 z-10">
        <button
          onClick={onNewOrder}
          className="flex items-center gap-2 font-inter text-sm font-medium text-gray-600 active:opacity-70 transition-opacity"
          aria-label="Volver al menú"
        >
          <span className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600">
            ←
          </span>
          <span>Nuevo pedido</span>
        </button>
      </header>

      {/* Success hero */}
      <div className="pt-8 pb-8 px-5 text-center">
        <div
          className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-4xl shadow-md"
          style={{ backgroundColor: `${config.primaryColor}18` }}
        >
          🎉
        </div>
        <h1 className="font-inter font-bold text-2xl text-gray-900 mb-2">
          ¡Pedido confirmado!
        </h1>
        <p className="font-inter text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
          Te abrimos WhatsApp para enviar tu comprobante y coordinar la entrega.
        </p>
      </div>

      <div className="px-4 flex flex-col gap-4">
        {/* Order items */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="font-inter font-semibold text-gray-900 mb-4">
            Tu pedido
          </p>
          <div className="space-y-2">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.variant ?? ''}`}
                className="flex items-center justify-between"
              >
                <span className="font-inter text-gray-600 text-sm">
                  {item.quantity}× {item.product.name}
                  {item.variant && (
                    <span className="text-gray-400"> ({item.variant})</span>
                  )}
                </span>
                <span className="font-inter font-semibold text-gray-900 text-sm">
                  ${(item.product.price * item.quantity).toLocaleString('es-AR')}
                </span>
              </div>
            ))}
          </div>
          <div className="h-px bg-gray-100 my-3" />
          <div className="flex items-center justify-between">
            <span className="font-inter font-semibold text-gray-900 text-sm">
              Total
            </span>
            <span
              className="font-inter font-bold text-lg"
              style={{ color: config.primaryColor }}
            >
              ${total.toLocaleString('es-AR')}
            </span>
          </div>
        </div>

        {/* Order meta */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="font-inter text-gray-400">Nombre</span>
            <span className="font-inter font-semibold text-gray-900">
              {orderDetails.name}
            </span>
          </div>
          <div className="h-px bg-gray-100 mb-3" />
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="font-inter text-gray-400">Turno</span>
            <span className="font-inter font-semibold text-gray-900">
              {orderDetails.slot}
            </span>
          </div>
          <div className="h-px bg-gray-100 mb-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="font-inter text-gray-400">Retiro en</span>
            <span className="font-inter font-semibold text-gray-900 text-right max-w-[55%]">
              {config.address}
            </span>
          </div>
        </div>

        {/* Manual WhatsApp fallback */}
        <div className="text-center pt-2">
          <p className="font-inter text-gray-400 text-xs mb-2">
            ¿No se abrió WhatsApp automáticamente?
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-inter font-semibold text-sm px-6 py-3 rounded-full text-white shadow-md active:scale-95 transition-transform"
            style={{ backgroundColor: '#25D366' }}
          >
            <span>Abrir WhatsApp</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
