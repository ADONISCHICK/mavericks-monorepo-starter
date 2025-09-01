"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../providers/CartProvider";
import { useEffect, useState } from "react";

export default function CartPage(){
  const { items, remove, clear, total } = useCart();
  const [authed,setAuthed] = useState(false);
  useEffect(()=>{ setAuthed(!!localStorage.getItem("token")); },[]);

  return (
    <div className="panel">
      <h2 style={{marginTop:0}}>Your Cart</h2>
      {items.length===0 ? (
        <div>Cart is empty. <Link href="/shop">Go shopping</Link>.</div>
      ) : (
        <>
          <div style={{display:"grid",gap:10}}>
            {items.map(it=>(
              <div key={it.id} style={{display:"grid",gridTemplateColumns:"80px 1fr auto",gap:12,alignItems:"center",borderBottom:"1px solid #1f2a44",paddingBottom:10}}>
                <div style={{position:"relative",width:80,height:60}}>
                  <Image src={it.image || "https://picsum.photos/seed/c/600/400"} alt={it.title} fill sizes="80px" style={{objectFit:"cover"}}/>
                </div>
                <div>
                  <div style={{fontWeight:600}}>{it.title}</div>
                  <div className="price">{it.currency||"USD"} {(it.price*it.qty).toFixed(2)} <span style={{opacity:.6}}>({it.qty} pcs)</span></div>
                </div>
                <button className="btn alt" onClick={()=>remove(it.id)}>Remove</button>
              </div>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:16}}>
            <button className="btn alt" onClick={clear}>Clear</button>
            <div style={{fontSize:18}}>Total: <span className="price">{items[0]?.currency||"USD"} {total.toFixed(2)}</span></div>
          </div>
          <div style={{marginTop:16,display:"flex",gap:10,justifyContent:"flex-end"}}>
            {!authed ? (
              <Link href="/auth/signin" className="btn">Sign in to Checkout</Link>
            ) : (
              <button className="btn">Proceed to Payment</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
