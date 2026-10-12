'use client';

import React from 'react';
import { Package, Percent, Gift, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface PromoStripProps {
  onShopClick?: () => void;
}

export const PromoStrip: React.FC<PromoStripProps> = ({ onShopClick }) => {
  const setB2BModalOpen = useCartStore((state) => state.setB2BModalOpen);

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Box 1: Dark Free Shipping (Matches Design B Left Block) */}
          <div className="bg-zinc-950 text-white rounded-2xl p-6 sm:p-7 flex items-center justify-between gap-4 group cursor-pointer shadow-md hover:bg-zinc-900 transition-colors"
               onClick={onShopClick}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                <Package className="w-6 h-6 text-zinc-100" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-100">
                  FREE SHIPPING
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  On orders over $50
                </p>
                <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: Warm Sand Special Clinic Offer (Matches Design B Middle Block) */}
          <div className="bg-[#E7D6C4] text-zinc-950 rounded-2xl p-6 sm:p-7 flex items-center justify-between gap-4 group cursor-pointer shadow-md hover:bg-[#DECAAF] transition-colors"
               onClick={() => setB2BModalOpen(true)}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center shrink-0">
                <Percent className="w-6 h-6 text-zinc-900" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900">
                  SPECIAL CLINIC OFFER
                </h4>
                <p className="text-xs text-zinc-700 mt-0.5">
                  Save up to 40% on bulk cases
                </p>
                <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-zinc-950 group-hover:translate-x-1 transition-transform">
                  <span>Grab the Deal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Box 3: Light Member Benefits (Matches Design B Right Block) */}
          <div className="bg-stone-50 border border-zinc-200 text-zinc-950 rounded-2xl p-6 sm:p-7 flex items-center justify-between gap-4 group cursor-pointer shadow-md hover:bg-stone-100 transition-colors"
               onClick={() => setB2BModalOpen(true)}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-200/80 flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6 text-zinc-900" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900">
                  MEMBER & CLINIC PERKS
                </h4>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Join now & get wholesale deals
                </p>
                <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-zinc-950 group-hover:translate-x-1 transition-transform">
                  <span>Join Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
