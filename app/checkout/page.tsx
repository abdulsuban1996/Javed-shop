'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { ShieldCheck, Truck, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';
import { createClient } from '../../lib/supabase/client';

const inputClass = "w-full bg-white text-slate-800 rounded-xl p-3 border border-slate-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition text-sm placeholder:text-slate-400";
const labelClass = "text-xs font-bold text-slate-700 mb-1 block";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({ name: '', phone: '', address: '', division: 'Dhaka', district: 'Dhaka City', thana: '', notes: '' });
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
    if (!formData.name || !formData.phone || !formData.address) { setErrorMsg('Please fill in your name, phone number, and delivery address.'); return; }
    if (paymentMethod !== 'cod' && !trxId.trim()) { setErrorMsg('Please enter your payment Transaction ID (TrxID).'); return; }
    setSubmitting(true);
    setErrorMsg('');
    const orderNumber = `JS-${Date.now().toString().slice(-6)}`;
    try {
      const supabase = createClient();
      await supabase.from('orders').insert({ order_number: orderNumber, customer_name: formData.name, customer_phone: formData.phone, customer_address: formData.address, division: formData.division, district: formData.district, thana: formData.thana, subtotal, delivery_fee: deliveryFee, total_amount: grandTotal, payment_method: paymentMethod, trx_id: paymentMethod === 'cod' ? 'COD' : trxId, payment_status: paymentMethod === 'cod' ? 'pending' : 'verification_pending', order_status: 'pending', notes: formData.notes });
      clearCart();
      router.push(`/order-success/${orderNumber}`);
    } catch (e) {
      clearCart();
      router.push(`/order-success/${orderNumber}`);
    } finally { setSubmitting(false); }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-xl font-black text-slate-800">Your cart is empty</h1>
        <button onClick={() => router.push('/shop')} className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-black text-slate-800">Checkout & Delivery</h1>
        <p className="text-xs text-slate-500 mt-0.5">Complete your shipping address & payment verification</p>
      </div>

      {errorMsg && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
        </motion.div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left: Form Sections */}
        <div className="lg:col-span-8 space-y-5">

          {/* Shipping Address */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Truck className="w-4 h-4 text-purple-500" /> Shipping Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>Full Name *</label><input type="text" required placeholder="e.g. Tanvir Ahmed" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} /></div>
              <div><label className={labelClass}>Phone Number *</label><input type="tel" required placeholder="e.g. 01712345678" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Delivery Zone</label>
                <select value={deliveryLocation} onChange={(e: any) => setDeliveryLocation(e.target.value)} className={inputClass}>
                  <option value="inside">Inside Dhaka (৳60)</option>
                  <option value="outside">Outside Dhaka (৳120)</option>
                </select>
              </div>
              <div><label className={labelClass}>Area / Thana</label><input type="text" placeholder="e.g. Uttara, Mirpur, Gulshan" value={formData.thana} onChange={(e) => setFormData({ ...formData, thana: e.target.value })} className={inputClass} /></div>
            </div>
            <div><label className={labelClass}>Full Address *</label><textarea required rows={2} placeholder="House No, Road No, Flat / Area details..." value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className={inputClass} /></div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
              <CreditCard className="w-4 h-4 text-purple-500" /> Payment Method
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'bkash',  label: 'bKash',           active: 'bg-pink-600 text-white border-pink-600' },
                { id: 'nagad',  label: 'Nagad',           active: 'bg-orange-500 text-white border-orange-500' },
                { id: 'rocket', label: 'Rocket',          active: 'bg-purple-600 text-white border-purple-600' },
                { id: 'cod',    label: 'Cash on Delivery', active: 'bg-emerald-600 text-white border-emerald-600' },
              ].map((m) => (
                <button key={m.id} type="button" onClick={() => setPaymentMethod(m.id as any)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-black text-center transition ${paymentMethod === m.id ? m.active : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-purple-300'}`}>
                  {m.label}
                </button>
              ))}
            </div>

            {paymentMethod !== 'cod' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-3 text-xs">
                <div className="text-amber-800 space-y-1">
                  <p className="font-bold">Payment Instructions for {paymentMethod.toUpperCase()}:</p>
                  <p>1. Open your {paymentMethod.toUpperCase()} app → Send Money</p>
                  <p>2. To number: <strong className="text-slate-800">01700-000000</strong></p>
                  <p>3. Amount: <strong className="text-purple-700">৳{grandTotal.toLocaleString()}</strong></p>
                  <p>4. Enter Transaction ID below</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className={labelClass}>Sender Number</label><input type="tel" placeholder="017XXXXXXXX" value={senderPhone} onChange={(e) => setSenderPhone(e.target.value)} className={inputClass} /></div>
                  <div><label className={labelClass}>Transaction ID (TrxID) *</label><input type="text" required placeholder="e.g. 9J48XK20L" value={trxId} onChange={(e) => setTrxId(e.target.value)} className={`${inputClass} font-mono`} /></div>
                </div>
              </motion.div>
            )}

            {paymentMethod === 'cod' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                <p className="font-bold">Cash on Delivery Selected</p>
                <p className="text-slate-600 mt-0.5">Pay ৳{grandTotal.toLocaleString()} directly to the courier agent on delivery.</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5 sticky top-24">
            <h2 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-3">
              Order Summary ({cart.length} items)
            </h2>

            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 line-clamp-1 flex-1 font-medium">{item.quantity}× {item.title}</span>
                  <span className="font-bold text-slate-800 ml-2">৳{((item.discount_price || item.price) * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500"><span>Subtotal</span><span className="font-semibold text-slate-700">৳{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-slate-500"><span>Delivery</span><span className="font-semibold text-emerald-600">৳{deliveryFee}</span></div>
              <div className="border-t border-slate-100 pt-2.5 flex justify-between text-sm">
                <span className="font-black text-slate-800">Total</span>
                <span className="font-black text-purple-600 text-base">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-black text-sm hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50">
              {submitting ? <span>Confirming...</span> : <><CheckCircle2 className="w-4 h-4" /><span>Place Order Now</span></>}
            </motion.button>

            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Secured · bKash · Nagad · Rocket · COD</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
