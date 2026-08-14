'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Percent } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    badge: 'FLASH SALE',
    title: 'MEGA SALE',
    highlight: 'UP TO 60% OFF',
    description: 'On Selected Items Only',
    ctaText: 'Shop Now',
    ctaLink: '/shop?deal=true',
    bg: 'from-purple-900 via-purple-800 to-indigo-900',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    badge: 'NEW ARRIVAL',
    title: 'SMARTWATCH',
    highlight: 'ULTRA SERIES',
    description: 'HD Display & Bluetooth Calling',
    ctaText: 'Order Now',
    ctaLink: '/shop?category=electronics',
    bg: 'from-indigo-900 via-purple-900 to-violet-900',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop',
  },
  {
    id: 3,
    badge: 'BEST SELLER',
    title: 'AUDIO DEAL',
    highlight: 'SPEAKERS & EARBUDS',
    description: '360° Bass Boost | IPX7 Waterproof',
    ctaText: 'Explore Now',
    ctaLink: '/shop?category=electronics',
    bg: 'from-violet-900 via-purple-800 to-indigo-900',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop',
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
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg group h-[280px] sm:h-[340px] lg:h-[380px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.45 }}
          className={`absolute inset-0 bg-gradient-to-r ${slide.bg} flex items-center`}
        >
          {/* Decorative circles */}
          <div className="absolute top-4 right-4 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute bottom-0 left-1/2 w-24 h-24 rounded-full bg-yellow-400/10 blur-xl" />

          {/* Content */}
          <div className="relative z-10 flex items-center justify-between w-full h-full px-8 sm:px-12">
            {/* Left text */}
            <div className="space-y-3 max-w-xs sm:max-w-sm">
              <span className="inline-block bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/30">
                {slide.badge}
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-yellow-400 leading-tight">
                  {slide.highlight}
                </p>
              </div>
              <p className="text-white/75 text-xs sm:text-sm font-medium">
                {slide.description}
              </p>
              <Link
                href={slide.ctaLink}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-purple-700 font-black text-sm hover:bg-yellow-400 hover:text-purple-900 transition shadow-lg transform active:scale-95"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right decorative percent & image */}
            <div className="relative hidden sm:flex items-center justify-center w-48 h-48 lg:w-64 lg:h-64 shrink-0">
              {/* Big % decoration */}
              <div className="absolute -top-4 -right-4 text-yellow-400/20 font-black text-[120px] lg:text-[160px] leading-none select-none">
                %
              </div>
              <img
                src={slide.image}
                alt={slide.title}
                className="relative z-10 w-40 h-40 lg:w-56 lg:h-56 object-contain drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows */}
      <button
        onClick={() => setCurrentSlide((p) => (p === 0 ? BANNERS.length - 1 : p - 1))}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white hover:text-purple-700 transition flex items-center justify-center opacity-0 group-hover:opacity-100"
        aria-label="Previous"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => setCurrentSlide((p) => (p + 1) % BANNERS.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white hover:text-purple-700 transition flex items-center justify-center opacity-0 group-hover:opacity-100"
        aria-label="Next"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all ${
              currentSlide === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
