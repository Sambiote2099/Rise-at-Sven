"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import AnimatedTextDown from "@/components/SplitTextDown";
import Navbar from "@/components/Navbar";

import CurtainReveal from "@/components/CurtainReveal";
import LogoSlider from "@/components/LogoSlider";
import FeaturedWork from "@/components/FeaturedWork";
import ServiceItem from "@/components/ServiceItem";
import TextImageMarquee from "@/components/TextImageMarquee";
import StackedCards from "@/components/StackedCards";
import WhatsNew from "@/components/WhatsNew";
import ReadyToRise from "@/components/ReadyToRise";
import Footer from "@/components/Footer";

const IMAGES = [
  "https://images.unsplash.com/photo-1778071073381-1a4dc5650727?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1553013746-013d9c76dfa2?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1777266450837-94423d75af89?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1722018576685-45a415a4ff67?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Home() {
  const inlineImageRef = useRef<HTMLDivElement>(null);
  const [image] = useState(() => IMAGES[Math.floor(Math.random() * IMAGES.length)]);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!inlineImageRef.current) return;

    // start collapsed at center, then expand after texts have appeared
    gsap.fromTo(
      inlineImageRef.current,
      { width: 0, opacity: 0 },
      {
        width: "7.5rem", // matches w-30
        opacity: 1,
        duration: 0.7,
        ease: "power3.inOut",
        delay: 2, // after text animations finish
      }
    );
  }, []);

  return (
    <div className="bg-[#efeeec] w-full">
      {/* Backdrop overlay — covers full viewport, sits below navbar z-level */}
      <div
        className={`fixed inset-0 z-30 backdrop-blur-lg transition-opacity duration-300 pointer-events-none ${navOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      <CurtainReveal />
      
      <main className="px-2.5 py-2.5">
        <section className="relative z-50 w-full rounded-[25px] transition-all duration-500 hover:rounded-lg overflow-hidden">
          <button className="relative font-sans font-semibold py-1.5 w-full bg-[#b2f6e3] text-[13px] group overflow-hidden">
            <div className="relative py-0 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-black font-bold transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:-translate-y-[140%]">
                <p>🚨 The Category Leaderboard - Live Now</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-black font-bold transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] translate-y-[140%] group-hover:translate-y-0">
                <p>🚨 The Category Leaderboard - Live Now</p>
              </div>
              <p className="invisible font-bold">🚨 The Category Leaderboard - Live Now</p>
            </div>
          </button>
        </section>

        <section className="relative mt-2 h-[420px] sm:h-[520px] md:h-[620px] rounded-3xl overflow-hidden">
          {/* Fixed navbar outside overflow-hidden hero */}
    
        <Navbar onMenuChange={setNavOpen} />
      
            
            <div className="absolute inset-0 z-20 mt-20 sm:mt-24 md:mt-28 items-center flex flex-col font-sans font-semibold text-[12px] sm:text-[13px] md:text-[14px]">
              <p>#1MOST RECOMMENDED</p>
            </div>
            <div className="absolute inset-0 z-20 mt-24 sm:mt-28 md:mt-32 items-center flex flex-col font-sans font-semibold text-[12px] sm:text-[13px] md:text-[14px]">
              <p>CONTENT MARKETING AGENCY</p>
              <Image
                  src="https://res.cloudinary.com/diasvvkil/image/upload/v1778518931/Screenshot_11-5-2026_225558_riseatseven.com-removebg-preview_luiapj.png"
                  alt="Leaderboard"
                  width={305}
                  height={47}
                  className="w-[180px] sm:w-[240px] md:w-[305px] h-auto"
                />
            </div>

            <div className="absolute gap-1 sm:gap-2 md:gap-3 inset-0 z-10 flex top-32 sm:top-38 md:top-44 justify-center text-white text-[52px] sm:text-[88px] md:text-[125px] font-sans font-semibold">
              <AnimatedTextDown text="We" delay={1.4} />
              <AnimatedTextDown text="Create" delay={1.45} />
            </div>

            <div className="absolute gap-1 sm:gap-2 md:gap-3 inset-0 z-10 flex items-center top-24 sm:top-30 md:top-36 justify-center text-white text-[52px] sm:text-[88px] md:text-[125px] font-sans font-semibold">
              <AnimatedTextDown text="Category" delay={1.4} />

              {/* Inline image — starts at width 0, expands from center */}
              <div
                ref={inlineImageRef}
                className="overflow-hidden rounded-2xl flex-shrink-0 h-14 sm:h-22 md:h-31 hidden sm:block"
                style={{ width: 0, opacity: 0 }}
              >
                <Image
                  src={image}
                  alt="Leaderboard"
                  width={1200}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>

              <AnimatedTextDown text="Leaders" delay={1.45} />
            </div>
            <div className="absolute inset-0 z-10 flex items-center top-64 sm:top-76 md:top-90 justify-center text-white text-[14px] sm:text-[20px] md:text-[28px] font-sans font-semibold px-4 text-center">
              on every searchable platform
            </div>
        

          <Image
            src={image}
            alt="Leaderboard"
            width={1200}
            height={600}
            className="object-cover w-full h-full rounded-2xl blur-sm"
          />

          {/* Bottom left & right text */}
          <div className="absolute left-4 right-4 bottom-4 z-10 flex items-end justify-between text-white text-[11px] sm:text-[13px] md:text-[15px] font-sans">
            <div className="flex flex-col max-w-[60%] sm:max-w-none">
              <p className="hidden sm:block">Organic media planners creating, distributing & optimising</p>
              <div className="flex flex-row gap-1 flex-wrap">
                <p className="font-bold">search-first</p> <p className="hidden sm:block"> content for SEO, Social, PR, Ai and LLM search</p>
              </div>
            </div>
            <div className="flex flex-col items-end font-bold text-right">
              <p>4 Global Offices serving</p>
              <p>UK, USA (New York) & EU</p>
            </div>
          </div>
          
        </section>
        <section className="px-2 mt-4">
          <p className="text-black font-sans text-sm mb-2 ml-1">The agency behind</p>
          <LogoSlider />
        </section>

        {/* Driving Demand section */}
        <section className="flex flex-col md:flex-row md:justify-between px-4 sm:px-6 py-8 sm:py-12 md:py-14 gap-6 md:gap-4">
          {/* Left: description */}
          <p className="text-black font-semibold font-sans text-base sm:text-lg md:text-xl mt-0 md:mt-2 max-w-full md:max-w-[340px]">
            A global team of search-first content marketers
            engineering semantic relevancy &amp; category
            signals for both the internet and people
          </p>

          {/* Right: heading + buttons */}
          <div className="flex flex-col gap-4 sm:gap-6 max-w-full md:max-w-[560px]">
            <h2 className="text-black font-sans font-bold text-[36px] sm:text-[50px] md:text-[64px] leading-[1.05]">
              Driving Demand &amp;{' '}
              <span className="inline-flex items-end gap-2 flex-wrap">
                Discovery
                <span className="inline-block w-12 h-12 sm:w-14 sm:h-14 md:w-17 md:h-17 rounded-xl overflow-hidden flex-shrink-0 mb-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1553013746-013d9c76dfa2?w=200&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </span>
              </span>
            </h2>

            <div className="flex items-center gap-3 flex-wrap">
              <button className="relative bg-white border border-black/10 text-black text-[13px] sm:text-[14px] font-semibold px-5 sm:px-6 py-3 sm:py-3.5 rounded-[25px] hover:rounded-lg duration-500 transition-all whitespace-nowrap overflow-hidden group shadow-sm">
                <div className="relative overflow-hidden flex items-center gap-1 h-[1.2em]">
                  <span className="absolute inset-0 flex items-center gap-1 transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:-translate-y-[140%]">
                    Our Story <span>↗</span>
                  </span>
                  <span className="invisible flex items-center gap-1">Our Story ↗</span>
                  <span className="absolute inset-0 flex items-center gap-1 translate-y-[140%] transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:translate-y-0">
                    Our Story <span>↗</span>
                  </span>
                </div>
              </button>

              <button className="relative text-black text-[13px] sm:text-[14px] font-semibold px-5 sm:px-6 py-3 sm:py-3.5 rounded-[25px] duration-300 transition-all whitespace-nowrap overflow-hidden group">
                <div className="relative overflow-hidden flex items-center gap-1 h-[1.2em]">
                  <span className="absolute inset-0 flex items-center gap-1 transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:-translate-y-[140%]">
                    Our Services <span>↗</span>
                  </span>
                  <span className="invisible flex items-center gap-1">Our Services ↗</span>
                  <span className="absolute inset-0 flex items-center gap-1 translate-y-[140%] transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:translate-y-0">
                    Our Services <span>↗</span>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </section>
        <section className="scale-97 mt-1">
          <FeaturedWork />
          <div className="flex justify-center mt-8">
           <button className="hover:rounded-lg rounded-[25px] transition-all duration-500 relative py-3 px-6 bg-white text-[16px] group overflow-hidden">
            <div className="relative py-0 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-black font-bold transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:-translate-y-[140%]">
                <p>Explore Our Work ↗</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-black font-bold transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] translate-y-[140%] group-hover:translate-y-0">
                <p>Explore Our Work ↗</p>
              </div>
              <p className="invisible font-bold">Explore Our Work ↗</p>
            </div>
          </button>
          </div>
        </section>

        {/* Our Services section */}
        <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-14">
          {/* Header row */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <h2 className="text-black font-semibold font-sans text-[40px] sm:text-[56px] md:text-[74px] leading-none flex items-end gap-2 sm:gap-3">
              Our
              <span className="inline-block w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl overflow-hidden flex-shrink-0 mb-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&auto=format&fit=crop"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </span>
              Services
            </h2>

            {/* View All Services button */}
            <button className="relative bg-white text-black text-[13px] sm:text-[15px] font-semibold px-4 sm:px-5 py-3 sm:py-4 rounded-[25px] hover:rounded-lg duration-500 transition-all whitespace-nowrap overflow-hidden group flex-shrink-0">
              <div className="relative overflow-hidden flex items-center gap-1 h-[1.2em]">
                <span className="absolute inset-0 flex items-center gap-1 transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:-translate-y-[140%]">
                  View All Services <span>↗</span>
                </span>
                <span className="invisible flex items-center gap-1">View All Services ↗</span>
                <span className="absolute inset-0 flex items-center gap-1 translate-y-[140%] transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:translate-y-0">
                  View All Services <span>↗</span>
                </span>
              </div>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-black/20" />

          {/* Services grid */}
          <div className="flex flex-col sm:flex-row sm:ml-4 md:ml-8 mt-8 gap-0 sm:gap-4">
            <div className="flex-1">
              {[
                { label: 'Digital PR', image: 'https://images.unsplash.com/photo-1553013746-013d9c76dfa2?w=600&auto=format&fit=crop' },
                { label: 'Search & Growth Strategy', image: 'https://images.unsplash.com/photo-1778071073381-1a4dc5650727?w=600&auto=format&fit=crop' },
                { label: 'Data & Insights', image: 'https://images.unsplash.com/photo-1777266450837-94423d75af89?w=600&auto=format&fit=crop' },
              ].map((s, i, arr) => (
                <ServiceItem key={s.label} label={s.label} image={s.image} showDivider={i < arr.length - 1} paddingClass="sm:pr-10" />
              ))}
            </div>
            <div className="flex-1">
              {[
                { label: 'Organic Social & Content', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop' },
                { label: 'Content Experience', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop' },
                { label: 'Onsite SEO', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop' },
              ].map((s, i, arr) => (
                <ServiceItem key={s.label} label={s.label} image={s.image} showDivider={i < arr.length - 1} paddingClass="sm:pl-10" />
              ))}
            </div>
          </div>
        </section>

        <section>
          <TextImageMarquee />
        </section>
        <section className="flex justify-center mt-4">
          <h6 className="text-2xl font-sans text-black font-semibold">Legacy In The Making</h6>
        </section>

        <section>
          <StackedCards />
        </section>

        <WhatsNew />

        <ReadyToRise />
      </main>
      <Footer />
    </div>
  );
}
