'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Phone,
  Hospital
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalTab, 
    signInWithEmail, 
    signUpWithEmail, 
    signInWithGoogle,
    isConfigured 
  } = useAuth();

  const [tab, setTab] = useState<'signin' | 'signup' | 'clinic'>(authModalTab || 'signin');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [clinicVat, setClinicVat] = useState('');

  // Keep internal tab in sync when opened with specific tab
  React.useEffect(() => {
    if (authModalTab) {
      setTab(authModalTab);
    }
  }, [authModalTab]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      if (tab === 'signin') {
        const { error } = await signInWithEmail(email, password);
        if (error) setErrorMessage(error);
      } else if (tab === 'signup') {
        if (!fullName.trim()) {
          setErrorMessage('Please enter your full name');
          setLoading(false);
          return;
        }
        const { error } = await signUpWithEmail(email, password, fullName, 'customer', { phone });
        if (error) setErrorMessage(error);
      } else if (tab === 'clinic') {
        if (!clinicName.trim()) {
          setErrorMessage('Please enter your clinic or hospital name');
          setLoading(false);
          return;
        }
        const { error } = await signUpWithEmail(email, password, fullName, 'clinic', {
          phone,
          clinicName,
          clinicVat,
        });
        if (error) setErrorMessage(error);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickDemo = (demoType: 'customer' | 'clinic') => {
    if (demoType === 'customer') {
      setEmail('alex.turner@ecoluxe-member.com');
      setPassword('EcoLuxe123!');
      setFullName('Alex Turner');
      setPhone('+1 (415) 890-1234');
      setTab('signin');
    } else {
      setEmail('dr.morrison@stjudeclinic.org');
      setPassword('ClinicPass2026!');
      setFullName('Dr. Emily Morrison');
      setClinicName('St. Jude Health & Maternal Center');
      setClinicVat('MED-US-982341');
      setPhone('+1 (415) 555-0199');
      setTab('clinic');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs transition-opacity"
        onClick={closeAuthModal}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Supabase Status Pill */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${
              isConfigured 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              {isConfigured ? 'Supabase Database Connected' : 'Supabase Ready (Dev Mode)'}
            </span>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-black text-zinc-950 tracking-tight">
              {tab === 'signin' && 'Welcome Back'}
              {tab === 'signup' && 'Create Your Account'}
              {tab === 'clinic' && 'Clinic & Doctor Portal'}
            </h2>
            <p className="text-xs text-zinc-600 mt-1">
              {tab === 'signin' && 'Sign in to access your orders, saved addresses & medical discounts.'}
              {tab === 'signup' && 'Join EcoLuxe for carbon-neutral orders, reward points & eco hygiene.'}
              {tab === 'clinic' && 'Register your clinic or hospital to unlock wholesale B2B pricing & net-30 invoicing.'}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-zinc-100 p-1 rounded-xl mb-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setTab('signin'); setErrorMessage(null); }}
              className={`py-2 rounded-lg transition-all ${
                tab === 'signin' ? 'bg-white text-zinc-950 shadow-xs font-bold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setTab('signup'); setErrorMessage(null); }}
              className={`py-2 rounded-lg transition-all ${
                tab === 'signup' ? 'bg-white text-zinc-950 shadow-xs font-bold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => { setTab('clinic'); setErrorMessage(null); }}
              className={`py-2 rounded-lg transition-all ${
                tab === 'clinic' ? 'bg-emerald-900 text-white shadow-xs font-bold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Doctor/B2B
            </button>
          </div>

          {/* Error message banner */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-800 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name for Sign Up */}
            {(tab === 'signup' || tab === 'clinic') && (
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  {tab === 'clinic' ? 'Doctor / Lead Representative Name' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={tab === 'clinic' ? 'Dr. Emily Morrison, MD' : 'Alex Turner'}
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            {/* Clinic / Organization Name */}
            {tab === 'clinic' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Clinic / Hospital / Practice Name
                  </label>
                  <div className="relative">
                    <Hospital className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                      placeholder="St. Jude Health & Maternal Center"
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Medical License ID or Tax / VAT #
                  </label>
                  <div className="relative">
                    <ShieldCheck className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={clinicVat}
                      onChange={(e) => setClinicVat(e.target.value)}
                      placeholder="e.g. MED-US-982341 (Optional)"
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Phone (Optional for Signup/Clinic) */}
            {(tab === 'signup' || tab === 'clinic') && (
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Password
                </label>
                {tab === 'signin' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link will be sent to your email with Supabase Auth.')}
                    className="text-[11px] text-emerald-800 hover:text-emerald-950 font-medium"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-md cursor-pointer ${
                tab === 'clinic'
                  ? 'bg-emerald-900 hover:bg-emerald-950 text-white'
                  : 'bg-zinc-950 hover:bg-zinc-900 text-white'
              }`}
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {tab === 'signin' && 'Sign In to Account'}
                    {tab === 'signup' && 'Create Customer Account'}
                    {tab === 'clinic' && 'Register Verified Clinic'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Social login / Google OAuth */}
          <div className="mt-5">
            <div className="relative flex items-center justify-center mb-4">
              <div className="border-t border-zinc-200 w-full" />
              <span className="bg-white px-3 text-[10px] text-zinc-600 uppercase tracking-widest font-semibold absolute">
                Or continue with
              </span>
            </div>

            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full py-2.5 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* 1-Click Fast Fill for Testing */}
          <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-600">
            <span className="font-semibold text-zinc-600">Quick Test:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillQuickDemo('customer')}
                className="text-emerald-700 hover:text-emerald-900 font-medium hover:underline"
              >
                Demo Customer
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => fillQuickDemo('clinic')}
                className="text-emerald-700 hover:text-emerald-900 font-medium hover:underline"
              >
                Demo Doctor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
