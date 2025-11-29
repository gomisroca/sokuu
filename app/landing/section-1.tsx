"use client";

import { useGSAP, gsap } from "@/gsap/setup";
import { useRef } from "react";

export default function GallerySection1() {
  const bgRef = useRef<HTMLDivElement>(null);
  const bgRef2 = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!bgRef.current || !bgRef2.current || !textRef.current) return;

    const tl = gsap.timeline({
      defaults: { yoyo: true, repeat: -1, ease: "power2.inOut" },
    });

    tl.fromTo(
      bgRef.current,
      { opacity: 0.25, rotation: 160, filter: "blur(5px)", scale: 0.5 },
      {
        opacity: 0.75,
        rotation: 20,
        filter: "blur(1px)",
        scale: 1,
        duration: 2,
        repeatDelay: 2,
      },
      0
    );

    tl.fromTo(
      bgRef2.current,
      { opacity: 0.25, rotation: 240, filter: "blur(4px)", scale: 0.7 },
      {
        opacity: 1,
        rotation: 20,
        filter: "blur(0.5px)",
        scale: 1,
        duration: 2,
        repeatDelay: 2,
      },
      0
    );

    tl.fromTo(
      textRef.current,
      { opacity: 0.9, filter: "blur(1px)" },
      { opacity: 1, filter: "blur(0.5px)", duration: 2 },
      0
    );

    return () => tl.kill();
  });

  return (
    <div className=" flex items-center justify-center h-full">
      <div
        ref={bgRef}
        className="w-160 h-160 border-8 border-blue-500 rounded-sm pointer-events-none"
      />
      <div
        ref={bgRef2}
        className="w-160 h-160 border-8 border-white rounded-sm pointer-events-none"
      />
      <span
        ref={textRef}
        className="text-6xl uppercase fixed font-extrabold p-10 text-shadow-lg/30 text-center"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </span>
    </div>
  );
}
