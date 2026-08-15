'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  ArrowLeft, 
  Search, 
  Zap, 
  Tag, 
  Eye, 
  X,
  RefreshCw
} from 'lucide-react';
import ImageUploader from '../../../components/ui/ImageUploader';
import { createClient } from '../../../lib/supabase/client';

export interface ProductItem {
  id: string;
  title: string;
  slug: string;
  price: number;
  discount_price?: number | null;
  stock?: number;
  images: string[];
  is_deal_of_day?: boolean;
  is_flash_sale?: boolean;
}

const INITIAL_CATALOG: ProductItem[] = [
  {
    id: 'p1',
    title: 'Aultima TWS Bluetooth 5.3 Earbuds with LED Display',
    slug: 'aultima-tws-bluetooth-53-earbuds',
    price: 2450,
    discount_price: 1490,
    stock: 45,
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop'],
    is_deal_of_day: true,
    is_flash_sale: true,
  },
  {
    id: 'p2',
    title: 'Ultra Ultra Smartwatch 8 Series with HD Curved Screen',
    slug: 'ultra-smartwatch-8-series-hd-curved-screen',
    price: 3800,
    discount_price: 2490,
    stock: 20,
    images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop'],
    is_deal_of_day: true,
    is_flash_sale: false,
  },
  {
    id: 'p3',
    title: 'MagSafe 10,000mAh Magnetic Wireless Powerbank 20W PD',
    slug: 'magsafe-10000mah-magnetic-powerbank',
    price: 2800,
    discount_price: 1850,
    stock: 35,
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop'],
    is_deal_of_day: false,
    is_flash_sale: true,
  },
  {
    id: 'p4',
    title: 'JBL Style Portable Waterproof RGB Bluetooth Speaker',
    slug: 'portable-waterproof-rgb-bluetooth-speaker',
    price: 3200,
    discount_price: 2150,
    stock: 18,
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop'],
    is_deal_of_day: true,
    is_flash_sale: true,
  },
  {
    id: 'p5',
    title: 'GaN 65W Triple Port Ultra-Fast USB-C Charger Adapter',
    slug: 'gan-65w-triple-port-fast-charger',
    price: 2600,
    discount_price: 1690,
    stock: 50,
    images: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop'],
    is_deal_of_day: true,
    is_flash_sale: false,
  },
  {
    id: 'p6',
    title: 'Mechanical RGB Gaming Keyboard (Blue Switch)',
    slug: 'mechanical-rgb-gaming-keyboard-blue-switch',
    price: 3990,
    discount_price: 2750,
    stock: 12,
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop'],
    is_deal_of_day: false,
    is_flash_sale: true,
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_CATALOG);
  const [activeTab, setActiveTab] = useState<'catalog' | 'add'>('catalog');
  const [search, setSearch] = useState('');

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [stock, setStock] = useState('30');
  const [images, setImages] = useState<string[]>([]);
  const [isDeal, setIsDeal] = useState(false);
  const [isFlash, setIsFlash] = useState(false);

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setProducts(data as ProductItem[]);
      }
    } catch (e) {
      console.error('Fetch error:', e);
    }
  }, []);

  // Fetch products from Supabase on mount and subscribe to Realtime
  useEffect(() => {
    fetchProducts();

    let channel: any = null;
    try {
      const supabase = createClient();
      channel = supabase
        .channel('realtime:admin_products')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'products' },
          () => {
            fetchProducts();
          }
        )
        .subscribe();
    } catch (e) {}

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [fetchProducts]);

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    setSaving(true);
    setStatusMsg('');

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const finalImages = images.length > 0
      ? images
      : ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop'];

    try {
      const supabase = createClient();

      if (editingId) {
        // Update existing product in Supabase
        const { error } = await supabase
          .from('products')
          .update({
            title,
            slug,
            price: parseFloat(price),
            discount_price: discountPrice ? parseFloat(discountPrice) : null,
            stock: parseInt(stock, 10),
            images: finalImages,
            is_deal_of_day: isDeal,
            is_flash_sale: isFlash,
          })
          .eq('id', editingId);

        if (error) {
          console.error('Update product error:', error);
          setStatusMsg(`Update failed: ${error.message}`);
          return;
        }

        await fetchProducts();
        setStatusMsg('Product updated successfully!');
      } else {
        // Insert new product into Supabase
        const { error } = await supabase.from('products').insert({
          title,
          slug,
          price: parseFloat(price),
          discount_price: discountPrice ? parseFloat(discountPrice) : null,
          stock: parseInt(stock, 10),
          images: finalImages,
          is_deal_of_day: isDeal,
          is_flash_sale: isFlash,
        });

        if (error) {
          console.error('Insert product error:', error);
          setStatusMsg(`Create failed: ${error.message}`);
          return;
        }

        await fetchProducts();
        setStatusMsg('New product published successfully!');
      }

      resetForm();
      setActiveTab('catalog');
    } catch (err: any) {
      console.error(err);
      setStatusMsg(`Error saving product: ${err?.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleEditClick = (p: ProductItem) => {
    setEditingId(p.id);
    setTitle(p.title);
    setPrice(p.price.toString());
    setDiscountPrice(p.discount_price ? p.discount_price.toString() : '');
    setStock(p.stock ? p.stock.toString() : '30');
    setImages(p.images || []);
    setIsDeal(!!p.is_deal_of_day);
    setIsFlash(!!p.is_flash_sale);
    setActiveTab('add');
  };

  const handleDeleteProduct = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        console.error('Delete error:', error);
        setStatusMsg(`Delete failed: ${error.message}`);
        return;
      }
      await fetchProducts();
      setStatusMsg(`Product "${title}" deleted successfully!`);
    } catch (err: any) {
      console.error(err);
      setStatusMsg(`Error deleting product: ${err?.message || 'Unknown error'}`);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setPrice('');
    setDiscountPrice('');
    setStock('30');
    setImages([]);
    setIsDeal(false);
    setIsFlash(false);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Package className="w-7 h-7 text-purple-600" />
            <span>Product Inventory Management</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Add, edit, delete & upload photos for store gadgets</p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              resetForm();
              setActiveTab('catalog');
            }}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition ${
              activeTab === 'catalog'
                ? 'bg-[#312356] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Product Catalog ({products.length})
          </button>

          <button
            onClick={() => {
              resetForm();
              setActiveTab('add');
            }}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition flex items-center gap-1.5 ${
              activeTab === 'add'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white text-purple-700 hover:bg-purple-50 border border-purple-200'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{editingId ? 'Edit Product' : 'Add New Product'}</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm"
        >
          <Check className="w-5 h-5 text-emerald-600" />
          <span>{statusMsg}</span>
        </motion.div>
      )}

      {/* VIEW 1: PRODUCT CATALOG TABLE */}
      {activeTab === 'catalog' && (
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 space-y-4">
          
          {/* Table Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="relative w-full sm:w-80 flex items-center">
              <input
                type="text"
                placeholder="Search catalog by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2 border border-slate-200 focus:outline-none focus:border-purple-600"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            </div>

            <span className="text-xs text-slate-500 font-bold">
              Total <strong className="text-slate-900">{filteredProducts.length}</strong> Products
            </span>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-extrabold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">PRODUCT</th>
                  <th className="py-3 px-3">STOCK</th>
                  <th className="py-3 px-3">PRICE</th>
                  <th className="py-3 px-3">OFFER PRICE</th>
                  <th className="py-3 px-3">OFFER BADGES</th>
                  <th className="py-3 px-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                      No products found matching keyword.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition">
                      
                      {/* Product Thumbnail & Title */}
                      <td className="py-3.5 px-3 font-bold text-slate-900 max-w-xs">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                            <Image
                              src={p.images && p.images[0] ? p.images[0] : 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop'}
                              alt={p.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="space-y-0.5">
                            <div className="line-clamp-1 font-bold text-slate-900">{p.title}</div>
                            <div className="text-[10px] text-slate-400 font-mono">/{p.slug}</div>
                          </div>
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="py-3.5 px-3 font-bold">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] ${
                          (p.stock || 0) > 10
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {p.stock || 30} in stock
                        </span>
                      </td>

                      {/* Regular Price */}
                      <td className="py-3.5 px-3 font-black text-slate-900">
                        ৳{p.price.toLocaleString()}
                      </td>

                      {/* Offer Price */}
                      <td className="py-3.5 px-3 font-black text-emerald-600">
                        {p.discount_price ? `৳${p.discount_price.toLocaleString()}` : '-'}
                      </td>

                      {/* Offer Badges */}
                      <td className="py-3.5 px-3 space-x-1">
                        {p.is_deal_of_day && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                            <Tag className="w-3 h-3" /> Deal
                          </span>
                        )}
                        {p.is_flash_sale && (
                          <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                            <Zap className="w-3 h-3" /> Flash
                          </span>
                        )}
                      </td>

                      {/* Edit & Delete Action Buttons */}
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit Button */}
                          <button
                            onClick={() => handleEditClick(p)}
                            className="p-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white transition"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.title)}
                            className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* VIEW 2: ADD / EDIT PRODUCT FORM */}
      {activeTab === 'add' && (
        <form onSubmit={handleSaveProduct} className="bg-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl shadow-slate-200/60 border border-slate-100">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Package className="w-5 h-5 text-purple-600" />
              <span>{editingId ? 'Edit Product Details' : 'Add New Product'}</span>
            </h2>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setActiveTab('catalog');
              }}
              className="text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Product Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Wireless RGB Mechanical Gaming Mouse"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 rounded-xl p-3 border border-slate-200 focus:outline-none focus:border-purple-600 focus:bg-white transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Regular Price (৳) *</label>
                <input
                  type="number"
                  required
                  placeholder="2500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 rounded-xl p-3 border border-slate-200 focus:outline-none focus:border-purple-600 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Offer Price (৳) (Optional)</label>
                <input
                  type="number"
                  placeholder="1650"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 rounded-xl p-3 border border-slate-200 focus:outline-none focus:border-purple-600 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Stock Count</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 rounded-xl p-3 border border-slate-200 focus:outline-none focus:border-purple-600 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Integrated Drag & Drop ImageKit Uploader Component */}
            <ImageUploader
              value={images}
              onChange={setImages}
              multiple={true}
              label="Upload Product Photos (ImageKit Direct Cloud)"
            />

            {/* Offer Checkboxes */}
            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={isDeal}
                  onChange={(e) => setIsDeal(e.target.checked)}
                  className="rounded accent-purple-600 w-4 h-4"
                />
                <span>Set as Deal of the Day</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={isFlash}
                  onChange={(e) => setIsFlash(e.target.checked)}
                  className="rounded accent-purple-600 w-4 h-4"
                />
                <span>Set as Flash Sale</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-sm hover:brightness-110 transition shadow-xl shadow-purple-500/25 active:scale-98"
              >
                {saving ? 'Saving...' : editingId ? 'Update Product' : 'Publish Product'}
              </button>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setActiveTab('catalog');
                }}
                className="px-6 py-4 rounded-2xl bg-slate-100 text-slate-700 font-extrabold text-sm hover:bg-slate-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

    </div>
  );
}
