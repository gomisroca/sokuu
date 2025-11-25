import { useGSAP, gsap } from "@/gsap/setup";
import { useRef } from "react";

export default function HeroGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>("#gallery-section");

    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, scale: 0.85 },
        {
          autoAlpha: 1,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#gallery-trigger",
            start: `top+=${index * 75}vh 85%`,
            end: `+=50vh`,
            scrub: true,
          },
        }
      );
    });
  });

  return (
    <>
      <div id="gallery-trigger" className="h-screen" />
      <div
        ref={galleryRef}
        className="flex flex-row w-screen h-screen m-auto fixed justify-center"
      >
        <div
          id="gallery-section"
          className="flex-1 flex items-center justify-center border bg-orange-500"
        >
          Hello 1
        </div>

        <div
          id="gallery-section"
          className="flex-1 flex items-center justify-center border bg-sky-500"
        >
          Hello 2
        </div>

        <div
          id="gallery-section"
          className="flex-1 flex items-center justify-center border bg-rose-500"
        >
          Hello 3
        </div>
      </div>
    </>
  );
}
