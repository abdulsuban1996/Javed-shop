'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Percent, RefreshCw, Lock } from 'lucide-react';

const BADGES = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Inside & Outside Dhaka Delivery',
    color: 'text-sky-400',
    border: 'hover:border-sky-500/50',
    bg: 'bg-sky-500/10',
  },
  {
    icon: Percent,
    title: 'Best Deals',
    description: 'Direct China Import Prices',
    color: 'text-amber-400',
    border: 'hover:border-amber-500/50',
    bg: 'bg-amber-500/10',
  },
  {
    icon: RefreshCw,
    title: '7 Days Return',
    description: 'Replacement Guarantee',
    color: 'text-emerald-400',
    border: 'hover:border-emerald-500/50',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Lock,
    title: 'Secure Payment',
    description: 'bKash, Nagad & Cash on Delivery',
    color: 'text-purple-400',
    border: 'hover:border-purple-500/50',
    bg: 'bg-purple-500/10',
  },
];

export default function TrustBadges() {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-6">
      {BADGES.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className={`p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3.5 transition-all duration-300 shadow-lg hover:shadow-xl ${badge.border}`}
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className={`p-2.5 rounded-xl bg-slate-950 ${badge.color} ${badge.bg}`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
            <div>
              <h3 className="font-extrabold text-xs sm:text-sm text-white tracking-tight">
                {badge.title}
              </h3>
              <p className="text-[11px] text-slate-400 leading-tight">
                {badge.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
