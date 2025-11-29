"use client";

import { useGSAP, gsap, SplitText } from "@/gsap/setup";
import { useRef } from "react";

export default function TextWave() {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const split = SplitText.create(textRef.current, {
      type: "chars",
    });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    tl.fromTo(
      split.chars,
      {
        scale: 1,
      },
      {
        scale: 1.15,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05,
      }
    ).to(split.chars, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });

    return () => tl.kill();
  });

  return (
    <div className="text-6xl font-extrabold p-10">
      <div ref={textRef}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </div>
  );
}
