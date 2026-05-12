'use client';
import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const POSTS = [
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop',
    tag: null,
    author: 'Ray Saddiq',
    authorImg: 'https://images.unsplash.com/photo-1553013746-013d9c76dfa2?w=80&auto=format&fit=crop',
    readTime: '3 mins',
    title: 'Rise at Seven Appoints Hollie Lovell as Senior Operations Lead',
  },
  {
    image: 'https://images.unsplash.com/photo-1778071073381-1a4dc5650727?w=600&auto=format&fit=crop',
    tag: null,
    author: 'Ray Saddiq',
    authorImg: 'https://images.unsplash.com/photo-1553013746-013d9c76dfa2?w=80&auto=format&fit=crop',
    readTime: '2 mins',
    title: 'Rise at Seven Exits Sheffield and Triples Manchester as new HQ as they go for global expansion',
  },
  {
    image: 'https://images.unsplash.com/photo-1777266450837-94423d75af89?w=600&auto=format&fit=crop',
    tag: 'News',
    author: 'Carrie Rose',
    authorImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&auto=format&fit=crop',
    readTime: '2 mins',
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
  },
];

function PostCard({ post }: { post: typeof POSTS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const hasMoved = useRef(false);

  useEffect(() => {
    gsap.set(overlayRef.current, { y: 600 });
    gsap.set(cursorRef.current, { scale: 0, opacity: 0, x: -999, y: -999 });
  }, []);

  const onMouseEnter = useCallback(() => {
    gsap.killTweensOf([overlayRef.current, cardRef.current]);
    gsap.to(overlayRef.current, { y: 0, duration: 1, ease: 'power3.out' });
    gsap.to(cardRef.current, { y: -8, duration: 0.4, ease: 'power2.out' });
  }, []);

  const onMouseLeave = useCallback(() => {
    hasMoved.current = false;
    gsap.killTweensOf([overlayRef.current, cursorRef.current, cardRef.current]);
    gsap.to(overlayRef.current, { y: 500, duration: 0.6, ease: 'power1.in' });
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
    gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: 'power2.out' });
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const cursor = cursorRef.current;
    if (!card || !cursor) return;
    const rect = card.getBoundingClientRect();
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

  return (
    <div
      ref={cardRef}
      className="flex flex-col gap-3 cursor-none group relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      {/* Image container */}
      <div className="relative w-full h-[412px] rounded-3xl overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover h-full w-full"
        />
        {post.tag && (
          <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-black text-[12px] font-semibold px-3 py-1 rounded-full z-10">
            {post.tag}
          </span>
        )}

        {/* Arc overlay — SVG arc tint + blur layer masked to arc shape */}
        <div
          ref={overlayRef}
          className="absolute left-0 right-0 pointer-events-none z-10"
          style={{ bottom: 0, height: 'calc(100% + 80px)', top: 'auto' }}
        >
          {/* Blur layer masked to arc shape using inline SVG data URI */}
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: 'blur(20px) brightness(0.75)',
              WebkitBackdropFilter: 'blur(20px) brightness(0.75)',
              maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,18 Q50,0 100,18 L100,100 L0,100 Z' fill='white'/%3E%3C/svg%3E")`,
              WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,18 Q50,0 100,18 L100,100 L0,100 Z' fill='white'/%3E%3C/svg%3E")`,
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
            }}
          />
          {/* Glass tint on top */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,18 Q50,0 100,18 L100,100 L0,100 Z" fill="rgba(255,255,255,0.12)" />
          </svg>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 text-[13px] text-black/50 font-sans">
        <div className="flex text-grey-500 text-[15px] font-sans font-semibold items-center gap-1 bg-white px-3 rounded-full py-1">
          <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0 bg-white">
            <Image src={post.authorImg} alt={post.author} fill className="object-cover" sizes="20px" />
          </div>
          
          <span>{post.author}</span>
        </div>
       
        <div className="flex text-grey-500 font-sans text-[15px] font-semibold items-center gap-1 bg-white px-3 rounded-full py-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-black font-bold font-sans text-[22px] leading-snug">
        {post.title}
      </h3>

      {/* Custom cursor — positioned over whole card */}
      <div
        ref={cursorRef}
        className="absolute pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2 top-0 left-0"
      >
        <div className="w-20 h-20 rounded-full bg-[#b2f6e3] flex items-center justify-center">
          <span className="text-black font-bold text-2xl">↗</span>
        </div>
      </div>
    </div>
  );
}

export default function WhatsNew() {
  return (
    <section className="px-6 py-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-black font-semibold font-sans text-[68px] leading-none flex items-end gap-3">
          What&apos;s
          <span className="inline-block w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 mb-1">
            <Image
              src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&auto=format&fit=crop"
              alt=""
              width={164}
              height={164}
              className="w-full h-full object-cover"
            />
          </span>
          New
        </h2>

        <button className="relative bg-white text-black text-[15px] font-semibold px-5.5 py-3.5 rounded-[25px] hover:rounded-lg duration-500 transition-all whitespace-nowrap overflow-hidden group flex-shrink-0">
          <div className="relative overflow-hidden flex items-center gap-1 h-[1.2em]">
            <span className="absolute inset-0 flex items-center gap-1 transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:-translate-y-[140%]">
              Explore More Thoughts <span>↗</span>
            </span>
            <span className="invisible flex items-center gap-1">Explore More Thoughts ↗</span>
            <span className="absolute inset-0 flex items-center gap-1 translate-y-[140%] transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:translate-y-0">
              Explore More Thoughts <span>↗</span>
            </span>
          </div>
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-black/20 mb-8" />

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6">
        {POSTS.map((post, i) => (
          <PostCard key={i} post={post} />
        ))}
      </div>
    </section>
  );
}
