'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Tag, RefreshCw, ShieldCheck } from 'lucide-react';

const BADGES = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    subtitle: 'Nationwide in BD',
    description: 'Inside & Outside Dhaka',
    color: 'text-[#2563EB]',
    bg: 'bg-[#2563EB]/10',
  },
  {
    icon: Tag,
    title: 'Best Value',
    subtitle: 'Direct Pricing',
    description: 'Competitive prices',
    color: 'text-[#25C55E]',
    bg: 'bg-[#25C55E]/10',
  },
  {
    icon: RefreshCw,
    title: '7 Days Return',
    subtitle: '& Easy Warranty',
    description: 'Quick replacement',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: ShieldCheck,
    title: '100% Genuine',
    subtitle: 'Authentic Products',
    description: 'Verified brand quality',
    color: 'text-[#2563EB]',
    bg: 'bg-[#2563EB]/10',
  },
];

export default function TrustBadges() {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 my-3 sm:my-4">
      {BADGES.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="flex items-center gap-2.5 sm:gap-3 bg-white border border-[#E5E7EB] rounded-2xl p-2.5 sm:px-4 sm:py-3.5 shadow-sm hover:border-[#2563EB]/40 hover:shadow-md transition-all duration-200"
          >
            <div className={`p-2 sm:p-2.5 rounded-xl ${badge.bg} shrink-0 flex items-center justify-center`}>
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${badge.color}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-[#0B1220] text-[11px] sm:text-xs leading-tight">
                {badge.title} <span className="hidden sm:inline font-normal text-slate-500">{badge.subtitle}</span>
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-500 leading-tight mt-0.5">
                {badge.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

