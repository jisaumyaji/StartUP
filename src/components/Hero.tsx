'use client';

import React, { useState } from 'react';
import { ArrowRight, Truck, RotateCcw, ShieldCheck, ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface HeroProps {
  onShopClick?: () => void;
  onExploreCollections?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onExploreCollections }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const setB2BModalOpen = useCartStore((state) => state.setB2BModalOpen);

  const heroSlides = [
    {
      badge: 'BIODEGRADABLE & CLINIC CERTIFIED',
      headlinePart1: 'SUSTAINABLE CARE.',
      headlinePart2: 'FOR EVERYONE.',
      subline: 'Best Quality, Best Prices!',
      desc: 'Discover ultra-gentle bamboo sanitary pads, pure unbleached tissue papers, and certified biodegradable examination & surgical gloves designed for families and healthcare professionals.',
      mainImage: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=1000&q=80',
      tagline: 'Eco Nitrile Gloves & Bamboo Care',
      discountTag: 'UP TO 40% OFF',
      discountSub: 'CLINIC PACKS'
    },
    {
      badge: '100% ORGANIC BAMBOO FIBER',
      headlinePart1: 'PERIOD CARE.',
      headlinePart2: 'ZERO PLASTIC RASH.',
      subline: 'Gentle on You, Kind to Earth!',
      desc: 'Chemical-free bamboo sanitary pads and organic panty liners with supreme leak-lock absorbency and 180-day home compostable wrappers.',
      mainImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
      tagline: 'Ultra-Soft Breathable Bamboo Pads',
      discountTag: 'SAVE 28%',
      discountSub: 'EVERYDAY PACKS'
    },
    {
      badge: 'UNBLEACHED & TREE-FREE',
      headlinePart1: 'BAMBOO TISSUES.',
      headlinePart2: 'VELVET SOFTNESS.',
      subline: 'Pure Botanical Softness!',
      desc: 'Save forests with silky 3-ply virgin bamboo facial tissues and kitchen paper towels. Naturally hypoallergenic, unscented, and chlorine-free.',
      mainImage: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1000&q=80',
      tagline: 'Zero-Plastic Packaging Tissues',
      discountTag: 'BUY 6 PACK',
      discountSub: 'FREE SHIPPING'
    }
  ];

  const current = heroSlides[activeSlide];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50/60 via-white to-stone-50/30 pt-6 pb-12 sm:pb-16 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTA (Design B Exact Composition) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>WELCOME TO ECOLUXE ESSENTIALS</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 tracking-tight uppercase leading-[1.08]">
                <div>{current.headlinePart1}</div>
                <div className="text-zinc-900">{current.headlinePart2}</div>
              </h1>
              <p className="font-serif italic text-2xl sm:text-3xl text-amber-900/90 pt-1">
                {current.subline}
              </p>
            </div>

            <p className="text-sm sm:text-base text-zinc-600 max-w-xl leading-relaxed">
              {current.desc}
            </p>

            {/* Buttons (Design B: Black Pill + White Outlined Pill) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-full transition-all shadow-md active:scale-95 group cursor-pointer"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCollections}
                className="inline-flex items-center gap-2 bg-white hover:bg-zinc-50 text-zinc-900 font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-full border border-zinc-300 transition-colors shadow-xs active:scale-95 cursor-pointer"
              >
                <span>EXPLORE COLLECTIONS</span>
              </button>
            </div>

            {/* Value Propositions Strip (Matches Design B line icons) */}
            <div className="pt-6 border-t border-zinc-200/80 grid grid-cols-3 gap-3 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-zinc-800" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-950 uppercase tracking-tight">FREE SHIPPING</div>
                  <div className="text-[11px] text-zinc-500">On orders over $50</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-5 h-5 text-zinc-800" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-950 uppercase tracking-tight">EASY RETURNS</div>
                  <div className="text-[11px] text-zinc-500">30-day guarantee</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-zinc-800" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-950 uppercase tracking-tight">CLINIC TESTED</div>
                  <div className="text-[11px] text-zinc-500">CE & FDA cleared</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase with Discount Sticker (Design B) */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-gradient-to-tr from-stone-100 to-emerald-50/40 rounded-3xl p-6 sm:p-8 border border-zinc-200/60 shadow-xl overflow-hidden group">
              
              {/* Circular Discount Sticker Badge (Design B signature element) */}
              <div className="absolute top-6 right-6 z-20 w-24 h-24 rounded-full bg-zinc-950 text-white flex flex-col items-center justify-center text-center p-2 shadow-xl ring-4 ring-white/80 animate-pulse">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  {current.discountTag}
                </span>
                <span className="text-xs font-black text-white leading-tight">
                  {current.discountSub}
                </span>
              </div>

              {/* Product Visual Container */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-inner flex items-center justify-center">
                <img
                  src={current.mainImage}
                  alt={current.tagline}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Micro-Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-zinc-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-zinc-900 leading-tight">
                      {current.tagline}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold">
                      {current.badge}
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Arrows & Dots Navigation (Design B) */}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        activeSlide === idx ? 'w-7 bg-zinc-950' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous slide"
                    className="w-8 h-8 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 transition-colors shadow-xs"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next slide"
                    className="w-8 h-8 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 transition-colors shadow-xs"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
