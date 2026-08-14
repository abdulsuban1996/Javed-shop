'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Check, 
  Store, 
  Mail, 
  Phone, 
  MapPin, 
  Share2, 
  Megaphone, 
  Save
} from 'lucide-react';
import ImageUploader from '../../../components/ui/ImageUploader';
import { useSettings } from '../../../context/SettingsContext';

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useSettings();

  // Store Identity
  const [storeName, setStoreName] = useState(settings.storeName || 'JAVED SHOP');
  const [tagline, setTagline] = useState(settings.tagline || 'MORE THAN JUST A SHOP');
  const [logos, setLogos] = useState<string[]>(settings.logo ? [settings.logo] : ['/javed-shop-logo.png']);
  const [favicons, setFavicons] = useState<string[]>(settings.favicon ? [settings.favicon] : ['/javed-shop-icon.png']);

  // Contact Info
  const [email, setEmail] = useState(settings.email || 'support@javedshop.com');
  const [hotline, setHotline] = useState(settings.hotline || '+880 1700-000000');
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp || '+880 1700-000000');
  const [address, setAddress] = useState(settings.address || 'Dhaka, Bangladesh');

  // Social Links
  const [facebookUrl, setFacebookUrl] = useState(settings.facebookUrl || 'https://facebook.com/javedshopbd');
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl || 'https://instagram.com/javedshopbd');
  const [youtubeUrl, setYoutubeUrl] = useState(settings.youtubeUrl || 'https://youtube.com/@javedshopbd');

  // Top Announcement Ticker
  const [clearanceNotice, setClearanceNotice] = useState(settings.clearanceNotice || 'Smart Products. Better Everyday. | Nationwide Delivery');

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    updateSettings({
      storeName,
      tagline,
      logo: logos[0] || '/javed-shop-logo.png',
      favicon: favicons[0] || '/javed-shop-icon.png',
      email,
      hotline,
      whatsapp,
      address,
      facebookUrl,
      instagramUrl,
      youtubeUrl,
      clearanceNotice,
    });

    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#E5E7EB] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1220] flex items-center gap-2">
            <Settings className="w-7 h-7 text-[#2563EB]" />
            <span>Site Identity & Settings</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Manage Logo, Favicon, Contact Info, Social Links & Announcements</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs hover:bg-[#1D4ED8] transition shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save & Publish Live'}</span>
        </button>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm"
        >
          <Check className="w-5 h-5 text-[#25C55E]" />
          <span>Website updated live across all pages & browser sessions!</span>
        </motion.div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Store Identity & Branding */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm border border-[#E5E7EB]">
          <h2 className="text-base font-extrabold text-[#0B1220] uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <Store className="w-5 h-5 text-[#2563EB]" />
            <span>Store Identity & Branding</span>
          </h2>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Store Name *</label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-[#F8FAFC] text-[#0B1220] rounded-xl p-3 border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:bg-white transition text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Store Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-[#F8FAFC] text-[#0B1220] rounded-xl p-3 border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:bg-white transition text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Logo Upload System */}
            <div className="pt-2">
              <ImageUploader
                value={logos}
                onChange={setLogos}
                multiple={false}
                label="Upload Store Brand Logo"
              />
            </div>

            {/* Favicon Upload System */}
            <div className="pt-2">
              <ImageUploader
                value={favicons}
                onChange={setFavicons}
                multiple={false}
                label="Upload Website Favicon Icon"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Info & Support */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm border border-[#E5E7EB]">
          <h2 className="text-base font-extrabold text-[#0B1220] uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <Phone className="w-5 h-5 text-[#25C55E]" />
            <span>Customer Support & Contact Info</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Mail className="w-4 h-4 text-[#2563EB]" />
                <span>Support Email Address</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="support@javedshop.com"
                className="w-full bg-[#F8FAFC] text-[#0B1220] rounded-xl p-3 border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:bg-white transition text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Phone className="w-4 h-4 text-[#2563EB]" />
                <span>Hotline Phone Number</span>
              </label>
              <input
                type="text"
                required
                value={hotline}
                onChange={(e) => setHotline(e.target.value)}
                placeholder="+880 1700-000000"
                className="w-full bg-[#F8FAFC] text-[#0B1220] rounded-xl p-3 border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:bg-white transition text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Phone className="w-4 h-4 text-[#25C55E]" />
                <span>WhatsApp Business Number</span>
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+880 1700-000000"
                className="w-full bg-[#F8FAFC] text-[#0B1220] rounded-xl p-3 border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:bg-white transition text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Store Physical Address</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Dhaka, Bangladesh"
                className="w-full bg-[#F8FAFC] text-[#0B1220] rounded-xl p-3 border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:bg-white transition text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Social Media Links */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm border border-[#E5E7EB]">
          <h2 className="text-base font-extrabold text-[#0B1220] uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <Share2 className="w-5 h-5 text-[#2563EB]" />
            <span>Social Media Handles</span>
          </h2>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Facebook Page URL</label>
              <input
                type="url"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                placeholder="https://facebook.com/javedshopbd"
                className="w-full bg-[#F8FAFC] text-[#0B1220] rounded-xl p-3 border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:bg-white transition text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Instagram Profile URL</label>
                <input
                  type="url"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  placeholder="https://instagram.com/javedshopbd"
                  className="w-full bg-[#F8FAFC] text-[#0B1220] rounded-xl p-3 border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:bg-white transition text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">YouTube Channel URL</label>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/@javedshopbd"
                  className="w-full bg-[#F8FAFC] text-[#0B1220] rounded-xl p-3 border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:bg-white transition text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Storefront Top Announcement Ticker */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm border border-[#E5E7EB]">
          <h2 className="text-base font-extrabold text-[#0B1220] uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <Megaphone className="w-5 h-5 text-[#2563EB]" />
            <span>Storefront Top Announcement Bar</span>
          </h2>

          <div className="space-y-1 text-xs">
            <label className="font-bold text-slate-700">Header Ticker Notice Text</label>
            <input
              type="text"
              value={clearanceNotice}
              onChange={(e) => setClearanceNotice(e.target.value)}
              placeholder="e.g. Smart Products. Better Everyday. | Nationwide Delivery"
              className="w-full bg-[#F8FAFC] text-[#0B1220] rounded-xl p-3 border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB] focus:bg-white transition text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Submit Save Button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full py-4 rounded-xl bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1D4ED8] transition shadow-sm"
        >
          {saving ? 'Publishing Live Updates...' : 'Save & Publish Live Updates'}
        </button>

      </form>

    </div>
  );
}
