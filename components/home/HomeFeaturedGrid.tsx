'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard, { Product } from '../product/ProductCard';

export default function HomeFeaturedGrid({ products }: { products: Product[] }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  return (
    <section className="my-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-[#0B1220] tracking-tight">
              Featured Products & Best Sellers
            </h2>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Top quality gadgets & accessories handpicked for you
            </p>
          </div>
        </div>

        <Link
          href="/shop"
          className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition group bg-[#EFF6FF] px-3 py-1.5 rounded-lg border border-[#2563EB]/20"
        >
          <span>View All Products</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
        </Link>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={itemVariants} className="h-full flex flex-col">
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
