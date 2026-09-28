"use client";

import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

export default function AccountForm() {
  const [submitted, setSubmitted] = useState(false);
  return submitted ? <div className="form-success"><Check size={23} /><h2>وصل بريدك.</h2><p>واجهة الحساب جاهزة، وتسجيل الدخول بالبريد يحتاج ربط نظام الحسابات.</p></div> : <form className="contact-form account-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label>البريد الإلكتروني<input required type="email" placeholder="name@example.com" /></label><button className="gold-button">متابعة <ArrowLeft size={17} /></button><p className="form-note">تسجيل الدخول الفعلي يحتاج تفعيل خدمة الحسابات.</p></form>;
}
