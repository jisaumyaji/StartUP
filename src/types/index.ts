export type ProductCategory = 
  | 'all'
  | 'sanitary-pads'
  | 'bamboo-tissues'
  | 'medical-gloves'
  | 'clinic-supplies'
  | 'eco-paper';

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Size: Medium (M)" or "Pack: 20 Pads" or "Box of 100"
  price: number;
  originalPrice?: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  badgeType?: 'discount' | 'eco' | 'medical' | 'bestseller';
  image: string;
  secondaryImage?: string;
  description: string;
  features: string[];
  certifications: string[]; // e.g. "FDA 510(k)", "CE Certified", "100% Bamboo", "OK Compost Home"
  ecoMetrics: {
    plasticSaved: string; // e.g. "98% Plastic-Free"
    biodegradableTime: string; // e.g. "180 Days Compostable"
    material: string; // e.g. "100% Organic Bamboo Fiber"
  };
  variants: ProductVariant[];
  isB2BRecommended?: boolean;
  bulkTierDiscount?: string;
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    isClinicOrder: boolean;
    clinicName?: string;
  };
  createdAt: string;
}
