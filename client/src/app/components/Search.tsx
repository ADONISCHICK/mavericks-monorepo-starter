"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";
function useDebounce<T>(value:T, ms=250){ const [v,setV]=useState(value); useEffect(()=>{const t=setTimeout(()=>setV(value),ms); return ()=>clearTimeout(t);},[value,ms]); return v; }

export default function Search() {
  const [q,setQ] = useState("");
  const [items,setItems] = useState<{id:string;title:string;}[]>([]);
  const [open,setOpen] = useState(false);
  const dq = useDebounce(q, 250);

  useEffect(()=>{
    if (!dq) { setItems([]); setOpen(false); return; }
    fetch(`${API}/products?q=${encodeURIComponent(dq)}&limit=8`)
      .then(r=>r.json())
      .then(d=>{ setItems(Array.isArray(d.items)?d.items:[]); setOpen(true); })
      .catch(()=>{ setItems([]); setOpen(false); });
  },[dq]);

  return (
    <div style={{position:"relative"}}>
      <input
        placeholder="Search products…"
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        className="search-input"
        onFocus={()=>{ if(items.length) setOpen(true); }}
        onBlur={()=>setTimeout(()=>setOpen(false), 150)}
      />
      {open && items.length>0 && (
        <div className="search-pop">
          {items.map(it=>(
            <Link key={it.id} href={`/product/${it.id}`} className="search-row">{it.title}</Link>
          ))}
          <Link href={`/shop?q=${encodeURIComponent(q)}`} className="search-more">See all results →</Link>
        </div>
      )}
    </div>
  );
}
