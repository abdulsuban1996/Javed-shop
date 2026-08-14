'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Sparkles, ArrowRight } from 'lucide-react';

export default function DualBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">

      {/* Left: Flash Sale — dark teal/purple */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="relative rounded-2xl overflow-hidden shadow-md min-h-[170px] sm:min-h-[200px] flex items-center"
        style={{ background: 'linear-gradient(135deg, #1a1a3e 0%, #2d1b69 50%, #1e3a5f 100%)' }}
      >
        {/* Decorative image on right */}
        <div className="absolute right-0 bottom-0 w-36 h-36 sm:w-44 sm:h-44 opacity-60">
          <img
            src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=300&auto=format&fit=crop"
            alt="Flash Sale"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 p-6 sm:p-8 space-y-3 max-w-[65%]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[10px] font-black uppercase tracking-wider">
            <Flame className="w-3 h-3 animate-pulse" />
            <span>Flash Sale</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-2xl font-black text-white leading-tight">
              Up to 60% Off
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
              Limited Time Offer
            </p>
          </div>
          <Link
            href="/shop?flash=true"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 text-white font-black text-xs hover:bg-orange-400 transition shadow-md"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* Right: New Arrivals — lighter purple/blue */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative rounded-2xl overflow-hidden shadow-md min-h-[170px] sm:min-h-[200px] flex items-center"
        style={{ background: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 50%, #1e40af 100%)' }}
      >
        {/* Decorative image on right */}
        <div className="absolute right-0 bottom-0 w-36 h-36 sm:w-44 sm:h-44 opacity-70">
          <img
            src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&auto=format&fit=crop"
            alt="New Arrivals"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 p-6 sm:p-8 space-y-3 max-w-[65%]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-400/20 border border-violet-400/40 text-violet-300 text-[10px] font-black uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>New Arrivals</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-2xl font-black text-white leading-tight">
              Check Out<br />The Latest Products
            </h3>
          </div>
          <Link
            href="/shop?new=true"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600 text-white font-black text-xs hover:bg-violet-500 transition shadow-md"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

    </div>
  );
}
