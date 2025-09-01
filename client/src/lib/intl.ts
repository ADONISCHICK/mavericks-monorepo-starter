// client/src/lib/intl.ts
import { Locale } from "@/i18n/messages";

export type CountryCode = keyof typeof COUNTRY_CURRENCY;

export const COUNTRY_CURRENCY = {
  // Southern Africa & neighbors
  ZA: { name: "South Africa", currency: "ZAR", locale: "en-GB" },
  ZW: { name: "Zimbabwe", currency: "ZWL", locale: "en-GB" },
  MZ: { name: "Mozambique", currency: "MZN", locale: "pt-MZ" },
  BW: { name: "Botswana", currency: "BWP", locale: "en-GB" },
  NA: { name: "Namibia", currency: "NAD", locale: "en-GB" },
  SZ: { name: "Eswatini", currency: "SZL", locale: "en-GB" },
  LS: { name: "Lesotho", currency: "LSL", locale: "st-ZA" },
  AO: { name: "Angola", currency: "AOA", locale: "pt-AO" },

  // Wider Africa
  NG: { name: "Nigeria", currency: "NGN", locale: "en-GB" },
  KE: { name: "Kenya", currency: "KES", locale: "sw-KE" },
  GH: { name: "Ghana", currency: "GHS", locale: "en-GB" },
  EG: { name: "Egypt", currency: "EGP", locale: "ar-SA" },
  ET: { name: "Ethiopia", currency: "ETB", locale: "am-ET" },

  // Middle East
  AE: { name: "United Arab Emirates", currency: "AED", locale: "ar-AE" },
  SA: { name: "Saudi Arabia", currency: "SAR", locale: "ar-SA" },
  TR: { name: "Türkiye", currency: "TRY", locale: "tr-TR" },
  QA: { name: "Qatar", currency: "QAR", locale: "ar-AE" },

  // Asia
  IN: { name: "India", currency: "INR", locale: "hi-IN" },
  BD: { name: "Bangladesh", currency: "BDT", locale: "bn-BD" },
  CN: { name: "China", currency: "CNY", locale: "zh-CN" },
  JP: { name: "Japan", currency: "JPY", locale: "ja-JP" },
  KR: { name: "South Korea", currency: "KRW", locale: "ko-KR" },
  SG: { name: "Singapore", currency: "SGD", locale: "en-GB" },

  // Europe & Americas (a few common)
  GB: { name: "United Kingdom", currency: "GBP", locale: "en-GB" },
  US: { name: "United States", currency: "USD", locale: "en-US" },
  DE: { name: "Germany", currency: "EUR", locale: "de-DE" },
  FR: { name: "France", currency: "EUR", locale: "fr-FR" },
  ES: { name: "Spain", currency: "EUR", locale: "es-ES" },
  PT: { name: "Portugal", currency: "EUR", locale: "pt-PT" },
  BR: { name: "Brazil", currency: "BRL", locale: "pt-BR" },
} as const;

export const DEFAULT_COUNTRY: CountryCode = "GB";
export const DEFAULT_CURRENCY = COUNTRY_CURRENCY[DEFAULT_COUNTRY].currency;

export function formatPrice(
  value: number,
  locale: Locale,
  currency: string
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    // Fallback if locale/currency unsupported by runtime
    return `${currency} ${value.toFixed(2)}`;
  }
}
