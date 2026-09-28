"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#050A0F] border-t border-[var(--color-border-gold)] pt-20 pb-10 z-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold-main/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group mb-2">
              <span className="text-2xl font-bold text-white group-hover:text-gold-main transition-colors">
                NATHEEL
              </span>
              <span className="text-2xl font-bold text-white group-hover:text-gold-main transition-colors border-r border-white/20 pr-2">
                نثيل
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed max-w-sm">
              نستثمر في المستقبل ونُمكّن رواد الأعمال من خلال منظومة استثمارية وتشغيلية متكاملة تنطلق من أصالة حائل لترتقي باقتصاد المملكة.
            </p>
            
            <div className="mt-4">
              <h4 className="text-white font-medium mb-3">مواكبون لمستهدفات رؤية السعودية 2030</h4>
              <div className="w-16 h-1 bg-gold-main rounded-full"></div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6">روابط سريعة</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="#hero" className="text-white/60 hover:text-gold-main transition-colors flex items-center gap-2 group"><ArrowLeft size={14} className="opacity-0 -mr-4 group-hover:opacity-100 group-hover:mr-0 transition-all" />الرئيسية</Link></li>
              <li><Link href="#about" className="text-white/60 hover:text-gold-main transition-colors flex items-center gap-2 group"><ArrowLeft size={14} className="opacity-0 -mr-4 group-hover:opacity-100 group-hover:mr-0 transition-all" />عن نثيل</Link></li>
              <li><Link href="#process" className="text-white/60 hover:text-gold-main transition-colors flex items-center gap-2 group"><ArrowLeft size={14} className="opacity-0 -mr-4 group-hover:opacity-100 group-hover:mr-0 transition-all" />كيف نعمل</Link></li>
              <li><Link href="#roots" className="text-white/60 hover:text-gold-main transition-colors flex items-center gap-2 group"><ArrowLeft size={14} className="opacity-0 -mr-4 group-hover:opacity-100 group-hover:mr-0 transition-all" />جذورنا</Link></li>
              <li><Link href="#contact" className="text-white/60 hover:text-gold-main transition-colors flex items-center gap-2 group"><ArrowLeft size={14} className="opacity-0 -mr-4 group-hover:opacity-100 group-hover:mr-0 transition-all" />تواصل معنا</Link></li>
            </ul>
          </div>
          
          {/* Projects */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold text-white mb-6">مشاريعنا</h4>
            <ul className="grid grid-cols-2 gap-4">
              <li><Link href="#" className="text-white/60 hover:text-gold-main transition-colors">إداري</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-gold-main transition-colors">داني ديزاينز</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-gold-main transition-colors">غالية</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-gold-main transition-colors">أودن فرني</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-gold-main transition-colors">هاجس</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-gold-main transition-colors">داني سكوير</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold text-white mb-6">تواصل معنا</h4>
            <ul className="flex flex-col gap-4 text-white/60 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-gold-main">📍</span>
                <span>طريق الملك فهد، حي المطار، حائل، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold-main">📞</span>
                <span dir="ltr">+966 16 534 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold-main">✉️</span>
                <a href="mailto:info@natheel.sa" className="hover:text-gold-main transition-colors">info@natheel.sa</a>
              </li>
            </ul>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center relative group">
                <span className="text-white/30 text-xs">QR</span>
                <div className="absolute inset-0 bg-gold-main opacity-0 group-hover:opacity-10 transition-opacity rounded-lg"></div>
              </div>
              <span className="text-sm text-white/40 max-w-[100px]">امسح الرمز للتواصل المباشر</span>
            </div>
          </div>
          
        </div>
        
        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            جميع الحقوق محفوظة © 2026 شركة نثيل للاستثمار وتطوير الأعمال.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <Link href="#" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
            <Link href="#" className="hover:text-white transition-colors">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
