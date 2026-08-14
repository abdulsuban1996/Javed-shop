'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard, { Product } from '../../components/product/ProductCard';
import { Filter, ArrowUpDown, RefreshCw, SlidersHorizontal } from 'lucide-react';
import { createClient } from '../../lib/supabase/client';

const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', title: 'Aultima TWS Bluetooth 5.3 Earbuds with LED Display', slug: 'aultima-tws-bluetooth-53-earbuds', price: 2450, discount_price: 1490, images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop'], rating: 4.9, reviews_count: 42, is_deal_of_day: true, is_flash_sale: true },
  { id: 'p2', title: 'Ultra Smartwatch 8 Series with HD Curved Screen', slug: 'ultra-smartwatch-8-series-hd-curved-screen', price: 3800, discount_price: 2490, images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop'], rating: 4.8, reviews_count: 89, is_deal_of_day: true, is_flash_sale: false },
  { id: 'p3', title: 'MagSafe 10,000mAh Magnetic Wireless Powerbank 20W PD', slug: 'magsafe-10000mah-magnetic-powerbank', price: 2800, discount_price: 1850, images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop'], rating: 4.7, reviews_count: 28, is_deal_of_day: false, is_flash_sale: true },
  { id: 'p4', title: 'JBL Style Portable Waterproof RGB Bluetooth Speaker', slug: 'portable-waterproof-rgb-bluetooth-speaker', price: 3200, discount_price: 2150, images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop'], rating: 4.9, reviews_count: 64, is_deal_of_day: true, is_flash_sale: true },
  { id: 'p5', title: 'GaN 65W Triple Port Ultra-Fast USB-C Charger Adapter', slug: 'gan-65w-triple-port-fast-charger', price: 2600, discount_price: 1690, images: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop'], rating: 4.8, reviews_count: 34, is_deal_of_day: true, is_flash_sale: false },
  { id: 'p6', title: 'Mechanical RGB Gaming Keyboard (Blue Switch)', slug: 'mechanical-rgb-gaming-keyboard-blue-switch', price: 3990, discount_price: 2750, images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop'], rating: 4.9, reviews_count: 53, is_deal_of_day: false, is_flash_sale: true },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';
  const dealParam = searchParams.get('deal') === 'true';
  const flashParam = searchParams.get('flash') === 'true';

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('products').select('*');
        if (!error && data && data.length > 0) setProducts(data as Product[]);
      } catch (e) {}
    }
    fetchProducts();
  }, []);

  let filtered = products.filter((p) => {
    const activePrice = p.discount_price ?? p.price;
    if (activePrice > maxPrice) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (dealParam && !p.is_deal_of_day && !p.discount_price) return false;
    if (flashParam && !p.is_flash_sale) return false;
    return true;
  });

  if (sortBy === 'price-low') filtered.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
  else if (sortBy === 'price-high') filtered.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
  else if (sortBy === 'rating') filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const pageTitle = search ? `Results for "${search}"` : dealParam ? 'Deals of the Day' : flashParam ? 'Flash Sale' : 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">{pageTitle}</h1>
        <p className="text-xs text-slate-500 mt-1">Showing {filtered.length} China imported gadgets available in Bangladesh</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Filter Sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm sticky top-24">
            {/* Sidebar header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-purple-600 text-white">
              <Filter className="w-4 h-4" />
              <span className="font-bold text-sm">Filter Products</span>
            </div>

            <div className="p-4 space-y-5">
              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex justify-between">
                  <span>Max Price</span>
                  <span className="text-purple-600 font-extrabold">৳{maxPrice.toLocaleString()}</span>
                </label>
                <input
                  type="range" min="500" max="5000" step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>৳500</span><span>৳5,000</span>
                </div>
              </div>

              {/* Offer Type */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700">Offer Type</h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-purple-600">
                    <input type="checkbox" defaultChecked={dealParam} className="rounded accent-purple-600" />
                    <span>Deals of the Day</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-purple-600">
                    <input type="checkbox" defaultChecked={flashParam} className="rounded accent-purple-600" />
                    <span>Flash Sale</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-9 space-y-4">
          {/* Sort Bar */}
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm">
            <div className="flex items-center gap-1.5 text-slate-500">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Found <strong className="text-slate-800">{filtered.length}</strong> items</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-slate-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-white text-slate-800 rounded-lg px-2.5 py-1.5 border border-slate-200 focus:outline-none focus:border-purple-500 text-xs"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-purple-500 mx-auto" />
              <p className="font-bold text-slate-800">No products found.</p>
              <p className="text-xs text-slate-500">Try adjusting the price range or clearing search keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <RefreshCw className="w-8 h-8 text-purple-500 mx-auto animate-spin" />
        <p className="mt-2 text-sm font-bold text-slate-700">Loading Catalog...</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
