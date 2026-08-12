import React from 'react';
import CategorySidebar from '../components/layout/CategorySidebar';
import HeroSlider from '../components/home/HeroSlider';
import TrustBadges from '../components/home/TrustBadges';
import DealsOfTheDay from '../components/home/DealsOfTheDay';
import DualBanner from '../components/home/DualBanner';
import HomeFeaturedGrid from '../components/home/HomeFeaturedGrid';
import { Product } from '../components/product/ProductCard';
import { createClient } from '../lib/supabase/client';

async function getProducts(): Promise<Product[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      throw error;
    }
    return data as Product[];
  } catch (e) {
    return [
      {
        id: 'p1',
        title: 'Aultima TWS Bluetooth 5.3 Earbuds with LED Display',
        slug: 'aultima-tws-bluetooth-53-earbuds',
        price: 2450,
        discount_price: 1490,
        images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop'],
        rating: 4.9,
        reviews_count: 42,
        is_deal_of_day: true,
        is_flash_sale: true,
      },
      {
        id: 'p2',
        title: 'Ultra Ultra Smartwatch 8 Series with HD Curved Screen',
        slug: 'ultra-smartwatch-8-series-hd-curved-screen',
        price: 3800,
        discount_price: 2490,
        images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop'],
        rating: 4.8,
        reviews_count: 89,
        is_deal_of_day: true,
        is_flash_sale: false,
      },
      {
        id: 'p3',
        title: 'MagSafe 10,000mAh Magnetic Wireless Powerbank 20W PD',
        slug: 'magsafe-10000mah-magnetic-powerbank',
        price: 2800,
        discount_price: 1850,
        images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop'],
        rating: 4.7,
        reviews_count: 28,
        is_deal_of_day: false,
        is_flash_sale: true,
      },
      {
        id: 'p4',
        title: 'JBL Style Portable Waterproof RGB Bluetooth Speaker',
        slug: 'portable-waterproof-rgb-bluetooth-speaker',
        price: 3200,
        discount_price: 2150,
        images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop'],
        rating: 4.9,
        reviews_count: 64,
        is_deal_of_day: true,
        is_flash_sale: true,
      },
      {
        id: 'p5',
        title: 'GaN 65W Triple Port Ultra-Fast USB-C Charger Adapter',
        slug: 'gan-65w-triple-port-fast-charger',
        price: 2600,
        discount_price: 1690,
        images: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop'],
        rating: 4.8,
        reviews_count: 34,
        is_deal_of_day: true,
        is_flash_sale: false,
      },
      {
        id: 'p6',
        title: 'Mechanical RGB Gaming Keyboard (Blue Switch)',
        slug: 'mechanical-rgb-gaming-keyboard-blue-switch',
        price: 3990,
        discount_price: 2750,
        images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop'],
        rating: 4.9,
        reviews_count: 53,
        is_deal_of_day: false,
        is_flash_sale: true,
      },
    ];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Layout Grid: Sidebar + Hero Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="hidden lg:block lg:col-span-3">
          <CategorySidebar />
        </div>
        <div className="lg:col-span-9">
          <HeroSlider />
        </div>
      </div>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Deals of the Day Section */}
      <DealsOfTheDay products={products} />

      {/* Dual Banner Row */}
      <DualBanner />

      {/* Featured Products Animated Grid */}
      <HomeFeaturedGrid products={products} />

    </div>
  );
}
