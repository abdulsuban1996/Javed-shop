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
  Cpu,
  Cable,
} from 'lucide-react';

function CategoryContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  const categories = [
    { id: 'electronics', name: 'Electronics', icon: Cpu },
    { id: 'fashion', name: 'Fashion', icon: Layers },
    { id: 'home-kitchen', name: 'Home & Kitchen', icon: Speaker },
    { id: 'beauty', name: 'Beauty & Health', icon: Zap },
    { id: 'sports', name: 'Sports & Outdoors', icon: Watch },
    { id: 'toys', name: 'Toys & Games', icon: Gamepad2 },
    { id: 'automotive', name: 'Automotive', icon: Smartphone },
    { id: 'books', name: 'Books & More', icon: Cable },
  ];

  return (
    <div className="w-full space-y-2">
      {/* Mobile Horizontal Scroll Category Bar */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Link
          href="/shop"
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold shrink-0 border transition ${
            !activeCategory
              ? 'bg-purple-600 text-white border-purple-600 shadow-md'
              : 'bg-white text-slate-600 border-slate-200 hover:text-purple-600'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Categories</span>
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
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-purple-600'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Desktop Vertical Sidebar */}
      <div className="hidden lg:block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {/* All Categories Header Button */}
        <Link
          href="/shop"
          className="flex items-center gap-2.5 px-4 py-3 bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition"
        >
          <Layers className="w-4 h-4" />
          <span>All Categories</span>
        </Link>

        {/* Category List */}
        <div className="divide-y divide-slate-100">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className={`flex items-center justify-between px-4 py-2.5 text-xs font-medium transition group ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-purple-600'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-purple-600' : 'text-slate-400 group-hover:text-purple-500'}`} />
                  <span>{cat.name}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-purple-400 transition" />
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
      <div className="w-full h-64 bg-white border border-slate-200 rounded-xl animate-pulse" />
    }>
      <CategoryContent />
    </Suspense>
  );
}
