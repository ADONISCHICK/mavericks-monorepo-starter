"use client";
import { useLang } from "./Lang";

export default function LangSwitch(){
  const { lang, setLang } = useLang();
  return (
    <select
      aria-label="Language"
      value={lang}
      onChange={(e)=>setLang(e.target.value as any)}
      style={{ background:"#0f0f16", color:"#e8e8ea", border:"1px solid #2a2a33", borderRadius:10, padding:"6px 8px", marginRight:10 }}
    >
      <option value="en">EN</option>
      <option value="fr">FR</option>
      <option value="es">ES</option>
      <option value="ar">AR</option>
      <option value="zh">中文</option>
      <option value="pt">PT</option>
    </select>
  );
}
