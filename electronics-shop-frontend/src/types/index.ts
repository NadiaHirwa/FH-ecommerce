export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  quantity?: number;
  discount?: number;
}

export interface CartItem extends Product {
  cartQuantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
  updatedAt: Date;
}

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
}
