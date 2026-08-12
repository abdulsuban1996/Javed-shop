'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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
  tagline: 'China Gadget Store in Bangladesh',
  logo: '',
  favicon: '',
  email: 'support@javedshop.com',
  hotline: '+880 1700-000000',
  whatsapp: '+880 1700-000000',
  address: 'Dhaka, Bangladesh',
  facebookUrl: 'https://facebook.com/javedshopbd',
  instagramUrl: 'https://instagram.com/javedshopbd',
  youtubeUrl: 'https://youtube.com/@javedshopbd',
  clearanceNotice: 'Mega Clearance Up To 60% Off!',
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
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('javed_shop_settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSettings((prev) => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error('Error parsing settings:', e);
        }
      }

      const handleStorageChange = () => {
        const updated = localStorage.getItem('javed_shop_settings');
        if (updated) {
          try {
            setSettings((prev) => ({ ...prev, ...JSON.parse(updated) }));
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

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (typeof window !== 'undefined') {
        localStorage.setItem('javed_shop_settings', JSON.stringify(updated));
        window.dispatchEvent(new Event('javed_settings_updated'));
      }
      return updated;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
