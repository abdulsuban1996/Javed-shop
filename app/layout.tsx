import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import { SettingsProvider } from '../context/SettingsContext';
import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const metadata: Metadata = {
  title: 'Javed Shop — China Gadget E-commerce Store in Bangladesh',
  description: 'Shop direct imported China gadgets, TWS earbuds, smartwatches, speakers, and powerbanks with Cash on Delivery & Mobile Banking nationwide.',
  keywords: ['Javed Shop', 'China Gadgets Bangladesh', 'TWS Earbuds', 'Smartwatch Bangladesh', 'bKash Shopping'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 min-h-screen flex flex-col justify-between antialiased">
        <SettingsProvider>
          <CartProvider>
            <Header />
            <Navbar />
            <main className="flex-grow bg-white">{children}</main>
            <Footer />
          </CartProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
