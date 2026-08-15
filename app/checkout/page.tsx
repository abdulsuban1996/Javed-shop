'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { ShieldCheck, Truck, CreditCard, CheckCircle2, AlertCircle, PhoneCall } from 'lucide-react';
import { createClient } from '../../lib/supabase/client';

import { useSettings } from '../../context/SettingsContext';

const inputClass = "w-full bg-white text-[#0B1220] rounded-xl p-3 border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition text-xs sm:text-sm placeholder:text-slate-400";
const labelClass = "text-xs font-bold text-slate-700 mb-1 block";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();
  const { settings } = useSettings();

  const [formData, setFormData] = useState({ name: '', phone: '', address: '', division: 'Dhaka', district: 'Dhaka City', thana: '', notes: '' });
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket' | 'cod'>('bkash');
  const [trxId, setTrxId] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState<'inside' | 'outside'>('inside');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const deliveryFee = deliveryLocation === 'inside' ? (settings.insideDhakaFee || 60) : (settings.outsideDhakaFee || 120);
  const grandTotal = subtotal + deliveryFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      setErrorMsg('Please fill in your name, phone number, and delivery address.');
      return;
    }
    if (paymentMethod !== 'cod' && !trxId.trim()) {
      setErrorMsg('Please enter your payment Transaction ID (TrxID).');
      return;
    }
    setSubmitting(true);
    setErrorMsg('');
    const orderNumber = `JS-${Date.now().toString().slice(-6)}`;
    const itemsSummary = cart.map((i) => `${i.title} (x${i.quantity})`).join(', ');

    const newOrderObj = {
      id: Date.now().toString(),
      order_number: orderNumber,
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_address: `${formData.address}${formData.thana ? ', ' + formData.thana : ''}${formData.district ? ', ' + formData.district : ''}`,
      amount: grandTotal,
      payment_method: paymentMethod.toUpperCase(),
      trx_id: paymentMethod === 'cod' ? 'COD' : trxId,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      items: itemsSummary,
    };

    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('javed_shop_orders');
        const existing = stored ? JSON.parse(stored) : [];
        localStorage.setItem('javed_shop_orders', JSON.stringify([newOrderObj, ...existing]));
      }

      const supabase = createClient();
      const { error: insertError } = await supabase.from('orders').insert({
        order_number: orderNumber,
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_address: formData.address,
        division: formData.division,
        district: formData.district,
        thana: formData.thana,
        subtotal,
        delivery_fee: deliveryFee,
        total_amount: grandTotal,
        payment_method: paymentMethod,
        trx_id: paymentMethod === 'cod' ? 'COD' : trxId,
        payment_status: paymentMethod === 'cod' ? 'pending' : 'verification_pending',
        order_status: 'pending',
        notes: itemsSummary || formData.notes || '',
      });

      if (insertError) {
        console.error('Supabase order insert warning:', insertError);
      }

      clearCart();
      router.push(`/order-success/${orderNumber}`);
    } catch (e) {
      console.error('Order placement exception:', e);
      clearCart();
      router.push(`/order-success/${orderNumber}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-xl font-extrabold text-[#0B1220]">Your cart is empty</h1>
        <button
          onClick={() => router.push('/shop')}
          className="px-6 py-3 bg-[#2563EB] text-white font-bold rounded-xl hover:bg-[#1D4ED8] transition shadow-sm"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      
      {/* Page Title */}
      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1220]">Checkout & Shipping</h1>
        <p className="text-xs text-slate-500 mt-0.5">Please provide your delivery details & payment confirmation</p>
      </div>

      {errorMsg && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
        </motion.div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Order Summary: 1st on mobile (order-1), Right column on desktop (lg:order-2) */}
        <div className="lg:col-span-4 order-1 lg:order-2">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 sticky top-24">
            <h2 className="text-sm font-extrabold text-[#0B1220] border-b border-slate-100 pb-3 uppercase tracking-wider flex items-center justify-between">
              <span>Order Summary</span>
              <span className="bg-[#2563EB]/10 text-[#2563EB] text-xs px-2.5 py-0.5 rounded-full font-bold">
                {cart.reduce((acc, i) => acc + i.quantity, 0)} Items
              </span>
            </h2>

            {/* Product items with Image */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 pt-3 first:pt-0">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 border border-[#E5E7EB] overflow-hidden shrink-0 flex items-center justify-center p-1 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image || '/javed-shop-icon.png'}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#0B1220] line-clamp-2 leading-snug">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      Qty: <span className="font-bold text-slate-800">{item.quantity}</span> × ৳{((item.discount_price || item.price)).toLocaleString()}
                    </p>
                  </div>
                  <span className="font-extrabold text-xs text-[#0B1220] shrink-0 text-right">
                    ৳{((item.discount_price || item.price) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#0B1220]">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge ({deliveryLocation === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                <span className="font-bold text-[#25C55E]">৳{deliveryFee}</span>
              </div>
              <div className="border-t border-slate-100 pt-2.5 flex justify-between text-sm">
                <span className="font-extrabold text-[#0B1220]">Grand Total</span>
                <span className="font-extrabold text-[#2563EB] text-base">
                  ৳{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Desktop / Default Place Order Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={submitting}
              className="hidden lg:flex w-full py-3.5 rounded-xl bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1D4ED8] transition items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {submitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Place Order Now</span>
                </>
              )}
            </motion.button>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25C55E] shrink-0" />
              <span>100% Genuine Quality Guarantee</span>
            </div>
          </div>
        </div>

        {/* Shipping Form & Payment: 2nd on mobile (order-2), Left column on desktop (lg:order-1) */}
        <div className="lg:col-span-8 order-2 lg:order-1 space-y-5">

          {/* 1. Delivery Information */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#0B1220] flex items-center gap-2 border-b border-slate-100 pb-3 uppercase tracking-wider">
              <Truck className="w-4 h-4 text-[#2563EB]" /> 1. Shipping Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 01712345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Delivery Location</label>
                <select
                  value={deliveryLocation}
                  onChange={(e: any) => setDeliveryLocation(e.target.value)}
                  className={inputClass}
                >
                  <option value="inside">Inside Dhaka (৳60 Delivery Fee)</option>
                  <option value="outside">Outside Dhaka (৳120 Delivery Fee)</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Area / Thana</label>
                <input
                  type="text"
                  placeholder="e.g. Uttara / Dhanmondi / Mirpur"
                  value={formData.thana}
                  onChange={(e) => setFormData({ ...formData, thana: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Full Delivery Address *</label>
              <textarea
                required
                rows={2}
                placeholder="House No, Road No, Flat / Area details..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* 2. Payment Method */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#0B1220] flex items-center gap-2 border-b border-slate-100 pb-3 uppercase tracking-wider">
              <CreditCard className="w-4 h-4 text-[#2563EB]" /> 2. Payment Method
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'bkash',  label: 'bKash',            active: 'bg-[#D12053] text-white border-[#D12053] shadow-sm font-black' },
                { id: 'nagad',  label: 'Nagad',            active: 'bg-[#F7931E] text-white border-[#F7931E] shadow-sm font-black' },
                { id: 'rocket', label: 'Rocket',           active: 'bg-[#8C3494] text-white border-[#8C3494] shadow-sm font-black' },
                { id: 'cod',    label: 'Cash on Delivery', active: 'bg-[#25C55E] text-white border-[#25C55E] shadow-sm font-black' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`py-3 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                    paymentMethod === m.id
                      ? m.active
                      : 'bg-[#F8FAFC] border-[#E5E7EB] text-slate-700 hover:border-[#2563EB]/40'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Mobile Banking Instructions */}
            {paymentMethod !== 'cod' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-xl bg-[#EFF6FF] border border-[#2563EB]/20 space-y-3 text-xs"
              >
                <div className="text-slate-700 space-y-1">
                  <p className="font-bold text-[#0B1220]">
                    Payment Instructions for {paymentMethod.toUpperCase()}:
                  </p>
                  <p>1. Open your {paymentMethod.toUpperCase()} app &gt; Send Money.</p>
                  <p>
                    2. {paymentMethod.toUpperCase()} Number: <strong className="text-[#0B1220] font-mono text-sm">
                      {paymentMethod === 'bkash' ? (settings.bkashNumber || '01700-000000') : paymentMethod === 'nagad' ? (settings.nagadNumber || '01800-000000') : (settings.rocketNumber || '01900-000000')}
                    </strong>
                  </p>
                  <p>3. Exact Amount: <strong className="text-[#2563EB] font-bold text-sm">৳{grandTotal.toLocaleString()}</strong></p>
                  <p>4. Enter your Sender Number and Transaction ID below.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className={labelClass}>Sender Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="017XXXXXXXX"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Transaction ID (TrxID) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 9J48XK20L"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      className={`${inputClass} font-mono font-bold`}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Cash on Delivery Notice */}
            {paymentMethod === 'cod' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-1"
              >
                <p className="font-bold">Cash on Delivery (COD) Selected</p>
                <p className="text-slate-600">
                  Pay ৳{grandTotal.toLocaleString()} directly to the delivery courier upon receiving your package.
                </p>
              </motion.div>
            )}

          </div>

          {/* Mobile Place Order Submit Button (Bottom of form for convenient mobile tapping) */}
          <div className="lg:hidden pt-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl bg-[#2563EB] text-white font-extrabold text-sm hover:bg-[#1D4ED8] transition flex items-center justify-center gap-2 shadow-lg shadow-[#2563EB]/25 disabled:opacity-50"
            >
              {submitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Place Order Now · ৳{grandTotal.toLocaleString()}</span>
                </>
              )}
            </motion.button>
          </div>

        </div>

      </form>
    </div>
  );
}
