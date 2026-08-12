'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Sparkles, ArrowRight } from 'lucide-react';

export default function DualBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      {/* Left Promo Card: Flash Sale */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-brand-950 via-purple-950 to-slate-900 border border-brand-700/60 shadow-xl overflow-hidden group flex flex-col justify-between min-h-[200px]"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent-orange/15 rounded-full blur-3xl group-hover:scale-150 transition duration-700"></div>

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-orange/20 border border-accent-orange/30 text-accent-orange text-xs font-black uppercase tracking-wider">
            <Flame className="w-4 h-4 text-accent-orange animate-bounce" />
            <span>Flash Sale</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Up to 60% Off — Limited Time Offer
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Grab premium China gadgets at rock bottom wholesale rates before stock runs out!
          </p>
        </div>

        <div className="relative z-10 pt-4">
          <Link
            href="/shop?flash=true"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-orange text-slate-950 font-black text-xs sm:text-sm hover:bg-accent-amber transition shadow-lg shadow-accent-orange/30 transform active:scale-95"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* Right Promo Card: New Arrivals */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-brand-950 to-purple-950 border border-slate-700/60 shadow-xl overflow-hidden group flex flex-col justify-between min-h-[200px]"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent-amber/15 rounded-full blur-3xl group-hover:scale-150 transition duration-700"></div>

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-amber/20 border border-accent-amber/30 text-accent-amber text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-accent-amber" />
            <span>New Arrivals</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Check Out The Latest Products
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Explore 2026 newly arrived smart wearables, sound systems & mobile accessories.
          </p>
        </div>

        <div className="relative z-10 pt-4">
          <Link
            href="/shop?new=true"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 text-white font-black text-xs sm:text-sm hover:from-brand-600 hover:to-brand-500 transition shadow-lg shadow-brand-900/40 transform active:scale-95"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
