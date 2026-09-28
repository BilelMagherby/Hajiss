"use client";

import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  return sent ? <div className="form-success"><Check size={23} /><h2>شكرًا لرسالتك</h2><p>واجهة النموذج جاهزة؛ إرسال الرسائل يحتاج ربط بريد هاجس.</p></div> : <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>الاسم<input required name="name" placeholder="اسمك الكريم" /></label><label>البريد الإلكتروني<input required type="email" name="email" placeholder="name@example.com" /></label><label>موضوع الرسالة<select name="topic" defaultValue="order"><option value="order">استفسار عن منتج</option><option value="order-status">متابعة طلب</option><option value="partnership">شراكة أو تعاون</option><option value="other">موضوع آخر</option></select></label><label>رسالتك<textarea required name="message" rows={5} placeholder="اكتب رسالتك هنا..." /></label><button className="gold-button">إرسال الرسالة <ArrowLeft size={17} /></button></form>;
}
