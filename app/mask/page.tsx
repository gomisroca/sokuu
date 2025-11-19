"use client";

import { useGSAP, gsap, SplitText } from "@/gsap/setup";
import { useRef } from "react";

export default function MaskTextDemo() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create("#masked-text", {
        type: "chars, lines",
      });

      // Create wrapper div around each char for proper masking
      split.chars.forEach((char) => {
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.overflow = "hidden";
        wrapper.style.position = "relative";

        // Put char inside wrapper
        char.parentNode?.insertBefore(wrapper, char);
        wrapper.appendChild(char);

        // Ensure chars animate inside the wrapper
        gsap.set(char, { display: "inline-block" });
      });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      // ENTER: from below
      tl.from(split.chars, {
        yPercent: 100,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05,
        skewY: 8,
      }).to(
        split.chars,
        {
          skewY: 0,
          duration: 0.25,
          ease: "power2.out",
        },
        "<0.1"
      );

      // EXIT: to top
      tl.to(split.chars, {
        yPercent: -100,
        duration: 0.6,
        ease: "power3.in",
        stagger: 0.05,
        delay: 0.4,
        skewY: -8,
      }).to(
        split.chars,
        {
          skewY: 0,
          duration: 0.25,
          ease: "power2.out",
        },
        "<0.25"
      );

      return () => split.revert();
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="flex h-screen items-center justify-center bg-neutral-900"
    >
      <h1
        id="masked-text"
        className="text-white text-7xl font-bold tracking-tight"
      >
        MASKED TEXT
      </h1>
    </div>
  );
}
