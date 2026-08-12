'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, PhoneCall, ShoppingBag, ArrowRight, Clock } from 'lucide-react';

export default function OrderSuccessPage({ params }: { params: { orderId: string } }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
      
      {/* Animated Success Badge */}
      <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 shadow-2xl animate-bounce">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Thank You! Order Placed Successfully
        </h1>
        <p className="text-sm text-slate-400">
          Your order number is <strong className="text-accent-orange font-mono text-base">#{params.orderId}</strong>
        </p>
      </div>

      {/* Verification Notice Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-left space-y-4 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <Clock className="w-6 h-6 text-accent-amber shrink-0" />
          <div>
            <h3 className="font-extrabold text-white text-sm sm:text-base">
              Manual Payment Verification in Progress
            </h3>
            <p className="text-xs text-slate-400">
              Our admin team is verifying your bKash / Nagad Transaction ID. You will receive an SMS confirmation once verified.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 font-bold block">Delivery Status:</span>
            <span className="text-emerald-400 font-extrabold">Order Confirmed — Preparing Dispatch</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 font-bold block">Customer Support:</span>
            <span className="text-white font-extrabold flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-accent-orange" /> +880 1700-000000
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href="/shop"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-accent-orange text-slate-950 font-black text-sm hover:bg-accent-amber transition shadow-lg shadow-accent-orange/30 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>

        <Link
          href="/account"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold text-sm hover:bg-slate-800 transition flex items-center justify-center gap-2"
        >
          <span>View My Orders</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
