"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Check, Headphones, MapPin, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AddToCartButton from "@/components/AddToCartButton";
import { photoUrl, products } from "@/lib/store";
import Link from "next/link";

const photo = (id: string, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const coffeeBeans = Array.from({ length: 54 }, (_, index) => ({
  id: index,
  x: (index * 37 + 11) % 100,
  y: (index * 53 + 9) % 100,
  size: 11 + ((index * 17) % 35),
  tilt: (index * 47) % 150 - 75,
  duration: 6 + ((index * 7) % 11),
  delay: -((index * 3) % 15),
  depth: index % 3,
}));

export default function Home() {
  const hero = useRef<HTMLElement>(null);
  const [added, setAdded] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-copy > *", { opacity: 0, y: 22, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.05, stagger: 0.16, ease: "power3.out", delay: 0.3 });
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.to(".bean-depth-0", { yPercent: -9, ease: "none", scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: 0.8 } });
        gsap.to(".bean-depth-1", { yPercent: -17, ease: "none", scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: 0.8 } });
        gsap.to(".bean-depth-2", { yPercent: -26, ease: "none", scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: 0.8 } });
      }
      gsap.to(".hero-copy", { y: -55, opacity: 0.25, ease: "none", scrollTrigger: { trigger: hero.current, start: "top top", end: "70% top", scrub: 0.7 } });
      gsap.utils.toArray<HTMLElement>(".reveal:not(.product-card)").forEach((el) => gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }));
      const productCards = gsap.utils.toArray<HTMLElement>(".product-grid .product-card");
      if (productCards.length) {
        gsap.fromTo(productCards, { autoAlpha: 0, y: 42, rotateX: 7, scale: 0.97, transformOrigin: "50% 100%" }, {
          autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 0.9, stagger: 0.13, ease: "power3.out",
          scrollTrigger: { trigger: productCards[0].parentElement, start: "top 84%", once: true },
        });
      }
    }, hero);
    const heroElement = hero.current;
    const onMove = (event: MouseEvent) => {
      if (!heroElement || window.matchMedia("(pointer: coarse)").matches) return;
      const rect = heroElement.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(".bean-depth-0", { x: x * -12, y: y * -9, duration: 1.8, ease: "power2.out", overwrite: "auto" });
      gsap.to(".bean-depth-1", { x: x * -22, y: y * -16, duration: 1.8, ease: "power2.out", overwrite: "auto" });
      gsap.to(".bean-depth-2", { x: x * -34, y: y * -24, duration: 1.8, ease: "power2.out", overwrite: "auto" });
    };
    const onLeave = () => {
      gsap.to([".bean-depth-0", ".bean-depth-1", ".bean-depth-2"], { x: 0, y: 0, duration: 1.8, ease: "power2.out", overwrite: "auto" });
    };
    heroElement?.addEventListener("mousemove", onMove, { passive: true });
    heroElement?.addEventListener("mouseleave", onLeave);
    return () => { ctx.revert(); heroElement?.removeEventListener("mousemove", onMove); heroElement?.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <main className="storefront">
      <SiteHeader />

      <section id="home" ref={hero} className="hero-section">
        <div className="hero-shade" /><div className="hero-haze" /><div className="hero-glow" />
        <div className="hero-beans" aria-hidden="true">{[0, 1, 2].map((depth) => <div className={`bean-depth bean-depth-${depth}`} key={depth}>{coffeeBeans.filter((bean) => bean.depth === depth).map((bean) => <span className="coffee-bean" key={bean.id} style={{ left: `${bean.x}%`, top: `${bean.y}%`, "--bean-size": `${bean.size}px`, "--bean-height": `${(bean.size * 0.62).toFixed(1)}px`, "--bean-tilt": `${bean.tilt}deg`, "--bean-duration": `${bean.duration}s`, "--bean-delay": `${bean.delay}s` } as CSSProperties} />)}</div>)}</div>
        <div className="hero-copy" dir="rtl"><span className="eyebrow"><span /> قهوة من قلب حائل</span><h1>هاجس</h1><h2>متجر القهوة المختصة</h2><p>وجهتك الأولى لأجود المحاصيل، وتجربة قهوة تليق بكل لحظة.</p><Link className="gold-button" href="/products">تسوّق الآن <ArrowLeft size={18} /></Link></div>
        <div className="hero-side-note"><span>HAJISS · HAIL</span><i /></div>
        <a className="scroll-cue" href="#promise"><span>اكتشف هاجس</span><i /></a>
        <div className="hero-pagination"><b /><i /><i /><i /></div>
      </section>

      <section id="promise" className="promise-bar" dir="rtl">
        <div className="promise-item"><Headphones /><div><strong>دعم احترافي بجودة عالية</strong><span>خدمة مباشرة 24/7</span></div></div>
        <div className="promise-item"><RotateCcw /><div><strong>إرجاع خلال 24 ساعة</strong><span>بدون طرح أسئلة</span></div></div>
        <div className="promise-item"><ShieldCheck /><div><strong>ضمان استرداد الأموال</strong><span>خلال 10 أيام</span></div></div>
        <div className="promise-item"><Truck /><div><strong>توصيل سريع وآمن</strong><span>بسرعة، أمان، وثقة</span></div></div>
      </section>

      <section id="products" className="curated-section" dir="rtl">
        <div className="coffee-scene" style={{ backgroundImage: `url("${photo("photo-1495474472287-4d71bcdd2085", 1500)}")` }}><div className="scene-overlay" /><span className="scene-label">لحظات تستحق التذوّق</span></div>
        <div className="products-area"><div className="section-heading reveal"><span className="eyebrow"><span /> مختارة بعناية</span><h2>نكهة من اختيارك</h2><p>تفاصيل صغيرة تصنع فنجانًا استثنائيًا.</p><span className="heading-rule" /></div>
          <div className="product-grid">{products.slice(0, 4).map((product) => <article className="product-card reveal" key={product.id}><div className="product-image" style={{ backgroundImage: `url("${photoUrl(product.image, 700)}")` }}><span className="product-tag">هاجس يختار</span><AddToCartButton productId={product.id} compact /></div><div className="product-info"><h3>{product.name}</h3><span>{product.detail}</span><div className="product-bottom"><strong>{product.price.toFixed(2)} <small>ر.س</small></strong><AddToCartButton productId={product.id} /></div></div></article>)}</div>
          <Link className="all-products" href="/products">اكتشف كل المنتجات <ArrowLeft size={15} /></Link>
        </div>
      </section>

      <section id="story" className="story-section" dir="rtl"><div className="story-image reveal" style={{ backgroundImage: `url("${photo("photo-1442512595331-e89e73853f31", 1400)}")` }}><span>من حائل، بكل شغف</span></div><div className="story-copy reveal"><span className="eyebrow"><span /> حكاية هاجس</span><h2>كل فنجان<br />يحمل <em>حكاية.</em></h2><p>نؤمن أن القهوة أكثر من مذاق؛ هي لحظة تجمعنا، وتفاصيل صغيرة تجعل اليوم أجمل. نختار محاصيلنا بعناية ونقدّمها لك من قلب حائل.</p><a href="#hail" className="text-link">اكتشف جذورنا <ArrowLeft size={16} /></a><div className="story-stamp">H<br /><small>من حائل</small></div></div></section>

      <section className="newsletter" dir="rtl"><div className="newsletter-inner reveal"><span className="eyebrow">رسائل بطعم القهوة</span><h2>خلي لحظاتك ألذ.</h2><p>اشترك لتصلك نكهاتنا الجديدة وعروض هاجس.</p><form onSubmit={(e) => { e.preventDefault(); setAdded("تم تسجيل بريدك بنجاح"); window.setTimeout(() => setAdded(""), 2200); }}><input type="email" required placeholder="بريدك الإلكتروني" aria-label="بريدك الإلكتروني" /><button aria-label="اشترك"><ArrowLeft size={18} /></button></form></div></section>

      <section id="hail" className="hail-strip" style={{ backgroundImage: `url("${photo("photo-1500530855697-b586d89ba3ee", 2000)}")` }}><div className="hail-shade" /><div className="hail-tag"><MapPin size={17} /> حائل، السعودية</div><span>من أرض الكرم، إلى فنجانك.</span></section>

      <SiteFooter />

      {added && <div className="toast" role="status"><Check size={17} />{added}</div>}
    </main>
  );
}
