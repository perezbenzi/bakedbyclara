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
      `Hi ${config.businessName}! My order:\n` +
      `${itemLines}\n\n` +
      `Total: $${total.toLocaleString('en-AU')}\n` +
      `Pickup slot: ${details.slot}\n` +
      `Name: ${details.name}\n\n` +
      `I've completed the transfer — sending proof below`
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
