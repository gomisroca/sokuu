"use client";

import { useGSAP, gsap, SplitText } from "@/gsap/setup";
import { useRef } from "react";
import ColorBar from "./color-bar";

export default function Hero() {
  const text = useRef<HTMLDivElement>(null);

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
    { scope: text }
  );
  return (
    <div className="flex relative h-screen items-center justify-center">
      <div
        ref={text}
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
      <div className="fixed w-full flex flex-col items-center justify-center">
        <ColorBar initialX="10%" finalX="30%" color="green" height="22" />
        <ColorBar
          initialX="-10%"
          finalX="28%"
          color="blue"
          duration={2}
          width="3/5"
        />
        <ColorBar initialX="20%" finalX="32%" color="orange" height="22" />
      </div>
    </div>
  );
}
