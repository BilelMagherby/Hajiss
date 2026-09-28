"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cartStorageKey, photoUrl, products } from "@/lib/store";
import type { CartItem } from "@/lib/store";

export default function CartContents() {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    try { setCart(JSON.parse(localStorage.getItem(cartStorageKey) || "[]") as CartItem[]); } catch { setCart([]); }
  }, []);
  const save = (next: CartItem[]) => {
    setCart(next);
    localStorage.setItem(cartStorageKey, JSON.stringify(next));
    window.dispatchEvent(new Event("hajiss-cart-change"));
  };
  const total = useMemo(() => cart.reduce((sum, item) => sum + (products.find((product) => product.id === item.id)?.price ?? 0) * item.quantity, 0), [cart]);
  if (!cart.length) return <div className="cart-empty"><span className="cart-empty-mark">⌁</span><h2>سلتك تنتظر قهوتك.</h2><p>اختار نكهتك المفضلة وخلي هاجس يكمّل لحظتك.</p><Link className="gold-button" href="/products">تصفّح المنتجات</Link></div>;
  return <div className="cart-layout"><div className="cart-lines">{cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) return null;
    return <article className="cart-line" key={item.id}><div className="cart-product-image" style={{ backgroundImage: `url("${photoUrl(product.image, 400)}")` }} /><div className="cart-product-copy"><h2>{product.name}</h2><span>{product.detail}</span><strong>{product.price.toFixed(2)} ر.س</strong></div><div className="quantity-stepper"><button aria-label="تقليل الكمية" onClick={() => save(item.quantity <= 1 ? cart.filter((row) => row.id !== item.id) : cart.map((row) => row.id === item.id ? { ...row, quantity: row.quantity - 1 } : row))}><Minus size={14} /></button><span>{item.quantity}</span><button aria-label="زيادة الكمية" onClick={() => save(cart.map((row) => row.id === item.id ? { ...row, quantity: row.quantity + 1 } : row))}><Plus size={14} /></button></div><button className="remove-item" aria-label={`احذف ${product.name}`} onClick={() => save(cart.filter((row) => row.id !== item.id))}><Trash2 size={17} /></button></article>;
  })}</div><aside className="cart-summary"><span>ملخص الطلب</span><div><span>المجموع الفرعي</span><strong>{total.toFixed(2)} ر.س</strong></div><div><span>التوصيل</span><span>يُحسب عند إتمام الطلب</span></div><hr /><div className="cart-total"><span>الإجمالي</span><strong>{total.toFixed(2)} ر.س</strong></div><Link className="gold-button" href="/contact">إتمام الطلب <span>←</span></Link><Link className="continue-shopping" href="/products">متابعة التسوّق</Link></aside></div>;
}
