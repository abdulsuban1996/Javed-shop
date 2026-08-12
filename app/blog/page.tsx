'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';

const POSTS = [
  {
    id: '1',
    title: 'Top 5 Best TWS Bluetooth Earbuds to Buy in Bangladesh (2026)',
    excerpt: 'Detailed comparison of sound quality, active noise cancellation (ANC), battery backup, and pricing for imported TWS earbuds under 2000 Taka.',
    date: 'August 10, 2026',
    author: 'Javed Tech Team',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800',
  },
  {
    id: '2',
    title: 'Smartwatch Buying Guide: How to Choose original Ultra Series 8',
    excerpt: 'Everything you need to check before purchasing a budget smartwatch in BD — curved HD screen, heart rate sensors, battery backup, and IP68 waterproof rating.',
    date: 'August 08, 2026',
    author: 'Javed Gadget Reviews',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-black text-white">China Gadget Reviews & Buying Guides</h1>
        <p className="text-xs text-slate-400">Tips, comparison guides, and unboxing reviews to help you make informed shopping decisions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {POSTS.map((post) => (
          <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between">
            <div className="relative w-full h-48 bg-slate-950">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-accent-orange" /> {post.date}</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-accent-amber" /> {post.author}</span>
              </div>

              <h2 className="text-lg font-black text-white hover:text-accent-amber transition leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-slate-400 leading-relaxed">
                {post.excerpt}
              </p>

              <button className="text-xs font-black text-accent-orange hover:text-accent-amber transition flex items-center gap-1 pt-2">
                <span>Read Full Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
