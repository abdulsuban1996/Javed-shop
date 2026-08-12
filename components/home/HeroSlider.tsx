'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Zap, ShieldCheck } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    title: 'MEGA CHINA GADGET SALE',
    subtitle: 'Up to 50% OFF on TWS Earbuds & Smartwatches',
    description: 'Direct imported high-quality electronics with warranty & cash on delivery across Bangladesh.',
    ctaText: 'Shop Deals Now',
    ctaLink: '/shop?deal=true',
    badge: 'FLASH SALE LIVE',
    bgGradient: 'from-brand-950 via-slate-900 to-purple-950',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'SMARTWATCH 8 SERIES ULTRA',
    subtitle: 'HD Curved Display & Bluetooth Calling',
    description: 'Track your health 24/7 with heart rate & SpO2 sensors. Water resistant with 30-day standby.',
    ctaText: 'Order Today',
    ctaLink: '/shop?category=electronics',
    badge: 'NEW ARRIVAL',
    bgGradient: 'from-slate-950 via-brand-950 to-slate-900',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'AUDIO & SOUND EXPERIENCE',
    subtitle: 'Portable RGB Bluetooth Speakers',
    description: '360° Bass boost, IPX7 waterproof rating, perfect for indoor parties & outdoor travel.',
    ctaText: 'Explore Speakers',
    ctaLink: '/shop?category=electronics',
    badge: 'BEST SELLER',
    bgGradient: 'from-purple-950 via-slate-900 to-brand-950',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200&auto=format&fit=crop',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = BANNERS[currentSlide];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-brand-800/40 bg-slate-950 group h-[340px] sm:h-[420px]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-orange/15 via-transparent to-transparent opacity-70"></div>

          {/* Content Grid */}
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
              
              {/* Left Text Column */}
              <div className="md:col-span-7 space-y-3 sm:space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/20 border border-accent-orange/40 text-accent-orange text-xs font-extrabold uppercase tracking-wider"
                >
                  <Zap className="w-3.5 h-3.5 animate-bounce" />
                  {slide.badge}
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-accent-amber font-bold text-sm sm:text-lg"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-slate-300 text-xs sm:text-sm line-clamp-2 max-w-lg"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-2 flex items-center gap-3"
                >
                  <Link
                    href={slide.ctaLink}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-amber text-slate-950 font-black text-sm hover:brightness-110 transition shadow-lg shadow-accent-orange/30 flex items-center gap-2 transform active:scale-95"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-2 rounded-xl border border-emerald-800/40">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verified China Direct</span>
                  </div>
                </motion.div>
              </div>

              {/* Right Image */}
              <div className="hidden md:block md:col-span-5 relative h-64 lg:h-72 w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover transform hover:scale-105 transition duration-700"
                  priority
                />
              </div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1))}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-900/80 text-white hover:bg-accent-orange hover:text-slate-950 transition opacity-0 group-hover:opacity-100"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % BANNERS.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-900/80 text-white hover:bg-accent-orange hover:text-slate-950 transition opacity-0 group-hover:opacity-100"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === idx ? 'w-8 bg-accent-orange' : 'w-2 bg-slate-700'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
