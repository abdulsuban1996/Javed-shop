'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard, { Product } from '../product/ProductCard';

export default function HomeFeaturedGrid({ products }: { products: Product[] }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.32 } },
  };

  return (
    <section className="my-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
          Featured China Gadgets
        </h2>
        <Link
          href="/shop"
          className="flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-800 transition group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
        </Link>
      </div>

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
