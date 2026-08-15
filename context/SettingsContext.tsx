'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '../lib/supabase/client';

export interface SiteSettings {
  storeName: string;
  tagline: string;
  logo: string;
  favicon: string;
  email: string;
  hotline: string;
  whatsapp: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  clearanceNotice: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  storeName: 'JAVED SHOP',
  tagline: 'MORE THAN JUST A SHOP',
  logo: '/javed-shop-logo.png',
  favicon: '/javed-shop-icon.png',
  email: 'support@javedshop.com',
  hotline: '+880 1700-000000',
  whatsapp: '+880 1700-000000',
  address: 'Dhaka, Bangladesh',
  facebookUrl: 'https://facebook.com/javedshopbd',
  instagramUrl: 'https://instagram.com/javedshopbd',
  youtubeUrl: 'https://youtube.com/@javedshopbd',
  clearanceNotice: 'Smart Products. Better Everyday. | Nationwide Delivery',
};

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_SETTINGS,
  updateSettings: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    // 1. Initial load from local storage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('javed_shop_settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (!parsed.logo || typeof parsed.logo !== 'string' || parsed.logo.trim() === '') {
            parsed.logo = '/javed-shop-logo.png';
          }
          if (!parsed.favicon || typeof parsed.favicon !== 'string' || parsed.favicon.trim() === '') {
            parsed.favicon = '/javed-shop-icon.png';
          }
          setSettings((prev) => ({ ...prev, ...parsed }));
        } catch (e) {}
      }
    }

    // 2. Fetch live settings from Supabase
    const fetchSupabaseSettings = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 'default')
          .single();

        if (!error && data) {
          const cloudSettings: Partial<SiteSettings> = {
            storeName: data.store_name || DEFAULT_SETTINGS.storeName,
            tagline: data.tagline || DEFAULT_SETTINGS.tagline,
            logo: data.logo || DEFAULT_SETTINGS.logo,
            favicon: data.favicon || DEFAULT_SETTINGS.favicon,
            email: data.email || DEFAULT_SETTINGS.email,
            hotline: data.hotline || DEFAULT_SETTINGS.hotline,
            whatsapp: data.whatsapp || DEFAULT_SETTINGS.whatsapp,
            address: data.address || DEFAULT_SETTINGS.address,
            facebookUrl: data.facebook_url || DEFAULT_SETTINGS.facebookUrl,
            instagramUrl: data.instagram_url || DEFAULT_SETTINGS.instagramUrl,
            youtubeUrl: data.youtube_url || DEFAULT_SETTINGS.youtubeUrl,
            clearanceNotice: data.clearance_notice || DEFAULT_SETTINGS.clearanceNotice,
          };

          setSettings((prev) => {
            const merged = { ...prev, ...cloudSettings };
            if (typeof window !== 'undefined') {
              localStorage.setItem('javed_shop_settings', JSON.stringify(merged));
            }
            return merged;
          });
        }
      } catch (err) {}
    };

    fetchSupabaseSettings();

    // 3. Storage event listeners
    if (typeof window !== 'undefined') {
      const handleStorageChange = () => {
        const updated = localStorage.getItem('javed_shop_settings');
        if (updated) {
          try {
            const parsed = JSON.parse(updated);
            if (!parsed.logo || typeof parsed.logo !== 'string' || parsed.logo.trim() === '') {
              parsed.logo = '/javed-shop-logo.png';
            }
            if (!parsed.favicon || typeof parsed.favicon !== 'string' || parsed.favicon.trim() === '') {
              parsed.favicon = '/javed-shop-icon.png';
            }
            setSettings((prev) => ({ ...prev, ...parsed }));
          } catch (e) {}
        }
      };

      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('javed_settings_updated', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('javed_settings_updated', handleStorageChange);
      };
    }
  }, []);

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (!updated.logo || updated.logo.trim() === '') {
        updated.logo = '/javed-shop-logo.png';
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('javed_shop_settings', JSON.stringify(updated));
        window.dispatchEvent(new Event('javed_settings_updated'));
      }
      return updated;
    });

    // Save to Supabase
    try {
      const supabase = createClient();
      await supabase.from('site_settings').upsert({
        id: 'default',
        store_name: newSettings.storeName,
        tagline: newSettings.tagline,
        logo: newSettings.logo,
        favicon: newSettings.favicon,
        email: newSettings.email,
        hotline: newSettings.hotline,
        whatsapp: newSettings.whatsapp,
        address: newSettings.address,
        facebook_url: newSettings.facebookUrl,
        instagram_url: newSettings.instagramUrl,
        youtube_url: newSettings.youtubeUrl,
        clearance_notice: newSettings.clearanceNotice,
        updated_at: new Date().toISOString(),
      });
    } catch (e) {}
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
