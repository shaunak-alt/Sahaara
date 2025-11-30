"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { SupportedLanguage } from "../../lib/i18n/translations";
import { DEFAULT_LANGUAGE } from "../../lib/i18n/translations";

const STORAGE_KEY = "sahaara_language";

type LanguageContextValue = {
  locale: SupportedLanguage;
  setLocale: (locale: SupportedLanguage) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

type ProviderProps = {
  children: React.ReactNode;
};

export function LanguageProvider({ children }: ProviderProps) {
  const [locale, setLocale] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
    if (stored && isSupportedLanguage(stored)) {
      setLocale(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => ({
    locale,
    setLocale
  }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

function isSupportedLanguage(value: string): value is SupportedLanguage {
  return ["en", "hi", "mr"].includes(value);
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
