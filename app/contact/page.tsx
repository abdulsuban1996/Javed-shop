'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Send, Clock, CheckCircle2, Headphones, ShieldCheck } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const inputClass = "w-full bg-white text-[#0B1220] rounded-xl p-3 border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition text-xs sm:text-sm placeholder:text-slate-400";
const labelClass = "text-xs font-bold text-slate-700 mb-1 block";

export default function ContactPage() {
  const { settings } = useSettings();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactItems = [
    { icon: Phone,        label: 'Customer Hotline', value: settings.hotline || '+880 1700-000000', color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10', border: 'border-[#E5E7EB] hover:border-[#2563EB]/40' },
    { icon: MessageSquare,label: 'WhatsApp Support', value: settings.whatsapp || '+880 1700-000000', color: 'text-[#25C55E]', bg: 'bg-[#25C55E]/10', border: 'border-[#E5E7EB] hover:border-[#25C55E]/40' },
    { icon: Mail,         label: 'Support Email',   value: settings.email || 'support@javedshop.com', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-[#E5E7EB] hover:border-amber-400' },
    { icon: MapPin,       label: 'Office & Warehouse', value: settings.address || 'Dhaka, Bangladesh', color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-[#E5E7EB] hover:border-rose-400' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">

      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="inline-block bg-[#EFF6FF] text-[#2563EB] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-[#2563EB]/20">
          Customer Support
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
          Get in Touch with JAVED SHOP
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Have questions about orders, products, warranty, or delivery? Our dedicated support team is here to assist you.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-5"
        >
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100 bg-[#0B1220] text-white">
              <Headphones className="w-4 h-4 text-[#2563EB]" />
              <h2 className="text-sm font-extrabold">Direct Contact Channels</h2>
            </div>

            <div className="p-4 sm:p-5 space-y-3">
              {contactItems.map(({ icon: Icon, label, value, color, bg, border }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 3 }}
                  className={`flex items-center gap-3.5 p-3.5 rounded-xl border ${border} transition bg-white`}
                >
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                    <p className="text-xs font-bold text-[#0B1220] truncate">{value}</p>
                  </div>
                </motion.div>
              ))}

              {/* Support Hours */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-100">
                <Clock className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                <span>Support Hours: Saturday – Thursday, 10:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Message Form */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="lg:col-span-7"
        >
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100 bg-[#F8FAFC]">
              <Send className="w-4 h-4 text-[#2563EB]" />
              <h2 className="text-sm font-extrabold text-[#0B1220]">Send Us a Message</h2>
            </div>

            <div className="p-5 sm:p-6">
              {submitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#25C55E] shrink-0" />
                  <span>Thank you! Your message has been received. Our team will contact you shortly.</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 017XXXXXXXX"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Your Message / Inquiry *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about orders, product availability, delivery times, or wholesale queries..."
                    className={inputClass}
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs sm:text-sm hover:bg-[#1D4ED8] transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
