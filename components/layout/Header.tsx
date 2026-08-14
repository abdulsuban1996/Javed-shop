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
  ChevronRight
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
    <header className="w-full bg-slate-950 text-white sticky top-0 z-50 shadow-xl border-b border-brand-800/40">
      
      {/* Top Notice Banner */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 border-b border-brand-800/30 text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center justify-center gap-1.5">
            <span className="bg-accent-orange text-white px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider animate-pulse shrink-0">
              Direct Import
            </span>
            <span className="truncate max-w-[280px] sm:max-w-none">
              {settings.tagline || 'China Gadgets Online Shop in Bangladesh | Fast Delivery Nationwide'}
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-3 text-slate-400">
            <a href={`tel:${settings.hotline || '+8801700000000'}`} className="flex items-center gap-1 hover:text-accent-orange transition">
              <PhoneCall className="w-3 h-3 text-accent-orange shrink-0" />
              <span>Hotline: {settings.hotline || '+880 1700-000000'}</span>
            </a>
            <span className="hidden md:flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" /> 100% Original Products
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Mobile Menu Hamburger Toggle & Brand Logo */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-accent-orange" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              {settings.logo ? (
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-brand-600/50 shadow-md">
                  <Image src={settings.logo} alt={settings.storeName} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-accent-orange to-accent-amber flex items-center justify-center shadow-lg shadow-accent-orange/20 group-hover:scale-105 transition transform shrink-0">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 font-extrabold" />
                </div>
              )}
              
              <div className="flex flex-col">
                <span className="font-black text-lg sm:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-accent-amber uppercase leading-none">
                  {settings.storeName || 'JAVED SHOP'}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-accent-orange uppercase font-semibold">
                  Gadget Store
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-lg lg:max-w-xl relative items-center"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search earbuds, smartwatch, speaker, powerbank..."
              className="w-full bg-slate-900/90 text-white text-xs sm:text-sm placeholder-slate-400 rounded-full pl-4 sm:pl-5 pr-12 py-2.5 border border-brand-700/50 focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 transition shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-4 bg-gradient-to-r from-accent-orange to-accent-amber text-slate-950 rounded-full hover:brightness-110 font-bold transition flex items-center justify-center shadow"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-slate-950" />
            </button>
          </form>

          {/* Cart Icon & Mobile Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-brand-900 to-brand-800 border border-brand-700/60 text-white hover:border-accent-orange transition shadow-md group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-accent-amber group-hover:scale-110 transition" />
                {totalItems > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-accent-orange text-white text-[10px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-950 animate-bounce">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-bold hidden sm:inline">
                Cart
              </span>
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
              className="w-full bg-slate-900 text-white text-xs placeholder-slate-400 rounded-full pl-4 pr-10 py-2 border border-brand-700/50 focus:outline-none focus:border-accent-orange"
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

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-900 border-b border-slate-800 overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-4 space-y-3">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">
                Navigation Menu
              </span>

              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-xl font-bold text-xs transition ${
                        isActive
                          ? 'bg-brand-900 text-white border border-brand-600/40'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${link.badge ? 'text-accent-orange' : 'text-slate-400'}`} />
                        <span>{link.name}</span>
                        {link.badge && (
                          <span className="bg-accent-orange text-slate-950 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Hotline Quick Action */}
              <div className="pt-2 border-t border-slate-800">
                <a
                  href={`tel:${settings.hotline || '+8801700000000'}`}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-amber text-slate-950 font-black text-xs shadow-md"
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
