'use client';

import React from 'react';
import { Product } from '@/types';
import { Star, ShoppingBag, Eye, Check, ShieldCheck, Leaf } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const setQuickViewProduct = useCartStore((state) => state.setQuickViewProduct);

  const defaultVariant = product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, defaultVariant, 1);
  };

  const getBadgeStyle = () => {
    if (product.badgeType === 'medical') {
      return 'bg-blue-900 text-white border-blue-800';
    }
    if (product.badgeType === 'eco') {
      return 'bg-emerald-800 text-white border-emerald-700';
    }
    if (product.badgeType === 'bestseller') {
      return 'bg-amber-800 text-white border-amber-700';
    }
    return 'bg-zinc-950 text-white border-zinc-900';
  };

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group bg-white rounded-2xl border border-zinc-200/90 hover:border-zinc-400 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-lg cursor-pointer relative"
    >
      {/* Top Badges (Design B Pill Badge) */}
      <div className="flex items-center justify-between w-full mb-3 z-10">
        {product.badge ? (
          <span
            className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-xs ${getBadgeStyle()}`}
          >
            {product.badge}
          </span>
        ) : (
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            Eco-Certified
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          aria-label="Quick View Product"
          className="w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors"
          title="Quick Preview"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Product Image Frame */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-50 mb-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay with quick specs */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/40 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200 text-white text-[11px]">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-300">
            <Leaf className="w-3 h-3" />
            <span>{product.ecoMetrics.plasticSaved}</span>
          </div>
          <div className="text-zinc-200 text-[10px] truncate">
            {product.ecoMetrics.material}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Star Ratings */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-zinc-200 text-zinc-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-zinc-500">
              ({product.reviewCount})
            </span>
          </div>

          {/* Product Title (Design B Style) */}
          <h3 className="text-sm font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
            {product.title}
          </h3>

          <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing & Add To Cart Button (Design B signature) */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-zinc-950">
                ${defaultVariant.price.toFixed(2)}
              </span>
              {defaultVariant.originalPrice && (
                <span className="text-xs font-medium text-zinc-400 line-through">
                  ${defaultVariant.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="text-[10px] text-zinc-500 font-medium">
              {defaultVariant.name}
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            className="inline-flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 active:bg-black text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>
    </div>
  );
};
