"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CurtainReveal() {
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!curtainRef.current) return;

    gsap.to(curtainRef.current, {
      yPercent: -110,
      duration: 2,
      ease: "power1.out",
    });
  }, []);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      style={{ backgroundColor: "#b2f6e3" }}
    >
      {/* Arc hangs below the curtain's bottom edge, moves with it */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          height: "200px",
          display: "block",
          overflow: "hidden",
        }}
      >
        <path d="M0,200 Q720,0 1440,200 L1440,0 L0,0 Z" fill="#b2f6e3" />
      </svg>
    </div>
  );
}
