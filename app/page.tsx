"use client";

import { useGSAP, gsap, SplitText } from "@/app/gsap/setup";
import { useRef } from "react";

export default function HomePage() {
  const colors = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.to(".bar-wrapper:nth-child(1)", { x: "25%" })
        .to(".bar-wrapper:nth-child(2)", { x: "30%" }, "-=0.75")
        .to(".bar-wrapper:nth-child(3)", { x: "20%" }, "-=0.5");
      // .fade(["#green", "#blue", "#orange"], { duration: 0.5 }, ">+0.5");

      return tl;
    },
    { scope: colors }
  );

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
      gsap.from(main.lines, { x: -500, duration: 2, ease: "power3.out" });

      // Ghost animation (slightly delayed)
      gsap.from(ghost.lines, {
        x: -500,
        duration: 2,
        delay: 0.05,
        ease: "power3.out",
      });
    },
    { scope: text }
  );

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    gsap.to(e.currentTarget, { scale: 1.2, yoyo: true, repeat: 1 });
  };

  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      x: 100,
      duration: 0.3,
      ease: "power1.out",
      overwrite: true,
    });
  };

  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      duration: 0.3,
      ease: "power1.out",
      overwrite: true,
    });
  };

  return (
    <main className="flex flex-col">
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
        <div ref={colors} className="fixed w-full">
          <div className="bar-wrapper relative">
            <div
              id="green"
              className="h-40 w-1/2 bg-green-500 translate-x-0"
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            />
          </div>

          <div className="bar-wrapper">
            <div
              id="blue"
              className="h-20 w-3/5 bg-blue-500"
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            />
          </div>

          <div className="bar-wrapper relative">
            <div
              id="orange"
              className="h-34 w-1/2 bg-orange-500"
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            />
          </div>
        </div>
      </div>
      <button onClick={handleClick}>Click me</button>
    </main>
  );
}
