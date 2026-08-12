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
  Sparkles,
  Eye,
  ExternalLink,
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
    <div className="min-h-screen bg-[#F4F5FB] flex flex-col md:flex-row text-slate-800 font-sans">
      
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#14121E] text-slate-300 flex-col justify-between p-5 shrink-0 min-h-screen shadow-2xl border-r border-slate-800/50">
        <div className="space-y-6">
          {/* Brand Logo Header */}
          <Link href="/" className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-orange to-accent-amber flex items-center justify-center text-slate-950 font-black shadow-lg shadow-accent-orange/20">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight text-white leading-tight">
                JAVED SHOP
              </span>
              <span className="text-[10px] text-accent-orange uppercase font-bold tracking-wider">
                Admin Panel
              </span>
            </div>
          </Link>

          {/* Section Header */}
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest px-3">
              MAIN MENU
            </span>

            {/* Navigation List */}
            <nav className="space-y-1 pt-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition duration-200 ${
                      isActive
                        ? 'bg-[#312356] text-white shadow-md border border-purple-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-accent-amber' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer Logout Button */}
        <div className="border-t border-slate-800/80 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 text-rose-400 hover:text-rose-300 font-extrabold text-xs transition hover:bg-rose-950/40 rounded-xl"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span>Logout / Exit Admin</span>
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
            className="fixed inset-y-0 left-0 z-50 w-64 bg-[#14121E] text-slate-300 flex flex-col justify-between p-5 shadow-2xl md:hidden"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-accent-orange to-accent-amber flex items-center justify-center text-slate-950 font-black">
                    <Sparkles className="w-4 h-4 text-slate-950" />
                  </div>
                  <span className="font-black text-base text-white">JAVED SHOP</span>
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
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                        isActive
                          ? 'bg-[#312356] text-white shadow-md'
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
        <header className="bg-white border-b border-slate-200/90 px-4 sm:px-6 py-3.5 shadow-sm flex items-center justify-between sticky top-0 z-30">
          
          {/* Left Corner: Mobile Toggle & Admin Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse hidden sm:block"></div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900">
                Javed Shop Admin
              </span>
            </div>
          </div>

          {/* Right Corner: Eye Icon Button to View Website */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white font-bold text-xs border border-purple-200 hover:border-purple-600 transition shadow-sm group"
            title="View Live Storefront Website"
          >
            <Eye className="w-4 h-4 group-hover:scale-110 transition" />
            <span className="hidden sm:inline">View Website</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </Link>

        </header>

        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}
