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
    const [, ...rows] = data.values; // skip header row

    return rows
      .map((row, index) => ({
        id: `product-${index}`,
        name: row[0] ?? '',
        description: row[1] ?? '',
        price: parseFloat(row[2] ?? '0') || 0,
        variants: row[3] ? row[3].split('|').map((v) => v.trim()) : [],
        image_url: row[4] ?? '',
        active: row[5]?.toLowerCase() === 'true',
      }))
      .filter((p) => p.active);
  } catch (err) {
    console.error('Error fetching products:', err);
    return MOCK_PRODUCTS;
  }
}
