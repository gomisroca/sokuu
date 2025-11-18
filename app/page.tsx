"use client";

import { useGSAP, gsap, SplitText } from "@/app/gsap/setup";
import { useRef } from "react";

export default function HomePage() {
  const colors = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.to("#green", { duration: 1, x: "55%" })
        .to("#orange", { duration: 1, x: "40%" }, "-=0.75")
        .to("#blue", { duration: 2, x: "50%" }, "-=0.5");
      // .fade(["#green", "#blue", "#orange"], { duration: 0.5 }, ">+0.5");

      return tl;
    },
    { scope: colors }
  );

  useGSAP(
    () => {
      SplitText.create("#split", {
        type: "chars, lines",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.lines, {
            x: -500,
            duration: 2,
          });
          return gsap.from(self.chars, {
            scale: 2,
            autoAlpha: 0,
            stagger: 0.05,
          });
        },
      });
    },
    { scope: text }
  );

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    gsap.to(e.target, { scale: 1.2, yoyo: true, repeat: 1 });
  };

  const onEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    gsap.to(e.target, { scale: 1.2, ease: "power1.out", zIndex: 5000 });
  };

  const onLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    gsap.to(e.target, { scale: 1, ease: "power1.out" });
  };

  return (
    <main className="flex flex-col">
      <div className="flex relative h-[40vh]">
        <div ref={text} className="pointer-events-none z-10 flex m-auto">
          <span
            id="split"
            className="uppercase text-[10rem] font-bold tracking-tight"
          >
            SUKUU
          </span>
        </div>
        <div ref={colors} className="absolute top-14 w-full ">
          <div
            id="green"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="h-28 w-1/2 bg-green-500"
          />
          <div
            id="blue"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="h-30 w-3/5 bg-blue-500"
          />
          <div
            id="orange"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="h-34 w-1/2 bg-orange-500"
          />
        </div>
      </div>
      <button onClick={handleClick}>Click me</button>
    </main>
  );
}
