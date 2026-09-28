"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { CartItem, cartStorageKey } from "@/lib/store";

export default function AddToCartButton({ productId, compact = false }: { productId: string; compact?: boolean }) {
  const [added, setAdded] = useState(false);
  const add = () => {
    let cart: CartItem[] = [];
    try { cart = JSON.parse(localStorage.getItem(cartStorageKey) || "[]") as CartItem[]; } catch { cart = []; }
    const existing = cart.find((item) => item.id === productId);
    if (existing) existing.quantity += 1;
    else cart.push({ id: productId, quantity: 1 });
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    window.dispatchEvent(new Event("hajiss-cart-change"));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };
  return <button className={compact ? "quick-add" : "product-add-button"} aria-label="أضف المنتج إلى السلة" onClick={add}>{added ? <Check size={16} /> : compact ? <ShoppingBag size={16} /> : <><ShoppingBag size={15} /> أضف للسلة</>}</button>;
}
