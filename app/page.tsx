"use client";

import Hero from "@/components/homes/home-1/Hero";
import About from "@/components/homes/home-1/About";
import Partners from "@/components/homes/home-1/Partners";
import ServicesStack from "@/components/homes/home-1/ServicesStack";
import Marquee from "@/components/homes/home-1/Marquee";
import Projects from "@/components/homes/home-1/Projects";
import MarqueeSection2 from "@/components/homes/home-1/MarqueeSection2";
import Testimonials from "@/components/homes/home-1/Testimonials";
import Devider from "@/components/homes/home-1/Devider";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Partners />
      <ServicesStack />
      <Marquee />
      <Projects />
      <MarqueeSection2 />
      <Testimonials />
      <Devider />
    </>
  );
}
