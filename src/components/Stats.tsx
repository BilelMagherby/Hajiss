"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const statsData = [
  { value: 1200, prefix: "+", suffix: "", label: "مستثمر وشريك", desc: "شبكة واسعة من الشركاء والمستثمرين الاستراتيجيين" },
  { value: 4, prefix: "", suffix: "", pad: true, label: "مجالات استثمارية", desc: "العقارات، الضيافة، التصميم، والحلول الرقمية" },
  { value: 45, prefix: "+", suffix: "", label: "مشروع مدعوم", desc: "قصص نجاح وكيانات تجارية تعمل بكفاءة عالية" },
  { value: 250, prefix: "+", suffix: " مليون ر.س", label: "حجم الاستثمارات", desc: "قيمة المحافظ والمشاريع الاستثمارية المدارة" },
];

function StatItem({ stat, index }: { stat: typeof statsData[0], index: number }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 1.5 + (index * 0.2),
            ease: "power2.out",
            onUpdate: () => setCount(Math.floor(obj.val)),
          });
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [stat.value, index]);

  const displayValue = stat.pad && count < 10 ? `00${count}` : count;

  return (
    <div ref={counterRef} className="stat-card flex flex-col gap-3 p-6 glass-card group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gold-main/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500"></div>
      
      <div className="text-4xl md:text-5xl font-bold font-mono gold-gradient-text z-10 flex items-center justify-start drop-shadow-sm">
        {stat.prefix && <span>{stat.prefix}</span>}
        <span className="tracking-tighter">{displayValue.toLocaleString('en-US')}</span>
        {stat.suffix && <span className="text-xl md:text-2xl mr-1">{stat.suffix}</span>}
      </div>
      
      <h3 className="text-xl font-semibold text-white mt-2 z-10">{stat.label}</h3>
      <p className="text-sm text-white/60 leading-relaxed z-10">{stat.desc}</p>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="stats" className="py-24 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
