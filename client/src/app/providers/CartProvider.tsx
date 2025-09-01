"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Item = { id:string; title:string; price:number; currency?:string; image?:string; qty:number };
type CartCtx = {
  items: Item[];
  add: (i: Omit<Item,'qty'>, qty?:number)=>void;
  remove: (id:string)=>void;
  clear: ()=>void;
  total: number;
}
const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({children}:{children:React.ReactNode}){
  const [items,setItems] = useState<Item[]>([]);
  useEffect(()=>{ try{ setItems(JSON.parse(localStorage.getItem("cart")||"[]")); }catch{} },[]);
  useEffect(()=>{ localStorage.setItem("cart", JSON.stringify(items)); },[items]);

  const total = useMemo(()=>items.reduce((s,i)=>s+i.price*i.qty,0),[items]);

  const api: CartCtx = {
    items,
    add: (i,qty=1)=>{
      setItems(prev=>{
        const at = prev.findIndex(p=>p.id===i.id);
        if(at>-1){ const copy=[...prev]; copy[at]={...copy[at], qty:copy[at].qty+qty}; return copy; }
        return [...prev,{...i, qty}];
      });
    },
    remove: id => setItems(prev=>prev.filter(p=>p.id!==id)),
    clear: ()=>setItems([]),
    total,
  };
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}
export const useCart = ()=> {
  const c = useContext(Ctx);
  if(!c) throw new Error("useCart must be inside CartProvider");
  return c;
};
