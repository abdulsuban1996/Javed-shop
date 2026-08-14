'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Tag, ArrowRight } from 'lucide-react';
import ProductCard, { Product } from '../product/ProductCard';

export default function DealsOfTheDay({ products }: { products: Product[] }) {
  const dealProducts = products.filter((p) => p.is_deal_of_day || p.discount_price).slice(0, 5);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="my-8"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-sm"
          >
            <Tag className="w-5 h-5" />
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
                Deals of the Day
              </h2>
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="bg-accent-orange text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shadow-sm"
              >
                Hot Offer
              </motion.span>
            </div>
            <p className="text-xs text-slate-500">
              Limited quantity gadget deals imported directly from China
            </p>
          </div>
        </div>

        <Link
          href="/shop?deal=true"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-orange-600 hover:text-orange-700 transition group"
        >
          <span>View All Deals</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </Link>
      </motion.div>

      {/* Staggered Cards Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
      >
        {dealProducts.map((product) => (
          <motion.div key={product.id} variants={itemVariants} className="h-full flex flex-col">
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
