'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/context/AuthContext';
import { 
  ShoppingBag, 
  Search, 
  User as UserIcon, 
  Menu, 
  X, 
  Leaf, 
  ArrowRight,
  ShieldCheck,
  LogOut,
  Package,
  Image as ImageIcon,
  Settings
} from 'lucide-react';

interface NavbarProps {
  onSearchChange?: (term: string) => void;
  onSelectCategory?: (catId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchChange, onSelectCategory }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const openCart = useCartStore((state) => state.openCart);
  const getItemCount = useCartStore((state) => state.getItemCount);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const setB2BModalOpen = useCartStore((state) => state.setB2BModalOpen);

  const { 
    user, 
    profile, 
    orders, 
    openAuthModal, 
    openProfileModal, 
    openImageManager, 
    signOut,
    isConfigured 
  } = useAuth();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const itemCount = mounted ? getItemCount() : 0;
  const subtotal = mounted ? getSubtotal() : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchTerm);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Sanitary Pads', category: 'sanitary-pads' },
    { name: 'Bamboo Tissues', category: 'bamboo-tissues' },
    { name: 'Doctors Gloves', category: 'medical-gloves' },
    { name: 'Clinic Rolls', category: 'clinic-supplies' },
    { name: 'Bulk & Wholesale', isB2B: true },
  ];

  return (
    <header className="w-full sticky top-0 z-40 bg-white">
      {/* Top Banner */}
      <div className="bg-zinc-950 text-white text-xs py-2.5 px-4 tracking-wide font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-800/40">
              <Leaf className="w-3 h-3 text-emerald-400" /> 100% ECO-FRIENDLY
            </span>
            <span className="hidden sm:inline text-zinc-300">
              Free Carbon-Neutral Shipping on orders over $50 • Supabase Backend • CE & ISO 13485 Certified
            </span>
            <span className="sm:hidden text-zinc-300">
              Free Shipping over $50 • Supabase Powered
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openImageManager()}
              className="hidden md:inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer text-[11px]"
              title="Supabase Media & Image Storage"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Image Storage</span>
            </button>
            <span className="hidden md:inline text-zinc-700">|</span>
            <button
              onClick={() => setB2BModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-zinc-200 hover:text-white font-semibold transition-colors group cursor-pointer"
            >
              <span className="text-[11px] uppercase tracking-wider text-amber-300">Doctors & Clinics:</span>
              <span>Bulk Pricing</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full border-b transition-all duration-200 ${
          isScrolled ? 'border-zinc-200/80 shadow-xs py-3' : 'border-zinc-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center shadow-sm group-hover:bg-emerald-900 transition-colors">
                <Leaf className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="font-extrabold text-xl tracking-tight text-zinc-950 leading-none">
                  ECO<span className="text-emerald-700">LUXE</span>
                </div>
                <div className="text-[10px] uppercase font-semibold text-zinc-600 tracking-wider mt-0.5">
                  HYGIENE & MEDICAL CARE
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  if (link.isB2B) {
                    setB2BModalOpen(true);
                  } else if (link.category && onSelectCategory) {
                    onSelectCategory(link.category);
                    const el = document.getElementById('products-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
                  link.isB2B
                    ? 'text-emerald-800 hover:text-emerald-950 flex items-center gap-1 font-bold'
                    : 'text-zinc-700 hover:text-zinc-950'
                }`}
              >
                {link.isB2B && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />}
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Search Toggle */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search pads, gloves, tissues..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      if (onSearchChange) onSearchChange(e.target.value);
                    }}
                    autoFocus
                    className="w-48 sm:w-64 text-xs px-3 py-1.5 border border-zinc-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-zinc-50"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchTerm('');
                      if (onSearchChange) onSearchChange('');
                    }}
                    className="p-1.5 text-zinc-400 hover:text-zinc-700 ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search catalog"
                  className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Supabase Authentication & User Profile Button */}
            {mounted && (
              <div className="relative" ref={dropdownRef}>
                {user ? (
                  // Logged In User Pill
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-zinc-200 hover:border-emerald-600/50 bg-zinc-50 hover:bg-zinc-100 transition-all cursor-pointer shadow-xs"
                      aria-label="User Account"
                    >
                      <div className="w-7 h-7 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-xs overflow-hidden shrink-0">
                        {profile?.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={profile.avatarUrl}
                            alt={profile.fullName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          (profile?.fullName || user.email || 'U')[0].toUpperCase()
                        )}
                      </div>
                      <span className="hidden sm:inline text-xs font-bold text-zinc-800 max-w-[100px] truncate">
                        {profile?.fullName?.split(' ')[0] || 'Account'}
                      </span>
                    </button>

                    {/* User Dropdown Menu */}
                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-zinc-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-4 py-2 border-b border-zinc-100">
                          <p className="text-xs font-black text-zinc-950 truncate">
                            {profile?.fullName || 'EcoLuxe User'}
                          </p>
                          <p className="text-[11px] text-zinc-500 truncate">
                            {user.email}
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            {profile?.role === 'clinic' ? 'Verified Clinic' : 'Customer'}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            openProfileModal();
                          }}
                          className="w-full px-4 py-2 text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <Settings className="w-4 h-4 text-zinc-400" />
                          <span>My Profile & Details</span>
                        </button>

                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            openProfileModal();
                          }}
                          className="w-full px-4 py-2 text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <Package className="w-4 h-4 text-zinc-400" />
                          <span>Orders ({orders.length})</span>
                        </button>

                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            openImageManager();
                          }}
                          className="w-full px-4 py-2 text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <ImageIcon className="w-4 h-4 text-emerald-600" />
                          <span>Image Storage Bucket</span>
                        </button>

                        <div className="border-t border-zinc-100 my-1" />

                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            signOut();
                          }}
                          className="w-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  // Logged Out: Sign In Button
                  <button
                    onClick={() => openAuthModal('signin')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-zinc-800 hover:text-emerald-800 bg-zinc-100 hover:bg-emerald-50 rounded-full transition-colors cursor-pointer border border-zinc-200"
                    title="Sign In / Register with Supabase"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </button>
                )}
              </div>
            )}

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="flex items-center gap-2.5 bg-zinc-950 hover:bg-zinc-900 text-white pl-3.5 pr-4 py-2 rounded-full font-medium transition-transform active:scale-95 shadow-sm cursor-pointer"
              aria-label="View shopping cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-emerald-500 text-zinc-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-zinc-950">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold tracking-tight border-l border-zinc-800 pl-2">
                ${subtotal.toFixed(2)}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-800 hover:bg-zinc-100 rounded-lg cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-100 bg-white px-5 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
            {/* User status banner in mobile menu */}
            {user ? (
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-zinc-900">{profile?.fullName || user.email}</p>
                  <p className="text-[11px] text-zinc-500">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openProfileModal();
                    }}
                    className="p-2 bg-white rounded-lg border border-zinc-200 text-zinc-700"
                    title="Profile"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                    className="p-2 bg-red-50 text-red-600 rounded-lg border border-red-200"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('signin');
                }}
                className="w-full py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 mb-3"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In / Create Account</span>
              </button>
            )}

            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link.isB2B) {
                    setB2BModalOpen(true);
                  } else if (link.category && onSelectCategory) {
                    onSelectCategory(link.category);
                    const el = document.getElementById('products-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full text-left py-2 text-sm font-semibold text-zinc-800 hover:text-emerald-700 flex items-center justify-between border-b border-zinc-50"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openImageManager();
              }}
              className="w-full text-left py-2 text-sm font-semibold text-emerald-800 flex items-center justify-between border-b border-zinc-50"
            >
              <span className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Supabase Image Storage
              </span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </button>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setB2BModalOpen(true);
                }}
                className="w-full py-2.5 bg-emerald-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider text-center"
              >
                Doctor & Clinic Bulk Order Portal
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
