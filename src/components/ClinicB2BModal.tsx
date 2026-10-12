'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { 
  X, 
  Building2, 
  ShieldCheck, 
  Check, 
  Send, 
  PackageCheck, 
  Sparkles,
  FileText
} from 'lucide-react';

export const ClinicB2BModal: React.FC = () => {
  const isB2BModalOpen = useCartStore((state) => state.isB2BModalOpen);
  const setB2BModalOpen = useCartStore((state) => state.setB2BModalOpen);
  const showToast = useCartStore((state) => state.showToast);

  const [submitted, setSubmitted] = useState(false);
  const [clinicData, setClinicData] = useState({
    name: '',
    clinicName: '',
    email: '',
    phone: '',
    monthlyVolume: '5-20 Cases (5,000 - 20,000 Gloves)',
    interestedProducts: ['Biodegradable Nitrile Gloves', 'Clinic Bed Rolls'],
    notes: ''
  });

  if (!isB2BModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Quote request received! Our medical representative will email you within 2 business hours.');
  };

  const handleClose = () => {
    setB2BModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 overflow-hidden animate-in zoom-in-95 duration-200">
          
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-zinc-950 text-white flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-zinc-950 uppercase tracking-tight">
                    DOCTOR & CLINIC WHOLESALE PORTAL
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Direct Hospital Tier Pricing • Free Sample Boxes • Net 30 Terms
                  </p>
                </div>
              </div>

              {/* Perks Pill row */}
              <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3.5 flex items-center justify-between text-xs text-emerald-900 font-semibold">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>CE & FDA 510(k) Cleared</span>
                </div>
                <div>•</div>
                <div>Save up to 40% on bulk cases</div>
                <div>•</div>
                <div>Complimentary Samples</div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                      Doctor / Procurement Officer Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Michael Smith"
                      value={clinicData.name}
                      onChange={(e) => setClinicData({ ...clinicData, name: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                      Clinic / Hospital Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Mercy Healthcare Group"
                      value={clinicData.clinicName}
                      onChange={(e) => setClinicData({ ...clinicData, clinicName: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@hospital.org"
                      value={clinicData.email}
                      onChange={(e) => setClinicData({ ...clinicData, email: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 019-2834"
                      value={clinicData.phone}
                      onChange={(e) => setClinicData({ ...clinicData, phone: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                    Estimated Monthly Volume
                  </label>
                  <select
                    value={clinicData.monthlyVolume}
                    onChange={(e) => setClinicData({ ...clinicData, monthlyVolume: e.target.value })}
                    className="w-full text-xs px-3 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-white"
                  >
                    <option>1-4 Cases (Sample testing)</option>
                    <option>5-20 Cases (5,000 - 20,000 Gloves)</option>
                    <option>21-100 Cases (21,000 - 100,000 Gloves)</option>
                    <option>Full Pallet / Container Loads</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                    Specific Requirements or Sample Sizes Needed
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Please send sample boxes of Size M & L biodegradable nitrile exam gloves and 1 roll of clinic examination paper."
                    value={clinicData.notes}
                    onChange={(e) => setClinicData({ ...clinicData, notes: e.target.value })}
                    className="w-full text-xs p-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>REQUEST CLINIC QUOTE & FREE SAMPLES</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <PackageCheck className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-black text-zinc-950">
                  Sample Request Dispatched!
                </h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                  Thank you, <strong>{clinicData.name}</strong>. A dedicated medical supplies account manager will contact you with wholesale pricing sheets and dispatch your complimentary sample kit to <strong>{clinicData.clinicName}</strong>.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-zinc-800 transition-colors"
                >
                  Return to Store
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
