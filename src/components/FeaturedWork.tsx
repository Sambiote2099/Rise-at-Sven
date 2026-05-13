'use client';
import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { client: 'SIXT', project: 'Doio – B2B', stat: 'An extra 3m clicks\nregionally through SEO', color: '#c8702a', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop' },
  { client: 'PlayStation', project: 'PS5 Campaign', stat: '2x increase in\norganic visibility', color: '#1a3a5c', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&auto=format&fit=crop' },
  { client: 'Xbox', project: 'Game Pass Launch', stat: '500k new subscribers\nin 30 days', color: '#1a6b3a', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&auto=format&fit=crop' },
  { client: 'Adidas', project: 'Run for the Oceans', stat: '12m impressions\nacross social & search', color: '#2a4a7a', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop' },
  { client: 'Rise at Seven', project: 'Search-First Strategy', stat: '#1 ranked agency\nfor content marketing', color: '#6b3a8a', image: 'https://images.unsplash.com/photo-1778071073381-1a4dc5650727?q=80&w=800&auto=format&fit=crop' },
  { client: 'Content Experience', project: 'Semantic Relevancy', stat: '300% uplift in\ntopical authority', color: '#8a3a3a', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop' },
  { client: 'Digital PR', project: 'Category Signals', stat: '800+ links earned\nin 6 months', color: '#3a6b5c', image: 'https://images.unsplash.com/photo-1553013746-013d9c76dfa2?q=80&w=800&auto=format&fit=crop' },
  { client: 'B2B Marketing', project: 'Demand Generation', stat: '4x pipeline growth\nthrough search', color: '#7a5a1a', image: 'https://images.unsplash.com/photo-1777266450837-94423d75af89?q=80&w=800&auto=format&fit=crop' },
  { client: 'Social SEO', project: 'Platform Growth', stat: '1m+ TikTok views\ndriven by SEO content', color: '#1a5a6b', image: 'https://plus.unsplash.com/premium_photo-1722018576685-45a415a4ff67?q=80&w=800&auto=format&fit=crop' },
  { client: 'Data & Insights', project: 'LLM Search Optimisation', stat: 'Top 3 in AI search\nfor 40+ categories', color: '#4a3a7a', image: 'https://images.unsplash.com/photo-1778071073381-1a4dc5650727?q=80&w=800&auto=format&fit=crop' },
];

interface ImageCardProps {
  item: typeof ITEMS[0];
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

function ImageCard({ item, active, onEnter, onLeave }: ImageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const hasMoved = useRef(false);

  useEffect(() => {
    gsap.set(overlayRef.current, { y: 620 });
    // Hide cursor completely off-screen until mouse moves over card
    gsap.set(cursorRef.current, { scale: 0, opacity: 0, x: -999, y: -999 });
    gsap.set(statRef.current, { opacity: 0, y: 20 });
  }, []);

  useEffect(() => {
    gsap.killTweensOf(overlayRef.current);
    gsap.killTweensOf(cursorRef.current);
    gsap.killTweensOf(statRef.current);
    if (active) {
      gsap.to(overlayRef.current, { y: 0, duration: 1, ease: 'power3.out' });
      // Stat text fades in after overlay is mostly done
      gsap.to(statRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.5 });
    } else {
      hasMoved.current = false;
      gsap.to(overlayRef.current, { y: 620, duration: 0.6, ease: 'power3.in' });
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
      gsap.to(statRef.current, { opacity: 0, y: 20, duration: 0.2, ease: 'power2.in' });
    }
  }, [active]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const cursor = cursorRef.current;
    if (!card || !cursor) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!hasMoved.current && active) {
      // First move: snap cursor to position then show it
      hasMoved.current = true;
      gsap.set(cursor, { x, y });
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)' });
    } else {
      gsap.to(cursor, { x, y, duration: 0.15, ease: 'power2.out' });
    }
  }, [active]);

  const lines = item.stat.split('\n');

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 rounded-2xl cursor-none"
      style={{ height: '500px', overflow: 'hidden' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMouseMove}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.image} alt={item.client} className="w-full h-full object-cover" />

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute left-0 right-0 pointer-events-none z-10"
        style={{ bottom: 0, height: 'calc(100% + 120px)', top: 'auto' }}
      >
        <svg viewBox="0 0 800 120" preserveAspectRatio="none" className="absolute left-0 w-full" style={{ top: 0, height: '120px' }}>
          <path d="M0,120 Q400,0 800,120 L800,120 L0,120 Z" fill={item.color} />
        </svg>
        <div className="absolute left-0 right-0 bottom-0" style={{ top: '119px', backgroundColor: item.color }} />

        {/* Stat text — appears after overlay */}
        <div ref={statRef} className="absolute top-32 left-8 right-8 z-20">
          {lines.map((line, i) => (
            <p key={i} className="text-black font-semibold font-sans text-[46px] leading-[1.15]">{line}</p>
          ))}
        </div>
      </div>

      {/* Glassmorphism badge */}
      <div className="absolute bottom-3 right-3 pointer-events-none z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[13px] font-sans font-medium">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        {item.project}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
      </div>

      {/* Cursor circle — only shown after first mousemove on card */}
      <div
        ref={cursorRef}
        className="absolute pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2"
        style={{ top: 0, left: 0 }}
      >
        <div className="w-28 h-28 rounded-full bg-[#b2f6e3] flex items-center justify-center">
          <span className="text-black font-bold text-4xl">↗</span>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textTrackRef = useRef<HTMLDivElement>(null);
  const imageTrackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleEnter = useCallback((i: number) => () => setActiveIndex(i), []);
  const handleLeave = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    const section = sectionRef.current;
    const textTrack = textTrackRef.current;
    const imageTrack = imageTrackRef.current;
    if (!section || !textTrack || !imageTrack) return;

    const totalItems = ITEMS.length;
    const scrollDistance = (totalItems - 1) * 100;
    const yPercent = -((totalItems - 1) / totalItems) * 100;

    const ctx = gsap.context(() => {
      gsap.to(imageTrack, {
        yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollDistance}vh`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${scrollDistance}vh`,
        scrub: 0.5,
        onUpdate: (self) => {
          const items = textTrack.querySelectorAll<HTMLElement>('[data-index]');
          if (!items.length) return;
          const itemH = items[0].offsetHeight;
          const centerOffset = (section.offsetHeight / 2) - (itemH / 2);
          const totalScroll = itemH * (totalItems - 1);
          gsap.set(textTrack, { y: centerOffset - self.progress * totalScroll });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const textTrack = textTrackRef.current;
    if (!textTrack) return;
    const items = textTrack.querySelectorAll<HTMLElement>('[data-index]');
    items.forEach((el, i) => {
      gsap.to(el, { x: activeIndex === i ? 12 : 0, duration: 0.3, ease: 'power2.out' });
    });
  }, [activeIndex]);

  return (
    <div ref={sectionRef} className="relative bg-black rounded-3xl">
      <div className="sticky top-0 h-screen flex overflow-hidden">

        {/* Left — text track */}
        <div className="w-1/2 overflow-hidden relative flex items-center">
          <p className="absolute top-20 left-10 font-semibold text-white text-xl font-sans z-50">Featured Work</p>
          <div className="absolute inset-x-0 top-0 h-92 rounded-3xl bg-gradient-to-b from-black from-50% via-black/40 via-60% to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-64 rounded-3xl bg-gradient-to-t from-black from-50% via-black/40 via-70% to-transparent z-10 pointer-events-none" />

          <div ref={textTrackRef} className="flex mt-74 flex-col pl-10">
            {ITEMS.map((item, i) => (
              <div
                key={i}
                data-index={i}
                className="leading-none cursor-pointer"
                onMouseEnter={handleEnter(i)}
                onMouseLeave={handleLeave}
              >
                <h3 className="text-white font-semibold font-sans text-[74px] leading-[1.1]">{item.client}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image track */}
        <div className="w-1/2 overflow-hidden p-6 pl-0">
          <div ref={imageTrackRef} className="flex flex-col gap-4">
            {ITEMS.map((item, i) => (
              <ImageCard
                key={i}
                item={item}
                active={activeIndex === i}
                onEnter={handleEnter(i)}
                onLeave={handleLeave}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
