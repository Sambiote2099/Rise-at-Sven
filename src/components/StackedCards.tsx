'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    bg: 'bg-white',
    title: 'Obsessives',
    titleColor: 'text-black',
    bodyColor: 'text-black',
    image: 'https://images.unsplash.com/photo-1778071073381-1a4dc5650727?w=600&auto=format&fit=crop',
    body1: "We live and breathe search. Every algorithm update, every platform shift, every cultural moment — we're watching, analysing, and acting faster than anyone else.",
    body2: "That obsession is what turns good content into category-defining campaigns.",
  },
  {
    bg: 'bg-[#b2f6e3]',
    title: 'Collaborators',
    titleColor: 'text-black',
    bodyColor: 'text-black',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop',
    body1: "We embed ourselves into your team, working as an extension of your brand. Our people become your people — sharing knowledge, building capability, and growing together.",
    body2: "From day one, we're invested in your success as much as our own.",
  },
  {
    bg: 'bg-black',
    title: 'Pioneers',
    titleColor: 'text-white',
    bodyColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1553013746-013d9c76dfa2?w=600&auto=format&fit=crop',
    body1: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
    body2: "We're on a mission to be the first search-first agency to win a Cannes Lion disrupting the status quo.",
  },
];

// Initial tilt angles for the stacked look (bottom card most tilted)
const INITIAL_ROTATIONS = [12, 8, 4];

export default function StackedCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Set initial stacked/tilted positions
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.set(card, {
        rotation: INITIAL_ROTATIONS[i],
        y: i * -8, // slight vertical offset for depth
        zIndex: i + 1,
      });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Card 0 (bottom/white): rotate CCW and fly up first
      tl.to(cardRefs.current[2], {
        rotation: -50,
        y: -800,
       
        duration: 1,
        ease: 'power2.inOut',
      }, 0);

      tl.to(cardRefs.current[1], {
        rotation: -50,
        y: -800,
      
        duration: 1,
        ease: 'power2.inOut',
      }, 0.8);

      // Card 2 (top/black): straighten as others leave
      tl.to(cardRefs.current[0], {
        rotation: -50,
        y: -800,
        duration: 1,
        ease: 'power1.out',
      }, 1.6);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative flex items-center justify-center" style={{ height: '100vh' }}>
      <div className="relative w-full max-w-xl px-4" style={{ height: '560px' }}>
        {CARDS.map((card, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`absolute inset-0 w-full rounded-3xl p-6 sm:p-10 flex flex-col items-center text-center ${card.bg} shadow-2xl`}
          >
            <div className="relative w-32 h-44 sm:w-48 sm:h-60 rounded-2xl overflow-hidden mb-3 sm:mb-5 flex-shrink-0">
              <Image src={card.image} alt={card.title} fill className="object-cover" sizes="192px" />
            </div>
            <h3 className={`font-bold font-sans text-[36px] sm:text-[52px] leading-none mb-3 sm:mb-4 ${card.titleColor}`}>
              {card.title}
            </h3>
            <p className={`font-sans text-[13px] sm:text-[15px] leading-relaxed mb-2 sm:mb-3 ${card.bodyColor}`}>{card.body1}</p>
            <p className={`font-sans text-[13px] sm:text-[15px] leading-relaxed ${card.bodyColor}`}>{card.body2}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
