'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto px-4 py-20 text-center space-y-6"
      >
        <div className="w-20 h-20 bg-[#EFF6FF] border border-[#2563EB]/20 rounded-full flex items-center justify-center mx-auto text-[#2563EB] shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-[#0B1220]">Your Cart is Empty</h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
            You haven&#39;t added any products to your shopping cart yet. Start exploring our catalog!
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1D4ED8] transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Products</span>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1220] tracking-tight">Shopping Cart</h1>
          <p className="text-xs text-slate-500 mt-0.5">Review items before proceeding to secure checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-500 hover:text-rose-700 transition flex items-center gap-1 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          <AnimatePresence>
            {cart.map((item, idx) => {
              const activePrice = item.discount_price ?? item.price;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.2, delay: idx * 0.04 }}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-sm hover:border-[#2563EB]/30 transition"
                >
                  <div className="flex items-center gap-3.5 w-full sm:w-auto">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#F8FAFC] border border-[#E5E7EB] shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-bold text-[#0B1220] text-xs sm:text-sm hover:text-[#2563EB] transition line-clamp-2 block"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs sm:text-sm font-extrabold text-[#0B1220]">
                        ৳{activePrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    
                    {/* Quantity Stepper */}
                    <div className="flex items-center bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-0.5">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-lg font-bold text-sm"
                      >
                        -
                      </motion.button>
                      <span className="w-8 text-center text-xs font-extrabold text-[#0B1220]">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-lg font-bold text-sm"
                      >
                        +
                      </motion.button>
                    </div>

                    <span className="font-extrabold text-sm text-[#0B1220] min-w-[70px] text-right">
                      ৳{(activePrice * item.quantity).toLocaleString()}
                    </span>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm space-y-4 sticky top-24"
          >
            <h2 className="text-sm font-extrabold text-[#0B1220] uppercase tracking-wider border-b border-slate-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-bold text-[#0B1220]">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge (Dhaka)</span>
                <span className="font-bold text-[#25C55E]">৳60</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between">
                <span className="font-extrabold text-[#0B1220]">Total Amount</span>
                <span className="font-extrabold text-[#2563EB] text-base sm:text-lg">
                  ৳{(subtotal + 60).toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 rounded-xl bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1D4ED8] transition flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="space-y-1.5 pt-1 text-[11px] text-slate-500 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#25C55E]" />
                <span>100% Secure Checkout Guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                <Truck className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Fast Nationwide Delivery Across Bangladesh</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
