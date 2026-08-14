'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Send, Clock, CheckCircle2, Headphones } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const inputClass = "w-full bg-white text-slate-800 rounded-xl p-3 border border-slate-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition text-sm placeholder:text-slate-400";
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
    setName(''); setPhone(''); setMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactItems = [
    { icon: Phone,        label: 'Hotline',        value: settings.hotline || '+880 1700-000000', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200 hover:border-purple-400' },
    { icon: MessageSquare,label: 'WhatsApp',       value: settings.whatsapp || '+880 1700-000000', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200 hover:border-emerald-400' },
    { icon: Mail,         label: 'Email',          value: settings.email || 'support@javedshop.com', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200 hover:border-amber-400' },
    { icon: MapPin,       label: 'Address',        value: settings.address || 'Dhaka, Bangladesh', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200 hover:border-rose-400' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="inline-block bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-purple-200">
          Customer Support
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          Get in Touch with {settings.storeName || 'Javed Shop'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Have questions about products, delivery, or warranty? Our team is ready to help.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left: Contact Info */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="lg:col-span-5">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100 bg-purple-600 text-white">
              <Headphones className="w-4 h-4" />
              <h2 className="text-sm font-black">Direct Contact Info</h2>
            </div>

            <div className="p-4 space-y-3">
              {contactItems.map(({ icon: Icon, label, value, color, bg, border }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3.5 p-3.5 rounded-xl border ${border} transition`}
                >
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4.5 h-4.5 w-[18px] h-[18px] ${color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
                    <p className={`text-xs font-bold ${color} truncate`}>{value}</p>
                  </div>
                </motion.div>
              ))}

              {/* Working Hours */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-100">
                <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Support Hours: Sat–Thu, 10:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Message Form */}
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="lg:col-span-7">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
              <Send className="w-4 h-4 text-purple-500" />
              <h2 className="text-sm font-black text-slate-800">Send Us a Message</h2>
            </div>

            <div className="p-5">
              {submitted && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Thank you! We received your message and will contact you shortly.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Full Name *</label><input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Tanvir Ahmed" className={inputClass} /></div>
                  <div><label className={labelClass}>Phone Number *</label><input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="017XXXXXXXX" className={inputClass} /></div>
                </div>
                <div>
                  <label className={labelClass}>Message / Inquiry *</label>
                  <textarea rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask about warranty, delivery, product availability, or bulk orders..." className={inputClass} />
                </div>
                <motion.button whileTap={{ scale: 0.97 }} type="submit"
                  className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-black text-sm hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow-md">
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
