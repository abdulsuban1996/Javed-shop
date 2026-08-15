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
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  insideDhakaFee: number;
  outsideDhakaFee: number;
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
  bkashNumber: '01700-000000',
  nagadNumber: '01800-000000',
  rocketNumber: '01900-000000',
  insideDhakaFee: 60,
  outsideDhakaFee: 120,
};

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_SETTINGS,
  updateSettings: async () => {},
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
            storeName: data.store_name ?? DEFAULT_SETTINGS.storeName,
            tagline: data.tagline ?? DEFAULT_SETTINGS.tagline,
            logo: data.logo || DEFAULT_SETTINGS.logo,
            favicon: data.favicon || DEFAULT_SETTINGS.favicon,
            email: data.email ?? DEFAULT_SETTINGS.email,
            hotline: data.hotline ?? DEFAULT_SETTINGS.hotline,
            whatsapp: data.whatsapp ?? DEFAULT_SETTINGS.whatsapp,
            address: data.address ?? DEFAULT_SETTINGS.address,
            facebookUrl: data.facebook_url ?? DEFAULT_SETTINGS.facebookUrl,
            instagramUrl: data.instagram_url ?? DEFAULT_SETTINGS.instagramUrl,
            youtubeUrl: data.youtube_url ?? DEFAULT_SETTINGS.youtubeUrl,
            clearanceNotice: data.clearance_notice ?? DEFAULT_SETTINGS.clearanceNotice,
            bkashNumber: data.bkash_number ?? DEFAULT_SETTINGS.bkashNumber,
            nagadNumber: data.nagad_number ?? DEFAULT_SETTINGS.nagadNumber,
            rocketNumber: data.rocket_number ?? DEFAULT_SETTINGS.rocketNumber,
            insideDhakaFee: data.inside_dhaka_fee != null ? Number(data.inside_dhaka_fee) : DEFAULT_SETTINGS.insideDhakaFee,
            outsideDhakaFee: data.outside_dhaka_fee != null ? Number(data.outside_dhaka_fee) : DEFAULT_SETTINGS.outsideDhakaFee,
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

    // 3. Supabase Realtime channel for site_settings
    let channel: any = null;
    try {
      const supabase = createClient();
      channel = supabase
        .channel('realtime:site_settings')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'site_settings' },
          (payload: any) => {
            if (payload.new) {
              const d = payload.new;
              setSettings((prev) => {
                const updated: SiteSettings = {
                  ...prev,
                  storeName: d.store_name ?? prev.storeName,
                  tagline: d.tagline ?? prev.tagline,
                  logo: d.logo || prev.logo,
                  favicon: d.favicon || prev.favicon,
                  email: d.email ?? prev.email,
                  hotline: d.hotline ?? prev.hotline,
                  whatsapp: d.whatsapp ?? prev.whatsapp,
                  address: d.address ?? prev.address,
                  facebookUrl: d.facebook_url ?? prev.facebookUrl,
                  instagramUrl: d.instagram_url ?? prev.instagramUrl,
                  youtubeUrl: d.youtube_url ?? prev.youtubeUrl,
                  clearanceNotice: d.clearance_notice ?? prev.clearanceNotice,
                  bkashNumber: d.bkash_number ?? prev.bkashNumber,
                  nagadNumber: d.nagad_number ?? prev.nagadNumber,
                  rocketNumber: d.rocket_number ?? prev.rocketNumber,
                  insideDhakaFee: d.inside_dhaka_fee != null ? Number(d.inside_dhaka_fee) : prev.insideDhakaFee,
                  outsideDhakaFee: d.outside_dhaka_fee != null ? Number(d.outside_dhaka_fee) : prev.outsideDhakaFee,
                };
                if (typeof window !== 'undefined') {
                  localStorage.setItem('javed_shop_settings', JSON.stringify(updated));
                }
                return updated;
              });
            }
          }
        )
        .subscribe();
    } catch (e) {}

    // 4. Storage event listeners
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
        if (channel) {
          channel.unsubscribe();
        }
      };
    }
  }, []);

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    let latest: SiteSettings = DEFAULT_SETTINGS;
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (!updated.logo || updated.logo.trim() === '') {
        updated.logo = '/javed-shop-logo.png';
      }
      latest = updated;
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
        store_name: latest.storeName,
        tagline: latest.tagline,
        logo: latest.logo,
        favicon: latest.favicon,
        email: latest.email,
        hotline: latest.hotline,
        whatsapp: latest.whatsapp,
        address: latest.address,
        facebook_url: latest.facebookUrl,
        instagram_url: latest.instagramUrl,
        youtube_url: latest.youtubeUrl,
        clearance_notice: latest.clearanceNotice,
        bkash_number: latest.bkashNumber,
        nagad_number: latest.nagadNumber,
        rocket_number: latest.rocketNumber,
        inside_dhaka_fee: latest.insideDhakaFee,
        outside_dhaka_fee: latest.outsideDhakaFee,
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
