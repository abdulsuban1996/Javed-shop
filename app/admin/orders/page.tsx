'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, CheckCircle2, Clock, Truck, XCircle, RefreshCw, Check, AlertCircle, RotateCw } from 'lucide-react';
import { createClient } from '../../../lib/supabase/client';

const DEFAULT_ORDERS = [
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
    payment_method: 'BKASH',
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
    payment_method: 'NAGAD',
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
    payment_method: 'ROCKET',
    trx_id: 'RKT554900',
    status: 'Shipped',
    date: '11 Aug 2026',
    items: 'MagSafe Wireless Powerbank (x1)',
  },
];

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Verified' | 'Shipped' | 'Delivered' | 'Cancelled'>('All');
  const [search, setSearch] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [orders, setOrders] = useState(DEFAULT_ORDERS);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      let currentOrders = [...DEFAULT_ORDERS];
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('javed_shop_orders');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              currentOrders = parsed;
            }
          } catch (e) {}
        }
      }

      // Query Supabase for real orders
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map((d: any) => ({
            id: d.id?.toString() || d.order_number,
            order_number: d.order_number || `JS-${d.id}`,
            customer_name: d.customer_name || 'Customer',
            phone: d.customer_phone || '',
            address: d.customer_address || `${d.thana || ''} ${d.district || ''}`,
            amount: Number(d.total_amount) || Number(d.subtotal) || 0,
            payment_method: (d.payment_method || 'COD').toUpperCase(),
            trx_id: d.trx_id || 'COD',
            status: d.order_status
              ? d.order_status.charAt(0).toUpperCase() + d.order_status.slice(1)
              : 'Pending',
            date: d.created_at
              ? new Date(d.created_at).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })
              : 'Today',
            items: d.notes || 'Store Products',
          }));

          // Merge: Put Supabase orders first, followed by unique stored/mock ones
          const existingNums = new Set(mapped.map((m: any) => m.order_number));
          const leftovers = currentOrders.filter((o) => !existingNums.has(o.order_number));
          currentOrders = [...mapped, ...leftovers];

          if (typeof window !== 'undefined') {
            localStorage.setItem('javed_shop_orders', JSON.stringify(currentOrders));
          }
        }
      } catch (err) {}

      setOrders(currentOrders);
      setLastRefreshed(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const updateOrderStatus = async (id: string, newStatus: string, orderNumber: string) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
    setOrders(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('javed_shop_orders', JSON.stringify(updated));
    }
    try {
      const supabase = createClient();
      await supabase
        .from('orders')
        .update({ order_status: newStatus.toLowerCase() })
        .eq('order_number', orderNumber);
    } catch (e) {}

    setActionNotice(`Order #${orderNumber} marked as ${newStatus}`);
    setTimeout(() => {
      setActionNotice(null);
    }, 3000);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1220] flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-[#2563EB]" />
            <span>Orders Management</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Verify payments, manage order status &amp; process cancellations</p>
        </div>

        {/* Right Header Actions: Refresh & Search Bar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => loadOrders()}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-[#E5E7EB] text-slate-700 hover:text-[#2563EB] font-bold text-xs shadow-sm transition disabled:opacity-60"
            title="Refresh order list now"
          >
            <RotateCw className={`w-3.5 h-3.5 text-[#2563EB] ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing…' : 'Refresh'}</span>
            {lastRefreshed && (
              <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
                ({lastRefreshed})
              </span>
            )}
          </button>

          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search Order #, Phone, Name, TrxID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 bg-white text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          </div>
        </div>
      </div>

      {/* Action Notification */}
      <AnimatePresence>
        {actionNotice && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E5E7EB] pb-3 text-xs font-extrabold">
        {(['All', 'Pending', 'Verified', 'Shipped', 'Delivered', 'Cancelled'] as const).map((tab) => {
          const count = tab === 'All' ? orders.length : orders.filter((o) => o.status === tab).length;
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#0B1220] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-[#E5E7EB]'
              }`}
            >
              <span>{tab}</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] text-slate-500 font-extrabold border-b border-[#E5E7EB] uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">ORDER #</th>
                <th className="py-3.5 px-4">CUSTOMER &amp; ADDRESS</th>
                <th className="py-3.5 px-4">ITEMS</th>
                <th className="py-3.5 px-4">AMOUNT</th>
                <th className="py-3.5 px-4">PAYMENT / TRXID</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                    No orders found matching filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-4 font-bold text-[#2563EB] font-mono">
                      <div>{o.order_number}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{o.date}</div>
                    </td>

                    <td className="py-4 px-4 font-bold text-slate-900 max-w-xs">
                      <div>{o.customer_name}</div>
                      <div className="text-[11px] text-[#2563EB] font-semibold">{o.phone}</div>
                      <div className="text-[10px] text-slate-400 font-normal truncate">{o.address}</div>
                    </td>

                    <td className="py-4 px-4 text-slate-700 font-medium">
                      {o.items}
                    </td>

                    <td className="py-4 px-4 font-extrabold text-[#0B1220]">
                      ৳{o.amount.toLocaleString()}
                    </td>

                    <td className="py-4 px-4">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold px-2.5 py-0.5 rounded-md text-[11px] inline-block mb-1">
                        {o.payment_method}
                      </span>
                      <div>
                        <code className="text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                          {o.trx_id}
                        </code>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`font-extrabold px-3 py-1 rounded-full text-[11px] inline-block border ${
                        o.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        o.status === 'Verified' ? 'bg-blue-50 text-[#2563EB] border-blue-200' :
                        o.status === 'Shipped' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        o.status === 'Cancelled' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {o.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 flex-wrap">
                        {/* Status Progression Buttons */}
                        {o.status === 'Pending' && (
                          <button
                            onClick={() => updateOrderStatus(o.id, 'Verified', o.order_number)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1"
                            title="Approve & Verify Order"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}
                        {o.status === 'Verified' && (
                          <button
                            onClick={() => updateOrderStatus(o.id, 'Shipped', o.order_number)}
                            className="px-3 py-1 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-sm transition flex items-center gap-1"
                            title="Mark Order as Shipped"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Ship</span>
                          </button>
                        )}
                        {o.status === 'Shipped' && (
                          <button
                            onClick={() => updateOrderStatus(o.id, 'Delivered', o.order_number)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1"
                            title="Mark Order as Delivered"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Deliver</span>
                          </button>
                        )}

                        {/* Cancel Button (For active orders) */}
                        {o.status !== 'Cancelled' && o.status !== 'Delivered' && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to cancel order ${o.order_number}?`)) {
                                updateOrderStatus(o.id, 'Cancelled', o.order_number);
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200 hover:border-rose-300 font-bold text-xs transition flex items-center gap-1 shadow-sm"
                            title="Cancel this order"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>
                        )}

                        {/* Restore Button (For cancelled orders) */}
                        {o.status === 'Cancelled' && (
                          <button
                            onClick={() => updateOrderStatus(o.id, 'Pending', o.order_number)}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold text-xs transition flex items-center gap-1"
                            title="Restore order to Pending"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Restore</span>
                          </button>
                        )}
                      </div>
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

