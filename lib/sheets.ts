import { Product } from './types';

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
  try {
    const res = await fetch('/api/products', { cache: 'no-store' });

    if (!res.ok) {
      console.warn('Products API fetch failed — falling back to mock data');
      return MOCK_PRODUCTS;
    }

    const data = (await res.json()) as { products: Product[] | null };

    // null means the API route has no credentials configured
    if (data.products === null) {
      return MOCK_PRODUCTS;
    }

    return data.products;
  } catch (err) {
    console.error('Error fetching products:', err);
    return MOCK_PRODUCTS;
  }
}
