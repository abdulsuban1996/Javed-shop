'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Tag, Layers, Home, Phone, BookOpen, Zap } from 'lucide-react';
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
    { name: 'Deals', href: '/shop?deal=true', icon: Tag },
    { name: 'Flash Sale', href: '/shop?flash=true', icon: Flame, badge: 'HOT' },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800/60 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">

          {/* Nav Links */}
          <div className="flex items-center gap-0.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href.split('?')[0]));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-[11px] tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-accent-orange bg-slate-800'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className={`w-3 h-3 shrink-0 ${link.badge ? 'text-accent-orange' : ''}`} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="bg-accent-orange text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase leading-none">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent-orange rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: Clearance Notice */}
          <div className="flex items-center gap-2 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 rounded-full">
            <Zap className="w-3 h-3 fill-current animate-pulse shrink-0" />
            <span>{settings.clearanceNotice || 'Mega Clearance Up To 60% Off!'}</span>
          </div>

        </div>
      </div>
    </nav>
  );
}
