export type UserRole = 'customer' | 'clinic' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  clinicName?: string;
  clinicVat?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserOrder {
  id: string;
  userId: string | null;
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
  items: {
    productId: string;
    title: string;
    variantName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  createdAt: string;
}

export interface StorageImage {
  name: string;
  id: string;
  size?: number;
  updatedAt?: string | null;
  created_at?: string | null;
  last_accessed_at?: string | null;
  metadata?: Record<string, any>;
  publicUrl: string;
}
