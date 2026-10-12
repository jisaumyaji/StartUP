'use client';

import React from 'react';
import { Star, ShieldCheck, Award, HeartPulse, Sparkles } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const reviews = [
    {
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80',
      name: 'Dr. Sarah Lin, MD',
      role: 'Chief of Surgery, St. Jude Clinic',
      comment: 'The biodegradable nitrile gloves meet all our barrier requirements without causing contact dermatitis. We converted our entire clinical department.'
    },
    {
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      name: 'Elena Rostova',
      role: 'Verified Customer',
      comment: 'The organic bamboo sanitary pads are a game changer. Super breathable, zero itching or rashes, and compostable packaging!'
    },
    {
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80',
      name: 'Dr. Marcus Vance, DDS',
      role: 'Green Dental Practice',
      comment: 'We buy the bulk bamboo tissue cubes and clinic couch rolls every month. Excellent tactile strength and 100% tree-free.'
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Design B Trust Bar Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-10 border-b border-zinc-100">
          
          {/* Left badge */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-zinc-900 shrink-0">
              <Award className="w-6 h-6 text-zinc-800" />
            </div>
            <div>
              <h3 className="text-sm font-black text-zinc-950 uppercase tracking-tight">
                TRUSTED BY THOUSANDS
              </h3>
              <p className="text-xs text-zinc-500">
                Hospital certified, dermatologically approved.
              </p>
            </div>
          </div>

          {/* Center: Avatars + 4.9/5 Rating (Design B exact replica) */}
          <div className="flex items-center gap-4 bg-stone-50 px-5 py-3 rounded-2xl border border-zinc-200/60">
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80"
                alt="Dr. Sarah Lin"
              />
              <img
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Elena"
              />
              <img
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=100&q=80"
                alt="Dr Marcus"
              />
              <div className="h-9 w-9 rounded-full ring-2 ring-white bg-zinc-900 text-emerald-400 text-[10px] font-black flex items-center justify-center">
                +4k
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-zinc-950">4.9 / 5</span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-zinc-500 font-medium">
                Based on 3,400+ verified customer & clinic reviews
              </div>
            </div>
          </div>

          {/* Right: Hospital Certification Badges */}
          <div className="flex items-center gap-4 text-xs font-semibold text-zinc-700">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>FDA 510(k) & CE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-emerald-700" />
              <span>ISO 13485</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Dermatest 5-Star</span>
            </div>
          </div>

        </div>

        {/* Customer & Doctor Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-stone-50/70 rounded-2xl p-6 border border-zinc-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-zinc-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-zinc-200/60">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-zinc-300"
                />
                <div>
                  <div className="text-xs font-bold text-zinc-950">{rev.name}</div>
                  <div className="text-[11px] text-emerald-800 font-medium">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
