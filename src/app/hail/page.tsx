import type { Metadata } from "next";
import StoreShell from "@/components/StoreShell";
import { photoUrl } from "@/lib/store";

export const metadata: Metadata = { title: "جذور هاجس | حائل", description: "حائل، روح المكان وجذور هاجس." };

export default function HailPage() {
  return <StoreShell><section className="hail-page" dir="rtl"><div className="hail-page-landscape" style={{ backgroundImage: `url("${photoUrl("photo-1509316785289-025f5b846b35", 2200)}")` }}><div className="hail-page-shade" /><span className="hail-page-kicker">من قلب المملكة العربية السعودية</span><h1>حائل، جذور هاجس.</h1><p>مكان الكرم والبدايات الجميلة.</p></div><div className="hail-story"><div><span className="eyebrow"><span /> جذورنا</span><h2>من أرض لها حكاية،<br />وفنجان له <em>طابع.</em></h2></div><p>حائل هي مصدر إلهام هاجس. من دفء مجالسها وكرم أهلها استلهمنا طريقتنا في تقديم القهوة: بسيطة، أصيلة، وتجمع الناس. نحتفي بجذورنا في كل تفصيل، ونشارك نكهة المكان مع كل فنجان.</p></div><div className="hail-gallery"><div style={{ backgroundImage: `url("${photoUrl("photo-1500530855697-b586d89ba3ee", 900)}")` }} /><div style={{ backgroundImage: `url("${photoUrl("photo-1504545102780-26774c1bb073", 900)}")` }} /><div className="hail-gallery-note"><span>HAJISS · HAIL</span><p>نكهة المكان، في كل رشفة.</p></div></div></section></StoreShell>;
}
