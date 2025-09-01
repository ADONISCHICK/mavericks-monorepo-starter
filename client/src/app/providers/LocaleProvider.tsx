// client/src/app/providers/LocaleProvider.tsx
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, Locale } from "@/i18n/messages";
import {
  COUNTRY_CURRENCY,
  DEFAULT_COUNTRY,
  DEFAULT_CURRENCY,
  CountryCode,
} from "@/lib/intl";

type LocaleState = {
  locale: Locale;
  country: CountryCode;
  currency: string;
  setLocale: (l: Locale) => void;
  setCountry: (c: CountryCode) => void;
};

const LocaleCtx = createContext<LocaleState | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY);

  // Initialize from URL params or localStorage or navigator
  useEffect(() => {
    const url = new URL(window.location.href);
    const pLang = url.searchParams.get("lang") as Locale | null;
    const pCountry = url.searchParams.get("country") as CountryCode | null;

    const lsLang = localStorage.getItem("locale") as Locale | null;
    const lsCountry = localStorage.getItem("country") as CountryCode | null;

    const navLang = (navigator.language || "en-GB") as Locale;

    const initialLocale = pLang || lsLang || (navLang as Locale) || DEFAULT_LOCALE;
    const initialCountry = pCountry || lsCountry || DEFAULT_COUNTRY;

    // Commit
    setLocale(initialLocale);
    setCountry(initialCountry);

    // Keep URL in sync (without reload)
    const next = new URL(window.location.href);
    next.searchParams.set("lang", initialLocale);
    next.searchParams.set("country", initialCountry);
    window.history.replaceState({}, "", next.toString());
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  useEffect(() => {
    localStorage.setItem("country", country);
  }, [country]);

  const currency = useMemo(
    () => COUNTRY_CURRENCY[country]?.currency || DEFAULT_CURRENCY,
    [country]
  );

  const value: LocaleState = {
    locale,
    country,
    currency,
    setLocale: (l) => {
      setLocale(l);
      const next = new URL(window.location.href);
      next.searchParams.set("lang", l);
      window.history.replaceState({}, "", next.toString());
    },
    setCountry: (c) => {
      setCountry(c);
      const next = new URL(window.location.href);
      next.searchParams.set("country", c);
      window.history.replaceState({}, "", next.toString());
    },
  };

  return <LocaleCtx.Provider value={value}>{children}</LocaleCtx.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleCtx);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
