"use client";

import ReactLenis, { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisSmoothScrollInner() {
  const lenis = useLenis();
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (!lenis || isIOS) return;

    lenis.on("scroll", ScrollTrigger.update);

    const handleResize = () => {
      setTimeout(() => {
        try {
          if (ScrollTrigger.getAll().length > 0) {
            ScrollTrigger.refresh();
          }
        } catch (e) {
          // Silently handle refresh errors
        }
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis, isIOS]);

  if (isIOS) return null;
  return <ReactLenis root />;
}
