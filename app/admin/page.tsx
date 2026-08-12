'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Calendar, 
  AlertCircle, 
  Package, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Eye,
  Check
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([
    { 
      id: '1', 
      order_number: 'JS-20260806-2991', 
      customer_name: 'Saddam Hossen', 
      phone: '01854213620', 
      amount: 310, 
      payment_method: 'COD', 
      trx_id: 'COD',
      status: 'Delivered', 
      payment_status: 'Verified',
      date: '06 Aug 2026' 
    },
    { 
      id: '2', 
      order_number: 'JS-20260811-9841', 
      customer_name: 'Tanvir Ahmed', 
      phone: '01712345678', 
      amount: 1550, 
      payment_method: 'bKash', 
      trx_id: '9J48XK20L',
      status: 'Pending', 
      payment_status: 'Verification Pending',
      date: '11 Aug 2026' 
    },
    { 
      id: '3', 
      order_number: 'JS-20260811-7743', 
      customer_name: 'Siam Hossain', 
      phone: '01898765432', 
      amount: 2490, 
      payment_method: 'Nagad', 
      trx_id: 'NGD88329X',
      status: 'Verified', 
      payment_status: 'Verified',
      date: '11 Aug 2026' 
    },
  ]);

  const verifyOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: 'Verified', payment_status: 'Verified' } : o
      )
    );
  };

  // Status Counts
  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const verifiedCount = orders.filter((o) => o.status === 'Verified').length;
  const shippedCount = orders.filter((o) => o.status === 'Shipped').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;
  const cancelledCount = orders.filter((o) => o.status === 'Cancelled').length;

  return (
    <div className="max-w-7xl mx-auto space-y-7">
      
      {/* Header Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Welcome back! Here&#39;s what&#39;s happening with Javed Shop today.
        </p>
      </div>

      {/* Top 4 Vibrant Metric Cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Orders (Purple) */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white p-5 rounded-3xl shadow-xl shadow-purple-500/20 flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-purple-200 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="text-3xl font-black">{orders.length}</div>
            <span className="text-xs font-semibold text-purple-200 block">
              ৳{orders.reduce((acc, o) => acc + o.amount, 0).toLocaleString()} total revenue
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Card 2: Today's Orders (Teal/Emerald) */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          className="bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700 text-white p-5 rounded-3xl shadow-xl shadow-emerald-500/20 flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-emerald-100 uppercase tracking-wider">
              Today&#39;s Orders
            </span>
            <div className="text-3xl font-black">2</div>
            <span className="text-xs font-semibold text-emerald-100 block">
              ৳4,040 today
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
            <Calendar className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Card 3: Pending Verification (Amber/Yellow) */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-5 rounded-3xl shadow-xl shadow-amber-500/20 flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-amber-100 uppercase tracking-wider">
              Pending Verification
            </span>
            <div className="text-3xl font-black">{pendingCount}</div>
            <span className="text-xs font-semibold text-amber-100 block">
              Payments to verify
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
            <AlertCircle className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Card 4: Low / Out of Stock (Red) */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          className="bg-gradient-to-r from-rose-500 via-red-600 to-rose-700 text-white p-5 rounded-3xl shadow-xl shadow-rose-500/20 flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-rose-100 uppercase tracking-wider">
              Low / Out of Stock
            </span>
            <div className="text-3xl font-black">0</div>
            <span className="text-xs font-semibold text-rose-100 block">
              0 out of stock
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
            <Package className="w-6 h-6" />
          </div>
        </motion.div>

      </div>

      {/* Order Overview Breakdown Card */}
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 space-y-4">
        <div className="flex items-center gap-2 text-slate-800 font-extrabold text-base">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <span>Order Overview</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-900">{pendingCount}</span>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
              Pending
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-900">{verifiedCount}</span>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
              Verified
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-900">0</span>
            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
              Processing
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-900">{shippedCount}</span>
            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
              Shipped
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-900">{deliveredCount}</span>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
              Delivered
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-900">{cancelledCount}</span>
            <span className="bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full">
              Cancelled
            </span>
          </div>
        </div>
      </div>

      {/* Recent Orders Table Matching Screenshot */}
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-extrabold text-slate-900">
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-purple-600 hover:text-purple-700 font-extrabold text-xs flex items-center gap-1 transition"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="text-slate-400 font-extrabold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">ORDER #</th>
                <th className="py-3 px-3">CUSTOMER</th>
                <th className="py-3 px-3">AMOUNT</th>
                <th className="py-3 px-3">PAYMENT</th>
                <th className="py-3 px-3">STATUS</th>
                <th className="py-3 px-3">DATE</th>
                <th className="py-3 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-3 font-bold text-purple-700 font-mono">
                    {o.order_number}
                  </td>

                  <td className="py-4 px-3 font-bold text-slate-900">
                    <div>{o.customer_name}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{o.phone}</div>
                  </td>

                  <td className="py-4 px-3 font-black text-emerald-600">
                    ৳{o.amount.toLocaleString()}
                  </td>

                  <td className="py-4 px-3">
                    <span className="bg-emerald-100 text-emerald-700 font-extrabold px-3 py-1 rounded-full text-[11px]">
                      {o.payment_method}
                    </span>
                  </td>

                  <td className="py-4 px-3">
                    <span className={`font-extrabold px-3 py-1 rounded-full text-[11px] ${
                      o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                      o.status === 'Verified' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {o.status}
                    </span>
                  </td>

                  <td className="py-4 px-3 text-slate-500 font-medium">
                    {o.date}
                  </td>

                  <td className="py-4 px-3 text-right">
                    {o.status === 'Pending' ? (
                      <button
                        onClick={() => verifyOrder(o.id)}
                        className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm"
                      >
                        Approve
                      </button>
                    ) : (
                      <button className="px-3.5 py-1.5 rounded-full border border-purple-200 text-purple-700 hover:bg-purple-50 font-bold text-xs transition">
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
