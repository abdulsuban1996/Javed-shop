'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, Filter, CheckCircle2, Clock, Truck, XCircle, Eye } from 'lucide-react';

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Verified' | 'Shipped' | 'Delivered' | 'Cancelled'>('All');
  const [search, setSearch] = useState('');

  const [orders, setOrders] = useState([
    {
      id: '1',
      order_number: 'JS-20260806-2991',
      customer_name: 'Saddam Hossen',
      phone: '01854213620',
      address: 'House 42, Road 11, Uttara, Dhaka',
      amount: 310,
      payment_method: 'COD',
      trx_id: 'COD',
      status: 'Delivered',
      date: '06 Aug 2026',
      items: 'Aultima TWS Earbuds (x1)',
    },
    {
      id: '2',
      order_number: 'JS-20260811-9841',
      customer_name: 'Tanvir Ahmed',
      phone: '01712345678',
      address: 'GEC Circle, Chittagong',
      amount: 1550,
      payment_method: 'bKash',
      trx_id: '9J48XK20L',
      status: 'Pending',
      date: '11 Aug 2026',
      items: 'Ultra Smartwatch 8 Series (x1)',
    },
    {
      id: '3',
      order_number: 'JS-20260811-7743',
      customer_name: 'Siam Hossain',
      phone: '01898765432',
      address: 'Zindabazar, Sylhet',
      amount: 2490,
      payment_method: 'Nagad',
      trx_id: 'NGD88329X',
      status: 'Verified',
      date: '11 Aug 2026',
      items: 'JBL Style Speaker (x1)',
    },
    {
      id: '4',
      order_number: 'JS-20260811-1209',
      customer_name: 'Rahim Uddin',
      phone: '01911223344',
      address: 'Dhanmondi 27, Dhaka',
      amount: 1850,
      payment_method: 'Rocket',
      trx_id: 'RKT554900',
      status: 'Shipped',
      date: '11 Aug 2026',
      items: 'MagSafe Wireless Powerbank (x1)',
    },
  ]);

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const filteredOrders = orders.filter((o) => {
    if (activeTab !== 'All' && o.status !== activeTab) return false;
    if (
      search &&
      !o.order_number.toLowerCase().includes(search.toLowerCase()) &&
      !o.customer_name.toLowerCase().includes(search.toLowerCase()) &&
      !o.phone.includes(search) &&
      !o.trx_id.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-purple-600" />
            <span>Orders Management</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Verify TrxIDs & track Bangladeshi customer deliveries</p>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search Order #, Phone, Name, TrxID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 bg-white text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:border-purple-600 shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 text-xs font-extrabold">
        {(['All', 'Pending', 'Verified', 'Shipped', 'Delivered', 'Cancelled'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === tab
                ? 'bg-[#312356] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab} ({tab === 'All' ? orders.length : orders.filter((o) => o.status === tab).length})
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-extrabold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">ORDER #</th>
                <th className="py-3 px-3">CUSTOMER & ADDRESS</th>
                <th className="py-3 px-3">ITEMS</th>
                <th className="py-3 px-3">AMOUNT</th>
                <th className="py-3 px-3">PAYMENT / TRXID</th>
                <th className="py-3 px-3">STATUS</th>
                <th className="py-3 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-medium">
                    No orders found matching status filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50 transition">
                    <td className="py-4 px-3 font-bold text-purple-700 font-mono">
                      <div>{o.order_number}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{o.date}</div>
                    </td>

                    <td className="py-4 px-3 font-bold text-slate-900 max-w-xs">
                      <div>{o.customer_name}</div>
                      <div className="text-[11px] text-purple-600 font-semibold">{o.phone}</div>
                      <div className="text-[10px] text-slate-400 font-normal truncate">{o.address}</div>
                    </td>

                    <td className="py-4 px-3 text-slate-700 font-medium">
                      {o.items}
                    </td>

                    <td className="py-4 px-3 font-black text-emerald-600">
                      ৳{o.amount.toLocaleString()}
                    </td>

                    <td className="py-4 px-3">
                      <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-1 rounded-full text-[11px] block w-max mb-1">
                        {o.payment_method}
                      </span>
                      <code className="text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                        {o.trx_id}
                      </code>
                    </td>

                    <td className="py-4 px-3">
                      <span className={`font-extrabold px-3 py-1 rounded-full text-[11px] inline-block ${
                        o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                        o.status === 'Verified' ? 'bg-blue-100 text-blue-700' :
                        o.status === 'Shipped' ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {o.status}
                      </span>
                    </td>

                    <td className="py-4 px-3 text-right space-x-1">
                      {o.status === 'Pending' && (
                        <button
                          onClick={() => updateOrderStatus(o.id, 'Verified')}
                          className="px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
                        >
                          Approve
                        </button>
                      )}
                      {o.status === 'Verified' && (
                        <button
                          onClick={() => updateOrderStatus(o.id, 'Shipped')}
                          className="px-3 py-1 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-sm transition"
                        >
                          Ship
                        </button>
                      )}
                      {o.status === 'Shipped' && (
                        <button
                          onClick={() => updateOrderStatus(o.id, 'Delivered')}
                          className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
