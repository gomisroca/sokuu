"use client";

import ColorBar from "./color-bar";
import HeroText from "./hero-text";

export default function Hero() {
  return (
    <>
      <div
        id="hero"
        className="flex relative h-screen overflow-hidden items-center justify-center "
      >
        <HeroText />
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
      <div className="h-[200vh] pointer-events-none" />
    </>
  );
}
