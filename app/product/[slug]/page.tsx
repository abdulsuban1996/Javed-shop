'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, ShoppingCart, ShieldCheck, Truck, Check, Zap, ArrowLeft } from 'lucide-react';
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
    description: 'High performance noise-cancelling TWS Earbuds featuring Bluetooth V5.3 technology, crystal clear mic clarity for voice calls, deep stereo bass boost, and an intelligent digital LED percentage battery display.',
    specifications: {
      'Bluetooth Version': 'V5.3 + EDR',
      'Battery Capacity': '300mAh Case / 40mAh Earbud',
      'Playtime': 'Up to 6 Hours per single charge',
      'Charging Time': '1.2 Hours (USB-C Fast Charging)',
      'Water Resistance': 'IPX5 Sweat-proof',
      'Warranty': '6 Months Replacement Guarantee',
    },
  },
  'ultra-smartwatch-8-series-hd-curved-screen': {
    id: 'p2',
    title: 'Ultra Smartwatch 8 Series with HD Curved Screen',
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
      'Display': '2.0 inch HD IPS Curved Touchscreen',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">

      {/* Breadcrumb */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#2563EB] transition font-medium"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Products</span>
      </Link>

      {/* Product Hero Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

        {/* Left: Image Gallery */}
        <div className="md:col-span-5 space-y-3">
          <div className="relative w-full aspect-square bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
            {discountPercent > 0 && (
              <span className="absolute top-3 left-3 z-10 bg-[#EF4444] text-white font-extrabold text-xs px-2.5 py-1 rounded-md shadow-sm">
                -{discountPercent}% OFF
              </span>
            )}
            <Image src={selectedImage} alt={product.title} fill className="object-cover" priority />
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-2.5">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === img
                      ? 'border-[#2563EB] shadow-sm scale-105'
                      : 'border-[#E5E7EB] hover:border-[#2563EB]/40'
                  }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info & Actions */}
        <div className="md:col-span-7 space-y-5">
          
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider bg-[#EFF6FF] px-2.5 py-1 rounded-md border border-[#2563EB]/20">
              Official JAVED SHOP Selection
            </span>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1220] leading-snug">
              {product.title}
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-[#0B1220] font-bold">{product.rating} / 5.0</span>
              <span className="text-xs text-slate-500">({product.reviews_count} Customer Reviews)</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 shadow-sm space-y-1.5">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0B1220]">
                ৳{(product.discount_price || product.price).toLocaleString()}
              </span>
              {product.discount_price && (
                <span className="text-sm text-slate-400 line-through">
                  ৳{product.price.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs text-[#25C55E] font-bold flex items-center gap-1">
              <Check className="w-4 h-4" /> In Stock ({product.stock} units available in Dhaka warehouse)
            </p>
          </div>

          {/* Quantity Stepper */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quantity</label>
            <div className="flex items-center bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-1 w-fit">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-lg font-bold"
              >
                -
              </button>
              <span className="w-10 text-center text-sm font-extrabold text-[#0B1220]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-lg font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleAddToCart}
              className={`py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 border ${
                addedToast
                  ? 'bg-[#25C55E] text-white border-[#25C55E]'
                  : 'bg-[#F8FAFC] border-[#E5E7EB] text-slate-700 hover:bg-[#EFF6FF] hover:text-[#2563EB] hover:border-[#2563EB]/30'
              }`}
            >
              {addedToast ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
              <span>{addedToast ? 'Added to Cart!' : 'Add to Cart'}</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Buy Now (Order)</span>
            </button>
          </div>

          {/* Delivery & Warranty Chips */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E5E7EB] text-xs">
              <Truck className="w-4 h-4 text-[#2563EB] shrink-0" />
              <div>
                <p className="font-bold text-[#0B1220]">Nationwide Delivery</p>
                <p className="text-[10px] text-slate-500">Dhaka ৳60 · Outside Dhaka ৳120</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E5E7EB] text-xs">
              <ShieldCheck className="w-4 h-4 text-[#25C55E] shrink-0" />
              <div>
                <p className="font-bold text-[#0B1220]">7-Day Warranty</p>
                <p className="text-[10px] text-slate-500">Easy replacement guarantee</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Specifications & Description */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 bg-[#F8FAFC]">
          <h2 className="text-sm sm:text-base font-extrabold text-[#0B1220]">
            Product Details & Specifications
          </h2>
        </div>
        <div className="p-6">
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {product.specifications && (
            <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val]: any, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-[#F8FAFC]' : 'bg-white'}>
                      <td className="py-2.5 px-4 font-bold text-[#0B1220] w-1/3 border-b border-slate-100">
                        {key}
                      </td>
                      <td className="py-2.5 px-4 font-medium text-slate-600 border-b border-slate-100">
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

    </div>
  );
}
