'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';

const POSTS = [
  {
    id: '1',
    title: 'Top 5 Best TWS Bluetooth Earbuds to Buy in Bangladesh (2026)',
    excerpt: 'Detailed comparison of sound quality, active noise cancellation (ANC), battery backup, and pricing for imported TWS earbuds under 2000 Taka.',
    date: 'August 10, 2026',
    author: 'Javed Tech Team',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800',
    tag: 'Earbuds',
  },
  {
    id: '2',
    title: 'Smartwatch Buying Guide: How to Choose Original Ultra Series 8',
    excerpt: 'Everything you need to check before purchasing a budget smartwatch in BD — curved HD screen, heart rate sensors, battery backup, and IP68 waterproof rating.',
    date: 'August 08, 2026',
    author: 'Javed Gadget Reviews',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800',
    tag: 'Smartwatch',
  },
  {
    id: '3',
    title: 'Best Bluetooth Speakers Under 3000 Taka — 2026 Roundup',
    excerpt: 'We tested 10 portable Bluetooth speakers from China imports. Here are the top picks for bass, battery life, and value for money in Bangladesh.',
    date: 'August 05, 2026',
    author: 'Javed Tech Team',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800',
    tag: 'Speaker',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
          Gadget Reviews & Buying Guides
        </h1>
        <p className="text-xs text-slate-500 mt-1">Tips, comparison guides, and unboxing reviews to help you shop smarter</p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {POSTS.map((post) => (
          <div key={post.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-purple-200 transition group flex flex-col">
            {/* Image */}
            <div className="relative w-full h-44 bg-slate-50 overflow-hidden shrink-0">
              <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition duration-400" />
              <span className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg">
                {post.tag}
              </span>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
              </div>

              <h2 className="text-sm font-black text-slate-800 group-hover:text-purple-700 transition leading-snug line-clamp-2">
                {post.title}
              </h2>

              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1">
                {post.excerpt}
              </p>

              <button className="text-xs font-black text-purple-600 hover:text-purple-800 transition flex items-center gap-1 pt-1 group/btn">
                <span>Read Full Review</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
