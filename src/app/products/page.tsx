import type { Metadata } from "next";
import StoreShell from "@/components/StoreShell";
import ProductsCatalog from "@/components/ProductsCatalog";

export const metadata: Metadata = { title: "منتجات هاجس | قهوة مختصة من حائل", description: "تسوّق اختيارات هاجس من القهوة المختصة والنكهات." };

export default function ProductsPage() {
  return <StoreShell><section className="content-page" dir="rtl"><header className="page-heading"><span className="eyebrow"><span /> متجر هاجس</span><h1>اختار نكهتك.</h1><p>منتجات مختارة بعناية، عشان كل فنجان يكون على ذوقك.</p></header><ProductsCatalog /></section></StoreShell>;
}
