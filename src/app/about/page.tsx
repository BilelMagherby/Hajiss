import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Coffee, MapPin, Sparkles } from "lucide-react";
import StoreShell from "@/components/StoreShell";
import { photoUrl } from "@/lib/store";

export const metadata: Metadata = {
  title: "عن هاجس | حكاية قهوة من حائل",
  description: "تعرّف على حكاية هاجس وشغفنا بالقهوة المختصة من حائل.",
};

const principles = [
  { index: "01", title: "اختيارٌ بعناية", detail: "ننتقي النكهات التي تترك أثرًا جميلًا في فنجانك.", icon: Coffee },
  { index: "02", title: "روحٌ من حائل", detail: "كرم المكان ودفؤه جزء من الحكاية التي نشاركها.", icon: MapPin },
  { index: "03", title: "تفاصيل تهمّنا", detail: "من أول رشفة إلى آخر لحظة، نصنع التجربة على مهل.", icon: Sparkles },
];

export default function AboutPage() {
  return (
    <StoreShell>
      <div className="about-page" dir="rtl">
        <section className="about-hero" style={{ backgroundImage: `url("${photoUrl("photo-1442512595331-e89e73853f31", 2200)}")` }}>
          <div className="about-hero-shade" />
          <div className="about-hero-copy">
            <div className="about-breadcrumb"><Link href="/">الرئيسية</Link><span>/</span><span>حكايتنا</span></div>
            <span className="eyebrow"><span /> حكاية هاجس</span>
            <h1>القهوة<br /><em>تجمعنا.</em></h1>
            <p>من حائل، نختار لحظاتك بعناية.</p>
            <Link className="about-hero-link" href="#our-story">اكتشف حكايتنا <ArrowLeft size={16} /></Link>
          </div>
          <div className="about-hero-caption"><span>HAJISS · OUR STORY</span><span>01 — 03</span></div>
          <div className="about-hero-mark" aria-hidden="true">H</div>
        </section>

        <section id="our-story" className="about-intro">
          <div className="about-intro-heading"><span className="eyebrow"><span /> عن هاجس</span><h2>فنجانٌ يشبه<br />المكان اللي <em>نحبّه.</em></h2><span className="about-index">حائل، المملكة العربية السعودية</span></div>
          <div className="about-intro-copy"><p className="about-lead">هاجس بدأ من حبّ القهوة ومن روح حائل؛ مدينة تعرف كيف تصنع من البساطة ذكرى.</p><p>نؤمن أن الفنجان الحلو يبدأ من محصول مختار، وتحميص متوازن، ووقت يُعاش على مهل.</p><p>لهذا نجمع بين نكهات القهوة المختصة والمنتجات اللي تضيف لمسة جديدة لروتينك اليومي. كل اختيار في متجرنا وراه اهتمام بالتفاصيل، من أول رشفة لآخر لحظة.</p></div>
        </section>

        <section className="about-image-break" aria-label="تفاصيل من عالم هاجس">
          <div className="about-image-break-photo" style={{ backgroundImage: `url("${photoUrl("photo-1495474472287-4d71bcdd2085", 1800)}")` }} />
          <div className="about-image-break-shade" />
          <p>وقتٌ أبطأ.<br /><em>مذاقٌ أعمق.</em></p>
          <span>قهوة مختصة، من حائل بكل حب.</span>
        </section>

        <section className="about-values">
          <div className="about-values-heading"><span className="eyebrow"><span /> ما يهمّنا</span><h2>البساطة في الفنجان،<br />والعناية في كل <em>تفصيل.</em></h2></div>
          <div className="about-values-grid">{principles.map(({ index, title, detail, icon: Icon }) => <article className="about-value-card" key={index}><div className="about-value-top"><span>{index}</span><Icon size={21} strokeWidth={1.4} /></div><h3>{title}</h3><p>{detail}</p></article>)}</div>
        </section>

        <section className="about-endcap"><span>HAJISS · HAIL</span><p>حكايتنا تبدأ من هنا.<br /><em>وفنجانك الجاي يبدأ منك.</em></p><div><Link className="gold-button" href="/products">اكتشف منتجاتنا <ArrowLeft size={17} /></Link><Link className="about-contact-link" href="/contact">تواصل معنا <ArrowUpLeft size={15} /></Link></div></section>
      </div>
    </StoreShell>
  );
}
