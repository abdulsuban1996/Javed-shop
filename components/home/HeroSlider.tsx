'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    badge: 'FEATURED COLLECTION',
    title: 'Smart Products.',
    highlight: 'Better Everyday.',
    description: 'Discover premium smart gadgets, accessories & daily lifestyle essentials with nationwide delivery across Bangladesh.',
    ctaText: 'Shop Now',
    ctaLink: '/shop',
    secondaryCtaText: 'Explore Categories',
    secondaryCtaLink: '/shop',
    bg: 'from-[#0B1220] via-[#0F1D36] to-[#1E293B]',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop',
    accentColor: '#2563EB',
  },
  {
    id: 2,
    badge: 'EXCLUSIVE DEALS',
    title: 'Modern Audio &',
    highlight: 'Sound Experience.',
    description: 'Crystal clear acoustics, noise cancellation & long-lasting battery life. 100% genuine guaranteed with replacement warranty.',
    ctaText: 'View Deals',
    ctaLink: '/shop?deal=true',
    secondaryCtaText: 'Browse Audio',
    secondaryCtaLink: '/shop?category=audio',
    bg: 'from-[#060A12] via-[#0B1220] to-[#1E3A8A]',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop',
    accentColor: '#2563EB',
  },
  {
    id: 3,
    badge: 'NEW ARRIVALS',
    title: 'Next-Gen Wearables',
    highlight: '& Lifestyle Tech.',
    description: 'Track your health, manage notifications, and elevate your everyday lifestyle with the latest smart accessories.',
    ctaText: 'Order Today',
    ctaLink: '/shop?category=smartwatch',
    secondaryCtaText: 'All New Items',
    secondaryCtaLink: '/shop?flash=true',
    bg: 'from-[#0B1220] via-[#111E38] to-[#0A2540]',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop',
    accentColor: '#2563EB',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = BANNERS[currentSlide];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-slate-800 bg-[#0B1220] group h-[320px] sm:h-[380px] lg:h-[420px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-r ${slide.bg} flex items-center`}
        >
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#2563EB]/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-64 h-64 rounded-full bg-[#25C55E]/10 blur-2xl pointer-events-none" />

          {/* Slide Content */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-6 w-full h-full px-6 sm:px-10 lg:px-12">
            
            {/* Left Text Column */}
            <div className="md:col-span-7 space-y-3.5 max-w-xl">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/40 text-[#60A5FA] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#25C55E]" />
                <span>{slide.badge}</span>
              </div>

              {/* Headline */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {slide.title}
                </h1>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#60A5FA] tracking-tight leading-tight">
                  {slide.highlight}
                </p>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed max-w-md line-clamp-2">
                {slide.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-[#2563EB] text-white font-bold text-xs sm:text-sm hover:bg-[#1D4ED8] transition shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={slide.secondaryCtaLink}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition"
                >
                  <span>{slide.secondaryCtaText}</span>
                </Link>
              </div>

            </div>

            {/* Right Image Presentation */}
            <div className="hidden md:flex md:col-span-5 items-center justify-center relative h-64 lg:h-80">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-3 left-3 bg-[#0B1220]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] text-white font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#25C55E]" />
                  <span>Verified Genuine Quality</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav Arrows */}
      <button
        onClick={() => setCurrentSlide((p) => (p === 0 ? BANNERS.length - 1 : p - 1))}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#0B1220]/70 border border-white/10 text-white hover:bg-[#2563EB] transition flex items-center justify-center opacity-0 group-hover:opacity-100"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => setCurrentSlide((p) => (p + 1) % BANNERS.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#0B1220]/70 border border-white/10 text-white hover:bg-[#2563EB] transition flex items-center justify-center opacity-0 group-hover:opacity-100"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'w-6 bg-[#2563EB]' : 'w-1.5 bg-white/40'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
