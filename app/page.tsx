import dynamic from "next/dynamic";
import { Metadata } from "next";

// Dynamic import with ssr: false prevents hydration errors permanently
// Even if this file is edited, the client-side only rendering is enforced
const HomeContent = dynamic(
  () => import("@/components/homes/home-1/HomeContent"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "3DM - AI Product Studio",
  description: "We are an AI product studio, we build, launch and scale AI-powered products and communities.",
};

export default function Home() {
  return <HomeContent />;
}
