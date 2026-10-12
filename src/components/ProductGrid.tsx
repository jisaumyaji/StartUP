'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '@/types';
import { ArrowRight, SlidersHorizontal, Sparkles } from 'lucide-react';

interface ProductGridProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const filterTabs = [
    { id: 'all', label: 'All Essentials' },
    { id: 'sanitary-pads', label: 'Sanitary Pads' },
    { id: 'bamboo-tissues', label: 'Bamboo Tissues' },
    { id: 'medical-gloves', label: 'Doctor Gloves' },
    { id: 'clinic-supplies', label: 'Clinic Rolls' },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.variants[0].price - a.variants[0].price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="products-section" className="py-16 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Matches Design B Trending Products row) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>CERTIFIED ECO-FRIENDLY & SURGICAL GRADE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 uppercase tracking-tight">
              TRENDING PRODUCTS
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 bg-white px-3 py-2 rounded-xl border border-zinc-200">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none font-bold text-zinc-900 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="rating">Top Rated (5.0 ★)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <button
              onClick={() => onSelectCategory('all')}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:text-emerald-800 uppercase tracking-wider transition-colors"
            >
              <span>VIEW ALL PRODUCTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Category Tabs (Design B clean pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'bg-white text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search status feedback */}
        {searchQuery.trim() && (
          <div className="mb-6 bg-white px-4 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-600 flex items-center justify-between">
            <span>
              Showing results for: <strong className="text-zinc-950">"{searchQuery}"</strong> ({filteredProducts.length} items found)
            </span>
            <button
              onClick={() => onSelectCategory('all')}
              className="text-emerald-700 font-bold hover:underline"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Product Cards Grid (Design B style 4-column layout) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-zinc-200 p-8">
            <p className="text-zinc-500 text-sm">No products matched your criteria.</p>
            <button
              onClick={() => onSelectCategory('all')}
              className="mt-3 text-xs font-bold text-zinc-900 underline"
            >
              View all products
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
