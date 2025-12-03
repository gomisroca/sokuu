"use client";

import { useGSAP, gsap, SplitText } from "@/gsap/setup";
import { useRef } from "react";

export default function GallerySection2() {
  const textRef = useRef<HTMLSpanElement>(null);

  const texts = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  ];

  useGSAP(() => {
    let index = 0;

    let split = SplitText.create(textRef.current, { type: "chars" });

    const runAnimation = () => {
      const tl = gsap.timeline({
        yoyo: true,
        repeat: 0,
        repeatDelay: 2,
        onComplete: () => {
          split.revert();

          index = (index + 1) % texts.length;
          textRef.current!.textContent = texts[index];

          split = SplitText.create(textRef.current, { type: "chars" });

          runAnimation();
        },
      });

      tl.fromTo(
        split.chars,
        {
          opacity: 0.6,
          filter: "blur(2px)",
          duration: 2,
          ease: "power3.out",
          stagger: 0.15,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 2,
          ease: "power3.out",
          stagger: 0.15,
        }
      );
    };

    runAnimation();

    return () => split.revert();
  });

  return (
    <span
      ref={textRef}
      className="min-w-140 text-6xl uppercase fixed font-extrabold p-10 text-shadow-lg/30 text-center"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </span>
  );
}
