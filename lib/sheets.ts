import { Product } from './types';
import { config } from './config';

// Demo products shown when Google Sheets is not configured
const MOCK_PRODUCTS: Product[] = [
  {
    id: 'mock-1',
    name: 'Cookies de Chocolate',
    description: 'Clásicas con chips de chocolate belga y sal marina en escamas',
    price: 1200,
    variants: [],
    image_url:
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80',
    active: true,
  },
  {
    id: 'mock-2',
    name: 'Alfajores',
    description: 'Suaves y esponjosos, rellenos con dulce de leche artesanal',
    price: 1500,
    variants: ['Maizena', 'Chocolate'],
    image_url:
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80',
    active: true,
  },
  {
    id: 'mock-3',
    name: 'Brownies',
    description: 'Húmedos y crocantes por fuera, con chocolate 70% cacao',
    price: 1800,
    variants: ['Con nueces', 'Sin nueces'],
    image_url:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    active: true,
  },
  {
    id: 'mock-4',
    name: 'Cookies de Vainilla',
    description: 'Delicadas con extracto de vainilla y azúcar impalpable',
    price: 1100,
    variants: [],
    image_url:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80',
    active: true,
  },
  {
    id: 'mock-5',
    name: 'Medialunas',
    description: 'Esponjosas medialunas de manteca, receta tradicional porteña',
    price: 800,
    variants: [],
    image_url:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80',
    active: true,
  },
  {
    id: 'mock-6',
    name: 'Muffins',
    description: 'Esponjosos con diferentes sabores y cobertura crujiente',
    price: 1300,
    variants: ['Arándanos', 'Chocolate', 'Limón'],
    image_url:
      'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&q=80',
    active: true,
  },
];

export async function fetchProducts(): Promise<Product[]> {
  if (
    config.googleSheetId === 'REPLACE_WITH_SHEET_ID' ||
    !config.googleApiKey
  ) {
    // Return mock data for demo / local development without credentials
    return MOCK_PRODUCTS;
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.googleSheetId}/values/Sheet1?key=${config.googleApiKey}`;
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      console.warn('Google Sheets fetch failed — falling back to mock data');
      return MOCK_PRODUCTS;
    }

    const data = (await res.json()) as { values: string[][] };
    const rawRows = data.values ?? [];
    if (rawRows.length < 2) {
      return [];
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

    return rows
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
          image_url: getCell(row, ['image_url', 'image', 'imagen'], 4),
          active: getCell(row, ['active', 'activo'], 5).toLowerCase() === 'true',
        };
      })
      .filter((p) => p.active);
  } catch (err) {
    console.error('Error fetching products:', err);
    return MOCK_PRODUCTS;
  }
}
