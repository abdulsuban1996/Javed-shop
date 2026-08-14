'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, Phone, Mail, MapPin, ShieldCheck,
  MessageCircle, Facebook, Instagram, Youtube,
  Truck, RefreshCw, Lock, ArrowRight
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function Footer() {
  const pathname = usePathname();
  const { settings } = useSettings();

  if (pathname.startsWith('/admin')) return null;

  const year = new Date().getFullYear();

  const quickLinks = [
    { label: 'Shop All Gadgets', href: '/shop' },
    { label: 'Deals of the Day', href: '/shop?deal=true' },
    { label: 'Flash Sale Offers', href: '/shop?flash=true' },
    { label: 'Blog & Reviews', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="w-full bg-slate-950 text-slate-400 mt-12">
      
      {/* ── Top Feature Strip ── */}
      <div className="border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck,     color: 'text-purple-400', bg: 'bg-purple-500/10', title: 'Nationwide Delivery', sub: 'Inside & Outside Dhaka' },
              { icon: RefreshCw, color: 'text-emerald-400', bg: 'bg-emerald-500/10', title: '7-Day Returns',       sub: 'Hassle-free replacement' },
              { icon: Lock,      color: 'text-amber-400',  bg: 'bg-amber-500/10',  title: 'Secure Payments',     sub: 'bKash, Nagad & COD' },
              { icon: ShieldCheck, color: 'text-sky-400', bg: 'bg-sky-500/10',   title: '100% Genuine',        sub: 'Direct China import' },
            ].map(({ icon: Icon, color, bg, title, sub }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{title}</p>
                  <p className="text-[10px] text-slate-500 truncate">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Col 1 — Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              {settings.logo ? (
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-purple-600/40 shadow-md">
                  <Image src={settings.logo} alt={settings.storeName} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition">
                  <Sparkles className="w-5 h-5 text-slate-950" />
                </div>
              )}
              <div className="flex flex-col leading-none">
                <span className="font-black text-lg uppercase text-white tracking-tight group-hover:text-amber-400 transition">
                  {settings.storeName || 'JAVED SHOP'}
                </span>
                <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest mt-0.5">
                  Gadget Store
                </span>
              </div>
            </Link>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              {settings.tagline || "Bangladesh's trusted online shop for direct China-imported gadgets — earbuds, smartwatches & tech accessories at unbeatable prices."}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {[
                { icon: Facebook,       href: '#', label: 'Facebook',  color: 'hover:bg-blue-600' },
                { icon: Instagram,      href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
                { icon: Youtube,        href: '#', label: 'YouTube',   color: 'hover:bg-red-600' },
                { icon: MessageCircle,  href: `https://wa.me/${settings.whatsapp || '8801700000000'}`, label: 'WhatsApp', color: 'hover:bg-emerald-600' },
              ].map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white ${color} hover:border-transparent transition`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-orange-400 transition group"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-700 group-hover:text-orange-400 group-hover:translate-x-0.5 transition" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Customer Support */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-widest">
              Customer Support
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold">Hotline</p>
                  <a href={`tel:${settings.hotline}`} className="text-[11px] text-slate-300 hover:text-orange-400 transition font-medium">
                    {settings.hotline || '+880 1700-000000'}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold">Email</p>
                  <p className="text-[11px] text-slate-300 font-medium">{settings.email || 'support@javedshop.com'}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold">Address</p>
                  <p className="text-[11px] text-slate-300 font-medium leading-snug">{settings.address || 'Dhaka, Bangladesh'}</p>
                </div>
              </li>
            </ul>
          </div>



        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-600">
          <p>© {year} <span className="text-slate-400 font-semibold">{settings.storeName || 'Javed Shop'}</span>. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Direct China Import · 
            <span className="text-slate-500">Nationwide Delivery</span> · 
            <span className="text-slate-500">Cash on Delivery</span>
          </p>
        </div>
      </div>

    </footer>
  );
}
