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
        <h1 className="text-xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
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
      
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Checkout & Delivery</h1>
        <p className="text-xs text-slate-500">Complete your shipping address & payment verification</p>
      </div>

      {errorMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2"
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
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4"
          >
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <Truck className="w-5 h-5 text-orange-600" />
              <span>Shipping Address</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 rounded-xl p-3 border border-slate-200 focus:outline-none focus:border-orange-600 transition"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 01712345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 rounded-xl p-3 border border-slate-200 focus:outline-none focus:border-orange-600 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Delivery Zone</label>
                <select
                  value={deliveryLocation}
                  onChange={(e: any) => setDeliveryLocation(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 rounded-xl p-3 border border-slate-200 focus:outline-none focus:border-orange-600"
                >
                  <option value="inside">Inside Dhaka (৳60 Delivery Charge)</option>
                  <option value="outside">Outside Dhaka (৳120 Delivery Charge)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Area / Thana</label>
                <input
                  type="text"
                  placeholder="e.g. Uttara / Mirpur / Gulshan"
                  value={formData.thana}
                  onChange={(e) => setFormData({ ...formData, thana: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 rounded-xl p-3 border border-slate-200 focus:outline-none focus:border-orange-600 transition"
                />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-slate-700">Detailed Full Address *</label>
              <textarea
                required
                rows={2}
                placeholder="House No, Road No, Flat / Area details..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 rounded-xl p-3 border border-slate-200 focus:outline-none focus:border-orange-600 transition"
              />
            </div>
          </motion.div>

          {/* 2. Payment Method Selection Cards */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6"
          >
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <span>Select Payment Method</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                { id: 'bkash', label: 'bKash', color: 'bg-pink-50 border-pink-300 text-pink-700' },
                { id: 'nagad', label: 'Nagad', color: 'bg-orange-50 border-orange-300 text-orange-700' },
                { id: 'rocket', label: 'Rocket', color: 'bg-purple-50 border-purple-300 text-purple-700' },
                { id: 'cod', label: 'Cash On Delivery', color: 'bg-emerald-50 border-emerald-300 text-emerald-700' },
              ].map((method) => (
                <motion.button
                  key={method.id}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`p-4 rounded-2xl border font-black text-center transition-all ${
                    paymentMethod === method.id
                      ? `${method.color} ring-2 ring-orange-500 shadow-md scale-105`
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900'
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
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs"
              >
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                  <p className="font-extrabold uppercase">
                    Payment Instructions for {paymentMethod.toUpperCase()}:
                  </p>
                  <p>1. Open your {paymentMethod.toUpperCase()} app.</p>
                  <p>2. Select <strong>&quot;Send Money&quot;</strong> to Personal Number: <strong className="text-slate-900 text-sm">01700-000000</strong></p>
                  <p>3. Amount: <strong className="text-orange-600 text-sm">৳{grandTotal.toLocaleString()}</strong></p>
                  <p>4. Enter your Transaction ID (TrxID) below.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Sender {paymentMethod.toUpperCase()} Number</label>
                    <input
                      type="tel"
                      placeholder="017XXXXXXXX"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full bg-white text-slate-900 rounded-xl p-2.5 border border-slate-200 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Transaction ID (TrxID) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 9J48XK20L"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      className="w-full bg-white text-slate-900 rounded-xl p-2.5 border border-orange-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {paymentMethod === 'cod' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1"
              >
                <p className="font-bold">Cash on Delivery (COD) Selected</p>
                <p className="text-slate-600">Pay ৳{grandTotal.toLocaleString()} directly to the courier agent when your package is delivered.</p>
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
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 sticky top-24"
          >
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Order Summary ({cart.length})
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 line-clamp-1 flex-1 font-medium">
                    {item.quantity}x {item.title}
                  </span>
                  <span className="font-bold text-slate-900 ml-2">
                    ৳{((item.discount_price || item.price) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-900">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge</span>
                <span className="font-bold text-emerald-600">৳{deliveryFee}</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between text-sm">
                <span className="font-black text-slate-900">Total Amount</span>
                <span className="font-black text-orange-600 text-base">
                  ৳{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-orange to-accent-amber text-slate-950 font-black text-sm hover:brightness-110 transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
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
