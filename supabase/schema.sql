-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  role TEXT DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon_name TEXT,
  image_url TEXT,
  item_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  discount_price NUMERIC(10, 2),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  stock INT DEFAULT 50,
  images TEXT[] DEFAULT '{}',
  rating NUMERIC(3, 2) DEFAULT 4.8,
  reviews_count INT DEFAULT 12,
  is_featured BOOLEAN DEFAULT false,
  is_deal_of_day BOOLEAN DEFAULT false,
  is_flash_sale BOOLEAN DEFAULT false,
  specifications JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  division TEXT,
  district TEXT,
  thana TEXT,
  subtotal NUMERIC(10, 2) NOT NULL,
  delivery_fee NUMERIC(10, 2) DEFAULT 60.00,
  total_amount NUMERIC(10, 2) NOT NULL,
  payment_method TEXT NOT NULL, -- 'bkash', 'nagad', 'rocket', 'cod'
  trx_id TEXT,
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'verified', 'failed'
  order_status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_title TEXT NOT NULL,
  product_image TEXT,
  price NUMERIC(10, 2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Setup
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public categories read" ON public.categories;
CREATE POLICY "Public categories read" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public products read" ON public.products;
CREATE POLICY "Public products read" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public products all" ON public.products;
CREATE POLICY "Public products all" ON public.products FOR ALL USING (true);

DROP POLICY IF EXISTS "Public orders insert/select" ON public.orders;
CREATE POLICY "Public orders insert/select" ON public.orders FOR ALL USING (true);

DROP POLICY IF EXISTS "Public order_items insert/select" ON public.order_items;
CREATE POLICY "Public order_items insert/select" ON public.order_items FOR ALL USING (true);

DROP POLICY IF EXISTS "Public reviews insert/select" ON public.reviews;
CREATE POLICY "Public reviews insert/select" ON public.reviews FOR ALL USING (true);

-- Insert Seed Categories
INSERT INTO public.categories (name, slug, icon_name, item_count) VALUES
('Electronics', 'electronics', 'Smartphone', 24),
('Fashion', 'fashion', 'Shirt', 18),
('Home & Kitchen', 'home-kitchen', 'Home', 15),
('Beauty & Health', 'beauty-health', 'HeartPulse', 12),
('Sports & Outdoors', 'sports-outdoors', 'Activity', 10),
('Toys & Games', 'toys-games', 'Gamepad2', 8),
('Automotive', 'automotive', 'Car', 9),
('Books & More', 'books-more', 'BookOpen', 14)
ON CONFLICT (slug) DO NOTHING;
