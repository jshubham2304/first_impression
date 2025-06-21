'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSiteSettings } from '@/services/configuration-service';
import type { SiteSettings } from '@/lib/types';

const allPossibleLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Paints" },
  { href: "/services", label: "Services" },
  { href: "/visualizer", label: "Visualizer" },
  { href: "/request-estimation", label: "Get Estimate" },
];

type SiteSettingsContextType = {
  settings: SiteSettings | null;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>;
  isLoading: boolean;
  allPossibleLinks: typeof allPossibleLinks;
};

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const siteSettings = await getSiteSettings();
        setSettings(siteSettings);
      } catch (error) {
        console.error("Failed to fetch site settings", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, setSettings, isLoading, allPossibleLinks }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
