'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, ShoppingBag, Heart, ShieldCheck, MapPin, Clock } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">

      {/* Profile Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 flex items-center gap-4 shadow-sm">
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-slate-200">
          <Image
            src="/javed-shop-icon.png"
            alt="Javed Shop Account"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold text-[#0B1220]">Customer Account</h1>
          <p className="text-xs text-slate-500">Manage your orders, saved addresses & account details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

        {/* Sidebar Nav */}
        <div className="md:col-span-4">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-[#0B1220] text-white px-4 py-3">
              <p className="text-xs font-extrabold uppercase tracking-wider">Account Menu</p>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {[
                { icon: User,        label: 'Profile Overview', active: true },
                { icon: ShoppingBag, label: 'My Orders',        active: false },
                { icon: Heart,       label: 'Saved Wishlist',   active: false },
              ].map(({ icon: Icon, label, active }) => (
                <Link
                  key={label}
                  href="/account"
                  className={`flex items-center gap-2.5 px-4 py-3 font-semibold transition ${
                    active
                      ? 'bg-[#EFF6FF] text-[#2563EB] font-bold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#2563EB]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#2563EB]' : 'text-slate-400'}`} />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-8 space-y-5">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-4 bg-[#F8FAFC]">
              <h2 className="text-sm font-extrabold text-[#0B1220]">Recent Orders & History</h2>
            </div>

            <div className="p-5">
              <div className="border border-[#E5E7EB] rounded-xl overflow-hidden text-xs">
                
                {/* Order Item Bar */}
                <div className="flex justify-between items-center px-4 py-3 bg-[#F8FAFC] border-b border-[#E5E7EB]">
                  <span className="font-mono font-bold text-[#2563EB]">#JS-984120</span>
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                    Verification Pending
                  </span>
                </div>

                <div className="px-4 py-3 space-y-1.5">
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">1× Aultima TWS Bluetooth Earbuds</span>
                    <span className="font-bold text-[#0B1220]">৳1,550</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Payment Method: bKash · TrxID: 9J48XK20L
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
