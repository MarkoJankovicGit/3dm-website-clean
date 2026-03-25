"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Ukiyo from "ukiyojs";

type UkiyoBgProps = {
  className?: string;
  scale?: number;
  speed?: number;
  willChange?: boolean;
  src?: string;
  poster?: string;
  wrapperClass?: string;
};

const VideoParallax = ({
  className,
  scale = 1.2,
  speed = 1.5,
  willChange = true,
  wrapperClass,
  src = "/video/1920x1080_video-05.webm",
  poster = "/video/1920x1080_video-05.webp",
}: UkiyoBgProps) => {
  const elRef = useRef<HTMLVideoElement | null>(null);

  // Changed from useLayoutEffect to useEffect to fix hydration error
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
    <video
      preload="auto"
      autoPlay
      loop
      muted
      src={src}
      poster={poster}
      ref={elRef}
      className={className}
      suppressHydrationWarning
    />
  );
};

export default VideoParallax;
