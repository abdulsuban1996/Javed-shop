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
  
  // Selected Order for Fixed Modal Action Box
  const [selectedOrderForAction, setSelectedOrderForAction] = useState<OrderRecord | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // 1. Fetch Orders directly from Supabase
  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

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
    setUpdatingStatus(true);
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
        setActionNotice({ type: 'success', message: `Order #${order.order_number} marked as "${newStatus}"` });
      }
    } catch (err: any) {
      console.error('Update status exception:', err);
      setActionNotice({ type: 'error', message: `Error updating status: ${err?.message || 'Unknown error'}` });
    } finally {
      setUpdatingStatus(false);
      setSelectedOrderForAction(null);
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

                      {/* Action Button */}
                      <td className="py-4 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedOrderForAction(o)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-sm transition active:scale-95"
                        >
                          <span>Change Status</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── FIXED OVERLAY MODAL POPUP FOR STATUS ACTION ─────────────────── */}
      <AnimatePresence>
        {selectedOrderForAction && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedOrderForAction(null)}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 p-6 space-y-5"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-[#0B1220] flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#2563EB]" />
                    <span>Update Order #{selectedOrderForAction.order_number}</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Select new status to persist in Supabase cloud</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrderForAction(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order Info Banner */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{selectedOrderForAction.customer_name} ({selectedOrderForAction.phone})</span>
                  <span className="text-[#2563EB] font-mono">৳{selectedOrderForAction.amount.toLocaleString()}</span>
                </div>
                <div className="text-[11px] text-slate-500 truncate">{selectedOrderForAction.address}</div>
              </div>

              {/* Status Options Grid */}
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Select Order Status:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ALL_STATUSES.map((st) => {
                    const cfg = STATUS_CONFIG[st];
                    const Icon = cfg.icon;
                    const isCurrent = selectedOrderForAction.status === st;

                    return (
                      <button
                        key={st}
                        type="button"
                        disabled={updatingStatus}
                        onClick={() => handleUpdateOrderStatus(selectedOrderForAction, st)}
                        className={`flex items-center gap-2.5 px-3.5 py-3 rounded-2xl text-xs font-bold transition border text-left ${
                          isCurrent
                            ? `${cfg.bg} ${cfg.color} ${cfg.border} ring-2 ring-offset-1 ring-[#2563EB]/40 shadow-sm`
                            : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isCurrent ? cfg.color : 'text-slate-400'}`} />
                        <span className="flex-1">{st}</span>
                        {isCurrent && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForAction(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
