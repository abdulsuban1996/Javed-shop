'use client';

import React from 'react';
import Link from 'next/link';
import { User, ShoppingBag, Heart, MapPin, Clock, CheckCircle2 } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex items-center gap-4 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accent-orange to-accent-amber flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg">
          J
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">Customer Profile</h1>
          <p className="text-xs text-slate-400">Manage orders, wishlist & delivery addresses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        <div className="md:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2 shadow-lg text-xs">
          <Link href="/account" className="flex items-center gap-2 p-3 rounded-xl bg-brand-900 text-white font-bold">
            <User className="w-4 h-4 text-accent-orange" />
            <span>Profile Overview</span>
          </Link>
          <Link href="/account" className="flex items-center gap-2 p-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-medium">
            <ShoppingBag className="w-4 h-4" />
            <span>My Orders</span>
          </Link>
          <Link href="/account" className="flex items-center gap-2 p-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-medium">
            <Heart className="w-4 h-4" />
            <span>Wishlist</span>
          </Link>
        </div>

        <div className="md:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-lg font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Recent Orders
            </h2>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="font-mono font-bold text-accent-orange">#JS-984120</span>
                <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full">
                  Verification Pending
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>1x Aultima TWS Earbuds</span>
                <span className="font-bold text-white">৳1,550</span>
              </div>
              <p className="text-[11px] text-slate-500">Payment: bKash (TrxID: 9J48XK20L)</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
