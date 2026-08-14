'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { ShieldCheck, Truck, CreditCard, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { createClient } from '../../lib/supabase/client';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    division: 'Dhaka',
    district: 'Dhaka City',
    thana: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket' | 'cod'>('bkash');
  const [trxId, setTrxId] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState<'inside' | 'outside'>('inside');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const deliveryFee = deliveryLocation === 'inside' ? 60 : 120;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      setErrorMsg('Please fill in your name, phone number, and delivery address.');
      return;
    }

    if (paymentMethod !== 'cod' && !trxId.trim()) {
      setErrorMsg('Please enter your payment Transaction ID (TrxID) for mobile banking verification.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    const orderNumber = `JS-${Date.now().toString().slice(-6)}`;

    try {
      const supabase = createClient();
      await supabase.from('orders').insert({
        order_number: orderNumber,
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_address: formData.address,
        division: formData.division,
        district: formData.district,
        thana: formData.thana,
        subtotal: subtotal,
        delivery_fee: deliveryFee,
        total_amount: grandTotal,
        payment_method: paymentMethod,
        trx_id: paymentMethod === 'cod' ? 'COD' : trxId,
        payment_status: paymentMethod === 'cod' ? 'pending' : 'verification_pending',
        order_status: 'pending',
        notes: formData.notes,
      });

      clearCart();
      router.push(`/order-success/${orderNumber}`);
    } catch (e) {
      console.error('Order creation error:', e);
      clearCart();
      router.push(`/order-success/${orderNumber}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-white mb-4">Your cart is empty</h1>
        <button
          onClick={() => router.push('/shop')}
          className="px-6 py-2 bg-accent-orange text-slate-950 font-bold rounded-xl"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Checkout & Delivery</h1>
        <p className="text-xs text-slate-400">Complete your shipping address & payment verification</p>
      </div>

      {errorMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-bold flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Shipping Form & Payment Method Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Address Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4"
          >
            <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <Truck className="w-5 h-5 text-accent-orange" />
              <span>Shipping Address</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 text-white rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-accent-orange transition"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 01712345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 text-white rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-accent-orange transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Delivery Zone</label>
                <select
                  value={deliveryLocation}
                  onChange={(e: any) => setDeliveryLocation(e.target.value)}
                  className="w-full bg-slate-950 text-white rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-accent-orange"
                >
                  <option value="inside">Inside Dhaka (৳60 Delivery Charge)</option>
                  <option value="outside">Outside Dhaka (৳120 Delivery Charge)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Area / Thana</label>
                <input
                  type="text"
                  placeholder="e.g. Uttara / Mirpur / Gulshan"
                  value={formData.thana}
                  onChange={(e) => setFormData({ ...formData, thana: e.target.value })}
                  className="w-full bg-slate-950 text-white rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-accent-orange transition"
                />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-slate-300">Detailed Full Address *</label>
              <textarea
                required
                rows={2}
                placeholder="House No, Road No, Flat / Area details..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-slate-950 text-white rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-accent-orange transition"
              />
            </div>
          </motion.div>

          {/* 2. Payment Method Selection Cards with Motion */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6"
          >
            <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <CreditCard className="w-5 h-5 text-accent-amber" />
              <span>Select Payment Method</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                { id: 'bkash', label: 'bKash', color: 'bg-pink-950/90 border-pink-700 text-pink-400' },
                { id: 'nagad', label: 'Nagad', color: 'bg-orange-950/90 border-orange-700 text-orange-400' },
                { id: 'rocket', label: 'Rocket', color: 'bg-purple-950/90 border-purple-700 text-purple-400' },
                { id: 'cod', label: 'Cash On Delivery', color: 'bg-emerald-950/90 border-emerald-700 text-emerald-400' },
              ].map((method) => (
                <motion.button
                  key={method.id}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`p-4 rounded-2xl border font-black text-center transition-all ${
                    paymentMethod === method.id
                      ? `${method.color} ring-2 ring-accent-orange shadow-lg scale-105`
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {method.label}
                </motion.button>
              ))}
            </div>

            {paymentMethod !== 'cod' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs"
              >
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 space-y-1">
                  <p className="font-extrabold uppercase">
                    Payment Instructions for {paymentMethod.toUpperCase()}:
                  </p>
                  <p>1. Open your {paymentMethod.toUpperCase()} app.</p>
                  <p>2. Select <strong>&quot;Send Money&quot;</strong> to Merchant Personal Number: <strong className="text-white text-sm">01700-000000</strong></p>
                  <p>3. Amount: <strong className="text-accent-orange text-sm">৳{grandTotal.toLocaleString()}</strong></p>
                  <p>4. Enter your Transaction ID (TrxID) below.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Sender {paymentMethod.toUpperCase()} Number</label>
                    <input
                      type="tel"
                      placeholder="017XXXXXXXX"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full bg-slate-900 text-white rounded-xl p-2.5 border border-slate-800 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Transaction ID (TrxID) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 9J48XK20L"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      className="w-full bg-slate-900 text-white rounded-xl p-2.5 border border-accent-orange focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {paymentMethod === 'cod' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs space-y-1"
              >
                <p className="font-bold">Cash on Delivery (COD) Selected</p>
                <p className="text-slate-400">Pay ৳{grandTotal.toLocaleString()} directly to the courier agent when your package is delivered.</p>
              </motion.div>
            )}

          </motion.div>

        </div>

        {/* Right Order Summary & Confirm Button */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 sticky top-24"
          >
            <h2 className="text-lg font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Order Summary ({cart.length})
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 line-clamp-1 flex-1 font-medium">
                    {item.quantity}x {item.title}
                  </span>
                  <span className="font-bold text-white ml-2">
                    ৳{((item.discount_price || item.price) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal</span>
                <span className="font-bold text-white">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery Charge</span>
                <span className="font-bold text-emerald-400">৳{deliveryFee}</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between text-sm">
                <span className="font-black text-white">Total Amount</span>
                <span className="font-black text-accent-orange text-base">
                  ৳{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-orange to-accent-amber text-slate-950 font-black text-sm hover:brightness-110 transition flex items-center justify-center gap-2 shadow-xl shadow-accent-orange/30 disabled:opacity-50"
            >
              {submitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Place Order Now</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </div>

      </form>
    </div>
  );
}
