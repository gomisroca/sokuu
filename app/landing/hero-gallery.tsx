"use client";

import { useGSAP, gsap } from "@/gsap/setup";
import Image from "next/image";
import { useRef } from "react";

export default function HeroGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>("#gallery-section");

    const fadeInOffset = 150; // vh per section for fade-in
    const fadeOutOffset = 250; // vh per section for fade-out
    const fadeDistance = 200; // how far each fade happens
    const fadeOutDelay = 1000; // extra scroll before fade-out starts

    // Fade-in sections (staggered)
    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: "100vh" },
        {
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#gallery-trigger",
            start: `top+=${index * fadeInOffset}vh 85%`,
            end: `+=${fadeDistance}vh`,
            scrub: true,
          },
        }
      );
    });

    // Fade-out sections (reverse order, gradual)
    sections
      .slice()
      .reverse()
      .forEach((section, index) => {
        gsap.to(section, {
          autoAlpha: 0,
          y: "100vh",
          ease: "power2.in",
          scrollTrigger: {
            trigger: "#gallery-trigger",
            start: `top+=${
              sections.length * fadeInOffset +
              fadeOutDelay +
              index * fadeOutOffset
            }vh 85%`,
            end: `+=${fadeDistance}vh`,
            scrub: true,
          },
        });
      });
  });

  return (
    <>
      {/* Tall trigger to allow scroll for all fade-ins and fade-outs */}
      <div id="gallery-trigger" className="h-[1000vh]" />

      <div
        ref={galleryRef}
        className="flex flex-row w-screen h-screen fixed justify-center"
      >
        <div
          id="gallery-section"
          className="flex-1 flex items-center justify-center bg-orange-500"
        >
          <Image fill src="https://picsum.photos/900?1" alt="Gallery 1" />
        </div>

        <div
          id="gallery-section"
          className="flex-1 flex items-center justify-center bg-sky-500"
        >
          <Image fill src="https://picsum.photos/900?2" alt="Gallery 2" />
        </div>

        <div
          id="gallery-section"
          className="flex-1 flex items-center justify-center bg-rose-500"
        >
          <Image fill src="https://picsum.photos/900?3" alt="Gallery 3" />
        </div>
      </div>
    </>
  );
}
