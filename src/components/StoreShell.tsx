import type { ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function StoreShell({ children }: { children: ReactNode }) {
  return <main className="storefront"><SiteHeader />{children}<SiteFooter /></main>;
}
