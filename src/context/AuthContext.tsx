'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { UserProfile, UserOrder, UserRole } from '@/types/auth';
import { getUserProfile, updateUserProfile, getUserOrders } from '@/services/userService';
import { uploadImageToStorage, STORAGE_BUCKETS } from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  orders: UserOrder[];
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  
  // Modals state
  isAuthModalOpen: boolean;
  isProfileModalOpen: boolean;
  isImageManagerOpen: boolean;
  authModalTab: 'signin' | 'signup' | 'clinic';

  // Modal actions
  openAuthModal: (tab?: 'signin' | 'signup' | 'clinic') => void;
  closeAuthModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  openImageManager: () => void;
  closeImageManager: () => void;

  // Auth actions
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpWithEmail: (
    email: string, 
    password: string, 
    fullName: string, 
    role?: UserRole, 
    extraDetails?: Partial<UserProfile>
  ) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfileData: (data: Partial<UserProfile>) => Promise<{ error: string | null }>;
  uploadUserAvatar: (file: File) => Promise<{ url: string | null; error: string | null }>;
  refreshOrders: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_KEY = 'ecoluxe_demo_active_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup' | 'clinic'>('signin');

  const configured = isSupabaseConfigured();

  const loadUserProfile = useCallback(async (userId: string, userEmail?: string) => {
    try {
      let prof = await getUserProfile(userId);
      if (!prof) {
        // Create initial default profile if none exists
        prof = await updateUserProfile({
          id: userId,
          email: userEmail || 'user@ecoluxe.com',
          fullName: userEmail ? userEmail.split('@')[0] : 'EcoLuxe Member',
          role: 'customer',
        });
      }
      setProfile(prof);

      // Also load orders
      const userOrders = await getUserOrders(userId);
      setOrders(userOrders);
    } catch (err) {
      console.error('Failed to load profile/orders:', err);
    }
  }, []);

  const refreshOrders = useCallback(async () => {
    if (user) {
      const userOrders = await getUserOrders(user.id);
      setOrders(userOrders);
    } else {
      const guestOrders = await getUserOrders();
      setOrders(guestOrders);
    }
  }, [user]);

  // Initial session & auth listener
  useEffect(() => {
    if (!configured) {
      // In demo mode: check if demo user is stored in localStorage
      try {
        const storedDemo = localStorage.getItem(DEMO_USER_KEY);
        if (storedDemo) {
          const parsed = JSON.parse(storedDemo);
          setUser(parsed.user);
          setProfile(parsed.profile);
          getUserOrders(parsed.user.id).then(setOrders);
        } else {
          // Initialize with guest orders if any
          getUserOrders().then(setOrders);
        }
      } catch (e) {
        console.error('Demo auth init error:', e);
      }
      setLoading(false);
      return;
    }

    // Live Supabase Auth setup
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id, session.user.email);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await loadUserProfile(session.user.id, session.user.email);
      } else {
        setProfile(null);
        setOrders([]);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [configured, loadUserProfile]);

  const openAuthModal = (tab: 'signin' | 'signup' | 'clinic' = 'signin') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);
  const openImageManager = () => setIsImageManagerOpen(true);
  const closeImageManager = () => setIsImageManagerOpen(false);

  // Sign In with Email & Password
  const signInWithEmail = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (!configured) {
      // Demo authentication simulation
      const mockUserId = `demo-${btoa(email).substring(0, 12).toLowerCase()}`;
      const mockUser: any = {
        id: mockUserId,
        email,
        app_metadata: {},
        user_metadata: { full_name: email.split('@')[0] },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };

      const existingProfile = await getUserProfile(mockUserId);
      const activeProfile: UserProfile = existingProfile || {
        id: mockUserId,
        email,
        fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
        role: email.includes('clinic') || email.includes('dr') ? 'clinic' : 'customer',
        clinicName: email.includes('clinic') ? 'Green Valley Family Clinic' : undefined,
        address: '450 Wellness Blvd, Suite 200',
        city: 'San Francisco',
        postalCode: '94107',
        country: 'USA',
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      setProfile(activeProfile);
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify({ user: mockUser, profile: activeProfile }));
      await refreshOrders();
      closeAuthModal();
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        await loadUserProfile(data.user.id, data.user.email);
        closeAuthModal();
      }
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'An unexpected error occurred' };
    }
  };

  // Sign Up with Email
  const signUpWithEmail = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole = 'customer',
    extraDetails?: Partial<UserProfile>
  ): Promise<{ error: string | null }> => {
    if (!configured) {
      // Demo sign up simulation
      const mockUserId = `demo-${Date.now().toString(36)}`;
      const mockUser: any = {
        id: mockUserId,
        email,
        app_metadata: {},
        user_metadata: { full_name: fullName },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };

      const newProfile: UserProfile = {
        id: mockUserId,
        email,
        fullName,
        role,
        ...extraDetails,
        createdAt: new Date().toISOString(),
      };

      await updateUserProfile(newProfile);
      setUser(mockUser);
      setProfile(newProfile);
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify({ user: mockUser, profile: newProfile }));
      closeAuthModal();
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        // Save initial profile details
        const createdProfile = await updateUserProfile({
          id: data.user.id,
          email,
          fullName,
          role,
          ...extraDetails,
        });
        if (createdProfile) {
          setProfile(createdProfile);
        }
        closeAuthModal();
      }

      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'An unexpected signup error occurred' };
    }
  };

  // Google OAuth
  const signInWithGoogle = async (): Promise<{ error: string | null }> => {
    if (!configured) {
      // Demo Google Auth simulation
      return signInWithEmail('google.user@ecoluxe.com', 'password123');
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}` : undefined,
        },
      });
      if (error) return { error: error.message };
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Google Sign-in failed' };
    }
  };

  // Sign Out
  const signOut = async (): Promise<void> => {
    if (!configured) {
      setUser(null);
      setProfile(null);
      localStorage.removeItem(DEMO_USER_KEY);
      closeProfileModal();
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    closeProfileModal();
  };

  // Update Profile Data
  const updateProfileData = async (data: Partial<UserProfile>): Promise<{ error: string | null }> => {
    if (!user) return { error: 'No authenticated user' };

    try {
      const updated = await updateUserProfile({
        ...data,
        id: user.id,
      });

      if (updated) {
        setProfile(updated);
        if (!configured) {
          localStorage.setItem(DEMO_USER_KEY, JSON.stringify({ user, profile: updated }));
        }
        return { error: null };
      }
      return { error: 'Failed to update profile' };
    } catch (err: any) {
      return { error: err.message || 'Profile update error' };
    }
  };

  // Upload user avatar
  const uploadUserAvatar = async (file: File): Promise<{ url: string | null; error: string | null }> => {
    if (!user) return { url: null, error: 'Must be logged in to upload an avatar' };

    const { url, error } = await uploadImageToStorage(STORAGE_BUCKETS.AVATARS, `avatars/${user.id}`, file);
    if (url && !error) {
      await updateProfileData({ avatarUrl: url });
    }
    return { url, error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        orders,
        session,
        loading,
        isConfigured: configured,
        isAuthModalOpen,
        isProfileModalOpen,
        isImageManagerOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        openProfileModal,
        closeProfileModal,
        openImageManager,
        closeImageManager,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        updateProfileData,
        uploadUserAvatar,
        refreshOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
