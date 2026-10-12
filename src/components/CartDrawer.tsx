'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  ArrowRight, 
  Tag, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getDiscountAmount = useCartStore((state) => state.getDiscountAmount);
  const getShippingFee = useCartStore((state) => state.getShippingFee);
  const getTaxAmount = useCartStore((state) => state.getTaxAmount);
  const getGrandTotal = useCartStore((state) => state.getGrandTotal);
  const promoCode = useCartStore((state) => state.promoCode);
  const applyPromoCode = useCartStore((state) => state.applyPromoCode);
  const removePromoCode = useCartStore((state) => state.removePromoCode);
  const setCheckoutOpen = useCartStore((state) => state.setCheckoutOpen);

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const tax = getTaxAmount();
  const grandTotal = getGrandTotal();

  // Free shipping threshold: $50
  const freeShippingThreshold = 50;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const diffToFree = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    setCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-zinc-200 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-zinc-950 text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-black text-zinc-950 uppercase tracking-tight">
                  YOUR SHOPPING CART
                </h2>
                <p className="text-[11px] text-zinc-500 font-medium">
                  {items.length} {items.length === 1 ? 'product' : 'products'} selected
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 text-zinc-400 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-emerald-50/70 border-b border-emerald-100/60 p-3.5">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-700" />
                {diffToFree === 0 ? (
                  <span>You've unlocked Free Carbon-Neutral Shipping!</span>
                ) : (
                  <span>Add ${diffToFree.toFixed(2)} more for Free Shipping</span>
                )}
              </div>
              <span className="text-[11px]">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-emerald-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-zinc-100">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Your cart is empty</h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                    Browse our eco-friendly sanitary pads, bamboo tissues, and sterile surgical gloves.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="bg-zinc-950 text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-zinc-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant.id}`}
                  className="pt-4 first:pt-0 flex gap-4 items-start"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-18 h-18 rounded-xl object-cover bg-stone-100 shrink-0 border border-zinc-200"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-zinc-900 leading-tight truncate">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedVariant.id)}
                        className="text-zinc-400 hover:text-red-600 transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                      {item.selectedVariant.name}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-zinc-300 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedVariant.id,
                              item.quantity - 1
                            )
                          }
                          className="px-2 py-1 text-zinc-600 hover:bg-zinc-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-1 text-xs font-bold text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedVariant.id,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-1 text-zinc-600 hover:bg-zinc-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-black text-zinc-950">
                        ${(item.selectedVariant.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Calculation */}
          {items.length > 0 && (
            <div className="p-5 border-t border-zinc-200 bg-stone-50/60 space-y-4">
              {/* Promo Code Input */}
              {promoCode ? (
                <div className="flex items-center justify-between bg-emerald-100/70 border border-emerald-300 px-3 py-2 rounded-xl text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Coupon applied: {promoCode}</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs font-bold text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCode} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. ECO10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 bg-white border border-zinc-300 rounded-xl uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                  <button
                    type="submit"
                    className="bg-zinc-950 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-zinc-800 transition-colors uppercase tracking-wider"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Cost Summary Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900">${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Carbon-Neutral Shipping</span>
                  <span className="font-semibold text-zinc-900">
                    {shipping === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (5%)</span>
                  <span className="font-semibold text-zinc-900">${tax.toFixed(2)}</span>
                </div>

                <div className="pt-2 border-t border-zinc-200 flex justify-between text-sm font-black text-zinc-950">
                  <span>Grand Total</span>
                  <span className="text-base font-black">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button (Design B style) */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-zinc-950 hover:bg-zinc-800 active:bg-black text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-bit SSL encrypted • 30-Day Money-Back Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
