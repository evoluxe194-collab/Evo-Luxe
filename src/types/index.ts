export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Rings' | 'Earrings' | 'Necklaces' | 'Pendants' | 'Bracelets' | 'Bangles' | 'Anklets' | 'Men';
  occasion: 'Everyday' | 'Work Edit' | 'Date Night' | 'Vacation' | 'Festive' | 'Celebrations' | 'Gifting' | 'Self Love';
  collection: 'The Essentials' | 'The Signatures' | 'The Layering Edit' | 'The Gift Edit' | "The Men's Edit";
  price: number;
  mrp: number;
  weight: string;
  dimensions: string;
  purity: string;
  images: string[];
  description: string;
  details: string[];
  sizes?: string[];
  pairWithIds: string[];
  isBestseller?: boolean;
  isNew?: boolean;
  canPersonalise?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  personalisationText?: string;
}

export interface FilterState {
  category: string;
  occasion: string;
  collection: string;
  priceRange: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}
