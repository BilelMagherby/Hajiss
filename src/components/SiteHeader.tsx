"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { cartStorageKey } from "@/lib/store";
import type { CartItem } from "@/lib/store";

const navItems = [
  { label: "الرئيسية", href: "/" },
  { label: "عن هاجس", href: "/about" },
  { label: "منتجاتنا", href: "/products" },
  { label: "جذورنا", href: "/hail" },
  { label: "تواصل معنا", href: "/contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const syncCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem(cartStorageKey) || "[]") as CartItem[];
        setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
      } catch { setCartCount(0); }
    };
    syncCart();
    window.addEventListener("storage", syncCart);
    window.addEventListener("hajiss-cart-change", syncCart);
    return () => { window.removeEventListener("storage", syncCart); window.removeEventListener("hajiss-cart-change", syncCart); };
  }, []);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="هاجس الرئيسية"><span className="brand-mark">⌁</span><span className="brand-name">HAJISS</span><span className="brand-caption">SPECIALTY COFFEE</span></Link>
      <button className="menu-toggle icon-button" aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="القائمة الرئيسية">
        {navItems.map((item) => <Link key={item.href} className={pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)) ? "active" : ""} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
      </nav>
      <div className="header-actions">
        <Link className="icon-button" aria-label="ابحث في المنتجات" href="/products"><Search /></Link>
        <Link className="icon-button account-button" aria-label="حسابي" href="/account"><UserRound /></Link>
        <Link className="icon-button cart-button" aria-label={`السلة ${cartCount}`} href="/cart"><ShoppingBag /><span className="cart-count">{cartCount}</span></Link>
      </div>
    </header>
  );
}
