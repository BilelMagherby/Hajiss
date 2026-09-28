import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ar" dir="rtl">
      <body className="font-sans bg-[#050A0F] text-[#F5F5F2] antialiased overflow-x-hidden selection:bg-[#D6A45B] selection:text-[#050A0F]">
        {children}
      </body>
    </html>
  );
}
