import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer id="contact" className="site-footer" dir="rtl">
      <div className="footer-top">
        <Link className="brand footer-brand" href="/"><span className="brand-mark">⌁</span><span className="brand-name">HAJISS</span><span className="brand-caption">SPECIALTY COFFEE</span></Link>
        <p>قهوتك المختصة، من حائل بكل حب.</p>
        <div className="footer-links"><Link href="/products">المتجر</Link><Link href="/about">قصتنا</Link><Link href="/contact">تواصل معنا</Link><Link href="/hail">حائل</Link></div>
        <Link className="back-top" href="/" aria-label="العودة للرئيسية"><ArrowUpLeft /></Link>
      </div>
      <div className="footer-bottom"><span>© 2026 هاجس. جميع الحقوق محفوظة.</span><span>صُنع بكل حب في حائل <span className="footer-heart">✦</span></span></div>
    </footer>
  );
}
