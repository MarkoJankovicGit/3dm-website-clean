"use client";

import dynamic from "next/dynamic";

const LenisSmoothScrollInner = dynamic(
  () => import("./LenisSmoothScrollInner"),
  { ssr: false }
);

export default function LenisSmoothScroll() {
  return <LenisSmoothScrollInner />;
}
