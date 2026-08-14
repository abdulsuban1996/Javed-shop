'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, Check, ArrowRight, Zap } from 'lucide-react';
import { useCart } from '../../../context/CartContext';

const SAMPLE_PRODUCTS: Record<string, any> = {
  'aultima-tws-bluetooth-53-earbuds': {
    id: 'p1',
    title: 'Aultima TWS Bluetooth 5.3 Earbuds with LED Display',
    slug: 'aultima-tws-bluetooth-53-earbuds',
    price: 2450,
    discount_price: 1490,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?q=80&w=800',
    ],
    rating: 4.9,
    reviews_count: 42,
    description: 'High performance noise-cancelling China imported TWS Earbuds featuring Bluetooth V5.3 technology, crystal clear mic clarity for calls, deep stereo bass boost, and an intelligent LED percentage battery display.',
    specifications: {
      'Bluetooth Version': 'V5.3 + EDR',
      'Battery Capacity': '300mAh Case / 40mAh Earbud',
      'Music Playtime': 'up to 6 Hours per single charge',
      'Charging Time': '1.2 Hours',
      'Waterproof Standard': 'IPX5 Sweat-proof',
      'Warranty': '6 Months Replacement Guarantee',
    },
  },
  'ultra-smartwatch-8-series-hd-curved-screen': {
    id: 'p2',
    title: 'Ultra Ultra Smartwatch 8 Series with HD Curved Screen',
    slug: 'ultra-smartwatch-8-series-hd-curved-screen',
    price: 3800,
    discount_price: 2490,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800',
    ],
    rating: 4.8,
    reviews_count: 89,
    description: 'Next-generation smartwatch featuring a vibrant 2.0-inch HD curved screen, Bluetooth HD voice calling, heart rate monitor, SpO2 blood oxygen sensor, and customizable watch faces.',
    specifications: {
      'Display Size': '2.0 inch HD IPS Touchscreen',
      'Calling': 'Bluetooth HD Speaker & Mic',
      'Battery Life': '5-7 Days Active Use / 30 Days Standby',
      'Strap Material': 'Soft Silicone & Metal Loop',
      'Compatibility': 'Android 5.0+ & iOS 9.0+',
    },
  },
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { addToCart } = useCart();
  
  // Fallback to default product if slug matching sample
  const product = SAMPLE_PRODUCTS[params.slug] || SAMPLE_PRODUCTS['aultima-tws-bluetooth-53-earbuds'];

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);

  const discountPercent = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        discount_price: product.discount_price,
        image: product.images[0],
        slug: product.slug,
      },
      quantity
    );
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        discount_price: product.discount_price,
        image: product.images[0],
        slug: product.slug,
      },
      quantity
    );
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Top Product Hero */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative w-full aspect-square bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 z-10 bg-accent-orange text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl shadow-lg">
                -{discountPercent}% OFF
              </span>
            )}
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Thumbnail Gallery Row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === img
                      ? 'border-accent-orange scale-105 shadow-md'
                      : 'border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Title, Pricing, Actions */}
        <div className="md:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-accent-orange uppercase tracking-wider bg-accent-orange/10 px-3 py-1 rounded-full border border-accent-orange/30">
              Direct China Import
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {product.title}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-300 font-bold">
                {product.rating} / 5.0
              </span>
              <span className="text-xs text-slate-500">
                ({product.reviews_count} Customer Reviews)
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-accent-orange">
                ৳{(product.discount_price || product.price).toLocaleString()}
              </span>
              {product.discount_price && (
                <span className="text-sm text-slate-400 line-through">
                  ৳{product.price.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1 pt-1">
              <Check className="w-4 h-4" /> In Stock ({product.stock} units available in Dhaka warehouse)
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-slate-300 hover:bg-slate-800 rounded-lg font-bold"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-extrabold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-slate-300 hover:bg-slate-800 rounded-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={handleAddToCart}
              className={`py-3.5 px-6 rounded-2xl font-black text-sm transition flex items-center justify-center gap-2 shadow-lg ${
                addedToast
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-900 hover:bg-brand-800 text-white border border-brand-700'
              }`}
            >
              {addedToast ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5 text-accent-amber" />}
              <span>{addedToast ? 'Added to Cart!' : 'Add to Cart'}</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="py-3.5 px-6 rounded-2xl font-black text-sm bg-gradient-to-r from-accent-orange to-accent-amber text-slate-950 hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-accent-orange/30 transform active:scale-95"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>Buy Now (Order)</span>
            </button>
          </div>

          {/* Delivery & Warranty Info */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
              <Truck className="w-5 h-5 text-accent-orange shrink-0" />
              <div>
                <p className="font-extrabold text-white">Nationwide Delivery</p>
                <p className="text-[11px] text-slate-400">Inside Dhaka ৳60, Outside ৳120</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-extrabold text-white">Warranty</p>
                <p className="text-[11px] text-slate-400">7 Days Replacement</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Specifications & Description Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-black text-white uppercase tracking-tight border-b border-slate-800 pb-4">
          Product Details & Specifications
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          {product.description}
        </p>

        {product.specifications && (
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <tbody>
                {Object.entries(product.specifications).map(([key, val]: any, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-950/60' : 'bg-slate-900'}>
                    <td className="py-3 px-4 font-bold text-slate-400 w-1/3 border-b border-slate-800">
                      {key}
                    </td>
                    <td className="py-3 px-4 font-medium text-white border-b border-slate-800">
                      {val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
