"use client";
import Image from "next/image";
import Link from "next/link";

export type Product = {
  id:string; title:string; price:number; currency?:string;
  images?:string[]; category?:string;
};

export default function ProductCard({p}:{p:Product}){
  return (
    <Link className="card" href={`/product/${p.id}`} prefetch>
      <div style={{position:"relative",width:"100%",aspectRatio:"4/3"}}>
        <Image
          src={p.images?.[0] || "https://picsum.photos/seed/p/1600/1200"}
          alt={p.title}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          style={{objectFit:"cover"}}
        />
      </div>
      <div className="cardBody">
        <div className="cardTitle">{p.title}</div>
        <div className="cardMeta">{p.category || "General"}</div>
        <div className="price">{p.currency || "USD"} {p.price.toFixed(2)}</div>
      </div>
    </Link>
  );
}
