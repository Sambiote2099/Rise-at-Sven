"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const COLOR = "#b2f6e3";
const ARC_H = 120;

export default function CurtainReveal() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const [arcY, setArcY] = useState(88); // fallback

  useEffect(() => {
    // Calculate where 100vh falls as a % of the total curtain height
    const pct = (window.innerHeight / (window.innerHeight + ARC_H)) * 100;
    setArcY(Math.round(pct * 10) / 10);

    const el = curtainRef.current;
    if (!el) return;
    const totalH = window.innerHeight + ARC_H;
    gsap.fromTo(el, { y: 0 }, { y: -totalH, duration: 2, ease: "power1.out" });
  }, []);

  return (
    <div
      ref={curtainRef}
      className="fixed left-0 top-0 right-0 z-[9999] pointer-events-none"
      style={{ height: `calc(100vh + ${ARC_H}px)` }}
    >
      {/*
        Single SVG covers the full curtain div.
        viewBox 0 0 100 100 with preserveAspectRatio="none" maps
        perfectly to any screen size.
        The path is solid from y=0 to y=arcY, then the bottom edge
        curves down to y=100 at centre — a smooth concave arc.
      */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <path
          d={`M0,0 L100,0 L100,${arcY} Q50,${arcY - 30} 0,${arcY} Z`}
          fill={COLOR}
        />
      </svg>
    </div>
  );
}
