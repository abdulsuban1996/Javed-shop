'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  Users, 
  Truck, 
  CreditCard, 
  Settings, 
  LogOut,
  Eye,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Income & Expenses', href: '/admin/finance', icon: DollarSign },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Delivery Zones', href: '/admin/delivery', icon: Truck },
    { name: 'Payment Methods', href: '/admin/payments', icon: CreditCard },
    { name: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row text-slate-800 font-sans">
      
      {/* Desktop Left Sidebar (Deep Navy #0B1220) */}
      <aside className="hidden md:flex w-64 bg-[#0B1220] text-slate-300 flex-col justify-between p-5 shrink-0 min-h-screen shadow-lg border-r border-slate-800">
        <div className="space-y-6">
          
          {/* Brand Logo Header */}
          <Link href="/admin" className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm shrink-0 border border-slate-700 bg-white flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/javed-shop-icon.png"
                alt="Javed Shop"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white leading-tight">
                JAVED SHOP
              </span>
              <span className="text-[10px] text-[#25C55E] uppercase font-bold tracking-wider">
                Admin Console
              </span>
            </div>
          </Link>

          {/* Section Header & Navigation */}
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest px-3">
              MAIN NAVIGATION
            </span>

            {/* Navigation List */}
            <nav className="space-y-1 pt-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition duration-150 ${
                      isActive
                        ? 'bg-[#2563EB] text-white shadow-sm font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer Logout / Back to Store */}
        <div className="border-t border-slate-800 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 text-rose-400 hover:text-rose-300 font-bold text-xs transition hover:bg-rose-950/40 rounded-xl"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Exit to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Drawer Menu for Admin */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -250 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -250 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1220] text-slate-300 flex flex-col justify-between p-5 shadow-2xl md:hidden"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Link href="/admin" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl overflow-hidden bg-white flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/javed-shop-icon.png" alt="Javed Shop" className="w-7 h-7 object-contain" />
                  </div>
                  <span className="font-extrabold text-sm text-white">JAVED SHOP</span>
                </Link>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? 'bg-[#2563EB] text-white shadow-sm font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-rose-400 text-xs font-bold"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Admin</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Viewport Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Admin Top Header Bar */}
        <header className="bg-white border-b border-[#E5E7EB] px-4 sm:px-6 py-3.5 shadow-sm flex items-center justify-between sticky top-0 z-30">
          
          {/* Left Corner: Mobile Toggle & Admin Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#25C55E] animate-pulse hidden sm:block"></div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#0B1220]">
                Javed Shop Administration
              </span>
            </div>
          </div>

          {/* Right Corner: View Website Button (Eye Icon Only) */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] hover:bg-[#2563EB] hover:text-white border border-[#2563EB]/20 transition shadow-sm group"
            title="View Live Storefront Website"
            aria-label="View Live Storefront Website"
          >
            <Eye className="w-4 h-4 group-hover:scale-110 transition duration-150" />
          </Link>

        </header>

        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#F8FAFC]">
          {children}
        </main>

      </div>

    </div>
  );
}
