'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  CheckCircle2, 
  Clock, 
  Package, 
  Truck, 
  Check, 
  XCircle, 
  RotateCw, 
  ChevronDown, 
  X,
  AlertCircle,
  PhoneCall,
  MapPin,
  Calendar,
  CreditCard
} from 'lucide-react';
import { createClient } from '../../../lib/supabase/client';

export interface OrderRecord {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  address: string;
  amount: number;
  payment_method: string;
  trx_id: string;
  status: 'Pending' | 'Verified' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  items: string;
  created_at?: string;
}

const STATUS_CONFIG: Record<string, { label: string; icon: any; color: string; bg: string; border: string }> = {
  Pending: {
    label: 'Pending',
    icon: Clock,
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  Verified: {
    label: 'Approve / Verified',
    icon: CheckCircle2,
    color: 'text-[#2563EB]',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  Processing: {
    label: 'Processing',
    icon: Package,
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  Shipped: {
    label: 'Shipped',
    icon: Truck,
    color: 'text-indigo-700',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
  },
  Delivered: {
    label: 'Delivered',
    icon: Check,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  Cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    color: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
  },
};

const ALL_STATUSES = ['Pending', 'Verified', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const;

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [actionNotice, setActionNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');
  
  // Selected Order for updating tracking
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  // 1. Fetch Orders directly from Supabase
  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('=== ADMIN ORDERS SUPABASE FETCH DIAGNOSTIC ===');
      console.log('[Supabase Query Data]:', data);
      console.log('[Supabase Query Error]:', error);

      if (error) {
        console.error('Supabase query error:', error);
      }

      if (data && data.length > 0) {
        const mapped: OrderRecord[] = data.map((d: any) => {
          const rawStatus = (d.order_status || 'pending').toLowerCase();
          let formattedStatus: OrderRecord['status'] = 'Pending';
          if (rawStatus === 'verified' || rawStatus === 'approved') formattedStatus = 'Verified';
          else if (rawStatus === 'processing') formattedStatus = 'Processing';
          else if (rawStatus === 'shipped') formattedStatus = 'Shipped';
          else if (rawStatus === 'delivered') formattedStatus = 'Delivered';
          else if (rawStatus === 'cancelled' || rawStatus === 'canceled') formattedStatus = 'Cancelled';

          return {
            id: d.id?.toString() || d.order_number,
            order_number: d.order_number || `JS-${d.id}`,
            customer_name: d.customer_name || 'Customer',
            phone: d.customer_phone || d.phone || 'N/A',
            address: d.customer_address || `${d.thana || ''} ${d.district || ''}`.trim() || 'Dhaka, Bangladesh',
            amount: Number(d.total_amount) || Number(d.subtotal) || 0,
            payment_method: (d.payment_method || 'COD').toUpperCase(),
            trx_id: d.trx_id || 'COD',
            status: formattedStatus,
            date: d.created_at
              ? new Date(d.created_at).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Recent',
            items: d.notes || 'Store Products',
            created_at: d.created_at,
          };
        });

        setOrders(mapped);
        if (typeof window !== 'undefined') {
          localStorage.setItem('javed_shop_orders', JSON.stringify(mapped));
        }
      } else {
        // Fallback to localStorage if offline/empty
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('javed_shop_orders');
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              if (Array.isArray(parsed) && parsed.length > 0) {
                setOrders(parsed);
              }
            } catch (e) {}
          }
        }
      }

      setLastRefreshed(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    } catch (err: any) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Realtime Subscription & Mount Effect
  useEffect(() => {
    loadOrders();

    let channel: any = null;
    try {
      const supabase = createClient();
      channel = supabase
        .channel('realtime:admin_orders_page_v2')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'orders' },
          () => {
            loadOrders();
          }
        )
        .subscribe();
    } catch (e) {}

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [loadOrders]);

  // 3. Update Order Status in Supabase & Local State
  const handleUpdateOrderStatus = async (order: OrderRecord, newStatus: OrderRecord['status']) => {
    setUpdatingOrderId(order.id);
    const dbStatus = newStatus.toLowerCase();

    // Optimistic local update
    const updatedList = orders.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o));
    setOrders(updatedList);
    if (typeof window !== 'undefined') {
      localStorage.setItem('javed_shop_orders', JSON.stringify(updatedList));
    }

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('orders')
        .update({ 
          order_status: dbStatus,
          payment_status: newStatus === 'Verified' || newStatus === 'Delivered' ? 'paid' : 'pending'
        })
        .or(`id.eq.${order.id},order_number.eq.${order.order_number}`);

      if (error) {
        console.error('Failed to update status in Supabase:', error);
        setActionNotice({ type: 'error', message: `Database update failed: ${error.message}` });
      } else {
        setActionNotice({ type: 'success', message: `Order #${order.order_number} status updated to "${newStatus}"` });
      }
    } catch (err: any) {
      console.error('Update status exception:', err);
      setActionNotice({ type: 'error', message: `Error updating status: ${err?.message || 'Unknown error'}` });
    } finally {
      setUpdatingOrderId(null);
      setTimeout(() => setActionNotice(null), 4000);
    }
  };

  // Filter logic
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
    <div className="max-w-7xl mx-auto space-y-6 pb-24">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1220] flex items-center gap-2 tracking-tight">
            <ShoppingBag className="w-7 h-7 text-[#2563EB]" />
            <span>Orders Management</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Verify payments, update order progression &amp; process cancellations in real-time</p>
        </div>

        {/* Refresh & Search */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => loadOrders()}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-[#E5E7EB] text-slate-700 hover:text-[#2563EB] font-bold text-xs shadow-sm transition disabled:opacity-60"
            title="Refresh order list from Supabase"
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

      {/* Action Toast Notification */}
      <AnimatePresence>
        {actionNotice && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold shadow-sm border ${
              actionNotice.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {actionNotice.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{actionNotice.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#E5E7EB] pb-3 text-xs font-extrabold">
        {['All', ...ALL_STATUSES].map((tab) => {
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
        <div className="overflow-x-auto min-h-[350px]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] text-slate-500 font-extrabold border-b border-[#E5E7EB] uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">ORDER #</th>
                <th className="py-3.5 px-4">CUSTOMER &amp; ADDRESS</th>
                <th className="py-3.5 px-4">ITEMS SUMMARY</th>
                <th className="py-3.5 px-4">TOTAL</th>
                <th className="py-3.5 px-4">PAYMENT / TRXID</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {loading && orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-400 font-medium">
                    <RotateCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#2563EB]" />
                    <span>Loading orders from Supabase database…</span>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-400 font-medium">
                    No orders found matching this filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const statusCfg = STATUS_CONFIG[o.status] || STATUS_CONFIG.Pending;
                  const StatusIcon = statusCfg.icon;
                  const isUpdating = updatingOrderId === o.id;

                  return (
                    <tr key={o.id} className="hover:bg-slate-50/80 transition">
                      
                      {/* Order Number & Date */}
                      <td className="py-4 px-4 font-bold text-[#2563EB] font-mono">
                        <div>{o.order_number}</div>
                        <div className="text-[10px] text-slate-400 font-normal flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{o.date}</span>
                        </div>
                      </td>

                      {/* Customer Details */}
                      <td className="py-4 px-4 font-bold text-slate-900 max-w-xs">
                        <div className="text-slate-900 text-xs">{o.customer_name}</div>
                        <div className="text-[11px] text-[#2563EB] font-semibold flex items-center gap-1 mt-0.5">
                          <PhoneCall className="w-3 h-3 shrink-0" />
                          <span>{o.phone}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal truncate flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                          <span className="truncate">{o.address}</span>
                        </div>
                      </td>

                      {/* Items */}
                      <td className="py-4 px-4 text-slate-700 font-medium max-w-xs">
                        <div className="line-clamp-2 text-xs">{o.items}</div>
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-4 font-extrabold text-[#0B1220] text-sm">
                        ৳{o.amount.toLocaleString()}
                      </td>

                      {/* Payment Method & TrxID */}
                      <td className="py-4 px-4">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold px-2.5 py-0.5 rounded-md text-[11px] inline-block mb-1">
                          {o.payment_method}
                        </span>
                        <div>
                          <code className="text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 font-mono">
                            {o.trx_id}
                          </code>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4">
                        <span className={`font-extrabold px-3 py-1 rounded-full text-[11px] inline-flex items-center gap-1 border ${statusCfg.bg} ${statusCfg.color} ${statusCfg.border}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{o.status}</span>
                        </span>
                      </td>

                      {/* Action: Inline <select> Dropdown Element */}
                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          {isUpdating && (
                            <RotateCw className="w-3.5 h-3.5 text-[#2563EB] animate-spin shrink-0" />
                          )}
                          <select
                            disabled={isUpdating}
                            value={o.status}
                            onChange={(e) => {
                              const val = e.target.value as OrderRecord['status'];
                              if (val !== o.status) {
                                if (val === 'Cancelled') {
                                  if (window.confirm(`Are you sure you want to cancel order ${o.order_number}?`)) {
                                    handleUpdateOrderStatus(o, val);
                                  }
                                } else {
                                  handleUpdateOrderStatus(o, val);
                                }
                              }
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer outline-none shadow-sm ${
                              o.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-300 focus:ring-2 focus:ring-emerald-500/20' :
                              o.status === 'Verified' ? 'bg-blue-50 text-[#2563EB] border-blue-300 focus:ring-2 focus:ring-blue-500/20' :
                              o.status === 'Processing' ? 'bg-purple-50 text-purple-700 border-purple-300 focus:ring-2 focus:ring-purple-500/20' :
                              o.status === 'Shipped' ? 'bg-indigo-50 text-indigo-700 border-indigo-300 focus:ring-2 focus:ring-indigo-500/20' :
                              o.status === 'Cancelled' ? 'bg-rose-50 text-rose-700 border-rose-300 focus:ring-2 focus:ring-rose-500/20' :
                              'bg-amber-50 text-amber-800 border-amber-300 focus:ring-2 focus:ring-amber-500/20'
                            }`}
                          >
                            <option value="Pending" className="bg-white text-slate-800 font-semibold">🕒 Pending</option>
                            <option value="Verified" className="bg-white text-slate-800 font-semibold">🔵 Approve / Verified</option>
                            <option value="Processing" className="bg-white text-slate-800 font-semibold">🟣 Processing</option>
                            <option value="Shipped" className="bg-white text-slate-800 font-semibold">🚚 Shipped</option>
                            <option value="Delivered" className="bg-white text-slate-800 font-semibold">✅ Delivered</option>
                            <option value="Cancelled" className="bg-white text-rose-600 font-bold">❌ Cancel Order</option>
                          </select>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

