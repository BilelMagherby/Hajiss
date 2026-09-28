import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import StoreShell from "@/components/StoreShell";
import AccountForm from "@/components/AccountForm";

export const metadata: Metadata = { title: "حسابك | هاجس" };

export default function AccountPage() {
  return <StoreShell><section className="content-page account-page" dir="rtl"><div className="account-card"><div className="account-icon"><UserRound /></div><span className="eyebrow"><span /> أهلاً بك في هاجس</span><h1>حسابك يبدأ هنا.</h1><p>أدخل بريدك عشان تتابع تجربة هاجس.</p><AccountForm /></div></section></StoreShell>;
}
