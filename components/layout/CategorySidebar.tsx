'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Headphones, 
  Watch, 
  Speaker, 
  Zap, 
  Gamepad2, 
  Smartphone, 
  ChevronRight, 
  Layers
} from 'lucide-react';

function CategoryContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  const categories = [
    { id: 'earbuds', name: 'TWS & Wireless Earbuds', icon: Headphones, count: '48 items', color: 'from-purple-500 to-indigo-600' },
    { id: 'smartwatch', name: 'Smartwatches & Bands', icon: Watch, count: '32 items', color: 'from-amber-500 to-orange-600' },
    { id: 'speakers', name: 'Bluetooth Speakers', icon: Speaker, count: '25 items', color: 'from-emerald-500 to-teal-600' },
    { id: 'powerbank', name: 'MagSafe & Powerbanks', icon: Zap, count: '19 items', color: 'from-rose-500 to-red-600' },
    { id: 'accessories', name: 'GaN Chargers & Cables', icon: Smartphone, count: '54 items', color: 'from-blue-500 to-cyan-600' },
    { id: 'gaming', name: 'Mechanical Keyboards', icon: Gamepad2, count: '15 items', color: 'from-violet-500 to-purple-600' },
  ];

  return (
    <div className="w-full space-y-3">
      {/* Mobile Horizontal Scroll Category Bar */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Link
          href="/shop"
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold shrink-0 border transition ${
            !activeCategory
              ? 'bg-accent-orange text-slate-950 border-accent-orange shadow-md'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Gadgets</span>
        </Link>

        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold shrink-0 border transition ${
                isActive
                  ? 'bg-accent-orange text-slate-950 border-accent-orange shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Desktop Vertical Sidebar */}
      <div className="hidden lg:block bg-slate-900/90 border border-slate-800/80 rounded-3xl p-4 shadow-xl backdrop-blur-md">
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 px-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-orange animate-ping"></div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-200">
              Top Categories
            </h2>
          </div>
          <span className="text-[10px] text-accent-amber font-extrabold bg-accent-amber/10 px-2 py-0.5 rounded-full">
            Direct Import
          </span>
        </div>

        {/* Category List */}
        <div className="space-y-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className="block group"
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center justify-between p-2.5 rounded-2xl transition duration-200 ${
                    isActive
                      ? 'bg-brand-900 text-white font-bold border border-brand-600/40 shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold group-hover:text-accent-amber transition">
                        {cat.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {cat.count}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-accent-orange group-hover:translate-x-1 transition transform" />
                </motion.div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default function CategorySidebar() {
  return (
    <Suspense fallback={
      <div className="w-full h-12 bg-slate-900 rounded-2xl animate-pulse"></div>
    }>
      <CategoryContent />
    </Suspense>
  );
}
