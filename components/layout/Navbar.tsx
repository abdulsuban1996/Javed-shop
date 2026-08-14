'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Tag, Layers, Home, Phone, BookOpen } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function Navbar() {
  const pathname = usePathname();
  const { settings } = useSettings();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Shop All', href: '/shop', icon: Layers },
    { name: 'Deals of the Day', href: '/shop?deal=true', icon: Tag },
    { name: 'Flash Sale', href: '/shop?flash=true', icon: Flame, badge: 'HOT' },
    { name: 'Blog & Reviews', href: '/blog', icon: BookOpen },
    { name: 'Contact Us', href: '/contact', icon: Phone },
  ];

  return (
    <nav className="w-full bg-slate-100/80 border-b border-slate-200 text-sm hidden md:block backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11">
          
          <div className="flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition text-xs ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${link.badge ? 'text-orange-600 animate-pulse' : 'text-slate-500'}`} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="bg-accent-orange text-slate-950 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            <span>{settings.clearanceNotice || 'Mega Clearance Up To 60% Off!'}</span>
          </div>

        </div>
      </div>
    </nav>
  );
}
