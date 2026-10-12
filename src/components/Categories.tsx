'use client';

import React from 'react';
import { 
  HeartHandshake, 
  Feather, 
  ShieldCheck, 
  Stethoscope, 
  Layers, 
  Sparkles, 
  Boxes, 
  LayoutGrid,
  ArrowRight
} from 'lucide-react';
import { ProductCategory } from '@/types';

interface CategoriesProps {
  selectedCategory: string;
  onSelectCategory: (catId: ProductCategory | string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categoryCards = [
    {
      id: 'sanitary-pads',
      name: 'Sanitary Pads',
      sub: 'Bamboo & Organic',
      icon: HeartHandshake,
      img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'bamboo-tissues',
      name: 'Bamboo Tissues',
      sub: 'Unbleached 3-Ply',
      icon: Feather,
      img: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'medical-gloves',
      name: 'Doctor Gloves',
      sub: 'Bio-Nitrile & Sterile',
      icon: ShieldCheck,
      img: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'clinic-supplies',
      name: 'Clinic Rolls',
      sub: 'Examination Paper',
      icon: Stethoscope,
      img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'sanitary-pads',
      name: 'Panty Liners',
      sub: 'Daily Freshness',
      icon: Layers,
      img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'bamboo-tissues',
      name: 'Pocket Tissues',
      sub: '100% Tree-Free',
      icon: Sparkles,
      img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'clinic-supplies',
      name: 'Bulk Hospital Packs',
      sub: 'Cases of 1000+',
      icon: Boxes,
      img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'all',
      name: 'More Categories',
      sub: 'View All Products',
      icon: LayoutGrid,
      img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Design B Style) */}
        <div className="text-center mb-8">
          <h2 className="text-sm font-extrabold tracking-wider text-zinc-900 uppercase">
            BROWSE BY CATEGORY
          </h2>
          <div className="w-10 h-0.5 bg-zinc-950 mx-auto mt-2"></div>
        </div>

        {/* 8-Card Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categoryCards.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={idx}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('products-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group flex flex-col items-center text-center p-3 sm:p-3.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-950 text-white shadow-md ring-2 ring-zinc-900 scale-[1.02]'
                    : 'bg-stone-50/80 hover:bg-zinc-100/80 text-zinc-800 border border-zinc-100'
                }`}
              >
                {/* Rounded Photo & Icon Box (Design B) */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden mb-2.5 flex items-center justify-center relative shadow-xs transition-transform duration-200 group-hover:scale-105 ${
                    isSelected ? 'bg-zinc-800' : 'bg-white'
                  }`}
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center backdrop-blur-[1px] transition-opacity ${
                      isSelected
                        ? 'bg-zinc-950/60 text-emerald-400'
                        : 'bg-zinc-950/20 text-white opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="text-xs font-bold leading-tight line-clamp-1">
                  {cat.name}
                </div>
                <div
                  className={`text-[10px] mt-0.5 line-clamp-1 ${
                    isSelected ? 'text-zinc-300' : 'text-zinc-500'
                  }`}
                >
                  {cat.sub}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
