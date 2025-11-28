"use client";

import { useGSAP, gsap } from "@/gsap/setup";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
const GallerySection1 = dynamic(() => import("./section-1"), {
  ssr: false,
});

export default function HeroGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [showGallerySection1, setShowGallerySection1] = useState(false);

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>("#gallery-section");

    const scrollInOffset = 150;
    const scrollDistance = 200;

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
            start: `top+=${index * scrollInOffset}vh 85%`,
            end: `+=${scrollDistance}vh`,
            scrub: true,
            onEnter:
              index === 0 ? () => setShowGallerySection1(true) : undefined,
          },
        }
      );
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
          className="flex-1 flex items-center justify-center bg-orange-500 overflow-hidden"
        >
          {showGallerySection1 && <GallerySection1 />}
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
