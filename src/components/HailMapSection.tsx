"use client";

import dynamic from "next/dynamic";

const HailMap = dynamic(() => import("./3d/HailMap"), { ssr: false });

export default function HailMapSection() {
  return (
    <section id="hail-map" className="hail-map-section" aria-label="Explore Al Samra in 3D">
      <HailMap />
      <div className="hail-map-heading"><span>THE HEART OF HAIL</span><i /> <b>حي السمراء</b></div>
    </section>
  );
}
