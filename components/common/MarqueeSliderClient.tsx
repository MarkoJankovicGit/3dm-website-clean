"use client";

import dynamic from "next/dynamic";

// Dynamically import MarqueeSlider with SSR completely disabled
// This prevents any hydration mismatch since the component only renders on the client
const MarqueeSlider = dynamic(
  () => import("@/components/common/MarqueeSlider"),
  { 
    ssr: false,
    loading: () => (
      <div className="mxd-section padding-pre-title">
        <div className="mxd-container fullwidth-container">
          <div className="mxd-block" style={{ minHeight: "400px" }} />
        </div>
      </div>
    )
  }
);

export default function MarqueeSliderClient() {
  return <MarqueeSlider />;
}
