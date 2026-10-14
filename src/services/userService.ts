import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { UserProfile, UserOrder } from '@/types/auth';

const LOCAL_STORAGE_PROFILES_KEY = 'ecoluxe_user_profiles';
const LOCAL_STORAGE_ORDERS_KEY = 'ecoluxe_user_orders';

// Fallback helper for local storage
function getLocalProfiles(): Record<string, UserProfile> {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_PROFILES_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveLocalProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    const profiles = getLocalProfiles();
    profiles[profile.id] = profile;
    localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(profiles));
  } catch (err) {
    console.error('Failed to save profile locally:', err);
  }
}

function getLocalOrders(): UserOrder[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveLocalOrder(order: UserOrder): void {
  if (typeof window === 'undefined') return;
  try {
    const orders = getLocalOrders();
    orders.unshift(order);
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save order locally:', err);
  }
}

/**
 * Fetch a user profile by ID from Supabase
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  if (!isSupabaseConfigured()) {
    const local = getLocalProfiles();
    return local[userId] || null;
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.warn('Error fetching Supabase profile:', error.message);
      return null;
    }

    if (!data) return null;

    return {
      id: data.id,
      email: data.email,
      fullName: data.full_name || '',
      phone: data.phone || '',
      avatarUrl: data.avatar_url || '',
      role: data.role || 'customer',
      clinicName: data.clinic_name || '',
      clinicVat: data.clinic_vat || '',
      address: data.address || '',
      city: data.city || '',
      postalCode: data.postal_code || '',
      country: data.country || 'USA',
      createdAt: data.created_at || new Date().toISOString(),
      updatedAt: data.updated_at,
    };
  } catch (err) {
    console.error('Exception fetching profile:', err);
    return null;
  }
}

/**
 * Upsert or update a user profile in Supabase
 */
export async function updateUserProfile(profile: Partial<UserProfile> & { id: string }): Promise<UserProfile | null> {
  if (!isSupabaseConfigured()) {
    const local = getLocalProfiles();
    const existing = local[profile.id] || {
      id: profile.id,
      email: profile.email || 'user@example.com',
      fullName: profile.fullName || 'EcoLuxe Member',
      role: profile.role || 'customer',
      createdAt: new Date().toISOString(),
    };

    const updated: UserProfile = {
      ...existing,
      ...profile,
      updatedAt: new Date().toISOString(),
    };

    saveLocalProfile(updated);
    return updated;
  }

  try {
    const dbPayload = {
      id: profile.id,
      email: profile.email,
      full_name: profile.fullName,
      phone: profile.phone,
      avatar_url: profile.avatarUrl,
      role: profile.role,
      clinic_name: profile.clinicName,
      clinic_vat: profile.clinicVat,
      address: profile.address,
      city: profile.city,
      postal_code: profile.postalCode,
      country: profile.country,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('profiles')
      .upsert(dbPayload)
      .select()
      .single();

    if (error) {
      console.error('Error updating Supabase profile:', error);
      throw error;
    }

    return {
      id: data.id,
      email: data.email,
      fullName: data.full_name,
      phone: data.phone,
      avatarUrl: data.avatar_url,
      role: data.role,
      clinicName: data.clinic_name,
      clinicVat: data.clinic_vat,
      address: data.address,
      city: data.city,
      postalCode: data.postal_code,
      country: data.country,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (err) {
    console.error('Exception updating profile:', err);
    return null;
  }
}

/**
 * Save an order to Supabase
 */
export async function saveOrder(order: UserOrder): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    saveLocalOrder(order);
    return true;
  }

  try {
    const { error } = await supabase.from('orders').insert({
      id: order.id,
      user_id: order.userId || null,
      customer_details: order.customer,
      items: order.items,
      subtotal: order.subtotal,
      discount: order.discount,
      shipping: order.shipping,
      tax: order.tax,
      total: order.total,
      status: order.status,
      tracking_number: order.trackingNumber || `TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
      created_at: order.createdAt,
    });

    if (error) {
      console.error('Failed to save order to Supabase:', error);
      // Fallback save to local storage so user data is never lost
      saveLocalOrder(order);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Exception saving order:', err);
    saveLocalOrder(order);
    return false;
  }
}

/**
 * Fetch orders for a specific user from Supabase
 */
export async function getUserOrders(userId?: string): Promise<UserOrder[]> {
  if (!isSupabaseConfigured() || !userId) {
    const local = getLocalOrders();
    if (userId) {
      return local.filter((o) => o.userId === userId || !o.userId);
    }
    return local;
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching Supabase orders, falling back to local:', error.message);
      return getLocalOrders();
    }

    if (!data || data.length === 0) {
      return getLocalOrders();
    }

    return data.map((item) => ({
      id: item.id,
      userId: item.user_id,
      customer: item.customer_details,
      items: item.items || [],
      subtotal: Number(item.subtotal || 0),
      discount: Number(item.discount || 0),
      shipping: Number(item.shipping || 0),
      tax: Number(item.tax || 0),
      total: Number(item.total || 0),
      status: item.status || 'confirmed',
      trackingNumber: item.tracking_number,
      createdAt: item.created_at,
    }));
  } catch (err) {
    console.error('Exception fetching orders:', err);
    return getLocalOrders();
  }
}
