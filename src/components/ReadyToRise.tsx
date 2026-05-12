'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORDS = ['Ready', 'to', 'Rise'];

export default function ReadyToRise() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      wordRefs.current.forEach((el, i) => {
        if (!el) return;

        // Each word starts progressively higher and more to the right
        const xFrom = 60 + i * 80;
        const yFrom = -(80 + i * 60);
        const rotFrom = 8 + i * 6;

        gsap.fromTo(el,
          { x: xFrom, y: yFrom, rotation: rotFrom },
          {
            x: 0,
            y: 0,
            rotation: 0,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1.5,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-24 overflow-hidden">
      <div className="flex items-baseline gap-6 flex-wrap">
        {WORDS.map((word, i) => (
          <span
            key={i}
            ref={(el) => { wordRefs.current[i] = el; }}
            className="inline-block text-black font-bold font-sans text-[120px] leading-none"
            style={{ transformOrigin: 'bottom left' }}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
