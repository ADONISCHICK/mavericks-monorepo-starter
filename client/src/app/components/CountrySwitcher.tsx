// client/src/app/components/CountrySwitcher.tsx
"use client";

import { SUPPORTED_LOCALES, MESSAGES, DEFAULT_LOCALE, Locale, t } from "@/i18n/messages";
import { COUNTRY_CURRENCY, CountryCode } from "@/lib/intl";
import { useLocale } from "@/app/providers/LocaleProvider";

function flag(code: string) {
  // crude emoji flag (works for many ISO-2 country codes)
  if (code.length !== 2) return "🏳️";
  const A = 0x1f1e6;
  return String.fromCodePoint(A + (code.charCodeAt(0) - 65)) +
         String.fromCodePoint(A + (code.charCodeAt(1) - 65));
}

export default function CountrySwitcher() {
  const { locale, setLocale, country, setCountry, currency } = useLocale();

  const countries = Object.entries(COUNTRY_CURRENCY).map(([code, meta]) => ({
    code: code as CountryCode,
    label: `${flag(code)} ${meta.name} (${meta.currency})`,
  }));

  const languages = SUPPORTED_LOCALES.map((code) => ({
    code: code as Locale,
    label: code,
  }));

  return (
    <div className="switchers">
      <label>
        <span>{t(locale, "countries")}:</span>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value as CountryCode)}
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>{t(locale, "languages")}:</span>
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </label>

      <span className="currency-pill">{t(locale, "currency")}: {currency}</span>

      <style jsx>{`
        .switchers {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }
        label {
          display: inline-flex;
          gap: 6px;
          align-items: center;
          background: rgba(0,0,0,0.2);
          padding: 6px 8px;
          border-radius: 10px;
        }
        select {
          background: #0b1220;
          color: #cfe3ff;
          border: 1px solid #1f2937;
          padding: 4px 6px;
          border-radius: 8px;
        }
        .currency-pill {
          background: #0b1220;
          color: #a3dfff;
          border: 1px solid #1f2937;
          padding: 6px 10px;
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}
