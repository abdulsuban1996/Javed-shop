# Product Requirements Document (PRD)
## Javed Shop — China Gadget E-commerce Website

---

## 1. Project Overview

**Client:** Javed Shop
**Business Type:** China theke import kora bibinno gadget item (electronics, accessories, smart devices) er online e-commerce store
**Reference Design:** Uploaded screenshot (MegaStore theme) — purple/violet color scheme, category sidebar, hero banner, deals section

**Goal:** Ekta full-functional, professional dekhte, mobile-responsive e-commerce website banano jekhane customer ra product browse, order, ebong payment korte parbe. Admin side theke product, order, ebong inventory manage kora jabe.

---

## 2. Target Audience

- Bangladesh er customer ra jara affordable price e China gadget kinte chay (smartwatch, earbuds, speaker, phone accessories, ইত্যাদি)
- Mobile-first user base (jyada shopping mobile theke hobe)

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js + Tailwind CSS |
| Backend/DB | Supabase (Auth + Postgres) |
| Image Hosting | ImageKit.io |
| Version Control | GitHub |
| Deployment | Vercel |

---

## 4. Design Reference (Screenshot theke)

- **Color theme:** Deep purple/violet primary, orange/yellow accent (discount badges, CTA highlights)
- **Layout:** Top navbar (logo, search bar, login, wishlist, cart) → Category sidebar + Hero banner (mega sale slider) → Trust badges row (Free delivery, Best deals, Easy returns, Secure payment) → Deals of the Day grid → Flash Sale + New Arrivals dual banner

---

## 5. Core Features (Public Website)

### 5.1 Homepage
- Logo + site name "Javed Shop"
- Search bar (product search)
- Top nav: Home, Shop (dropdown w/ categories), Deals, Flash Sale, Blog, Contact
- Left sidebar: All Categories list (screenshot অনুযায়ী exact):
  - Electronics
  - Fashion
  - Home & Kitchen
  - Beauty & Health
  - Sports & Outdoors
  - Toys & Games
  - Automotive
  - Books & More
  - More Categories
- Hero banner: Rotating slider (Mega Sale / offer banners)
- Trust badge strip: Free Delivery, Best Deals, Easy Returns, Secure Payment
- "Deals of the Day" section (with "View All" link): 5 product cards, each card e discount badge (-30%, -25%, ইত্যাদি), product image, product name, star rating, price
- Dual banner row (screenshot অনুযায়ী exact):
  - Left: "Flash Sale — Up to 60% Off — Limited Time Offer" + "Shop Now" button
  - Right: "New Arrivals — Check Out The Latest Products" + "Shop Now" button

### 5.2 Product Listing / Category Page
- Filter (category, price range, rating)
- Sort (low-high, high-low, newest, best selling)
- Grid/List view toggle
- Pagination or infinite scroll

### 5.3 Product Detail Page
- Multiple product images (gallery + zoom)
- Price, discount %, stock status
- Variant selection (color/size — jodi thake)
- Quantity selector
- "Add to Cart" + "Buy Now"
- Product description, specification table
- Customer reviews & rating
- Related products

### 5.4 Cart & Checkout
- Cart page (quantity edit, remove item, subtotal)
- Checkout: Name, phone, address (Division/District/Area), delivery note
- **Payment method:**
  - Manual bKash / Nagad / Rocket verification (transaction ID submit kore admin theke verify)
  - Cash on Delivery (COD)
- Order confirmation page + SMS/Email notification

### 5.5 User Account
- Register/Login (Supabase Auth)
- Order history
- Wishlist
- Profile/address management

### 5.6 Other Pages
- Blog (product review/tips content — SEO er jonno)
- Contact page (form + WhatsApp/Phone number)
- About Us

---

## 6. Admin Panel Features

- Dashboard (total orders, revenue, pending payments overview)
- Product management (Add/Edit/Delete, category assign, image upload via ImageKit)
- Category management
- Order management (status update: Pending → Confirmed → Shipped → Delivered)
- Manual payment verification screen (bKash/Nagad/Rocket transaction ID check)
- Customer list
- Flash Sale / Deals of the Day scheduler (kon product kobe deal e thakbe)
- Basic sales report/analytics

---

## 7. Non-Functional Requirements

- Fully responsive (mobile/tablet/desktop)
- Fast image loading (ImageKit optimization)
- SEO-friendly (meta tags, sitemap)
- Secure authentication & payment data handling
- PWA support (optional — future scope)

---

## 8. Future Scope (Phase 2 — ekhon include na kore future e add kora jete pare)

- Automated online payment gateway (SSLCommerz/bKash API)
- Multi-vendor support
- Live chat support
- Loyalty/reward points system

---

## 9. Development Approach

1. PRD finalize + client sign-off
2. UI design (Figma/direct code — Antigravity 2.0 diye)
3. Database schema design (Supabase)
4. Frontend development (homepage → category → product → cart → checkout)
5. Admin panel development
6. Payment verification flow integration
7. Testing (responsive + functional)
8. Deployment (Vercel) + domain setup

---

*Prepared based on client's provided reference design (MegaStore-style theme).*
