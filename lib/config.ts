// ─────────────────────────────────────────────────────────────────────────────
// BUSINESS CONFIG — change this file (+ tailwind.config.js primaryColor) to
// adapt this template to any client. No other file needs to change.
// ─────────────────────────────────────────────────────────────────────────────
export const config = {
  businessName: 'Baked by Clara',
  tagline: 'Hecho con amor, pedido por WhatsApp',
  featuredProductName: null as string | null,
  whatsappNumber: '+614W10461903',
  address: '421 Condamine St, Balgowlah',
  bankAccount: {
    number: '01234543680',
    holder: 'J. Doe',
  },
  primaryColor: '#8B4513',
  googleSheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || 'REPLACE_WITH_SHEET_ID',
  googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  availableSlots: ['Mañana', 'Tarde'],
} as const;

export type Config = typeof config;
