'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, X, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  label?: string;
}

export default function ImageUploader({
  value = [],
  onChange,
  multiple = true,
  label = 'Upload Product Photos',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (data.url) {
          newUrls.push(data.url);
        }
      } catch (e) {
        console.error('File upload error:', e);
      }
    }

    if (newUrls.length > 0) {
      if (multiple) {
        onChange([...value, ...newUrls]);
      } else {
        onChange([newUrls[0]]);
      }
    }
    setUploading(false);
  };

  const handleRemove = (urlToRemove: string) => {
    onChange(value.filter((url) => url !== urlToRemove));
  };

  return (
    <div className="space-y-3">
      <label className="font-bold text-slate-700 text-xs flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-purple-600" />
          <span>{label}</span>
        </span>
        <span className="text-[11px] text-slate-400 font-normal">
          Supported: JPG, PNG, WEBP (ImageKit Cloud)
        </span>
      </label>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files) {
            handleFileUpload(e.dataTransfer.files);
          }
        }}
        className={`relative border-2 border-dashed rounded-3xl p-6 text-center transition duration-200 cursor-pointer ${
          dragActive
            ? 'border-purple-600 bg-purple-50'
            : 'border-slate-300 hover:border-purple-500 bg-slate-50/80 hover:bg-white'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={(e) => {
            if (e.target.files) {
              handleFileUpload(e.target.files);
            }
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 shadow-sm">
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <UploadCloud className="w-6 h-6" />
            )}
          </div>

          <div>
            <p className="text-xs font-extrabold text-slate-800">
              {uploading ? 'Uploading photos to ImageKit...' : 'Click to Upload or Drag & Drop Photos'}
            </p>
            <p className="text-[11px] text-slate-400">
              Direct high-speed ImageKit CDN processing
            </p>
          </div>
        </div>
      </div>

      {/* Uploaded Thumbnails Preview Row */}
      <AnimatePresence>
        {value.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            {value.map((url, idx) => (
              <motion.div
                key={url + idx}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md group bg-slate-100 shrink-0"
              >
                <Image src={url} alt={`Upload ${idx}`} fill className="object-cover" />

                <button
                  type="button"
                  onClick={() => handleRemove(url)}
                  className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-1 shadow-md opacity-90 hover:opacity-100 hover:scale-110 transition z-20"
                  title="Remove Image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
