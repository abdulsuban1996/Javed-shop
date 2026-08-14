'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Percent, RefreshCw, Lock } from 'lucide-react';

const BADGES = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Inside & Outside Dhaka Delivery',
    color: 'text-sky-600',
    border: 'hover:border-sky-500/50',
    bg: 'bg-sky-50 border border-sky-200',
  },
  {
    icon: Percent,
    title: 'Best Deals',
    description: 'Direct China Import Prices',
    color: 'text-orange-600',
    border: 'hover:border-orange-500/50',
    bg: 'bg-orange-50 border border-orange-200',
  },
  {
    icon: RefreshCw,
    title: '7 Days Return',
    description: 'Replacement Guarantee',
    color: 'text-emerald-600',
    border: 'hover:border-emerald-500/50',
    bg: 'bg-emerald-50 border border-emerald-200',
  },
  {
    icon: Lock,
    title: 'Secure Payment',
    description: 'bKash, Nagad & Cash on Delivery',
    color: 'text-purple-600',
    border: 'hover:border-purple-500/50',
    bg: 'bg-purple-50 border border-purple-200',
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
            className={`p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3.5 transition-all duration-300 shadow-sm hover:shadow-md ${badge.border}`}
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className={`p-2.5 rounded-xl ${badge.color} ${badge.bg}`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
            <div>
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 tracking-tight">
                {badge.title}
              </h3>
              <p className="text-[11px] text-slate-500 leading-tight">
                {badge.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
