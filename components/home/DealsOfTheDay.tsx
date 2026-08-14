'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import ProductCard, { Product } from '../product/ProductCard';

export default function DealsOfTheDay({ products }: { products: Product[] }) {
  const dealProducts = products.filter((p) => p.is_deal_of_day || p.discount_price).slice(0, 5);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <section className="my-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-[#0B1220] tracking-tight">
              Deals of the Day
            </h2>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Special offers on top-rated products updated daily
            </p>
          </div>
        </div>

        <Link
          href="/shop?deal=true"
          className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition group bg-[#EFF6FF] px-3 py-1.5 rounded-lg border border-[#2563EB]/20"
        >
          <span>View All Deals</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
        </Link>
      </div>

      {/* Products Row */}
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
    </section>
  );
}
