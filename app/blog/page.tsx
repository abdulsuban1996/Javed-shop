'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

const POSTS = [
  {
    id: '1',
    title: 'Top 5 Best Smart TWS Earbuds to Buy in Bangladesh (2026)',
    excerpt: 'A comprehensive comparison of sound fidelity, active noise cancellation, battery life, and pricing for genuine smart audio gear.',
    date: 'August 12, 2026',
    author: 'Javed Editorial Team',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800',
    tag: 'Audio & Earbuds',
  },
  {
    id: '2',
    title: 'Smartwatch Buying Guide: Features to Look for in Modern Wearables',
    excerpt: 'Everything you need to evaluate before buying a smartwatch in BD — curved displays, health sensors, Bluetooth calling, and battery standby.',
    date: 'August 08, 2026',
    author: 'Javed Tech Reviews',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800',
    tag: 'Smartwatch Guide',
  },
  {
    id: '3',
    title: 'Everyday Tech Essentials for Remote Work & Productivity',
    excerpt: 'We tested the best fast GaN chargers, ergonomic accessories, and magnetic wireless gear designed to make daily tasks frictionless.',
    date: 'August 04, 2026',
    author: 'Javed Lifestyle Desk',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800',
    tag: 'Lifestyle & Tech',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      
      {/* Page Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-1 text-[#2563EB]">
          <BookOpen className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Editorial & Guides</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1220] tracking-tight">
          Product Reviews & Smart Buying Guides
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Honest breakdowns, tips, and unboxing reviews to help you make informed shopping decisions
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {POSTS.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#2563EB]/40 transition duration-200 group flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative w-full h-44 bg-[#F8FAFC] overflow-hidden shrink-0">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-[#0B1220] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-slate-700">
                {post.tag}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-4 space-y-2.5 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
              </div>

              <h2 className="text-sm font-extrabold text-[#0B1220] group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2">
                {post.title}
              </h2>

              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1">
                {post.excerpt}
              </p>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-[#2563EB] group-hover:text-[#1D4ED8] transition flex items-center gap-1">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
