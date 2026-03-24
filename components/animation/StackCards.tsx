"use client";

import {
  useEffect,
  useRef,
  Children,
  isValidElement,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StackCardsProps = {
  className?: string;
  offset?: React.ReactNode;
  pin?: boolean;
  scrub?: boolean | number;
  durationMul?: number;
  children: React.ReactNode;
  stackName?: string;
};

export default function StackCards({
  className,
  offset,
  pin = true,
  scrub = true,
  durationMul = 0.5,
  children,
  stackName = "services-stack",
}: StackCardsProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLElement[]>([]);

  // Changed from useLayoutEffect to useEffect
  useEffect(() => {
    if (typeof window === "undefined") return;
    const wrapper = wrapperRef.current;
    const offsetEl = offsetRef.current;

    const items = itemRefs.current.filter(Boolean);
    if (!wrapper || items.length === 0) return;

    let tl: gsap.core.Timeline | null = null;
    let st: ScrollTrigger | null = null;

    const initCards = () => {
      st?.kill();
      tl?.kill();

      gsap.set(items, { clearProps: "transform" });

      const first = items[0];
      const cardHeight =
        first.getBoundingClientRect().height || first.offsetHeight;

      tl = gsap.timeline({ defaults: { ease: "none" } });

      items.forEach((card, index) => {
        if (index > 0) {
          gsap.set(card, { y: index * cardHeight, willChange: "transform" });
          tl!.to(card, { y: 0, duration: index * durationMul }, 0);
        }
      });

      st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        pin,
        pinSpacing: true,
        anticipatePin: 1,
        end: () => {
          const extra = offsetEl?.offsetHeight ?? 0;
          return `+=${items.length * cardHeight + extra}`;
        },
        scrub,
        animation: tl!,
        invalidateOnRefresh: true,
      });
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.saveStyles(items);
      initCards();
    }, wrapper);

    return () => {
      st?.kill();
      tl?.kill();
      ctx.revert();
    };
  }, [pin, scrub, durationMul, children]);

  useEffect(() => {
    const onLoad = () => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const wrappedChildren = Children.map(children, (child, index) => {
    const content = isValidElement(child) ? child : <>{child}</>;
    return (
      <div
        ref={(el) => {
          if (el) itemRefs.current[index] = el;
        }}
        className="stack-item"
        style={{ willChange: "transform" }}
      >
        {content}
      </div>
    );
  });

  return (
    <div ref={wrapperRef} className={className} suppressHydrationWarning>
      <div className="stack-offset" ref={offsetRef}>
        {offset}
      </div>
      <div className={stackName}>{wrappedChildren}</div>
    </div>
  );
}
