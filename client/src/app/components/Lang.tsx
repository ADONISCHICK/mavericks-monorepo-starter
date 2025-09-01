"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "fr" | "es" | "ar" | "zh" | "pt";
const LangCtx = createContext<{ lang: Lang; setLang: (l:Lang)=>void }>({ lang: "en", setLang: ()=>{} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("mavs_lang")) as Lang | null;
    if (saved) setLang(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("mavs_lang", lang);
    // Set dir for RTL languages
    if (typeof document !== "undefined") document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}
export function useLang(){ return useContext(LangCtx); }
