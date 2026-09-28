import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StoreShell from "@/components/StoreShell";
import AddToCartButton from "@/components/AddToCartButton";
import { photoUrl, products } from "@/lib/store";

export function generateStaticParams() { return products.map((product) => ({ id: product.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  return { title: product ? `${product.name} | هاجس` : "المنتج غير موجود | هاجس" };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) return <StoreShell><section className="content-page" dir="rtl"><div className="cart-empty"><h1>المنتج غير موجود</h1><Link href="/products" className="gold-button">ارجع للمتجر</Link></div></section></StoreShell>;
  return <StoreShell><section className="product-detail-page" dir="rtl"><Link href="/products" className="back-link"><ArrowRight size={16} /> كل المنتجات</Link><div className="product-detail"><div className="product-detail-image" style={{ backgroundImage: `url("${photoUrl(product.image, 1400)}")` }} /><div className="product-detail-copy"><span className="eyebrow"><span /> من اختيارات هاجس</span><h1>{product.name}</h1><p>{product.detail}</p><strong>{product.price.toFixed(2)} <small>ر.س</small></strong><p className="detail-description">نكهة متوازنة وتفاصيل عطرية مختارة لتضيف لمشروباتك لمسة من هاجس. جرّبها في قهوتك اليومية أو شاركها مع من تحب.</p><AddToCartButton productId={product.id} /></div></div></section></StoreShell>;
}
