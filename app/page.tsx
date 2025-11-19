"use client";

import { gsap } from "@/gsap/setup";
import Hero from "./landing/hero";

export default function HomePage() {
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    gsap.to(e.currentTarget, { scale: 1.2, yoyo: true, repeat: 1 });
  };

  return (
    <main className="flex flex-col">
      <Hero />
      <button onClick={handleClick}>Click me</button>
    </main>
  );
}
