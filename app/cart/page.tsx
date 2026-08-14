'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6"
      >
        <div className="w-20 h-20 bg-orange-50 border border-orange-200 rounded-full flex items-center justify-center mx-auto text-orange-600 shadow-sm">
          <ShoppingBag className="w-10 h-10 animate-bounce" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Your Shopping Cart is Empty</h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            You haven&#39;t added any China gadgets to your cart yet. Explore our deals and start shopping!
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-orange text-slate-950 font-black text-sm hover:bg-accent-amber transition shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Gadgets</span>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Shopping Cart</h1>
          <p className="text-xs text-slate-500">Review your order before proceeding to payment</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 transition flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <AnimatePresence>
            {cart.map((item, idx) => {
              const activePrice = item.discount_price ? item.discount_price : item.price;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:border-slate-300 transition"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="space-y-1">
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-bold text-slate-900 text-sm hover:text-orange-600 transition line-clamp-2"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs font-black text-orange-600">
                        ৳{activePrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Stepper & Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-200 rounded-lg font-bold"
                      >
                        -
                      </motion.button>
                      <span className="w-8 text-center text-xs font-extrabold text-slate-900">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-200 rounded-lg font-bold"
                      >
                        +
                      </motion.button>
                    </div>

                    <span className="font-black text-sm text-slate-900 min-w-[70px] text-right">
                      ৳{(activePrice * item.quantity).toLocaleString()}
                    </span>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Order Summary Box with Motion */}
        <div className="lg:col-span-4 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6"
          >
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-bold text-slate-900">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Standard Delivery (Dhaka)</span>
                <span className="font-bold text-emerald-600">৳60</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between text-base">
                <span className="font-black text-slate-900">Estimated Total</span>
                <span className="font-black text-orange-600 text-lg">
                  ৳{(subtotal + 60).toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-orange to-accent-amber text-slate-950 font-black text-sm hover:brightness-110 transition flex items-center justify-center gap-2 shadow-md transform active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Safe & Verified bKash/Nagad/Rocket + COD checkout</span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
