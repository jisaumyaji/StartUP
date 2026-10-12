'use client';

import React, { useState } from 'react';
import { Mail, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const showToast = useCartStore((state) => state.showToast);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    setIsSubmitted(true);
    showToast('Subscribed! Check your inbox for your 10% coupon code: ECO10');
  };

  return (
    <section className="py-12 bg-stone-100/60 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text (Design B exact wording and style) */}
          <div className="space-y-1.5 text-center lg:text-left">
            <h3 className="text-base sm:text-lg font-black text-zinc-950 uppercase tracking-tight flex items-center justify-center lg:justify-start gap-2">
              <Mail className="w-5 h-5 text-zinc-800" />
              <span>SUBSCRIBE TO OUR NEWSLETTER</span>
            </h3>
            <p className="text-xs text-zinc-500 max-w-md">
              Get the latest updates on new eco-medical releases, clinic bulk savings, and exclusive discounts.
            </p>
          </div>

          {/* Right Input Form (Design B clean bar + dark button) */}
          <div className="w-full lg:w-auto">
            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Thank you for subscribing! Your 10% coupon code is ECO10</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-80 text-xs px-4 py-3 bg-white border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 text-zinc-900 placeholder:text-zinc-400"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-zinc-950 hover:bg-zinc-800 active:bg-black text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
