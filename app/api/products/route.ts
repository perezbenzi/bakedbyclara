import { NextResponse } from 'next/server';
import { Product } from '@/lib/types';

function toDirectImageUrl(url: string): string {
  const match = url.match(/\/file\/d\/([^/]+)\//);
  if (match) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
}

export async function GET() {
  const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  console.log('[products] env check — sheetId:', sheetId ? `"${sheetId}"` : 'MISSING', '| apiKey:', apiKey ? 'present' : 'MISSING');

  if (!sheetId || !apiKey) {
    console.warn('[products] Missing credentials — returning null (mock fallback)');
    return NextResponse.json({ products: null }, { status: 200 });
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;
    console.log('[products] Fetching:', url.replace(apiKey, 'API_KEY_REDACTED'));

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error('[products] Google Sheets fetch failed:', res.status, res.statusText, '| body:', errorBody);
      return NextResponse.json({ products: null, error: `${res.status} ${res.statusText}` }, { status: 200 });
    }

    const data = (await res.json()) as { values: string[][] };
    const rawRows = data.values ?? [];

    console.log('[products] Rows received:', rawRows.length, '| headers:', rawRows[0]);

    if (rawRows.length < 2) {
      console.warn('[products] Sheet has fewer than 2 rows — returning empty array');
      return NextResponse.json({ products: [] }, { status: 200 });
    }

    const headerRow = rawRows[0] ?? [];
    const headers = headerRow.map((h) => h.trim().toLowerCase());
    const rows = rawRows.slice(1);

    const colIndex = (keys: string[]): number => {
      for (const key of keys) {
        const i = headers.indexOf(key.toLowerCase());
        if (i >= 0) return i;
      }
      return -1;
    };

    const getCell = (row: string[], keys: string[], fallbackIndex: number): string => {
      const idx = colIndex(keys);
      const i = idx >= 0 ? idx : fallbackIndex;
      return row[i] ?? '';
    };

    const products: Product[] = rows
      .map((row, index) => {
        const slugIdx = colIndex(['slug']);
        const idIdx = colIndex(['id']);
        let externalId = '';
        if (slugIdx >= 0) externalId = (row[slugIdx] ?? '').trim();
        if (!externalId && idIdx >= 0) externalId = (row[idIdx] ?? '').trim();
        const id = externalId || `product-${index}`;

        const variantsRaw = getCell(row, ['variants', 'variantes'], 3);

        return {
          id,
          name: getCell(row, ['name', 'nombre'], 0),
          description: getCell(row, ['description', 'descripcion'], 1),
          price: parseFloat(getCell(row, ['price', 'precio'], 2)) || 0,
          variants: variantsRaw ? variantsRaw.split('|').map((v) => v.trim()) : [],
          image_url: toDirectImageUrl(getCell(row, ['image_url', 'image', 'imagen'], 4)),
          active: getCell(row, ['active', 'activo'], 5).toLowerCase() === 'true',
        };
      })
      .filter((p) => p.active);

    console.log('[products] Returning', products.length, 'active products');
    return NextResponse.json({ products });
  } catch (err) {
    console.error('[products] Unexpected error:', err);
    return NextResponse.json({ products: null, error: String(err) }, { status: 200 });
  }
}
