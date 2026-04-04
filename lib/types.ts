export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  variants: string[];
  image_url: string;
  active: boolean;
}

export interface CartItem {
  product: Product;
  variant?: string;
  quantity: number;
}

export type Step = 'menu' | 'product' | 'cart' | 'details' | 'payment' | 'confirmation' | 'info';

export interface OrderDetails {
  name: string;
  slot: string;
}
