'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { 
  X, 
  Star, 
  ShoppingBag, 
  ShieldCheck, 
  Leaf, 
  Clock, 
  Check, 
  Plus, 
  Minus,
  Sparkles,
  Award
} from 'lucide-react';
import { ProductVariant } from '@/types';

export const QuickViewModal: React.FC = () => {
  const quickViewProduct = useCartStore((state) => state.quickViewProduct);
  const setQuickViewProduct = useCartStore((state) => state.setQuickViewProduct);
  const addItem = useCartStore((state) => state.addItem);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const currentVariant = selectedVariant || quickViewProduct.variants[0];

  const handleAddToCart = () => {
    addItem(quickViewProduct, currentVariant, quantity);
    setQuickViewProduct(null);
    setQuantity(1);
    setSelectedVariant(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => {
          setQuickViewProduct(null);
          setSelectedVariant(null);
          setQuantity(1);
        }}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={() => {
              setQuickViewProduct(null);
              setSelectedVariant(null);
              setQuantity(1);
            }}
            className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Product Image & Eco-metrics */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-stone-50 border border-zinc-200/80 shadow-xs relative">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  className="w-full h-full object-cover"
                />

                {quickViewProduct.badge && (
                  <span className="absolute top-4 left-4 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {quickViewProduct.badge}
                  </span>
                )}
              </div>

              {/* Eco Metrics Card */}
              <div className="bg-stone-50 border border-zinc-200/80 rounded-2xl p-4 space-y-2">
                <div className="text-[11px] font-bold text-zinc-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sustainability Impact</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-zinc-100">
                    <div className="text-[10px] text-zinc-400 uppercase font-semibold">Plastic Reduction</div>
                    <div className="font-bold text-emerald-800">{quickViewProduct.ecoMetrics.plasticSaved}</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-zinc-100">
                    <div className="text-[10px] text-zinc-400 uppercase font-semibold">Degradation</div>
                    <div className="font-bold text-emerald-800">{quickViewProduct.ecoMetrics.biodegradableTime}</div>
                  </div>
                </div>
                <div className="text-[11px] text-zinc-500 pt-1">
                  <strong>Materials:</strong> {quickViewProduct.ecoMetrics.material}
                </div>
              </div>
            </div>

            {/* Right: Info, Variants & Buy Action */}
            <div className="space-y-5">
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(quickViewProduct.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-zinc-200 text-zinc-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-zinc-600">
                    {quickViewProduct.rating} ({quickViewProduct.reviewCount} reviews)
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-zinc-950 leading-tight">
                  {quickViewProduct.title}
                </h2>
                <p className="text-xs text-zinc-500 mt-1 font-medium">
                  {quickViewProduct.subtitle}
                </p>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-2.5 py-2 border-y border-zinc-100">
                <span className="text-2xl font-black text-zinc-950">
                  ${currentVariant.price.toFixed(2)}
                </span>
                {currentVariant.originalPrice && (
                  <span className="text-sm font-semibold text-zinc-400 line-through">
                    ${currentVariant.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="ml-auto text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  In Stock & Ready to Ship
                </span>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Variant Selector (Sizes / Pack counts) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-900 block">
                  Select Option / Size:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickViewProduct.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        currentVariant.id === v.id
                          ? 'border-zinc-950 bg-zinc-950 text-white shadow-xs'
                          : 'border-zinc-200 bg-white hover:border-zinc-400 text-zinc-800'
                      }`}
                    >
                      <div className="font-bold">{v.name}</div>
                      <div className={currentVariant.id === v.id ? 'text-zinc-300' : 'text-zinc-500'}>
                        ${v.price.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Certifications list */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold uppercase text-zinc-400 tracking-wider">
                  Accredited Certifications
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] font-bold bg-zinc-100 text-zinc-800 px-2.5 py-1 rounded-lg border border-zinc-200"
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Add to Cart button */}
              <div className="pt-3 flex items-center gap-3">
                <div className="flex items-center border border-zinc-300 rounded-xl bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-zinc-600 hover:bg-zinc-100"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-zinc-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 text-zinc-600 hover:bg-zinc-100"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart • ${(currentVariant.price * quantity).toFixed(2)}</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
