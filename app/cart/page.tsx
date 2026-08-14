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
        className="max-w-md mx-auto px-4 py-20 text-center space-y-6"
      >
        <div className="w-20 h-20 bg-purple-50 border border-purple-200 rounded-full flex items-center justify-center mx-auto text-purple-600 shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-800">Your Cart is Empty</h1>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            You haven&#39;t added any gadgets yet. Explore our deals and start shopping!
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-black text-sm hover:bg-purple-700 transition shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Gadgets</span>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">Shopping Cart</h1>
          <p className="text-xs text-slate-500 mt-0.5">Review your order before proceeding to payment</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-500 hover:text-rose-700 transition flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-3">
          <AnimatePresence>
            {cart.map((item, idx) => {
              const activePrice = item.discount_price ?? item.price;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-sm hover:shadow-md hover:border-purple-200 transition"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-18 h-18 w-[72px] h-[72px] rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-semibold text-slate-800 text-sm hover:text-purple-600 transition line-clamp-2 block"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm font-black text-purple-600">
                        ৳{activePrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* Qty Stepper */}
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-0.5">
                      <motion.button whileTap={{ scale: 0.8 }} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-lg font-bold text-sm">-</motion.button>
                      <span className="w-8 text-center text-xs font-extrabold text-slate-800">{item.quantity}</span>
                      <motion.button whileTap={{ scale: 0.8 }} onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-lg font-bold text-sm">+</motion.button>
                    </div>

                    <span className="font-black text-sm text-slate-800 min-w-[70px] text-right">
                      ৳{(activePrice * item.quantity).toLocaleString()}
                    </span>

                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => removeFromCart(item.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition" title="Remove">
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5 sticky top-24"
          >
            <h2 className="text-base font-black text-slate-800 border-b border-slate-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-semibold text-slate-700">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery (Dhaka)</span>
                <span className="font-semibold text-emerald-600">৳60</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between">
                <span className="font-black text-slate-800">Total</span>
                <span className="font-black text-purple-600 text-lg">৳{(subtotal + 60).toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-black text-sm hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Secure checkout · bKash, Nagad, Rocket & COD</span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
