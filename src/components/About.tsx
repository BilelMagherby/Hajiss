"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (containerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
      
      tl.fromTo(".about-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .fromTo(".about-main-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .fromTo(".about-desc", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.4")
        .fromTo(".about-card", { opacity: 0, scale: 0.95, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)" }, "-=0.5");
    }
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-24 md:py-32 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -inset-4 bg-gold-main/5 blur-3xl rounded-full z-0"></div>
            
            <div className="relative z-10 flex flex-col gap-6">
              <div className="about-title inline-flex items-center gap-3">
                <span className="text-gold-main font-semibold tracking-wide">مَن نحن؟</span>
                <div className="w-8 h-px bg-gold-main/50"></div>
              </div>
              
              <h2 className="about-main-text text-3xl md:text-5xl font-bold leading-tight">
                من أرض الأصالة والكرم، ننطلق لنصنع مستقبلاً <span className="gold-gradient-text">استثمارياً استثنائياً</span>
              </h2>
              
              <p className="about-desc text-white/70 text-lg leading-relaxed mt-4 border-r-2 border-gold-main/30 pr-6">
                تأسست شركة نثيل للاستثمار وتطوير الأعمال برؤية طموحة ترتكز على إرث عريق يمتد لأكثر من ثلاثة عقود في منطقة حائل والمملكة. نجمع بين الخبرة العميقة في إدارة وتطوير الأصول، والشغف بدعم رواد الأعمال والمبتكرين لبناء شركات رائدة في مختلف القطاعات الحيوية.
              </p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="about-card glass-card p-8 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-main/10 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-700"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10 flex items-center gap-3">
                <span className="w-2 h-8 bg-gold-main rounded-full block"></span>
                منظومة استثمارية متكاملة
              </h3>
              <p className="text-white/70 leading-relaxed relative z-10">
                نوفر التمويل، الحوكمة، الإدارة التشغيلية، والتسويق لضمان نجاح واستدامة كل مشروع.
              </p>
            </div>
            
            <div className="about-card glass-card p-8 group relative overflow-hidden lg:mr-12">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0B1B29]/80 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-700"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10 flex items-center gap-3">
                <span className="w-2 h-8 bg-white/30 group-hover:bg-gold-main transition-colors duration-300 rounded-full block"></span>
                مواكبة لرؤية السعودية 2030
              </h3>
              <p className="text-white/70 leading-relaxed relative z-10">
                نساهم بفاعلية في تنمية الاقتصاد المحلي، وتنويع مصادر الدخل، وخلق فرص عمل واعدة.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
