"use client";
import ReactLenis, { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function LenisSmoothScroll() {
  const lenis = useLenis();
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (!lenis || isIOS) return;

    // Update ScrollTrigger on every Lenis scroll tick
    lenis.on("scroll", ScrollTrigger.update);

    // Handle window resize
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
