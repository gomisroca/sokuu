"use client";

import { useGSAP, gsap } from "@/gsap/setup";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
const GallerySection1 = dynamic(() => import("./section-1"), {
  ssr: false,
});
const GallerySection2 = dynamic(() => import("./section-2"), {
  ssr: false,
});

export default function HeroGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [shownSections, setShownSections] = useState<number[]>([]);

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
            onEnter: () => setShownSections((prev) => [...prev, index]),
          },
        }
      );
    });
  });

  return (
    <>
      <div id="gallery-trigger" className="h-[1000vh]" />

      <div
        ref={galleryRef}
        className="group flex flex-row w-screen h-screen fixed justify-center"
      >
        <div
          id="gallery-section"
          className="w-1/3 hover:w-1/2 transition-all duration-200 ease-in-out flex items-center justify-center bg-orange-500 overflow-hidden"
        >
          {shownSections.includes(0) && <GallerySection1 />}
        </div>

        <div
          id="gallery-section"
          className="w-1/3 hover:w-1/2 transition-all duration-200 ease-in-out flex items-center justify-center bg-sky-500 overflow-hidden"
        >
          {shownSections.includes(1) && <GallerySection2 />}
        </div>

        <div
          id="gallery-section"
          className="w-1/3 hover:w-1/2 transition-all duration-200 ease-in-out flex items-center justify-center bg-rose-500"
        >
          {shownSections.includes(2) && (
            <Image fill src="https://picsum.photos/900?3" alt="Gallery 3" />
          )}
        </div>
      </div>
    </>
  );
}
