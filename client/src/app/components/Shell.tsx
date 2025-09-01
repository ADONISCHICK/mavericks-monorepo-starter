"use client";

import Link from "next/link";
import Image from "next/image";
import { CartProvider, useCart } from "../cart/cart-context";
import { LangProvider } from "./Lang";
import LangSwitch from "./LangSwitch";
import Search from "./Search";

function CartIcon() {
  const { count } = useCart();
  return (
    <Link href="/cart" className="cart" aria-label="Cart">
      <span className="cart-badge">{count}</span>
      🛒
    </Link>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <LangProvider>
        <header className="nav">
          <div className="container nav-inner">
            <div className="brand">
              <Link href="/" className="brand-link">
                <span className="brand-logo">
                  <Image src="/logo-mavericks.png" alt="Mavericks" width={40} height={40} className="logo-img" />
                </span>
                <span className="brand-name">Mavericks Group</span>
              </Link>
            </div>
            <nav className="menu" style={{gap:12, display:"flex", alignItems:"center"}}>
              <Link href="/shop">Shop</Link>
              <Link href="/about">About</Link>
              <a href="#contact">Contact</a>
              <Search />
              <LangSwitch />
              <CartIcon />
            </nav>
          </div>
        </header>

        {children}

        <footer className="footer">
          <div className="container footer-inner">
            <div className="footer-left">
              <div style={{display:"grid", gap:6}}>
                <div><strong>The Bristol Office</strong>, 2nd Floor, 5 High Street, Westbury-On-Trym, Bristol, England, BS9 3BY</div>
                <div>📞 <a href="tel:+447918286078">+44 7918286078</a></div>
                <div>✉️ <a href="mailto:games@themavericksgroup.co.uk">games@themavericksgroup.co.uk</a> &nbsp;|&nbsp; <a href="mailto:admin@themavericksgroup.co.uk">admin@themavericksgroup.co.uk</a></div>
              </div>
              <div className="muted" style={{marginTop:6}}>© {new Date().getFullYear()} Mavericks Group. All rights reserved.</div>
            </div>
            <div className="footer-right" style={{display:"flex", alignItems:"center", gap:8}}>
              <span className="muted">Created by</span>
              <Image src="/logo-cloudsailors.png" alt="Cloud Sailors Lab" width={22} height={22} className="logo-img" />
              <strong>Cloud Sailors Lab</strong>
            </div>
          </div>
        </footer>
      </LangProvider>
    </CartProvider>
  );
}
