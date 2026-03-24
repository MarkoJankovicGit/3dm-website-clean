"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(0, { immediate: false, duration: 1.5 });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <a
      href="#"
      id="to-top"
      className={`btn btn-to-top slide-up`}
      onClick={handleScrollToTop}
      style={{
        opacity: visible ? 1 : 0,
        visibility: visible ? "inherit" : "hidden",
        pointerEvents: visible ? "auto" : "none",
      }}
      suppressHydrationWarning
    >
      <i className="ph ph-arrow-up" />
    </a>
  );
}
