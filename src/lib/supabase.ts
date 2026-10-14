import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variable extraction
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Checks if real Supabase environment variables are properly configured
 */
export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 20 &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

/**
 * Singleton Supabase Client
 * Uses placeholder values if env vars are missing so the build & SSR don't crash
 */
const dummyUrl = 'https://placeholder.supabase.co';
const dummyKey = 'placeholder-anon-key-that-satisfies-jwt-length-requirement-000000000000';

export const supabase: SupabaseClient = createClient(
  supabaseUrl && supabaseUrl.startsWith('https://') ? supabaseUrl : dummyUrl,
  supabaseAnonKey && supabaseAnonKey.length > 10 ? supabaseAnonKey : dummyKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
