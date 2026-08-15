'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, Phone, Mail, MapPin,
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
    { label: 'All Products', href: '/shop' },
    { label: 'Deals of the Day', href: '/shop?deal=true' },
    { label: 'Flash Sale Offers', href: '/shop?flash=true' },
    { label: 'Blog & Product Reviews', href: '/blog' },
    { label: 'Contact Support', href: '/contact' },
  ];

  const logoSrc =
    settings.logo && settings.logo.trim().startsWith('https://')
      ? settings.logo
      : '/javed-shop-logo.png';

  return (
    <footer className="w-full bg-[#0B1220] text-slate-300 mt-12 border-t border-slate-800">
      
      {/* ── Top Feature Strip ── */}
      <div className="border-b border-slate-800/80 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck,       color: 'text-[#2563EB]', bg: 'bg-[#2563EB]/10', title: 'Fast Delivery',       sub: 'Nationwide in Bangladesh' },
              { icon: RefreshCw,   color: 'text-[#25C55E]', bg: 'bg-[#25C55E]/10', title: '7-Day Return Policy', sub: 'Hassle-free replacement' },
              { icon: Lock,        color: 'text-amber-400', bg: 'bg-amber-400/10', title: 'Secure Payment',      sub: 'bKash, Nagad & COD' },
              { icon: ShieldCheck, color: 'text-[#25C55E]', bg: 'bg-[#25C55E]/10', title: '100% Genuine',        sub: 'Verified brand quality' },
            ].map(({ icon: Icon, color, bg, title, sub }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4.5 h-4.5 ${color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{title}</p>
                  <p className="text-[10px] text-slate-400 truncate">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Col 1 — Brand */}
          <div className="space-y-3.5">
            <Link href="/" className="inline-block group">
              <div className="bg-white px-3 py-1.5 rounded-xl inline-flex items-center shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoSrc}
                  alt={settings.storeName || 'JAVED SHOP'}
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              JAVED SHOP is a modern Bangladeshi online store dedicated to smart shopping, genuine quality, and exceptional customer experience. More than just a shop.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { icon: Facebook,      href: settings.facebookUrl || '#', label: 'Facebook',  color: 'hover:bg-blue-600' },
                { icon: Instagram,     href: settings.instagramUrl || '#', label: 'Instagram', color: 'hover:bg-pink-600' },
                { icon: Youtube,       href: settings.youtubeUrl || '#', label: 'YouTube',   color: 'hover:bg-red-600' },
                { icon: MessageCircle, href: `https://wa.me/${settings.whatsapp?.replace(/[^0-9]/g, '') || '8801700000000'}`, label: 'WhatsApp', color: 'hover:bg-[#25C55E]' },
              ].map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white ${color} hover:border-transparent transition`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#2563EB] transition group"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Customer Support */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Customer Support
            </h3>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#2563EB]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Hotline</p>
                  <a href={`tel:${settings.hotline}`} className="text-xs text-slate-200 hover:text-[#2563EB] transition font-medium">
                    {settings.hotline || '+880 1700-000000'}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-400/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Email</p>
                  <p className="text-xs text-slate-200 font-medium">{settings.email || 'support@javedshop.com'}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#25C55E]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#25C55E]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Address</p>
                  <p className="text-xs text-slate-200 font-medium leading-snug">{settings.address || 'Dhaka, Bangladesh'}</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-slate-800/80 bg-[#060A12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>© {year} <strong className="text-white font-bold">{settings.storeName || 'JAVED SHOP'}</strong>. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="text-[#25C55E] font-semibold">MORE THAN JUST A SHOP</span> · 
            <span>Nationwide Delivery in Bangladesh</span>
          </p>
        </div>
      </div>

    </footer>
  );
}
