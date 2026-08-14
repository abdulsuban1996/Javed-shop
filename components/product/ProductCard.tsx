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
    setTimeout(() => setAdded(false), 1600);
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

  const rating = product.rating || 4.8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white border border-[#E5E7EB] hover:border-[#2563EB]/40 rounded-2xl overflow-hidden flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-square bg-[#F8FAFC] overflow-hidden shrink-0">
        
        {/* Discount Badge (Subtle Red/Green) */}
        {discountPercent > 0 && (
          <span className="absolute top-2.5 left-2.5 z-20 bg-[#EF4444] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-sm">
            -{discountPercent}%
          </span>
        )}

        {/* Hot / Flash Badge */}
        {product.is_flash_sale && (
          <span className="absolute top-2.5 right-2.5 z-20 bg-[#0B1220] text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded-md shadow-sm border border-slate-700">
            OFFER
          </span>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 z-10 bg-[#0B1220]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1.5 rounded-lg bg-white text-[#0B1220] font-bold text-xs shadow-md flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </span>
        </div>

        {/* Product Image Link */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={mainImage}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        </Link>
      </div>

      {/* Card Body */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
        
        {/* Title and Rating */}
        <div className="space-y-1.5">
          
          {/* Star Rating Row */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-500 font-semibold">
              ({product.reviews_count || 18})
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-xs font-bold text-[#0B1220] group-hover:text-[#2563EB] transition-colors duration-150 line-clamp-2 leading-snug min-h-[2.4em]">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Price & Action Section */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          
          {/* Price Row */}
          <div className="flex items-baseline gap-2">
            {product.discount_price ? (
              <>
                <span className="text-sm sm:text-base font-extrabold text-[#0B1220]">
                  ৳{product.discount_price.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 line-through">
                  ৳{product.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-sm sm:text-base font-extrabold text-[#0B1220]">
                ৳{product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons Row */}
          <div className="grid grid-cols-12 gap-1.5 items-center">
            
            {/* Primary Action: Buy Now (Electric Blue) */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleBuyNow}
              className="col-span-8 h-8 px-2 rounded-lg bg-[#2563EB] text-white font-bold text-[11px] hover:bg-[#1D4ED8] transition flex items-center justify-center gap-1 shadow-sm"
            >
              <Zap className="w-3 h-3 fill-current" />
              <span>Buy Now</span>
            </motion.button>

            {/* Secondary Action: Add to Cart */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleAddToCart}
              className={`col-span-4 h-8 px-1.5 rounded-lg font-bold transition flex items-center justify-center border ${
                added
                  ? 'bg-[#25C55E] text-white border-[#25C55E]'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] text-slate-600 hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#2563EB]/30'
              }`}
              title="Add to Cart"
            >
              {added ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
            </motion.button>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
