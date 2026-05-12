'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_COLS = [
  ['Services', 'Work', 'About', 'Culture', 'Meet The Risers'],
  ['Testimonials', 'Blog & Resources', 'Webinars', 'Careers'],
  ['Sheffield', 'Manchester', 'London', 'New York', 'Contact'],
];

const SOCIALS = [
  { label: 'f ↗', href: '#' },
  { label: '𝕏 ↗', href: '#' },
  { label: 'in ↗', href: '#' },
  { label: '▶ ↗', href: '#' },
  { label: '✦ ↗', href: '#' },
  { label: '◎ ↗', href: '#' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const blocks = [topRef.current, navRef.current, logoRef.current, bottomRef.current];

      blocks.forEach((el, i) => {
        if (!el) return;
        const isLast = i === blocks.length - 1;
        gsap.fromTo(el,
          { opacity: 0},
          {
            opacity: 1,
           
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: isLast ? 'top 100%' : 'top 75%',
              end: isLast ? 'top 80%' : 'top 60%',
              scrub: 1,
            },
          }
        );
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-black rounded-3xl mx-2.5 mb-2.5 overflow-hidden">
      {/* Top section */}
      <div ref={topRef} className="flex gap-16 px-10 pt-12 pb-8">
        {/* Left — email signup + socials */}
        <div className="flex flex-col gap-5 min-w-[300px]">
          <p className="text-white font-semibold font-sans text-[26px]">Stay updated with Rise news</p>

          {/* Email input */}
          <div className="flex items-center bg-[#282828] rounded-full px-5 py-3 gap-3">
            <input
              type="email"
              placeholder="Your Email Address"
              className="bg-transparent text-white/60 text-[20px] font-semibold font-sans flex-1 outline-none placeholder:text-white/40"
            />
            <button className="w-12 h-12 hover:bg-white hover:rotate-85 transition-all duration-300 rounded-full bg-[#b2f6e3] flex items-center justify-center flex-shrink-0">
              <span className="text-black font-bold text-xl">↗</span>
            </button>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-1 flex-wrap">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="w-16.5 rounded-3xl py-1 px-5 bg-white text-black flex items-center justify-center text-[13px] transition-all duration-300"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right — nav columns */}
        <div ref={navRef} className="flex gap-16 flex-1 justify-end">
          {NAV_COLS.map((col, ci) => (
            <div key={ci} className="border-l border-[#282828] flex flex-col">
              {col.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white ml-4 font-sans text-[22px] font-semibold hover:text-white/60 transition-colors duration-300 whitespace-nowrap"
                >
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Big logo */}
      <div ref={logoRef} className="px-6 pt-8 pb-2">
        <h2
          className="text-white font-bold font-sans leading-none select-none"
          style={{ fontSize: 'clamp(60px, 12vw, 180px)' }}
        >
          Rise at Seven<span className="text-[0.6em] align-super">®</span>
        </h2>
      </div>

      {/* Bottom bar */}
      <div ref={bottomRef} className="flex items-center justify-between px-10 py-5 text-white text-[12px] font-sans flex-wrap gap-3">
        <div className="flex items-center gap-4 flex-wrap">
          <span>© 2025 Rise at Seven Ltd. All rights reserved</span>
          <span>•</span>
          <span>Company Number 11955187</span>
          <span>•</span>
          <span>VAT Registered GB 322402945</span>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors duration-300">Terms & conditions</a>
        </div>
        <span>Website MadeByShape</span>
      </div>
    </footer>
  );
}
