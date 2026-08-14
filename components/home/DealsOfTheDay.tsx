'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard, { Product } from '../product/ProductCard';

export default function DealsOfTheDay({ products }: { products: Product[] }) {
  const dealProducts = products.filter((p) => p.is_deal_of_day || p.discount_price).slice(0, 5);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <section className="my-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
          Deals of the Day
        </h2>
        <Link
          href="/shop?deal=true"
          className="flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-800 transition group"
        >
          <span>View All</span>
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
