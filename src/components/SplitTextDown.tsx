"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function AnimatedTextDown({
  text,
  delay,
  maskHeight = "1.2em",
}: {
  text: string;
  delay: number;
  maskHeight?: string;
}) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, { type: "chars" });

    // wrap each char in an overflow-hidden div with controlled height
    split.chars.forEach((char) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      wrapper.style.height = maskHeight;
      wrapper.style.display = "inline-flex";
      wrapper.style.alignItems = "flex-end";
      char.parentNode!.insertBefore(wrapper, char);
      wrapper.appendChild(char);
    });

    const animation = gsap.fromTo(
      split.chars,
      { y: "100%" },
      {
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        delay,
        stagger:0.01
      }
    );

    return () => {
      animation.kill();
      split.revert();
    };
  }, [delay, maskHeight]);

  return (
    <div ref={textRef}>
      {text}
    </div>
  );
}
