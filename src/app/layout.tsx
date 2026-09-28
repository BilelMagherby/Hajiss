import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-arabic",
});

export const metadata: Metadata = {
  title: "هاجس | قهوة مختصة من حائل",
  description: "هاجس للقهوة المختصة — اختيارات بعناية من قلب حائل، ونكهات تجعل كل فنجان حكاية.",
  openGraph: {
    title: "هاجس | قهوة مختصة من حائل",
    description: "هاجس للقهوة المختصة — اختيارات بعناية من قلب حائل، ونكهات تجعل كل فنجان حكاية.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={ibmPlexSansArabic.variable}>
      <body className="font-sans bg-[#050A0F] text-[#F5F5F2] antialiased overflow-x-hidden selection:bg-[#D6A45B] selection:text-[#050A0F]">
        {children}
      </body>
    </html>
  );
}
