'use client';
import { useRef, useEffect } from 'react';

const LOGOS = [
  { name: 'Xbox', src: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox-Logo.svg' },
  { name: 'SIXT', src: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Sixt_logo.svg' },
  { name: 'Revolution Beauty', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'PlayStation', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Playstation_logo_colour.svg' },
  { name: 'Adidas', src: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
  { name: 'Nike', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
  { name: 'Apple', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Google', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
];

const AUTO_SPEED = 0.5; // px per frame during auto-scroll
const FRICTION = 1.92;  // velocity decay per frame
const items = [...LOGOS, ...LOGOS];

export default function LogoSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;

    const tick = () => {
      if (isDragging.current) {
        // during drag, position is set in onMouseMove
      } else {
        // apply inertia then auto-scroll
        if (Math.abs(velocityRef.current) > 0.1) {
          offsetRef.current += velocityRef.current;
          velocityRef.current *= FRICTION;
        } else {
          velocityRef.current = 0;
          offsetRef.current -= AUTO_SPEED;
        }
      }

      // seamless wrap
      if (offsetRef.current <= -halfWidth) offsetRef.current += halfWidth;
      if (offsetRef.current > 0) offsetRef.current -= halfWidth;

      track.style.transform = `translateX(${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    velocityRef.current = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    const delta = e.clientX - dragStartX.current;
    offsetRef.current = dragStartOffset.current + delta;
  };

  const stopDrag = () => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    // velocityRef keeps its last value and decays in tick()
  };

  return (
    <div
      className="overflow-hidden py-6 cursor-grab relative"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {/* Left gradient blur */}
      <div className="absolute left-0 top-0 h-full w-64 z-10 pointer-events-none"
        style={{ backdropFilter: 'blur(3px)', maskImage: 'linear-gradient(to right, White 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 100%)' }}
      />
      {/* Right gradient blur */}
      <div className="absolute right-0 top-0 h-full w-64 z-10 pointer-events-none"
        style={{ backdropFilter: 'blur(3px)', maskImage: 'linear-gradient(to left, white 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 100%)' }}
      />
      <div ref={trackRef} className="flex w-max gap-32">
        {items.map((logo, i) => (
          <div key={i} className="flex items-center mx-12 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.name}
              draggable={false}
              className="h-7 w-auto object-contain pointer-events-none scale-120"
              style={{ filter: 'brightness(0)' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
