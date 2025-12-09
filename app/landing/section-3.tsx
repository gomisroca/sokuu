"use client";
import { useGSAP, gsap, SplitText } from "@/gsap/setup";
import { useRef } from "react";

export default function GallerySection3() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!h1Ref.current) return;

    const split = SplitText.create(h1Ref.current, { type: "words, lines" });

    // Rotations
    const firstRotation = ["Made", "Built", "Meant"];
    const lastRotation = ["Web", "User", "World"];

    let firstIndex = 0;
    let lastIndex = 0;

    // Word elements
    const firstWord = split.words[0];
    const lastWord = split.words[split.words.length - 1];

    // Initial animation for all words
    gsap.from(split.words, {
      x: "random([-1000, 1000])",
      y: "random([-1000, 1000])",
      opacity: 0,
      ease: "steps.inOut",
      duration: 1.25,
      onComplete: () => {
        cycleFirstWord();
        cycleLastWord();

        intervalFirst = setInterval(cycleFirstWord, 2000);
        intervalLast = setInterval(cycleLastWord, 2000);
      },
    });

    let intervalFirst: ReturnType<typeof setInterval> | null = null;
    let intervalLast: ReturnType<typeof setInterval> | null = null;

    function animateSwap(element: Element, newText: string) {
      gsap.to(element, {
        x: gsap.utils.random(-1000, 1000),
        y: gsap.utils.random(-1000, 1000),
        opacity: 0,
        ease: "elastic.inOut",
        duration: 0.7,
        onComplete: () => {
          element.textContent = newText;

          gsap.fromTo(
            element,
            {
              x: gsap.utils.random(-1000, 1000),
              y: gsap.utils.random(-1000, 1000),
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              ease: "elastic.inOut",
              duration: 0.9,
            }
          );
        },
      });
    }

    function cycleFirstWord() {
      const newText = firstRotation[(firstIndex + 1) % firstRotation.length];
      animateSwap(firstWord, newText);
      firstIndex = (firstIndex + 1) % firstRotation.length;
    }

    function cycleLastWord() {
      const newText = lastRotation[(lastIndex + 1) % lastRotation.length];
      animateSwap(lastWord, newText);
      lastIndex = (lastIndex + 1) % lastRotation.length;
    }

    return () => {
      if (intervalFirst) clearInterval(intervalFirst);
      if (intervalLast) clearInterval(intervalLast);
      split.revert();
    };
  });

  return (
    <h1
      ref={h1Ref}
      className="min-w-140 text-6xl uppercase fixed font-extrabold p-10 text-shadow-lg/30 text-center"
    >
      <span className="block">Made</span>
      <span className="block">for the</span>
      <span className="block">Web</span>
    </h1>
  );
}
