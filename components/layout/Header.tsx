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
  Menu,
  X,
  Home,
  Layers,
  Tag,
  Flame,
  BookOpen,
  Phone,
  ChevronRight,
  User,
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
    { name: 'Shop All', href: '/shop', icon: Layers },
    { name: 'Deals of the Day', href: '/shop?deal=true', icon: Tag },

    { name: 'Flash Sale', href: '/shop?flash=true', icon: Flame, badge: 'HOT' },
    { name: 'Blog & Reviews', href: '/blog', icon: BookOpen },
    { name: 'Contact Us', href: '/contact', icon: Phone },
  ];

  // Only use settings.logo if it is a valid CDN/remote URL uploaded by admin.
  // Otherwise always use the local static logo file — this prevents localStorage corruption breaking the logo.
  const logoSrc =
    settings.logo && settings.logo.trim().startsWith('https://')
      ? settings.logo
      : '/javed-shop-logo.png';

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm">

      {/* ── Top Notice Bar (Deep Navy) ── */}
      <div className="bg-[#0B1220] text-slate-300 text-[11px] sm:text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left: Tagline */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 bg-[#25C55E]/15 text-[#25C55E] border border-[#25C55E]/30 px-2 py-0.5 rounded-md font-bold text-[9px] uppercase tracking-wider">
              Official Store
            </span>
            <span className="text-slate-300 font-medium truncate hidden sm:inline">
              {settings.tagline || 'MORE THAN JUST A SHOP'} · 100% Genuine Quality
            </span>
          </div>

          {/* Right: Hotline & Delivery Promise */}
          <div className="flex items-center gap-4 shrink-0 text-slate-300">
            <a
              href={`tel:${settings.hotline || '+8801700000000'}`}
              className="flex items-center gap-1.5 hover:text-[#2563EB] transition font-medium"
            >
              <PhoneCall className="w-3 h-3 text-[#2563EB]" />
              <span>Hotline: <strong className="text-white">{settings.hotline || '+880 1700-000000'}</strong></span>
            </a>
            <span className="hidden md:flex items-center gap-1 text-[#25C55E] font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Nationwide Delivery
            </span>
          </div>

        </div>
      </div>

      {/* ── Main Header Bar (Clean White) ── */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
          <div className="flex items-center justify-between gap-3 sm:gap-6">

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-[#2563EB] transition shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo - Using plain img for guaranteed rendering */}
            <Link href="/" className="flex items-center shrink-0 group py-0.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoSrc}
                alt={settings.storeName || 'JAVED SHOP'}
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain group-hover:opacity-95 transition"
                fetchPriority="high"
              />
            </Link>

            {/* Desktop Search Bar */}
            <form
              onSubmit={handleSearch}
              className="hidden sm:flex flex-1 max-w-2xl relative items-center"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, smart gadgets, accessories..."
                className="w-full bg-[#F8FAFC] text-[#111827] text-xs sm:text-sm placeholder-slate-400 rounded-xl pl-4 pr-24 py-2.5 border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/15 transition"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] font-bold transition flex items-center justify-center gap-1.5 text-xs shadow-sm"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden md:inline font-semibold">Search</span>
              </button>
            </form>

            {/* Right Action Icons: Account & Cart */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Account Link (Desktop) */}
              <Link
                href="/account"
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:text-[#2563EB] hover:bg-[#F8FAFC] border border-transparent hover:border-slate-200 transition text-xs font-semibold"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>Account</span>
              </Link>

              {/* Cart Button (Primary Electric Blue Action) */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs hover:bg-[#1D4ED8] transition shadow-sm group"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2.5 bg-[#25C55E] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-bold">Cart</span>
              </Link>

            </div>

          </div>

          {/* Mobile Search Bar Row */}
          <div className="sm:hidden mt-2.5">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-[#F8FAFC] text-[#111827] text-xs placeholder-slate-400 rounded-xl pl-3.5 pr-10 py-2 border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:bg-white"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#2563EB] text-white rounded-lg flex items-center justify-center"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-xl"
          >
            <div className="px-4 py-4 space-y-3 max-w-7xl mx-auto">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-1">
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
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition ${
                        isActive
                          ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20 font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-[#2563EB]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#2563EB]' : 'text-slate-400'}`} />
                        <span>{link.name}</span>
                        {link.badge && (
                          <span className="bg-[#2563EB] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  );
                })}

                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition"
                >
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Account</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>

              {/* Mobile Hotline CTA */}
              <div className="pt-2 border-t border-slate-100">
                <a
                  href={`tel:${settings.hotline || '+8801700000000'}`}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0B1220] text-white font-bold text-xs hover:bg-[#1E293B] transition"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Hotline: {settings.hotline || '+880 1700-000000'}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
