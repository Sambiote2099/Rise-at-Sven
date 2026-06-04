'use client';
import { useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { type: 'text', content: 'Search & Growth' },
  { type: 'image', content: 'https://images.unsplash.com/photo-1553013746-013d9c76dfa2?w=400&auto=format&fit=crop' },
  { type: 'text', content: 'Digital PR' },
  { type: 'image', content: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop' },
  { type: 'text', content: 'Content Experience' },
  { type: 'image', content: 'https://images.unsplash.com/photo-1778071073381-1a4dc5650727?w=400&auto=format&fit=crop' },
  { type: 'text', content: 'Onsite SEO' },
  { type: 'image', content: 'https://images.unsplash.com/photo-1777266450837-94423d75af89?w=400&auto=format&fit=crop' },
  { type: 'text', content: 'Social SEO' },
  { type: 'image', content: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop' },
  { type: 'text', content: 'Data & Insights' },
  { type: 'image', content: 'https://plus.unsplash.com/premium_photo-1722018576685-45a415a4ff67?w=400&auto=format&fit=crop' },
];

const track = [...ITEMS, ...ITEMS];

export default function TextImageMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const hasMoved = useRef(false);

  useEffect(() => {
    gsap.set(cursorRef.current, { scale: 0, opacity: 0, x: -999, y: -999 });

    // Scroll-driven x offset — layered on top of CSS animation
    const ctx = gsap.context(() => {
      gsap.fromTo(wrapperRef.current,
        { x: 0 },
        {
          x: -300,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    if (!section || !cursor) return;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!hasMoved.current) {
      hasMoved.current = true;
      gsap.set(cursor, { x, y });
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)' });
    } else {
      gsap.to(cursor, { x, y, duration: 0.15, ease: 'power2.out' });
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    hasMoved.current = false;
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="overflow-hidden py-10 relative cursor-none"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <style>{`
        @keyframes marquee-rtl {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-rtl {
          display: flex;
          width: max-content;
          animation: marquee-rtl 180s linear infinite;
        }
      `}</style>

      {/* wrapperRef gets the scroll-driven x offset on top of CSS animation */}
      <div ref={wrapperRef}>
        <div className="marquee-rtl items-center">
          {track.map((item, i) => (
            <div key={i} className="flex-shrink-0 flex items-center mx-6">
              {item.type === 'text' ? (
                <span className="text-black font-semibold font-sans text-[80px] sm:text-[120px] md:text-[182px] leading-none whitespace-nowrap">
                  {item.content}
                </span>
              ) : (
                <div className="relative w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-4 sm:mb-6 md:mb-8 rounded-3xl overflow-hidden flex-shrink-0">
                  <Image src={item.content} alt="" fill className="object-cover w-full h-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="absolute pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2 top-0 left-0"
      >
        <div className="px-5 py-3.5 rounded-full bg-[#b2f6e3] flex items-center justify-center">
          <span className="text-black font-semibold text-md">Send Us Your Brief ↗</span>
        </div>
      </div>
    </div>
  );
}
