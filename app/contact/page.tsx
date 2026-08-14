'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Headphones
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Customer Support Center</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Get in Touch with {settings.storeName || 'Javed Shop'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
          Have questions about direct China imports, warranty, wholesale orders, or delivery tracking? Our support team is ready to assist you.
        </p>
      </motion.div>

      {/* Main Grid: Contact Cards Column + Interactive Message Form */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        
        {/* Left Column: Direct Contact Info Cards */}
        <motion.div variants={cardVariants} className="lg:col-span-5 space-y-4">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-6 shadow-sm">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3.5">
              <Headphones className="w-5 h-5 text-orange-600" />
              <span>Direct Contact Info</span>
            </h2>

            <div className="space-y-3 text-xs">
              
              {/* Hotline Card */}
              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-500/50 transition duration-300 shadow-sm group"
              >
                <div className="w-11 h-11 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-600 shrink-0 group-hover:scale-110 transition">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-extrabold text-slate-900">Hotline & Customer Service</p>
                  <p className="text-slate-600 font-bold">{settings.hotline || '+880 1700-000000'}</p>
                </div>
              </motion.div>

              {/* WhatsApp Card */}
              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500/50 transition duration-300 shadow-sm group"
              >
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-extrabold text-slate-900">WhatsApp Direct Chat</p>
                  <p className="text-emerald-600 font-bold">{settings.whatsapp || '+880 1700-000000'}</p>
                </div>
              </motion.div>

              {/* Email Card */}
              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/50 transition duration-300 shadow-sm group"
              >
                <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-110 transition">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-extrabold text-slate-900">Official Email</p>
                  <p className="text-slate-600 font-bold">{settings.email || 'support@javedshop.com'}</p>
                </div>
              </motion.div>

              {/* Address Card */}
              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-500/50 transition duration-300 shadow-sm group"
              >
                <div className="w-11 h-11 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-600 shrink-0 group-hover:scale-110 transition">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-extrabold text-slate-900">Store Address</p>
                  <p className="text-slate-600 font-medium">{settings.address || 'Dhaka, Bangladesh'}</p>
                </div>
              </motion.div>

              {/* Working Hours */}
              <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-500 font-medium border-t border-slate-100">
                <Clock className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Support Available: Saturday – Thursday (10:00 AM – 10:00 PM)</span>
              </div>

            </div>
          </div>

        </motion.div>

        {/* Right Column: Send Message Form */}
        <motion.div variants={cardVariants} className="lg:col-span-7">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
            
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3.5">
              <Send className="w-5 h-5 text-orange-600" />
              <span>Send Us a Direct Message</span>
            </h2>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold flex items-center gap-2.5 shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! Your message has been received. Our team will contact you shortly.</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-700">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tanvir Ahmed"
                    className="w-full bg-slate-50 text-slate-900 rounded-xl p-3.5 border border-slate-200 focus:outline-none focus:border-orange-600 focus:bg-white transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-50 text-slate-900 rounded-xl p-3.5 border border-slate-200 focus:outline-none focus:border-orange-600 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-extrabold text-slate-700">Your Message / Inquiry *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about warranty, delivery time, product availability, or bulk imports..."
                  className="w-full bg-slate-50 text-slate-900 rounded-xl p-3.5 border border-slate-200 focus:outline-none focus:border-orange-600 focus:bg-white transition"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-accent-orange to-accent-amber text-slate-950 font-black text-xs hover:brightness-110 transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4 text-slate-950 fill-current" />
                <span>Submit Inquiry Message</span>
              </motion.button>

            </form>
          </div>
        </motion.div>

      </motion.div>

    </div>
  );
}
