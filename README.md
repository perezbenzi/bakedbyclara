# Baked by Clara — WhatsApp Cookie Ordering Template

A mobile-first ordering web app for small food businesses. Customers browse a menu, build a cart, enter pickup details, and confirm via a pre-filled WhatsApp message. No backend, no database, no auth.

## How to adapt this to a new client

### 1. Edit `lib/config.ts`

This is the only file that carries business-specific data:

```ts
export const config = {
  businessName: 'Your Business Name',
  tagline: 'Your tagline here',
  whatsappNumber: '+1234567890',       // include country code
  pickupAddress: 'Your Address',
  bankAccount: {
    number: 'your-account-number',
    holder: 'Account Holder Name',
  },
  primaryColor: '#8B4513',             // hex — also update tailwind.config.js
  googleSheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || 'REPLACE_WITH_SHEET_ID',
  googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  availableSlots: ['Morning', 'Afternoon'],
};
```

### 2. Update the brand color in `tailwind.config.js`

```js
colors: {
  primary: '#YOUR_COLOR',   // ← match config.primaryColor
  cream:   '#YOUR_BG',      // ← page background (default: warm cream)
},
```

### 3. Connect Google Sheets

1. Create a Google Sheet with **exactly** these column headers in row 1:

| name | description | price | variants | image_url | active |
|------|-------------|-------|----------|-----------|--------|
| Chocolate Chip Cookies | Classic cookies with Belgian chocolate | 1200 | | https://... | TRUE |
| Alfajores | Filled with dulce de leche | 1500 | Cornstarch\|Chocolate | https://... | TRUE |

- **variants** — pipe-separated options (`Option A|Option B`). Leave empty for no variants.
- **price** — number only (e.g. `1200`), no currency symbol.
- **active** — `TRUE` to show, `FALSE` to hide.

2. Share the sheet: **File → Share → Anyone with the link → Viewer**
3. Enable the **Google Sheets API** in [Google Cloud Console](https://console.cloud.google.com)
4. Create an **API key** restricted to the Sheets API
5. Copy the **Sheet ID** from the URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

### 4. Set environment variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```
NEXT_PUBLIC_GOOGLE_SHEET_ID=your_sheet_id_here
NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key_here
```

> Without these values the app shows built-in demo products.

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploying to Vercel

```bash
npm i -g vercel
vercel
```

Add `NEXT_PUBLIC_GOOGLE_SHEET_ID` and `NEXT_PUBLIC_GOOGLE_API_KEY` in the Vercel project settings under **Environment Variables**.

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Fonts | Playfair Display + Inter (Google Fonts) |
| Products | Google Sheets API v4 (public, no auth) |
| Checkout | WhatsApp `wa.me` deep link |

## File structure

```
lib/
  config.ts       ← all business-specific data (edit this)
  types.ts        ← shared TypeScript types
  sheets.ts       ← Google Sheets fetch + mock fallback
  whatsapp.ts     ← WhatsApp message builder
app/
  layout.tsx      ← fonts, metadata
  page.tsx        ← step state machine
components/
  steps/          ← one component per screen
  ProductCard.tsx
  VariantSheet.tsx
  ProductSkeleton.tsx
  StepHeader.tsx
```

## User flow

```
Menu → Cart → Order Details → Payment → Confirmation (WhatsApp opens)
```
