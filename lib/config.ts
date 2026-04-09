// ─────────────────────────────────────────────────────────────────────────────
// BUSINESS CONFIG — change this file (+ tailwind.config.js primaryColor) to
// adapt this template to any client. No other file needs to change.
// ─────────────────────────────────────────────────────────────────────────────
export const config = {
  businessName: "Clara's Bakehouse",
  tagline: 'Homemade with love, delivered to your door',
  featuredProductName: null as string | null,
  whatsappNumber: '+61410461903',
  pickupAddress: '15 Hinterland Way, Byron Bay NSW 2481',
  bankAccount: {
    number: '01234543680',
    holder: 'J. Doe',
  },
  primaryColor: '#000000',
  googleSheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || 'REPLACE_WITH_SHEET_ID',
  googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  availableSlots: ['Morning (9am–12pm)', 'Afternoon (1pm–5pm)'],
} as const;

export type Config = typeof config;
