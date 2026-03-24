"use client";
import { ElementType, useEffect, useRef } from "react";
import gsap from "gsap";
import Ukiyo from "ukiyojs";

type HtmlTag = keyof HTMLElementTagNameMap;

type UkiyoBgProps<T extends HtmlTag = "div"> = {
  as?: T;
  className?: string;
  scale?: number;
  speed?: number;
  willChange?: boolean;
  wrapperClass?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

const BackgroundParallax = <T extends HtmlTag = "div">({
  as,
  className,
  scale = 1.2,
  speed = 1.5,
  willChange = true,
  wrapperClass,
  children,
  ...rest
}: UkiyoBgProps<T>) => {
  const elRef = useRef<HTMLElement | null>(null);
  const Tag = (as ?? "div") as ElementType;

  // Changed from useLayoutEffect to useEffect
  useEffect(() => {
    if (!elRef.current) return;

    const instance = new Ukiyo(elRef.current, {
      scale,
      speed,
      willChange,
      wrapperClass,
      externalRAF: true,
    });

    const tick = () => instance.animate();
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
    };
  }, [scale, speed, willChange, wrapperClass]);

  return (
    <Tag ref={elRef} className={className} {...rest} suppressHydrationWarning>
      {children}
    </Tag>
  );
};

export default BackgroundParallax;
