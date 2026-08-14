'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Check, Zap, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  discount_price?: number | null;
  images: string[];
  rating?: number;
  reviews_count?: number;
  is_deal_of_day?: boolean;
  is_flash_sale?: boolean;
  stock?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const mainImage = product.images && product.images.length > 0
    ? product.images[0]
    : 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop';

  const discountPercent = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      discount_price: product.discount_price,
      image: mainImage,
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      discount_price: product.discount_price,
      image: mainImage,
      slug: product.slug,
    });
    router.push('/checkout');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative bg-slate-900/95 backdrop-blur-md border border-slate-800/90 hover:border-accent-orange/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-accent-orange/10 transition-all duration-300 flex flex-col justify-between h-full max-w-full"
    >
      
      {/* Top Image Container - Compact Aspect Ratio */}
      <div className="relative w-full aspect-square bg-slate-950 overflow-hidden shrink-0">
        {discountPercent > 0 && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-2 left-2 z-20 bg-gradient-to-r from-accent-orange to-accent-amber text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-lg shadow-md flex items-center gap-0.5"
          >
            <Zap className="w-3 h-3 text-slate-950 fill-current" />
            <span>-{discountPercent}%</span>
          </motion.div>
        )}

        {product.is_flash_sale && (
          <div className="absolute top-2 right-2 z-20 bg-brand-900/90 backdrop-blur-sm text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-full border border-brand-500/50 shadow-sm">
            Flash
          </div>
        )}

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 z-10 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/product/${product.slug}`}
            className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-white font-bold text-[11px] border border-slate-700 flex items-center gap-1 shadow-lg hover:bg-accent-orange hover:text-slate-950 transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View</span>
          </Link>
        </div>

        {/* Product Image */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={mainImage}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-108 transition duration-500 ease-out"
          />
        </Link>
      </div>

      {/* Compact Card Body */}
      <div className="p-2.5 sm:p-3 flex flex-col flex-1 justify-between gap-2">
        
        {/* Rating & Title Section */}
        <div className="space-y-1">
          {/* Star Rating Row */}
          <div className="flex items-center gap-1">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating || 4.8)
                      ? 'fill-current text-amber-400'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-400 font-bold">
              ({product.reviews_count || 12})
            </span>
          </div>

          {/* Compact Fixed Height Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-xs font-bold text-white group-hover:text-accent-amber transition line-clamp-2 leading-tight h-7">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Price & Action Buttons */}
        <div className="space-y-2 pt-1.5 border-t border-slate-800/80">
          
          {/* Price Alignment */}
          <div className="flex items-baseline justify-between gap-1">
            <div className="flex items-baseline gap-1.5">
              {product.discount_price ? (
                <>
                  <span className="text-sm sm:text-base font-black text-accent-orange">
                    ৳{product.discount_price.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 line-through">
                    ৳{product.price.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-sm sm:text-base font-black text-white">
                  ৳{product.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Compact Action Buttons Row */}
          <div className="grid grid-cols-12 gap-1.5 items-center">
            {/* Buy Now Direct Checkout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBuyNow}
              className="col-span-8 h-7 px-2 rounded-lg bg-gradient-to-r from-accent-orange to-accent-amber text-slate-950 font-black text-[11px] hover:brightness-110 transition flex items-center justify-center gap-0.5 shadow-sm"
            >
              <Zap className="w-3 h-3 fill-current" />
              <span>Buy Now</span>
            </motion.button>

            {/* Add to Cart Icon Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className={`col-span-4 h-7 px-1.5 rounded-lg font-bold transition flex items-center justify-center shadow-sm ${
                added
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-brand-900 hover:text-white'
              }`}
              title="Add to Cart"
            >
              {added ? <Check className="w-3.5 h-3.5 text-white" /> : <ShoppingCart className="w-3.5 h-3.5 text-accent-amber" />}
            </motion.button>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
