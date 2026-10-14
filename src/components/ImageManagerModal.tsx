'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  X, 
  UploadCloud, 
  Image as ImageIcon, 
  Copy, 
  Check, 
  Trash2, 
  ExternalLink,
  Sparkles,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { fetchBucketImages, uploadImageToStorage, STORAGE_BUCKETS } from '@/lib/storage';
import { StorageImage } from '@/types/auth';

export const ImageManagerModal: React.FC = () => {
  const { isImageManagerOpen, closeImageManager, isConfigured } = useAuth();

  const [activeBucket, setActiveBucket] = useState<string>(STORAGE_BUCKETS.PRODUCT_IMAGES);
  const [images, setImages] = useState<StorageImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const loadImages = async () => {
    setLoading(true);
    try {
      const data = await fetchBucketImages(activeBucket);
      setImages(data);
    } catch (err) {
      console.error('Failed to load images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isImageManagerOpen) {
      loadImages();
    }
  }, [isImageManagerOpen, activeBucket]);

  if (!isImageManagerOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploading(true);
    setUploadMessage(null);

    try {
      const { url, error } = await uploadImageToStorage(activeBucket, 'catalog', file);
      if (error) {
        setUploadMessage(`Upload error: ${error}`);
      } else if (url) {
        setUploadMessage('Image uploaded to Supabase Storage successfully!');
        await loadImages();
        setTimeout(() => setUploadMessage(null), 4000);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs transition-opacity"
        onClick={closeImageManager}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 overflow-hidden animate-in zoom-in-95 duration-200">
          
          <button
            onClick={closeImageManager}
            className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <ImageIcon className="w-4 h-4" />
                </span>
                <h2 className="text-xl font-black text-zinc-950">
                  Supabase Image & Media Storage
                </h2>
              </div>
              <p className="text-xs text-zinc-600 mt-1">
                Upload and fetch dynamic high-resolution product photos and profile avatars from Supabase CDN.
              </p>
            </div>

            <button
              onClick={loadImages}
              disabled={loading}
              className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
              title="Refresh images"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Bucket Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveBucket(STORAGE_BUCKETS.PRODUCT_IMAGES)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeBucket === STORAGE_BUCKETS.PRODUCT_IMAGES
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              Product Images Bucket
            </button>
            <button
              onClick={() => setActiveBucket(STORAGE_BUCKETS.AVATARS)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeBucket === STORAGE_BUCKETS.AVATARS
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              User Avatars Bucket
            </button>
          </div>

          {/* Upload Dropzone */}
          <label className="border-2 border-dashed border-zinc-200 hover:border-emerald-600/70 bg-zinc-50/60 hover:bg-emerald-50/20 rounded-2xl p-6 mb-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
            <UploadCloud className="w-8 h-8 text-zinc-400 group-hover:text-emerald-700 mb-2" />
            <span className="text-xs font-bold text-zinc-900">
              {uploading ? 'Uploading to Supabase Storage...' : 'Click or Drag & Drop image to upload'}
            </span>
            <span className="text-[11px] text-zinc-600 mt-1">
              Supports WEBP, PNG, JPG, SVG up to 10MB
            </span>
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {uploadMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{uploadMessage}</span>
            </div>
          )}

          {/* Image Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-600 uppercase tracking-wider">
              <span>Fetched Images ({images.length})</span>
              <span className="text-[11px] font-normal lowercase text-zinc-600">
                {isConfigured ? 'live storage bucket' : 'demo storage preview'}
              </span>
            </div>

            {loading ? (
              <div className="py-12 flex justify-center">
                <span className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : images.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-600 bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
                No images found in this bucket yet. Upload one above!
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto pr-1">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="group relative bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="aspect-square w-full bg-zinc-200 overflow-hidden relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.publicUrl}
                        alt={img.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-2.5 bg-white flex flex-col justify-between flex-1">
                      <div className="text-[11px] font-medium text-zinc-800 truncate" title={img.name}>
                        {img.name}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-zinc-100">
                        <button
                          type="button"
                          onClick={() => handleCopyUrl(img.id, img.publicUrl)}
                          className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                        >
                          {copiedId === img.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy URL</span>
                            </>
                          )}
                        </button>

                        <a
                          href={img.publicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-zinc-700 p-1"
                          title="Open full size"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
