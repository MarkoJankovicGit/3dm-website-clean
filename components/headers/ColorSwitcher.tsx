"use client";

import React, { useEffect, useState } from "react";

export default function ThemeSwitcherButton({}) {
  const [mounted, setMounted] = useState(false);
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Read from localStorage only after mount
    const stored = localStorage.getItem("color-scheme") as "light" | "dark" | null;
    if (stored) {
      setColorScheme(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const currentScheme = document.documentElement.getAttribute("color-scheme");
    if (currentScheme !== colorScheme) {
      document.documentElement.setAttribute("color-scheme", colorScheme);
    }
    if (localStorage.getItem("color-scheme") !== colorScheme) {
      localStorage.setItem("color-scheme", colorScheme);
    }
  }, [colorScheme, mounted]);

  const handleColorSwitch = () => {
    setColorScheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Always render the same structure on server and client initial render
  return (
    <button
      id="color-switcher"
      className="mxd-color-switcher"
      type="button"
      role="switch"
      aria-label="light/dark mode"
      aria-checked={colorScheme === "dark"}
      onClick={handleColorSwitch}
      style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.2s" }}
      suppressHydrationWarning
    >
      <i
        className={
          colorScheme === "dark"
            ? "ph-bold ph-sun-horizon"
            : "ph-bold ph-moon-stars"
        }
        suppressHydrationWarning
      />
    </button>
  );
}
