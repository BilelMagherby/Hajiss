"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { photoUrl, products } from "@/lib/store";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductsCatalog() {
  const [query, setQuery] = useState("");
  const visibleProducts = useMemo(() => products.filter((product) => `${product.name} ${product.detail}`.includes(query.trim())), [query]);
  return <>
    <label className="catalog-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن قهوتك المفضلة" /></label>
    <div className="catalog-grid">{visibleProducts.map((product) => <article className="product-card" key={product.id}><Link className="product-image catalog-image" href={`/products/${product.id}`} aria-label={`تفاصيل ${product.name}`} style={{ backgroundImage: `url("${photoUrl(product.image, 900)}")` }}><span className="product-tag">هاجس يختار</span></Link><div className="product-info"><Link href={`/products/${product.id}`}><h3>{product.name}</h3></Link><span>{product.detail}</span><div className="product-bottom"><strong>{product.price.toFixed(2)} <small>ر.س</small></strong><AddToCartButton productId={product.id} /></div></div></article>)}</div>
    {visibleProducts.length === 0 && <p className="empty-results">ما لقينا منتجات تطابق بحثك. جرّب كلمة ثانية.</p>}
  </>;
}
