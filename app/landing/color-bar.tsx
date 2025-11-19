"use client";

import { useGSAP, gsap } from "@/gsap/setup";
import { useRef } from "react";

interface Props {
  initialX: number | string;
  finalX: number | string;
  color: "green" | "blue" | "orange";
  duration?: number;
  width?: "1/2" | "3/5" | "full";
  height?: "40" | "22";
}

export default function ColorBar({
  initialX,
  finalX,
  color,
  duration = 1,
  width = "1/2",
  height = "40",
}: Props) {
  const colorClass =
    {
      green: "bg-green-500",
      blue: "bg-blue-500",
      orange: "bg-orange-500",
    }[color] || "bg-gray-500";
  const widthClass =
    {
      "1/2": "w-1/2",
      "3/5": "w-3/5",
      full: "w-full",
    }[width] || "w-1/2";

  const heightClass =
    {
      40: "h-40",
      22: "h-22",
    }[height] || "h-40";
  const colorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      if (colorRef.current) {
        tl.fromTo(
          colorRef.current,
          { x: initialX },
          { x: finalX, duration: duration },
          "start"
        );
      }
      return tl;
    },
    { scope: colorRef }
  );

  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      xPercent: Math.floor(Math.random() * 21) - 10,
      duration: 0.3,
      ease: "power1.out",
      overwrite: true,
    });
  };

  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      xPercent: 0,
      duration: 0.3,
      ease: "power1.out",
      overwrite: true,
    });
  };

  return (
    <div ref={colorRef} className="w-full relative">
      <div
        className={`${widthClass} ${heightClass} ${colorClass}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      />
    </div>
  );
}
