"use client";

import { useGSAP, gsap, SplitText } from "@/gsap/setup";

export default function GallerySection3() {
  useGSAP(() => {
    const split = SplitText.create("h1", { type: "words, lines" });

    // Animate words flying in randomly from all directions
    gsap.from(split.words, {
      x: "random([-1000, 1000])",
      y: "random([-1000, 1000])",
      opacity: 0,
      ease: "expo.inOut",
      duration: 1.25,
    });

    return () => split.revert();
  });

  return (
    <h1 className="min-w-140 text-6xl uppercase fixed font-extrabold p-10 text-shadow-lg/30 text-center">
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </h1>
  );
}
