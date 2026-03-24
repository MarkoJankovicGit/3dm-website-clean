"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxItemProps {
  speed?: number;
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxItem({
  speed = 0.5,
  children,
  className = "",
}: ParallaxItemProps) {
  const el = useRef(null);

  // Changed from useLayoutEffect to useEffect
  useEffect(() => {
    if (!el.current) return;

    const ctx = gsap.context(() => {
      gsap.to(el.current, {
        y: () => (1 - speed) * ScrollTrigger.maxScroll(window),
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          invalidateOnRefresh: true,
          scrub: 0,
        },
      });
    }, el);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={el} className={className} suppressHydrationWarning>
      {children}
    </div>
  );
}
