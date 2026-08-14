'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Tag, RefreshCw, ShieldCheck } from 'lucide-react';

const BADGES = [
  {
    icon: Truck,
    title: 'Fast Nationwide Delivery',
    description: 'Inside & Outside Dhaka delivery',
    color: 'text-[#2563EB]',
    bg: 'bg-[#2563EB]/10',
  },
  {
    icon: Tag,
    title: 'Direct Best Value',
    description: 'Guaranteed competitive pricing',
    color: 'text-[#25C55E]',
    bg: 'bg-[#25C55E]/10',
  },
  {
    icon: RefreshCw,
    title: '7 Days Return & Warranty',
    description: 'Quick replacement guarantee',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: ShieldCheck,
    title: '100% Genuine Products',
    description: 'Verified brand authentic quality',
    color: 'text-[#2563EB]',
    bg: 'bg-[#2563EB]/10',
  },
];

export default function TrustBadges() {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3.5 my-4">
      {BADGES.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-2xl px-4 py-3.5 shadow-sm hover:border-[#2563EB]/40 hover:shadow-md transition-all duration-200"
          >
            <div className={`p-2.5 rounded-xl ${badge.bg} shrink-0`}>
              <Icon className={`w-5 h-5 ${badge.color}`} />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-[#0B1220] text-xs truncate">{badge.title}</p>
              <p className="text-[11px] text-slate-500 truncate">{badge.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
