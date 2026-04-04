import { CartItem, OrderDetails } from './types';
import { config } from './config';

export function buildWhatsAppMessage(
  cart: CartItem[],
  total: number,
  details: OrderDetails,
): string {
  const itemLines = cart
    .map((item) => {
      const variantPart = item.variant ? ` (${item.variant})` : '';
      return `- ${item.quantity}x ${item.product.name}${variantPart}`;
    })
    .join('\n');

  return (
    `Hola ${config.businessName}! 🍪 Mi pedido:\n` +
    `${itemLines}\n\n` +
    `Total: $${total.toLocaleString('es-AR')}\n` +
    `Turno: ${details.slot}\n` +
    `Nombre: ${details.name}\n\n` +
    `Ya realicé la transferencia, te mando el comprobante 👇`
  );
}

export function buildWhatsAppUrl(
  cart: CartItem[],
  total: number,
  details: OrderDetails,
): string {
  const message = buildWhatsAppMessage(cart, total, details);
  const phone = config.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
