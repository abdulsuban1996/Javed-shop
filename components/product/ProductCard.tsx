'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Check, Zap } from 'lucide-react';
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

  const mainImage =
    product.images && product.images.length > 0
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

  const rating = product.rating || 4.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.22 }}
      className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative w-full aspect-square bg-slate-50 overflow-hidden shrink-0">
        {discountPercent > 0 && (
          <span className="absolute top-2 left-2 z-20 bg-red-500 text-white font-black text-[10px] px-1.5 py-0.5 rounded">
            -{discountPercent}%
          </span>
        )}
        {product.is_flash_sale && (
          <span className="absolute top-2 right-2 z-20 bg-purple-600 text-white font-bold text-[9px] uppercase px-1.5 py-0.5 rounded">
            FLASH
          </span>
        )}

        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={mainImage}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-400 ease-out"
          />
        </Link>
      </div>

      {/* Body */}
      <div className="p-2.5 flex flex-col flex-1 gap-2">
        {/* Title */}
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="text-[11px] font-semibold text-slate-700 line-clamp-2 leading-tight min-h-[2.4em] group-hover:text-purple-700 transition">
            {product.title}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-2.5 h-2.5 ${
                  i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-[9px] text-slate-400">({product.reviews_count || 12})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-auto">
          {product.discount_price ? (
            <>
              <span className="text-sm font-black text-slate-800">
                ৳{product.discount_price.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 line-through">
                ৳{product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-sm font-black text-slate-800">
              ৳{product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-12 gap-1.5 items-center pt-1 border-t border-slate-100">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyNow}
            className="col-span-8 h-7 px-2 rounded-lg bg-purple-600 text-white font-black text-[10px] hover:bg-purple-700 transition flex items-center justify-center gap-0.5 shadow-sm"
          >
            <Zap className="w-2.5 h-2.5 fill-current" />
            <span>Buy Now</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className={`col-span-4 h-7 px-1.5 rounded-lg font-bold transition flex items-center justify-center shadow-sm ${
              added
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-100 border border-slate-200 text-slate-500 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200'
            }`}
            title="Add to Cart"
          >
            {added ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
