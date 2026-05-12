"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CurtainReveal() {
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!curtainRef.current) return;

    gsap.to(curtainRef.current, {
      yPercent: -200,
      duration: 1.5,
      ease: "power4.inOut",
      delay: 0.3,
    });
  }, []);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ backgroundColor: "#b2f6e3" }}
    >
      {/* Arc hangs below the curtain's bottom edge, moves with it */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="absolute left-0 w-full"
        style={{ top: "100%", height: "300px", display: "block" }}
      >
        <path d="M0,200 Q720,0 1440,200 L1440,0 L0,0 Z" fill="#b2f6e3" />
      </svg>
    </div>
  );
}
