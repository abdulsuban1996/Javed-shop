'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Menu,
  X,
  Home,
  Layers,
  Tag,
  Flame,
  BookOpen,
  Phone,
  ChevronRight,
  Truck,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';

export default function Header() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { totalItems } = useCart();
  const { settings } = useSettings();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Shop All Gadgets', href: '/shop', icon: Layers },
    { name: 'Deals of the Day', href: '/shop?deal=true', icon: Tag },
    { name: 'Flash Sale', href: '/shop?flash=true', icon: Flame, badge: 'HOT' },
    { name: 'Blog & Reviews', href: '/blog', icon: BookOpen },
    { name: 'Contact Us', href: '/contact', icon: Phone },
  ];

  return (
    <header className="w-full sticky top-0 z-50">

      {/* ── Top Notice Strip ── */}
      <div className="bg-slate-950 border-b border-slate-800/60 text-[10.5px] sm:text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: tagline pill + text */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 bg-accent-orange text-white px-2.5 py-0.5 rounded-full font-black text-[9px] uppercase tracking-wider">
              Direct Import
            </span>
            <span className="text-slate-400 truncate hidden sm:block">
              {settings.tagline || 'China Gadget Store in Bangladesh | Nationwide Delivery'}
            </span>
          </div>
          {/* Right: hotline + badge */}
          <div className="flex items-center gap-3 shrink-0 text-slate-400">
            <a
              href={`tel:${settings.hotline || '+8801700000000'}`}
              className="flex items-center gap-1.5 hover:text-accent-orange transition font-medium"
            >
              <PhoneCall className="w-3 h-3 text-accent-orange" />
              <span>Hotline: {settings.hotline || '+880 1700-000000'}</span>
            </a>
            <span className="hidden md:flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3 h-3" />
              100% Original Products
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Header Bar ── */}
      <div className="bg-slate-950 shadow-lg border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <div className="flex items-center gap-3 sm:gap-5">

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex-shrink-0 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen
                ? <X className="w-5 h-5 text-accent-orange" />
                : <Menu className="w-5 h-5" />
              }
            </button>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              {settings.logo ? (
                <div className="relative w-10 h-10 rounded-2xl overflow-hidden border border-brand-600/50 shadow-md">
                  <Image src={settings.logo} alt={settings.storeName} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-accent-orange to-accent-amber flex items-center justify-center shadow-lg shadow-accent-orange/30 group-hover:scale-105 transition shrink-0">
                  <Sparkles className="w-5 h-5 text-slate-950" />
                </div>
              )}
              <div className="flex flex-col leading-none">
                <span className="font-black text-lg sm:text-xl tracking-tight uppercase text-white group-hover:text-accent-amber transition">
                  {settings.storeName || 'JAVED SHOP'}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-accent-orange uppercase font-bold mt-0.5">
                  Gadget Store
                </span>
              </div>
            </Link>

            {/* Desktop Search Bar */}
            <form
              onSubmit={handleSearch}
              className="hidden sm:flex flex-1 relative items-center"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search earbuds, smartwatch, speaker, powerbank..."
                className="w-full bg-slate-900 text-white text-xs sm:text-sm placeholder-slate-500 rounded-full pl-5 pr-14 py-2.5 border border-slate-700/60 focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 transition"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 bg-gradient-to-r from-accent-orange to-accent-amber text-slate-950 rounded-full hover:brightness-110 font-bold transition flex items-center justify-center gap-1.5 text-xs shadow"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5 text-slate-950" />
                <span className="hidden lg:inline font-black">Search</span>
              </button>
            </form>

            {/* Right: Delivery info + Cart */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto sm:ml-0">
              {/* Delivery Info (desktop only) */}
              <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl">
                <Truck className="w-3.5 h-3.5 text-accent-orange shrink-0" />
                <div className="leading-none">
                  <p className="text-white font-bold text-[10px]">Free Shipping</p>
                  <p className="text-slate-500 text-[9px]">Orders above ৳2000</p>
                </div>
              </div>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-br from-accent-orange to-accent-amber text-slate-950 font-black text-xs hover:brightness-110 transition shadow-md shadow-accent-orange/20 group"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 group-hover:scale-110 transition" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-slate-950 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow border border-accent-orange">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-black">Cart</span>
              </Link>
            </div>

          </div>

          {/* Mobile Search Bar */}
          <div className="sm:hidden mt-2.5">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search China gadgets..."
                className="w-full bg-slate-900 text-white text-xs placeholder-slate-500 rounded-full pl-4 pr-11 py-2.5 border border-slate-700/60 focus:outline-none focus:border-accent-orange"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-accent-orange text-white rounded-full flex items-center justify-center"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Mobile Slide-down Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-slate-950 border-b border-slate-800 shadow-2xl"
          >
            <div className="px-4 py-4 space-y-3 max-w-7xl mx-auto">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-1">
                Navigation
              </p>

              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl font-semibold text-xs transition ${
                        isActive
                          ? 'bg-brand-900/80 text-white border border-brand-700/40'
                          : 'text-slate-300 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${link.badge ? 'text-accent-orange' : isActive ? 'text-accent-amber' : 'text-slate-500'}`} />
                        <span>{link.name}</span>
                        {link.badge && (
                          <span className="bg-accent-orange text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Hotline CTA */}
              <div className="pt-2 border-t border-slate-800/80">
                <a
                  href={`tel:${settings.hotline || '+8801700000000'}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-amber text-slate-950 font-black text-xs shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Hotline: {settings.hotline || '+880 1700-000000'}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
