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

    try {
      // Create scrollerProxy for better ScrollTrigger integration
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length && value !== undefined) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        scrollLeft(value) {
          if (arguments.length && value !== undefined) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: document.body.style.transform ? "transform" : "fixed",
      });

      // Ensure scrollbar is visible and working
      document.body.style.overflow = "auto";

      // Update ScrollTrigger when Lenis scrolls
      lenis.on("scroll", ScrollTrigger.update);

      // Centralized refresh handler for all animations
      const handleRefresh = () => {
        setTimeout(() => {
          try {
            // Check if ScrollTrigger has triggers before refreshing
            if (ScrollTrigger.getAll && ScrollTrigger.getAll().length > 0) {
              ScrollTrigger.refresh();
            }
          } catch (e) {
            // Silently handle refresh errors
          }
        }, 200);
      };

      // Handle window resize
      const handleResize = () => {
        handleRefresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        try {
          ScrollTrigger.scrollerProxy(document.body, {});
        } catch (e) {
          // Silently handle cleanup errors
        }
        document.body.style.overflow = "";
      };
    } catch (e) {
      // Silently handle initialization errors
    }
  }, [lenis, isIOS]);

  if (isIOS) return null;
  return <ReactLenis root />;
}
