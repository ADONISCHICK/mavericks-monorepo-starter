"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const params = useMemo(()=>new URLSearchParams(sp),[sp.toString()]);

  const set = (k:string,v:string) => {
    const next = new URLSearchParams(params);
    next.set(k,v);
    router.push(`${pathname}?${next.toString()}`);
  };

  return (
    <header className="header">
      <div className="container" style={{display:"flex",gap:16,alignItems:"center"}}>
        <Link href="/" className="brand">
          <Image src="/mavericks.png" alt="Mavericks" width={36} height={36} />
          <span>Mavericks</span>
        </Link>

        <nav className="nav">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/feedback">Feedback</Link>
        </nav>

        <div className="spacer" />

        <div className="selector">
          <select value={sp.get("country")||"UK"} onChange={e=>set("country",e.target.value)}>
            {["UK","US","DE","FR","ZA","NG","KE","IN","JP","SG"].map(c=><option key={c}>{c}</option>)}
          </select>
          <select value={sp.get("lang")||"en"} onChange={e=>set("lang",e.target.value)}>
            {["en","fr","de","es","pt","sw","ar","hi","zh","ja"].map(l=><option key={l}>{l.toUpperCase()}</option>)}
          </select>
          <Link href="/cart" className="btn alt">Cart</Link>
          <Link href="/auth/signin" className="btn">Sign In</Link>
        </div>
      </div>
    </header>
  );
}
