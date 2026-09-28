"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  { num: "01", title: "الفكرة", desc: "نستقبل الأفكار والمشاريع الواعدة ونبحث عن فرص النمو." },
  { num: "02", title: "التقييم", desc: "نحلل السوق والنموذج التشغيلي والفرص الاستثمارية." },
  { num: "03", title: "الاستثمار", desc: "نقدم الدعم المالي ونبني استراتيجية الشراكة المثلى." },
  { num: "04", title: "التطوير", desc: "نساهم في تطوير المنتجات وتحسين العمليات والإدارة." },
  { num: "05", title: "التشغيل", desc: "نضمن الكفاءة التشغيلية عبر فرق متخصصة وحوكمة صارمة." },
  { num: "06", title: "النمو", desc: "نحقق التوسع ونضاعف الأثر لضمان استدامة الأعمال." },
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (containerRef.current) {
      const q = gsap.utils.selector(containerRef);
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });
      
      tl.fromTo(".process-header", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .fromTo(".process-line", { height: 0 }, { height: "100%", duration: 1.5, ease: "power2.inOut" }, "-=0.2")
        .fromTo(".process-step", 
          { opacity: 0, x: -30 }, 
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.2, ease: "back.out(1.2)" }, 
          "-=1.2"
        );
    }
  }, []);

  return (
    <section ref={containerRef} id="process" className="py-24 md:py-32 relative z-20 bg-[#08131C]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="process-header text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold-main/50"></div>
            <span className="text-gold-main font-semibold tracking-wide">كيف نعمل</span>
            <div className="w-8 h-px bg-gold-main/50"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">منظومة متكاملة لنجاح <span className="gold-gradient-text">المشاريع</span></h2>
          <p className="text-white/60 text-lg">نرافق المشاريع منذ كونها فكرة طموحة وحتى تصبح كياناً اقتصادياً رائداً</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Main vertical line */}
          <div className="absolute right-6 md:right-1/2 top-0 bottom-0 w-px bg-white/10 md:translate-x-1/2">
            <div className="process-line w-full bg-gradient-to-b from-gold-main via-gold-light to-transparent"></div>
          </div>
          
          <div className="space-y-12 md:space-y-0 relative">
            {steps.map((step, i) => {
              const isEven = i % 2 !== 0;
              return (
                <div key={i} className={`process-step flex flex-col md:flex-row items-start md:items-center w-full relative z-10 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Content area */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 text-right md:text-left' : 'md:pl-16 text-right'}`}>
                    <div className={`glass-card p-6 md:p-8 hover:bg-[#0B1B29] transition-all group cursor-default relative overflow-hidden ${isEven ? 'ml-auto' : ''}`}>
                      <div className={`absolute top-0 w-24 h-24 bg-gold-main/5 rounded-full blur-2xl transition-transform group-hover:scale-150 duration-700 ${isEven ? '-left-4' : '-right-4'}`}></div>
                      
                      <div className="flex items-center gap-4 mb-3 relative z-10">
                        <span className="text-3xl font-mono font-bold text-white/20 group-hover:text-gold-main/40 transition-colors">{step.num}</span>
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-gold-main transition-colors">{step.title}</h3>
                      </div>
                      <p className="text-white/60 leading-relaxed relative z-10">{step.desc}</p>
                    </div>
                  </div>
                  
                  {/* Center Node */}
                  <div className="absolute right-6 md:right-1/2 md:translate-x-1/2 flex items-center justify-center -translate-y-6 md:translate-y-0">
                    <div className="w-8 h-8 rounded-full bg-[#050A0F] border-2 border-gold-main flex items-center justify-center shadow-[0_0_15px_rgba(214,164,91,0.5)] z-20">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
