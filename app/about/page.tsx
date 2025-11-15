"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 150,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="p-10 min-h-[200vh]">
      <nav className="text-xl mb-10">
        <Link href="/">← Back</Link>
      </nav>
      <h1 className="text-5xl font-bold mb-10">GSAP ScrollTrigger Demo</h1>
      <div className="h-[50vh]" /> {/* spacer */}
      <div ref={sectionRef} className="p-10 bg-neutral-800 rounded-xl text-3xl">
        I fade in when you scroll down ✨
      </div>
    </main>
  );
}
