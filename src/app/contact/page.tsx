import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import StoreShell from "@/components/StoreShell";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "تواصل معنا | هاجس", description: "تواصل مع فريق هاجس للقهوة المختصة." };

export default function ContactPage() {
  return <StoreShell><section className="content-page contact-page" dir="rtl"><header className="page-heading"><span className="eyebrow"><span /> حنا قريبين</span><h1>خلّنا نحكي.</h1><p>عندك سؤال أو فكرة؟ يسعدنا نسمع منك.</p></header><div className="contact-layout"><div className="contact-details"><div><Mail size={20} /><span><small>الرسائل والاستفسارات</small>اكتب لنا من النموذج</span></div><div><MapPin size={20} /><span><small>الموقع</small>حائل، المملكة العربية السعودية</span></div><p>نرحّب باستفساراتك حول المنتجات والتعاون.</p></div><ContactForm /></div></section></StoreShell>;
}
