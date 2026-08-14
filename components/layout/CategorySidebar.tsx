'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Headphones,
  Watch,
  Speaker,
  Zap,
  Gamepad2,
  Smartphone,
  ChevronRight,
  Layers,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

function CategoryContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  const categories = [
    { id: 'earbuds', name: 'Smart Audio & Earbuds', icon: Headphones, count: '48 items' },
    { id: 'smartwatch', name: 'Smartwatches & Bands', icon: Watch, count: '32 items' },
    { id: 'speakers', name: 'Bluetooth Speakers', icon: Speaker, count: '25 items' },
    { id: 'powerbank', name: 'Powerbanks & Chargers', icon: Zap, count: '19 items' },
    { id: 'accessories', name: 'Mobile Accessories', icon: Smartphone, count: '54 items' },
    { id: 'gaming', name: 'Gaming & Computing', icon: Gamepad2, count: '15 items' },
    { id: 'lifestyle', name: 'Lifestyle & Everyday', icon: ShoppingBag, count: '30 items' },
  ];

  return (
    <div className="w-full space-y-2">
      {/* Mobile Horizontal Scroll Category Bar */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Link
          href="/shop"
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold shrink-0 border transition ${
            !activeCategory
              ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm'
              : 'bg-white text-slate-700 border-[#E5E7EB] hover:text-[#2563EB]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Products</span>
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
                  ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm'
                  : 'bg-white text-slate-700 border-[#E5E7EB] hover:text-[#2563EB]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Desktop Vertical Sidebar */}
      <div className="hidden lg:block bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 bg-[#0B1220] text-white">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#2563EB]" />
            <span className="font-bold text-sm tracking-tight">Explore Categories</span>
          </div>
          <span className="text-[10px] font-bold text-[#25C55E] bg-[#25C55E]/15 border border-[#25C55E]/30 px-2 py-0.5 rounded-md uppercase">
            Official
          </span>
        </div>

        {/* Category List */}
        <div className="divide-y divide-slate-100">
          <Link
            href="/shop"
            className={`flex items-center justify-between px-4 py-2.5 text-xs font-semibold transition group ${
              !activeCategory
                ? 'bg-[#EFF6FF] text-[#2563EB] font-bold'
                : 'text-slate-700 hover:bg-slate-50 hover:text-[#2563EB]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>All Products & Deals</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition" />
          </Link>

          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className={`flex items-center justify-between px-4 py-2.5 text-xs font-medium transition group ${
                  isActive
                    ? 'bg-[#EFF6FF] text-[#2563EB] font-bold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#2563EB]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#2563EB]' : 'text-slate-400 group-hover:text-[#2563EB]'}`} />
                  <span>{cat.name}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition" />
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
      <div className="w-full h-64 bg-white border border-[#E5E7EB] rounded-2xl animate-pulse" />
    }>
      <CategoryContent />
    </Suspense>
  );
}
