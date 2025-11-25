"use client";

import { gsap } from "@/gsap/setup";
import HeroText from "./landing/hero-text";
import HeroGallery from "./landing/hero-gallery";

export default function HomePage() {
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    gsap.to(e.currentTarget, { scale: 1.2, yoyo: true, repeat: 1 });
  };

  return (
    <main className="flex flex-col">
      {/* HERO SECTION */}
      <HeroText />
      <HeroGallery />

      {/* Optional extra scroll space for the last gallery sections */}
      <div className="h-[200vh]" />
      <button onClick={handleClick}>Click me</button>
    </main>
  );
}
