"use client";

// Dynamic wrapper — HailMapInner is NEVER server-side rendered.
// Static import of maplibre-gl lives in HailMapInner.tsx only.
import dynamic from "next/dynamic";

const HailMapInner = dynamic(() => import("./HailMapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#050A0F]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#D6A45B] border-t-transparent animate-spin" />
        <p className="text-white/40 text-xs tracking-widest uppercase">Loading Map…</p>
      </div>
    </div>
  ),
});

export default function HailMap() {
  return <HailMapInner />;
}
