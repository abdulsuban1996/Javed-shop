import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Anek_Bangla } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import { SettingsProvider } from '../context/SettingsContext';
import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const anekBangla = Anek_Bangla({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-anek-bangla',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JAVED SHOP — More Than Just a Shop | Online Shopping in Bangladesh',
  description: 'Shop smart gadgets, electronics, accessories and lifestyle products at JAVED SHOP. Nationwide delivery, 100% genuine products, and trusted customer support.',
  keywords: ['JAVED SHOP', 'Online Shopping Bangladesh', 'Smart Gadgets', 'Electronics BD', 'Lifestyle Store BD'],
  icons: {
    icon: '/favicon.png',
    apple: '/javed-shop-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${anekBangla.variable}`}>
      <head>
        <link rel="preload" href="/javed-shop-logo.png" as="image" />
      </head>
      <body className="bg-[#F8FAFC] text-[#111827] font-sans min-h-screen flex flex-col justify-between antialiased">
        <SettingsProvider>
          <CartProvider>
            <Header />
            <Navbar />
            <main className="flex-grow bg-[#F8FAFC]">{children}</main>
            <Footer />
          </CartProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
