'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Categories } from '@/components/Categories';
import { ProductGrid } from '@/components/ProductGrid';
import { PromoStrip } from '@/components/PromoStrip';
import { TrustSection } from '@/components/TrustSection';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ClinicB2BModal } from '@/components/ClinicB2BModal';
import { Toast } from '@/components/Toast';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
  };

  const handleSearchChange = (term: string) => {
    setSearchQuery(term);
    if (term.trim()) {
      const el = document.getElementById('products-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopClick = () => {
    setSelectedCategory('all');
    const el = document.getElementById('products-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-950">
      {/* 1. Header with Top Announcement Bar & Nav Links */}
      <Navbar
        onSearchChange={handleSearchChange}
        onSelectCategory={handleSelectCategory}
      />

      <main className="flex-1">
        {/* 2. Hero Section (Design B ShopLuxe composition) */}
        <Hero
          onShopClick={handleShopClick}
          onExploreCollections={handleShopClick}
        />

        {/* 3. Browse By Category 8-Card Grid (Design B) */}
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* 4. Trending & Featured Products Section (Design B) */}
        <ProductGrid
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          searchQuery={searchQuery}
        />

        {/* 5. Triple Promo Banner Strips (Design B) */}
        <PromoStrip onShopClick={handleShopClick} />

        {/* 6. Trust, Doctor Reviews & Certification Seals (Design B) */}
        <TrustSection />

        {/* 7. Newsletter Subscription Section (Design B) */}
        <Newsletter />
      </main>

      {/* 8. Comprehensive Dark Footer (Design B) */}
      <Footer />

      {/* Dynamic Slide-over Drawers & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <CheckoutModal />
      <ClinicB2BModal />
      <Toast />
    </div>
  );
}
