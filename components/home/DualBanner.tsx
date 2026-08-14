'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Flame, Sparkles, ArrowRight } from 'lucide-react';

export default function DualBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">

      {/* Left Promo Card: Flash Offers */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        className="relative rounded-2xl overflow-hidden shadow-sm min-h-[180px] sm:min-h-[210px] flex items-center bg-gradient-to-r from-[#0B1220] via-[#0F1E3A] to-[#1E293B] border border-slate-800"
      >
        {/* Decorative Ambient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Decorative Image */}
        <div className="absolute right-3 bottom-0 w-36 h-36 sm:w-44 sm:h-44 opacity-75">
          <Image
            src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=400&auto=format&fit=crop"
            alt="Flash Deals"
            fill
            className="object-contain"
          />
        </div>

        <div className="relative z-10 p-6 sm:p-7 space-y-2.5 max-w-[65%]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#2563EB]/20 border border-[#2563EB]/40 text-[#60A5FA] text-[10px] font-extrabold uppercase tracking-wider">
            <Flame className="w-3 h-3 text-[#25C55E]" />
            <span>Flash Deals</span>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
              Top Value Offers & Super Discounts
            </h3>
            <p className="text-xs text-slate-300 font-medium mt-1">
              Limited-stock offers at unbeatable prices
            </p>
          </div>

          <div className="pt-1">
            <Link
              href="/shop?flash=true"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563EB] text-white font-bold text-xs hover:bg-[#1D4ED8] transition shadow-sm"
            >
              <span>Shop Flash Sale</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Right Promo Card: New Arrivals */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="relative rounded-2xl overflow-hidden shadow-sm min-h-[180px] sm:min-h-[210px] flex items-center bg-gradient-to-r from-[#060A12] via-[#0B1220] to-[#1E3A8A] border border-slate-800"
      >
        {/* Decorative Ambient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#25C55E]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Decorative Image */}
        <div className="absolute right-3 bottom-0 w-36 h-36 sm:w-44 sm:h-44 opacity-75">
          <Image
            src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&auto=format&fit=crop"
            alt="New Arrivals"
            fill
            className="object-contain"
          />
        </div>

        <div className="relative z-10 p-6 sm:p-7 space-y-2.5 max-w-[65%]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#25C55E]/15 border border-[#25C55E]/30 text-[#25C55E] text-[10px] font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-[#25C55E]" />
            <span>New Arrivals</span>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
              Explore The Latest Smart Trends
            </h3>
            <p className="text-xs text-slate-300 font-medium mt-1">
              Curated essentials for your modern lifestyle
            </p>
          </div>

          <div className="pt-1">
            <Link
              href="/shop?new=true"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#0B1220] font-bold text-xs hover:bg-slate-100 transition shadow-sm"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2563EB]" />
            </Link>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
