'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  CheckCircle2,
  Store,
  Mail,
  Phone,
  MapPin,
  Share2,
  Megaphone,
  Save,
  Image as ImageIcon,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';
import ImageUploader from '../../../components/ui/ImageUploader';
import { useSettings } from '../../../context/SettingsContext';

// ─── Reusable Field Components ──────────────────────────────────────────

function FieldLabel({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
      {icon && <span className="opacity-70">{icon}</span>}
      {children}
    </label>
  );
}

function InputField({
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
}: {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#F8FAFC] text-[#0B1220] rounded-xl px-4 py-3 border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] focus:bg-white transition text-sm placeholder:text-slate-400"
    />
  );
}

function SectionCard({
  title,
  subtitle,
  icon,
  accentColor,
  children,
  badge,
}: {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  accentColor: string;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
      <div className={`px-6 py-4 border-b border-[#F1F5F9] flex items-center gap-3 ${accentColor}`}>
        <div className="w-9 h-9 rounded-xl bg-white/80 flex items-center justify-center shadow-sm shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-sm font-extrabold text-[#0B1220] tracking-tight">{title}</h2>
            {badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/70 text-slate-500 border border-slate-200 uppercase tracking-wide">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-[11px] text-slate-500 font-medium mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="px-6 py-6">{children}</div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useSettings();

  const [storeName, setStoreName] = useState(settings.storeName || 'JAVED SHOP');
  const [tagline, setTagline] = useState(settings.tagline || 'MORE THAN JUST A SHOP');
  const [logos, setLogos] = useState<string[]>(settings.logo ? [settings.logo] : ['/javed-shop-logo.png']);
  const [favicons, setFavicons] = useState<string[]>(settings.favicon ? [settings.favicon] : ['/javed-shop-icon.png']);
  const [email, setEmail] = useState(settings.email || 'support@javedshop.com');
  const [hotline, setHotline] = useState(settings.hotline || '+880 1700-000000');
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp || '+880 1700-000000');
  const [address, setAddress] = useState(settings.address || 'Dhaka, Bangladesh');
  const [facebookUrl, setFacebookUrl] = useState(settings.facebookUrl || 'https://facebook.com/javedshopbd');
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl || 'https://instagram.com/javedshopbd');
  const [youtubeUrl, setYoutubeUrl] = useState(settings.youtubeUrl || 'https://youtube.com/@javedshopbd');
  const [clearanceNotice, setClearanceNotice] = useState(
    settings.clearanceNotice || 'Smart Products. Better Everyday. | Nationwide Delivery'
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings) {
      setStoreName(settings.storeName || 'JAVED SHOP');
      setTagline(settings.tagline || 'MORE THAN JUST A SHOP');
      setLogos([settings.logo || '/javed-shop-logo.png']);
      setFavicons([settings.favicon || '/javed-shop-icon.png']);
      setEmail(settings.email || 'support@javedshop.com');
      setHotline(settings.hotline || '+880 1700-000000');
      setWhatsapp(settings.whatsapp || '+880 1700-000000');
      setAddress(settings.address || 'Dhaka, Bangladesh');
      setFacebookUrl(settings.facebookUrl || 'https://facebook.com/javedshopbd');
      setInstagramUrl(settings.instagramUrl || 'https://instagram.com/javedshopbd');
      setYoutubeUrl(settings.youtubeUrl || 'https://youtube.com/@javedshopbd');
      setClearanceNotice(settings.clearanceNotice || 'Smart Products. Better Everyday. | Nationwide Delivery');
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await updateSettings({
      storeName, tagline,
      logo: logos[0] || '/javed-shop-logo.png',
      favicon: favicons[0] || '/javed-shop-icon.png',
      email, hotline, whatsapp, address,
      facebookUrl, instagramUrl, youtubeUrl, clearanceNotice,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-10">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0">
              <Settings className="w-5 h-5 text-[#2563EB]" />
            </div>
            <h1 className="text-xl font-extrabold text-[#0B1220] tracking-tight">Site Settings</h1>
          </div>
          <p className="text-xs text-slate-500 pl-11">
            Manage store identity, contact info, social links &amp; announcements
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white font-bold text-xs shadow-sm transition shrink-0 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving…' : 'Save & Publish'}</span>
        </button>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-800">Changes saved &amp; published!</p>
              <p className="text-[11px] text-emerald-600">Your website has been updated across all pages.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSave} className="space-y-5">

        {/* Section 1 — Store Identity */}
        <SectionCard
          title="Store Identity & Branding"
          subtitle="Store name, tagline, logo and favicon"
          icon={<Store className="w-4 h-4 text-[#2563EB]" />}
          accentColor="bg-[#EFF6FF]"
          badge="Required"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Store Name *</FieldLabel>
                <InputField value={storeName} onChange={setStoreName} placeholder="JAVED SHOP" required />
              </div>
              <div>
                <FieldLabel>Store Tagline</FieldLabel>
                <InputField value={tagline} onChange={setTagline} placeholder="MORE THAN JUST A SHOP" />
              </div>
            </div>

            <div className="border-t border-dashed border-slate-100" />

            <div>
              <FieldLabel icon={<ImageIcon className="w-3.5 h-3.5" />}>Brand Logo</FieldLabel>
              <p className="text-[11px] text-slate-400 mb-3">Horizontal PNG/SVG, transparent background, min 400×100px</p>
              <ImageUploader value={logos} onChange={setLogos} multiple={false} label="Upload Store Brand Logo" />
            </div>

            <div className="border-t border-dashed border-slate-100" />

            <div>
              <FieldLabel icon={<ImageIcon className="w-3.5 h-3.5" />}>Favicon / App Icon</FieldLabel>
              <p className="text-[11px] text-slate-400 mb-3">Square PNG/ICO, min 512×512px (browser tab &amp; PWA icon)</p>
              <ImageUploader value={favicons} onChange={setFavicons} multiple={false} label="Upload Website Favicon Icon" />
            </div>
          </div>
        </SectionCard>

        {/* Section 2 — Contact Info */}
        <SectionCard
          title="Customer Support & Contact"
          subtitle="Email, hotline, WhatsApp and store address"
          icon={<Phone className="w-4 h-4 text-[#25C55E]" />}
          accentColor="bg-[#F0FDF4]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel icon={<Mail className="w-3.5 h-3.5 text-[#2563EB]" />}>Support Email *</FieldLabel>
              <InputField type="email" value={email} onChange={setEmail} placeholder="support@javedshop.com" required />
            </div>
            <div>
              <FieldLabel icon={<Phone className="w-3.5 h-3.5 text-[#2563EB]" />}>Hotline Number *</FieldLabel>
              <InputField value={hotline} onChange={setHotline} placeholder="+880 1700-000000" required />
            </div>
            <div>
              <FieldLabel icon={<Phone className="w-3.5 h-3.5 text-[#25C55E]" />}>WhatsApp Number</FieldLabel>
              <InputField value={whatsapp} onChange={setWhatsapp} placeholder="+880 1700-000000" />
            </div>
            <div>
              <FieldLabel icon={<MapPin className="w-3.5 h-3.5 text-rose-500" />}>Store Address</FieldLabel>
              <InputField value={address} onChange={setAddress} placeholder="Dhaka, Bangladesh" />
            </div>
          </div>
        </SectionCard>

        {/* Section 3 — Social Media */}
        <SectionCard
          title="Social Media Handles"
          subtitle="Facebook, Instagram and YouTube page URLs"
          icon={<Share2 className="w-4 h-4 text-indigo-500" />}
          accentColor="bg-indigo-50"
        >
          <div className="space-y-4">
            <div>
              <FieldLabel icon={<Facebook className="w-3.5 h-3.5 text-[#1877F2]" />}>Facebook Page URL</FieldLabel>
              <InputField type="url" value={facebookUrl} onChange={setFacebookUrl} placeholder="https://facebook.com/javedshopbd" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel icon={<Instagram className="w-3.5 h-3.5 text-pink-500" />}>Instagram URL</FieldLabel>
                <InputField type="url" value={instagramUrl} onChange={setInstagramUrl} placeholder="https://instagram.com/javedshopbd" />
              </div>
              <div>
                <FieldLabel icon={<Youtube className="w-3.5 h-3.5 text-red-500" />}>YouTube Channel URL</FieldLabel>
                <InputField type="url" value={youtubeUrl} onChange={setYoutubeUrl} placeholder="https://youtube.com/@javedshopbd" />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Section 4 — Announcement Bar */}
        <SectionCard
          title="Storefront Announcement Bar"
          subtitle="Text displayed in the top header ticker strip"
          icon={<Megaphone className="w-4 h-4 text-amber-500" />}
          accentColor="bg-amber-50"
        >
          <FieldLabel>Ticker Notice Text</FieldLabel>
          <InputField
            value={clearanceNotice}
            onChange={setClearanceNotice}
            placeholder="e.g. Smart Products. Better Everyday. | Nationwide Delivery"
          />
          <p className="text-[11px] text-slate-400 mt-2">
            Use <code className="bg-slate-100 px-1 rounded text-[10px]">|</code> to separate multiple messages in the ticker.
          </p>
        </SectionCard>

        {/* Bottom Save Button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white font-bold text-sm shadow-md transition"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Publishing Live Updates…' : 'Save & Publish Live Updates'}</span>
        </button>

      </form>
    </div>
  );
}

