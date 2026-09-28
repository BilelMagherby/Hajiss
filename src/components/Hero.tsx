"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Play } from "lucide-react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./3d/HeroScene"), { ssr: false });

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (textRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        ".hero-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 2 }
      )
      .fromTo(
        ".hero-title-word",
        { opacity: 0, y: 50, rotateX: -20 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.2, ease: "power4.out" },
        "-=0.5"
      )
      .fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ".hero-cta",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" },
        "-=0.5"
      )
      .fromTo(
        ".hero-location",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.2"
      );
    }
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative w-full h-screen min-h-[100vh] flex items-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroScene />
      </div>

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050A0F] via-[#050A0F]/60 to-transparent z-10 pointer-events-none"></div>
      
      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center h-full pt-20">
        <div className="max-w-3xl" ref={textRef}>
          <div className="hero-label inline-flex items-center gap-3 mb-6">
            <span className="text-gold-main font-mono text-sm tracking-widest">01</span>
            <div className="w-12 h-px bg-gold-main/50"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
            <div className="overflow-hidden">
              <span className="hero-title-word block text-white">نستثمر في</span>
            </div>
            <div className="overflow-hidden pb-4">
              <span className="hero-title-word block gold-gradient-text drop-shadow-[0_0_30px_rgba(214,164,91,0.3)]">المستقبل</span>
            </div>
          </h1>
          
          <p className="hero-subtitle text-lg md:text-2xl text-white/80 max-w-2xl leading-relaxed mb-12 border-r-2 border-gold-main/50 pr-6">
            من أرض الأصالة والكرم، ننطلق لنصنع مستقبلاً استثمارياً استثنائياً.
          </p>
          
          <div className="hero-cta flex flex-wrap items-center gap-6">
            <button className="btn-primary group flex items-center gap-3">
              <span>قدم فكرتك</span>
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            
            <button className="group flex items-center gap-4 text-white hover:text-gold-light transition-colors">
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold-main group-hover:bg-gold-main/10 transition-all duration-300">
                <Play size={20} className="fill-current ml-1" />
              </div>
              <span className="font-medium tracking-wide">شاهد الفيديو</span>
            </button>
          </div>
        </div>
        
        {/* Location Indicator */}
        <div className="hero-location absolute bottom-12 right-6 md:right-12 flex items-end gap-4 text-right">
          <div className="flex flex-col gap-1">
            <span className="text-white font-medium text-sm">جبال أجا وسلمى ومنطقة حائل</span>
            <span className="text-white/50 text-xs">حائل، المملكة العربية السعودية</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gold-main/10 border border-gold-main/30 flex items-center justify-center text-gold-main animate-pulse">
            📍
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-6 md:left-12 flex flex-col items-center gap-4 opacity-70">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white rotate-90 origin-left translate-y-8 whitespace-nowrap">
            Scroll
          </span>
          <div className="w-[1px] h-24 bg-white/20 relative overflow-hidden mt-8">
            <div className="w-full h-1/3 bg-gold-main absolute top-0 left-0 animate-[scrollDown_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
