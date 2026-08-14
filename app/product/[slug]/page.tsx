'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, ShoppingCart, ShieldCheck, Truck, Check, Zap, ArrowLeft } from 'lucide-react';
import { useCart } from '../../../context/CartContext';

const SAMPLE_PRODUCTS: Record<string, any> = {
  'aultima-tws-bluetooth-53-earbuds': {
    id: 'p1', title: 'Aultima TWS Bluetooth 5.3 Earbuds with LED Display', slug: 'aultima-tws-bluetooth-53-earbuds',
    price: 2450, discount_price: 1490, stock: 45,
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800', 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?q=80&w=800'],
    rating: 4.9, reviews_count: 42,
    description: 'High performance noise-cancelling China imported TWS Earbuds featuring Bluetooth V5.3 technology, crystal clear mic clarity for calls, deep stereo bass boost, and an intelligent LED percentage battery display.',
    specifications: { 'Bluetooth Version': 'V5.3 + EDR', 'Battery Capacity': '300mAh Case / 40mAh Earbud', 'Music Playtime': 'Up to 6 Hours', 'Charging Time': '1.2 Hours', 'Waterproof': 'IPX5 Sweat-proof', 'Warranty': '6 Months Replacement' },
  },
  'ultra-smartwatch-8-series-hd-curved-screen': {
    id: 'p2', title: 'Ultra Smartwatch 8 Series with HD Curved Screen', slug: 'ultra-smartwatch-8-series-hd-curved-screen',
    price: 3800, discount_price: 2490, stock: 30,
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800', 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800'],
    rating: 4.8, reviews_count: 89,
    description: 'Next-generation smartwatch featuring a vibrant 2.0-inch HD curved screen, Bluetooth HD voice calling, heart rate monitor, SpO2 blood oxygen sensor, and customizable watch faces.',
    specifications: { 'Display': '2.0 inch HD IPS Touch', 'Calling': 'Bluetooth HD Speaker & Mic', 'Battery Life': '5-7 Days / 30 Days Standby', 'Strap': 'Silicone & Metal Loop', 'Compatibility': 'Android 5.0+ & iOS 9.0+' },
  },
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const product = SAMPLE_PRODUCTS[params.slug] || SAMPLE_PRODUCTS['aultima-tws-bluetooth-53-earbuds'];

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);

  const discountPercent = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart({ id: product.id, title: product.title, price: product.price, discount_price: product.discount_price, image: product.images[0], slug: product.slug }, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({ id: product.id, title: product.title, price: product.price, discount_price: product.discount_price, image: product.images[0], slug: product.slug }, quantity);
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Breadcrumb */}
      <Link href="/shop" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-600 transition">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Shop
      </Link>

      {/* Product Hero */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

        {/* Image Gallery */}
        <div className="md:col-span-5 space-y-3">
          <div className="relative w-full aspect-square bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            {discountPercent > 0 && (
              <span className="absolute top-3 left-3 z-10 bg-red-500 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow">
                -{discountPercent}% OFF
              </span>
            )}
            <Image src={selectedImage} alt={product.title} fill className="object-cover" priority />
          </div>
          {product.images.length > 1 && (
            <div className="flex items-center gap-2">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition ${selectedImage === img ? 'border-purple-600 shadow-md scale-105' : 'border-slate-200 hover:border-purple-300'}`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="md:col-span-7 space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-purple-600 uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Direct China Import
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight">{product.title}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                ))}
              </div>
              <span className="text-xs text-slate-600 font-semibold">{product.rating}/5.0</span>
              <span className="text-xs text-slate-400">({product.reviews_count} reviews)</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-purple-600">
                ৳{(product.discount_price || product.price).toLocaleString()}
              </span>
              {product.discount_price && (
                <span className="text-sm text-slate-400 line-through">৳{product.price.toLocaleString()}</span>
              )}
            </div>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1.5">
              <Check className="w-3.5 h-3.5" /> In Stock ({product.stock} units in Dhaka warehouse)
            </p>
          </div>

          {/* Quantity */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quantity</label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 w-fit">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-lg font-bold">-</button>
              <span className="w-12 text-center text-sm font-black text-slate-800">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-lg font-bold">+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              className={`py-3 px-4 rounded-xl font-black text-sm transition flex items-center justify-center gap-2 ${
                addedToast ? 'bg-emerald-500 text-white' : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {addedToast ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
              <span>{addedToast ? 'Added!' : 'Add to Cart'}</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="py-3 px-4 rounded-xl font-black text-sm bg-purple-600 text-white hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow-md"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Delivery & Warranty */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 text-xs">
              <Truck className="w-4 h-4 text-purple-500 shrink-0" />
              <div>
                <p className="font-bold text-slate-800">Nationwide Delivery</p>
                <p className="text-[10px] text-slate-500">Dhaka ৳60 · Outside ৳120</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <p className="font-bold text-slate-800">Warranty</p>
                <p className="text-[10px] text-slate-500">7 Days Replacement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-black text-slate-800">Product Details & Specifications</h2>
        </div>
        <div className="p-6">
          <p className="text-slate-600 text-sm leading-relaxed mb-5">{product.description}</p>
          {product.specifications && (
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <tbody>
                {Object.entries(product.specifications).map(([key, val]: any, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="py-2.5 px-4 font-semibold text-slate-600 w-1/3 border-b border-slate-100">{key}</td>
                    <td className="py-2.5 px-4 font-medium text-slate-800 border-b border-slate-100">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
}
