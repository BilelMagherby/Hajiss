import type { Metadata } from "next";
import StoreShell from "@/components/StoreShell";
import CartContents from "@/components/CartContents";

export const metadata: Metadata = { title: "سلتك | هاجس" };

export default function CartPage() {
  return <StoreShell><section className="content-page cart-page" dir="rtl"><header className="page-heading"><span className="eyebrow"><span /> اختياراتك</span><h1>سلّة هاجس.</h1><p>قريبين من فنجانك الجاي.</p></header><CartContents /></section></StoreShell>;
}
