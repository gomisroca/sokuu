"use client";

import { useGSAP, gsap, SplitText } from "@/gsap/setup";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const Gallery = dynamic(() => import("./gallery"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function HeroText() {
  const textRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const [showGallery, setShowGallery] = useState(false);

  useGSAP(
    () => {
      const main = SplitText.create("#split", {
        type: "chars, lines",
        autoSplit: true,
      });

      const ghost = SplitText.create("#split-ghost", {
        type: "chars, lines",
        autoSplit: true,
      });

      // Main text animation
      gsap.from(main.lines, {
        xPercent: -50,
        duration: 2,
        ease: "power3.out",
      });

      // Ghost animation (slightly delayed)
      gsap.from(ghost.lines, {
        xPercent: -50,
        duration: 2,
        delay: 0.05,
        ease: "power3.out",
      });
    },
    { scope: textRef }
  );

  useGSAP(
    () => {
      if (!squareRef.current) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "+=800",
            scrub: true,
            pin: true,
            onEnter: () => setShowGallery(true),
          },
        })
        // Move text slightly to the right
        .to("#split", { x: "5vw", ease: "none" }, 0)
        .to("#split-ghost", { x: "5vw", ease: "none" }, 0)
        // Fade out text while fading in square
        .to("#split", { autoAlpha: 0, duration: 0.5 }, 0)
        .to("#split-ghost", { autoAlpha: 0, duration: 0.5 }, 0)
        .to(
          squareRef.current,
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out" },
          0
        );
    },
    { scope: textRef }
  );

  return (
    <>
      <div
        ref={textRef}
        className="pointer-events-none z-10 fixed flex w-screen justify-center"
      >
        <span
          id="split-ghost"
          className="absolute uppercase text-[10rem] font-bold tracking-tight skew-x-6 text-black opacity-70"
        >
          SUKUU
        </span>

        <span
          id="split"
          className="uppercase text-[10rem] font-bold tracking-tight skew-x-6 text-black relative"
        >
          SUKUU
        </span>
      </div>
      <div
        ref={squareRef}
        className="h-[90vh] w-[90vw] fixed bg-green-500 opacity-0 scale-0 z-9999"
      >
        {showGallery && <Gallery />}
      </div>
    </>
  );
}
