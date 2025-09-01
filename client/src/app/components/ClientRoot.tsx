// client/src/app/components/ClientRoot.tsx
"use client";

import { LocaleProvider, useLocale } from "@/app/providers/LocaleProvider";
import CountrySwitcher from "./CountrySwitcher";
import Link from "next/link";
import { t } from "@/i18n/messages";

function TopBar() {
  const { locale } = useLocale();
  return (
    <header className="topbar">
      <div className="left">
        <Link href="/" className="brand">Mavericks</Link>
        <span className="byline">— {t(locale, "subtitle")}</span>
      </div>
      <CountrySwitcher />
      <style jsx>{`
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 10px 16px;
          border-bottom: 1px solid #14203a;
          position: sticky;
          top: 0;
          backdrop-filter: blur(6px);
          z-index: 10;
        }
        .brand {
          font-weight: 800;
          letter-spacing: .4px;
        }
        .byline { opacity: .7; margin-left: 8px; font-size: .9rem; }
        .left { display: flex; align-items: center; }
      `}</style>
    </header>
  );
}

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <TopBar />
      <main>{children}</main>
    </LocaleProvider>
  );
}
