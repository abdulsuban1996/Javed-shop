'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, PhoneCall, ShoppingBag, ArrowRight, Clock, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderSuccessPage({ params }: { params: { orderId: string } }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16 text-center space-y-8">

      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        className="w-20 h-20 rounded-full bg-[#25C55E]/10 border-2 border-[#25C55E] flex items-center justify-center mx-auto shadow-sm"
      >
        <CheckCircle2 className="w-10 h-10 text-[#25C55E]" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
          Thank You! Your Order Has Been Placed
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Your order tracking reference is{' '}
          <strong className="text-[#2563EB] font-mono text-base">#{params.orderId}</strong>
        </p>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white border border-[#E5E7EB] rounded-2xl text-left shadow-sm overflow-hidden"
      >
        {/* Verification Status */}
        <div className="flex items-start gap-3 p-5 border-b border-slate-100 bg-[#EFF6FF]">
          <Clock className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs sm:text-sm font-bold text-[#0B1220]">Order Received & In Verification</p>
            <p className="text-xs text-slate-600 mt-0.5">
              Our fulfillment team is preparing your package for dispatch. You will receive an SMS confirmation with delivery tracking details.
            </p>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-1.5 mb-1 text-slate-500">
              <Truck className="w-4 h-4 text-[#2563EB]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Delivery Status</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#25C55E]">Confirmed — Preparing Dispatch</p>
          </div>
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-1.5 mb-1 text-slate-500">
              <PhoneCall className="w-4 h-4 text-[#2563EB]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Customer Support</span>
            </div>
            <a href="tel:+8801700000000" className="text-xs sm:text-sm font-bold text-[#0B1220] hover:text-[#2563EB] transition">
              +880 1700-000000
            </a>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
      >
        <Link
          href="/shop"
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1D4ED8] transition shadow-sm flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
        <Link
          href="/account"
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white border border-[#E5E7EB] text-slate-700 font-bold text-sm hover:bg-slate-50 hover:border-[#2563EB]/40 transition flex items-center justify-center gap-2"
        >
          <span>View My Orders</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

    </div>
  );
}
