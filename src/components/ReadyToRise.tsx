'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const TEXT = 'Get Ready Together to Rise at Seven';

export default function ReadyToRise() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(container, {
        type: 'chars',
        charsClass: 'char',
      });

      // Start chars slightly above
      gsap.set(split.chars, {
        y: -80,
      });

      // Start ENTIRE sentence fully outside right edge
      gsap.set(container, {
        x: window.innerWidth + 300,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });

      // Continuous horizontal movement
      tl.to(container, {
        x: -container.offsetWidth - 400,
        ease: 'none',
        duration: 1,
      });

      // Waterfall drop happens DURING movement
      tl.to(
        split.chars,
        {
          y: 0,
          stagger: 0.03,
          duration: 0.18,
          ease: 'power2.out',
        },
        0.05
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen overflow-hidden flex items-center"
    >
      <div
        ref={containerRef}
        className="absolute whitespace-nowrap will-change-transform"
      >
        <h1 className="text-black font-bold font-sans leading-none" style={{ fontSize: 'clamp(48px, 10vw, 120px)' }}>
          {TEXT}
        </h1>
      </div>
    </section>
  );
}