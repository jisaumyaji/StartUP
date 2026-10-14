'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  ShieldCheck, 
  Camera, 
  LogOut, 
  CheckCircle2, 
  Database,
  ExternalLink,
  Sparkles,
  Building2,
  Calendar,
  Truck
} from 'lucide-react';

export const UserProfileModal: React.FC = () => {
  const { 
    user, 
    profile, 
    orders, 
    isProfileModalOpen, 
    closeProfileModal, 
    signOut, 
    updateProfileData, 
    uploadUserAvatar,
    isConfigured,
    openImageManager
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'supabase'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);

  // Form state
  const [fullName, setFullName] = useState(profile?.fullName || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [address, setAddress] = useState(profile?.address || '');
  const [city, setCity] = useState(profile?.city || '');
  const [postalCode, setPostalCode] = useState(profile?.postalCode || '');
  const [clinicName, setClinicName] = useState(profile?.clinicName || '');
  const [clinicVat, setClinicVat] = useState(profile?.clinicVat || '');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keep state updated when profile loads
  React.useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || '');
      setPhone(profile.phone || '');
      setAddress(profile.address || '');
      setCity(profile.city || '');
      setPostalCode(profile.postalCode || '');
      setClinicName(profile.clinicName || '');
      setClinicVat(profile.clinicVat || '');
    }
  }, [profile]);

  if (!isProfileModalOpen || !user) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await updateProfileData({
        fullName,
        phone,
        address,
        city,
        postalCode,
        clinicName: profile?.role === 'clinic' ? clinicName : undefined,
        clinicVat: profile?.role === 'clinic' ? clinicVat : undefined,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setAvatarUploading(true);
    try {
      await uploadUserAvatar(file);
    } finally {
      setAvatarUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs transition-opacity"
        onClick={closeProfileModal}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={closeProfileModal}
            className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Profile Header with Avatar & Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-zinc-100">
            {/* Avatar & Upload */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-zinc-100 border-2 border-emerald-600/30 overflow-hidden shadow-inner flex items-center justify-center">
                {profile?.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-black text-emerald-800">
                    {(profile?.fullName || user.email || 'U')[0].toUpperCase()}
                  </span>
                )}
              </div>

              {/* Upload trigger overlay */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarUploading}
                title="Upload custom avatar to Supabase Storage"
                className="absolute -bottom-1 -right-1 bg-zinc-900 hover:bg-emerald-800 text-white p-2 rounded-xl shadow-md transition-colors cursor-pointer"
              >
                {avatarUploading ? (
                  <span className="inline-block w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Camera className="w-3.5 h-3.5" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarFileChange}
                className="hidden"
              />
            </div>

            {/* User Meta */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-black text-zinc-950">
                  {profile?.fullName || 'EcoLuxe Member'}
                </h2>
                {profile?.role === 'clinic' ? (
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full text-[11px] font-bold border border-emerald-300">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    Verified Clinic Account
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full text-[11px] font-semibold">
                    Customer Account
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1.5 text-xs text-zinc-600">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  {user.email}
                </span>
                {profile?.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-zinc-400" />
                    {profile.phone}
                  </span>
                )}
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={() => signOut()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-zinc-100 mt-4 mb-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3 px-4 text-xs font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-emerald-600 text-zinc-950'
                  : 'border-transparent text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              User Details
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 px-4 text-xs font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-emerald-600 text-zinc-950'
                  : 'border-transparent text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              My Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('supabase')}
              className={`pb-3 px-4 text-xs font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'supabase'
                  ? 'border-emerald-600 text-zinc-950'
                  : 'border-transparent text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Supabase Status
            </button>
          </div>

          {/* TAB 1: User Profile Form */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {saveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-semibold animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Profile details saved to database successfully!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (415) 000-0000"
                    className="w-full text-xs px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>
              </div>

              {profile?.role === 'clinic' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                      Clinic / Practice Name
                    </label>
                    <input
                      type="text"
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                      Medical License / VAT #
                    </label>
                    <input
                      type="text"
                      value={clinicVat}
                      onChange={(e) => setClinicVat(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Default Shipping Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="450 Wellness Blvd, Suite 200"
                  className="w-full text-xs px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="San Francisco"
                    className="w-full text-xs px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Postal Code / ZIP
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="94107"
                    className="w-full text-xs px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    closeProfileModal();
                    openImageManager();
                  }}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Open Supabase Media / Image Storage</span>
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl transition-transform active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  {isSaving ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Save Details'
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Orders List */}
          {activeTab === 'orders' && (
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                  <Package className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-zinc-800">No Orders Yet</p>
                  <p className="text-xs text-zinc-600 mt-1">
                    When you place an order in checkout, it will be stored and tracked here!
                  </p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 bg-zinc-50 hover:bg-zinc-100/80 rounded-2xl border border-zinc-200 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-extrabold text-zinc-900">
                          {ord.id}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {ord.status.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs font-black text-zinc-950">
                        ${ord.total.toFixed(2)}
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-600 mb-2 flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-zinc-400" />
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </span>
                      {ord.trackingNumber && (
                        <span className="flex items-center gap-1 font-mono text-zinc-700">
                          <Truck className="w-3 h-3 text-emerald-600" />
                          {ord.trackingNumber}
                        </span>
                      )}
                    </div>

                    {/* Order items snapshot */}
                    <div className="border-t border-zinc-200/60 pt-2 space-y-1">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs text-zinc-700">
                          <span className="truncate max-w-[280px]">
                            {item.quantity}x {item.title} <span className="text-zinc-600">({item.variantName})</span>
                          </span>
                          <span className="font-semibold text-zinc-900 shrink-0">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: Supabase Status & Setup Information */}
          {activeTab === 'supabase' && (
            <div className="space-y-4 text-xs">
              <div className={`p-4 rounded-2xl border ${
                isConfigured 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2.5 h-2.5 rounded-full ${isConfigured ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
                  <span className="font-bold text-sm">
                    {isConfigured ? 'Live Supabase Backend Connected' : 'Supabase Client Initialized (Local Mode)'}
                  </span>
                </div>
                <p className="text-xs opacity-90 mt-1">
                  {isConfigured
                    ? 'Your application is connected to your live Supabase PostgreSQL database and Storage bucket. All user profiles, authentications, images, and orders persist globally.'
                    : 'The application is running with local browser persistence for rapid testing. To connect to your live Supabase cloud project, see the quick steps below.'}
                </p>
              </div>

              <div className="bg-zinc-900 text-zinc-200 p-4 rounded-2xl space-y-2">
                <div className="font-mono text-xs font-bold text-emerald-400">
                  Supabase Setup in 3 Quick Steps:
                </div>
                <ol className="list-decimal list-inside space-y-1 text-zinc-300 text-[11px] leading-relaxed">
                  <li>
                    Create a free project at <span className="text-white font-mono">supabase.com</span>
                  </li>
                  <li>
                    Run the provided <span className="text-emerald-300 font-mono">supabase/schema.sql</span> in your Supabase SQL Editor.
                  </li>
                  <li>
                    Copy your <span className="text-amber-300 font-mono">Project URL</span> & <span className="text-amber-300 font-mono">Anon Key</span> into <span className="text-white font-mono">.env.local</span>.
                  </li>
                </ol>
              </div>

              <div className="text-center pt-2">
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                >
                  <span>Open Supabase Cloud Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
