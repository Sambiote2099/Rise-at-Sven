"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import ScrollSmoother from "gsap/ScrollSmoother"

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    // ScrollSmoother needs body overflow hidden; skip on touch devices
    // to avoid fighting native scroll
    const isTouchDevice = window.matchMedia('(hover: none)').matches;

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current!,
      content: contentRef.current!,
      smooth: isTouchDevice ? 0 : 1,
      effects: !isTouchDevice,
      normalizeScroll: false,
    })

    return () => {
      smoother.kill()
    }
  }, [])

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  )
}
