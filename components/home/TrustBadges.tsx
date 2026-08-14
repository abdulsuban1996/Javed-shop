'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Tag, RefreshCw, Lock } from 'lucide-react';

const BADGES = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'On orders above ৳50',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Tag,
    title: 'Best Deals',
    description: 'Save more everyday',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-days return',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Lock,
    title: 'Secure Payment',
    description: '100% secure payment',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
];

export default function TrustBadges() {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 my-5">
      {BADGES.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-3.5 py-3 shadow-sm hover:shadow-md hover:border-purple-200 transition"
          >
            <div className={`p-2.5 rounded-xl ${badge.bg} shrink-0`}>
              <Icon className={`w-5 h-5 ${badge.color}`} />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-800 text-xs truncate">{badge.title}</p>
              <p className="text-[10px] text-slate-500 truncate">{badge.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
