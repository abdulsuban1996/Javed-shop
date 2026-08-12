'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sparkles, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function Footer() {
  const pathname = usePathname();
  const { settings } = useSettings();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800/80 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              {settings.logo ? (
                <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-brand-600/50 shadow-md">
                  <Image src={settings.logo} alt={settings.storeName} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-orange to-accent-amber flex items-center justify-center shadow-lg shadow-accent-orange/20">
                  <Sparkles className="w-5 h-5 text-slate-950 font-extrabold" />
                </div>
              )}
              <span className="font-extrabold text-xl tracking-tight text-white uppercase">
                {settings.storeName || 'JAVED SHOP'}
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {settings.tagline || "Bangladesh's trusted online shop for direct imported China gadgets, earbuds, smartwatches & tech accessories at unbeatable prices."}
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-accent-orange">
              <ShieldCheck className="w-4 h-4" /> 100% Genuine Import Guarantee
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/shop" className="hover:text-accent-amber transition">Shop All Gadgets</Link></li>
              <li><Link href="/shop?deal=true" className="hover:text-accent-amber transition">Deals of the Day</Link></li>
              <li><Link href="/shop?flash=true" className="hover:text-accent-amber transition">Flash Sale Offers</Link></li>
              <li><Link href="/blog" className="hover:text-accent-amber transition">Gadget Reviews & Blog</Link></li>
              <li><Link href="/cart" className="hover:text-accent-amber transition">My Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Customer Support
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent-orange" />
                <span>Hotline: {settings.hotline || '+880 1700-000000'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-orange" />
                <span>{settings.email || 'support@javedshop.com'}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent-orange shrink-0 mt-0.5" />
                <span>{settings.address || 'Dhaka, Bangladesh'}</span>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              We Accept Payments
            </h3>
            <p className="text-xs text-slate-400">
              Pay securely via Mobile Banking or Cash on Delivery nationwide.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1.5 rounded-lg bg-pink-950/80 border border-pink-700/50 text-pink-400 font-extrabold text-xs">
                bKash
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-orange-950/80 border border-orange-700/50 text-orange-400 font-extrabold text-xs">
                Nagad
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-purple-950/80 border border-purple-700/50 text-purple-400 font-extrabold text-xs">
                Rocket
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/50 text-emerald-400 font-extrabold text-xs">
                Cash On Delivery
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {settings.storeName || 'Javed Shop'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
