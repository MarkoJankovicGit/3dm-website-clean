"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AnimatedButton from "../animation/AnimatedButton";
import { usePathname } from "next/navigation";
import ThemeSwitcherButton from "./ColorSwitcher";

export default function Header1() {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsHidden(currentScrollPos > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="header" className={`mxd-header ${isHidden ? "is-hidden" : ""}`} suppressHydrationWarning>
      {/* header logo */}
      <div className="mxd-header__logo loading__fade">
        <Link href={`/home-main`} className="mxd-logo">
          {/* logo icon */}
          <img
            src="/img/logo-cube.png"
            alt="3DM logo"
            style={{ width: 44, height: 44, objectFit: "contain" }}
          />
          {/* logo text */}
          <span className="mxd-logo__text">
            <strong>3DM</strong>
            <br />
            <span style={{ fontWeight: 400, fontSize: "0.85em", color: "#646464" }}>Solutions</span>
          </span>
        </Link>
      </div>
      {/* header controls */}
      <div className="mxd-header__controls loading__fade">
        <ThemeSwitcherButton />

        {pathname == "/" || pathname == "/preview" ? (
          <AnimatedButton
            text="Purchase"
            className="btn btn-anim btn-default btn-mobile-icon btn-outline slide-right"
            href="https://themeforest.net/user/ib-themes/portfolio"
            target="_blank"
          >
            <i className="ph-bold ph-shopping-cart-simple" />
          </AnimatedButton>
        ) : (
          <AnimatedButton
            text="Get in Touch"
            className="btn btn-anim btn-default btn-mobile-icon btn-outline slide-right"
            href="/contact"
          >
            <i className="ph-bold ph-arrow-up-right" />
          </AnimatedButton>
        )}
      </div>
    </header>
  );
}
