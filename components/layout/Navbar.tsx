'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Tag, Layers, Home, Phone, BookOpen, Sparkles } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function Navbar() {
  const pathname = usePathname();
  const { settings } = useSettings();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'All Categories', href: '/shop', icon: Layers },
    { name: 'Deals of the Day', href: '/shop?deal=true', icon: Tag },
    { name: 'Flash Sale', href: '/shop?flash=true', icon: Flame, badge: 'HOT' },
    { name: 'Blog & Reviews', href: '/blog', icon: BookOpen },
    { name: 'Contact Support', href: '/contact', icon: Phone },
  ];

  return (
    <nav className="w-full bg-white border-b border-[#E5E7EB] hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10 sm:h-11">

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href.split('?')[0]));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs tracking-tight transition-all duration-150 ${
                    isActive
                      ? 'text-[#2563EB] bg-[#EFF6FF] font-bold'
                      : 'text-slate-600 hover:text-[#2563EB] hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#2563EB]' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="bg-[#2563EB] text-white text-[8.5px] font-extrabold px-1.5 py-0.5 rounded leading-none">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2563EB] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: Brand Clearance / Offer Chip */}
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#0B1220] bg-[#F8FAFC] border border-[#E5E7EB] px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#25C55E] animate-pulse" />
            <span>{settings.clearanceNotice || 'Smart Products. Better Everyday.'}</span>
          </div>

        </div>
      </div>
    </nav>
  );
}
