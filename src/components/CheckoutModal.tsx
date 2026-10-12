'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  Leaf, 
  Building2, 
  Lock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const isCheckoutOpen = useCartStore((state) => state.isCheckoutOpen);
  const setCheckoutOpen = useCartStore((state) => state.setCheckoutOpen);
  const items = useCartStore((state) => state.items);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getDiscountAmount = useCartStore((state) => state.getDiscountAmount);
  const getShippingFee = useCartStore((state) => state.getShippingFee);
  const getTaxAmount = useCartStore((state) => state.getTaxAmount);
  const getGrandTotal = useCartStore((state) => state.getGrandTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [isClinic, setIsClinic] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Dr. Jane Miller',
    email: 'jane.miller@ecoclinic.org',
    clinicName: 'Green Valley Family Clinic',
    address: '450 Wellness Blvd, Suite 200',
    city: 'San Francisco',
    postalCode: '94107',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '•••'
  });
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const tax = getTaxAmount();
  const grandTotal = getGrandTotal();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `ECO-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(orderId);
    setStep('confirmed');

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    clearCart();
  };

  const handleClose = () => {
    setCheckoutOpen(false);
    setStep('form');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 overflow-hidden animate-in zoom-in-95 duration-200">
          
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 'form' ? (
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 rounded-full bg-zinc-950 text-white flex items-center justify-center">
                  <Lock className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-zinc-950 uppercase tracking-tight">
                    SECURE ECO CHECKOUT
                  </h2>
                  <p className="text-xs text-zinc-500">
                    256-Bit SSL Encrypted • Carbon-Neutral Dispatch
                  </p>
                </div>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-5">
                {/* Clinic / Practitioner Toggle */}
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-zinc-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-emerald-700" />
                    <div>
                      <div className="text-xs font-bold text-zinc-900">Are you ordering for a Clinic or Hospital?</div>
                      <div className="text-[11px] text-zinc-500">Enables B2B GST/VAT tax exemption invoices</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isClinic}
                    onChange={(e) => setIsClinic(e.target.checked)}
                    className="w-4 h-4 accent-zinc-950 rounded cursor-pointer"
                  />
                </div>

                {/* Shipping Details */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                    1. Shipping Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-600 block mb-1">Recipient Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-600 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950"
                      />
                    </div>
                  </div>

                  {isClinic && (
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-600 block mb-1">Clinic / Hospital Name</label>
                      <input
                        type="text"
                        value={formData.clinicName}
                        onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] font-semibold text-zinc-600 block mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-600 block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-600 block mb-1">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950"
                      />
                    </div>
                  </div>
                </div>

                {/* Simulated Payment */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center justify-between">
                    <span>2. Payment Method</span>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                      Test Mode Enabled
                    </span>
                  </h3>
                  
                  <div className="border border-zinc-300 rounded-2xl p-4 bg-stone-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-zinc-800" />
                        <span className="text-xs font-bold text-zinc-900">Card Payment (or Clinic PO)</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="text-[9px] bg-white border px-1.5 py-0.5 rounded font-bold">VISA</span>
                        <span className="text-[9px] bg-white border px-1.5 py-0.5 rounded font-bold">MC</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={formData.cardNumber}
                          readOnly
                          className="w-full text-xs px-3 py-2 bg-white border border-zinc-200 rounded-xl text-zinc-700"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={formData.expDate}
                          readOnly
                          className="w-full text-xs px-3 py-2 bg-white border border-zinc-200 rounded-xl text-center text-zinc-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary & Pay Button */}
                <div className="bg-zinc-950 text-white rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-zinc-300">
                    <span>Total Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                      <span>Promo Savings</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-zinc-300">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-zinc-400 uppercase font-semibold">Total to Pay</div>
                      <div className="text-xl font-black text-white">${grandTotal.toFixed(2)}</div>
                    </div>
                    <button
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>PLACE ORDER</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </form>
            </div>
          ) : (
            /* Confirmation Screen */
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  ORDER PLACED SUCCESSFULLY
                </span>
                <h2 className="text-2xl font-black text-zinc-950 mt-3">
                  Thank You for Choosing Eco-Friendly!
                </h2>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                  Your order reference is <strong className="text-zinc-900 font-mono">{confirmedOrderId}</strong>. A confirmation email and tracking link have been sent to <strong>{formData.email}</strong>.
                </p>
              </div>

              {/* Eco Impact Summary Card */}
              <div className="bg-stone-50 border border-zinc-200 rounded-2xl p-4 max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>Your Order's Environmental Contribution:</span>
                </div>
                <ul className="text-xs text-zinc-600 space-y-1 pl-6 list-disc">
                  <li><strong>~2.4 kg of plastic</strong> prevented from entering landfills</li>
                  <li><strong>100% Tree-Free</strong> bamboo fiber utilized</li>
                  <li>Delivered via verified carbon-neutral express logistics</li>
                </ul>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="bg-zinc-950 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-zinc-800 transition-colors shadow-md"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
