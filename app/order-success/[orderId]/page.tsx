'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, PhoneCall, ShoppingBag, ArrowRight, Clock, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderSuccessPage({ params }: { params: { orderId: string } }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">

      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-md"
      >
        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          Order Placed Successfully! 🎉
        </h1>
        <p className="text-sm text-slate-500">
          Your order number is{' '}
          <strong className="text-purple-600 font-mono text-base">#{params.orderId}</strong>
        </p>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border border-slate-200 rounded-2xl text-left shadow-sm overflow-hidden"
      >
        {/* Payment Notice */}
        <div className="flex items-start gap-3 p-5 border-b border-slate-100 bg-amber-50">
          <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-800">Payment Verification In Progress</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Our team is verifying your bKash / Nagad Transaction ID. You'll receive an SMS confirmation once verified.
            </p>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <Truck className="w-4 h-4 text-purple-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Delivery Status</span>
            </div>
            <p className="text-sm font-bold text-emerald-600">Confirmed — Preparing Dispatch</p>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <PhoneCall className="w-4 h-4 text-purple-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Customer Support</span>
            </div>
            <a href="tel:+8801700000000" className="text-sm font-bold text-slate-800 hover:text-purple-600 transition">
              +880 1700-000000
            </a>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <Link
          href="/shop"
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-purple-600 text-white font-black text-sm hover:bg-purple-700 transition shadow-md flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
        <Link
          href="/account"
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 hover:border-purple-200 transition flex items-center justify-center gap-2"
        >
          <span>View My Orders</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

    </div>
  );
}
