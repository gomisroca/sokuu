"use client";
import { useGSAP, gsap, SplitText } from "@/gsap/setup";
import { useRef } from "react";

export default function GallerySection3() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!h1Ref.current) return;

    const split = SplitText.create(h1Ref.current, { type: "words, lines" });

    // Animate words flying in randomly from all directions
    gsap.from(split.words, {
      x: "random([-1000, 1000])",
      y: "random([-1000, 1000])",
      opacity: 0,
      ease: "expo.inOut",
      duration: 1.25,
      onComplete: () => {
        // After initial animation, replace specific words
        replaceWords(split);
      },
    });

    interface WordReplacement {
      newWord: string;
      element: Element | null;
      index: number;
    }

    type WordReplacements = Record<string, WordReplacement>;

    function replaceWords(split: SplitText) {
      // Find the words to replace by their content
      const wordToReplace: WordReplacements = {
        Made: { newWord: "Built", element: null, index: 0 },
        Web: { newWord: "User", element: null, index: 4 },
      };

      // Map the words to their elements
      split.words.forEach((word, i) => {
        const text = word.textContent?.trim() ?? "";
        if (text in wordToReplace) {
          wordToReplace[text].element = word;
          wordToReplace[text].index = i;
        }
      });

      // Animate each word replacement
      Object.entries(wordToReplace).forEach(([oldWord, data], i) => {
        if (data.element) {
          const delay = 1.5 + i * 0.3; // Stagger the replacements

          // Fly out the old word
          gsap.to(data.element, {
            x: gsap.utils.random(-1000, 1000),
            y: gsap.utils.random(-1000, 1000),
            opacity: 0,
            ease: "expo.in",
            duration: 0.8,
            delay: delay,
            onComplete: () => {
              // Change the text
              if (data.element) {
                data.element.textContent = data.newWord;

                // Fly in the new word
                gsap.fromTo(
                  data.element,
                  {
                    x: gsap.utils.random(-1000, 1000),
                    y: gsap.utils.random(-1000, 1000),
                    opacity: 0,
                  },
                  {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    ease: "expo.out",
                    duration: 1,
                  }
                );
              }
            },
          });
        }
      });
    }

    return () => split.revert();
  });

  return (
    <h1
      ref={h1Ref}
      className="min-w-140 text-6xl uppercase fixed font-extrabold p-10 text-shadow-lg/30 text-center"
    >
      Made with Love for the Web
    </h1>
  );
}
