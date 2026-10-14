import { supabase, isSupabaseConfigured } from './supabase';
import { StorageImage } from '@/types/auth';

export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  PRODUCT_IMAGES: 'product-images',
  CLINIC_DOCS: 'clinic-documents',
} as const;

/**
 * Upload an image file to Supabase Storage
 */
export async function uploadImageToStorage(
  bucket: string,
  path: string,
  file: File
): Promise<{ url: string | null; error: string | null }> {
  try {
    if (!isSupabaseConfigured()) {
      // In demo mode without live Supabase credentials, generate a temporary local object URL or data URL
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          // Store in session storage for demo persistence
          try {
            sessionStorage.setItem(`demo_img_${path}`, dataUrl);
          } catch {}
          resolve({ url: dataUrl, error: null });
        };
        reader.onerror = () => resolve({ url: null, error: 'Failed to read image locally' });
        reader.readAsDataURL(file);
      });
    }

    // 1. Upload to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = path ? `${path}/${cleanFileName}` : cleanFileName;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('Supabase storage upload error:', uploadError);
      return { url: null, error: uploadError.message };
    }

    // 2. Retrieve public URL
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return { url: data.publicUrl, error: null };
  } catch (err: any) {
    console.error('Unexpected error uploading image:', err);
    return { url: null, error: err.message || 'Unknown upload error' };
  }
}

/**
 * Get public URL for a file in Supabase Storage
 */
export function getStoragePublicUrl(bucket: string, path: string): string {
  if (!isSupabaseConfigured()) {
    const demoUrl = typeof window !== 'undefined' ? sessionStorage.getItem(`demo_img_${path}`) : null;
    return demoUrl || '/placeholder.png';
  }
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Fetch list of images from a Supabase bucket
 */
export async function fetchBucketImages(bucket: string): Promise<StorageImage[]> {
  if (!isSupabaseConfigured()) {
    // Return sample gallery images for demo mode
    return [
      {
        id: '1',
        name: 'bamboo-pads-eco.webp',
        publicUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        size: 245000,
        created_at: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        last_accessed_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'bamboo-tissues-pack.webp',
        publicUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
        size: 312000,
        created_at: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        last_accessed_at: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'medical-surgical-gloves.webp',
        publicUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80',
        size: 198000,
        created_at: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        last_accessed_at: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'clinic-bed-rolls.webp',
        publicUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        size: 276000,
        created_at: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        last_accessed_at: new Date().toISOString(),
      }
    ];
  }

  try {
    const { data, error } = await supabase.storage.from(bucket).list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (error || !data) {
      console.warn(`Could not list files from bucket '${bucket}':`, error?.message);
      return [];
    }

    return data
      .filter((file) => !file.name.startsWith('.'))
      .map((file) => {
        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(file.name);
        return {
          id: file.id || file.name,
          name: file.name,
          size: file.metadata?.size || 0,
          created_at: file.created_at,
          updatedAt: file.updated_at,
          last_accessed_at: file.last_accessed_at,
          publicUrl: urlData.publicUrl,
        };
      });
  } catch (err) {
    console.error('Error fetching images:', err);
    return [];
  }
}
