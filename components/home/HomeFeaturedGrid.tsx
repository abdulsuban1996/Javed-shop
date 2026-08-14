'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import ProductCard, { Product } from '../product/ProductCard';

export default function HomeFeaturedGrid({ products }: { products: Product[] }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
      transition={{ duration: 0.5 }}
      className="my-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
            Featured China Gadgets
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            Browse top picks, trending wearables & mobile gear
          </p>
        </div>
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
    </motion.section>
  );
}
