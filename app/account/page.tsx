'use client';

import React from 'react';
import Link from 'next/link';
import { User, ShoppingBag, Heart } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Profile Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex items-center gap-4 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-md shrink-0">
          J
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-black text-slate-800">Customer Profile</h1>
          <p className="text-xs text-slate-500">Manage orders, wishlist & delivery addresses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

        {/* Sidebar Nav */}
        <div className="md:col-span-3">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-purple-600 text-white px-4 py-3">
              <p className="text-xs font-black uppercase tracking-wider">My Account</p>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {[
                { icon: User,        label: 'Profile Overview', active: true },
                { icon: ShoppingBag, label: 'My Orders',        active: false },
                { icon: Heart,       label: 'Wishlist',         active: false },
              ].map(({ icon: Icon, label, active }) => (
                <Link key={label} href="/account"
                  className={`flex items-center gap-2.5 px-4 py-3 font-medium transition ${active ? 'bg-purple-50 text-purple-700 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-purple-600'}`}>
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-purple-600' : 'text-slate-400'}`} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-9 space-y-5">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-black text-slate-800">Recent Orders</h2>
            </div>

            <div className="p-5">
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <div className="flex justify-between items-center px-4 py-3 bg-slate-50 border-b border-slate-200">
                  <span className="font-mono font-bold text-purple-600">#JS-984120</span>
                  <span className="bg-amber-100 text-amber-700 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                    Verification Pending
                  </span>
                </div>
                <div className="px-4 py-3 space-y-1">
                  <div className="flex justify-between text-slate-700">
                    <span>1× Aultima TWS Earbuds</span>
                    <span className="font-bold text-slate-800">৳1,550</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Payment: bKash · TrxID: 9J48XK20L</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
