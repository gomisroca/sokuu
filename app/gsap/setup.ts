"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

interface FadeEffectConfig {
  duration?: number;
}

type FadeTarget = gsap.TweenTarget;

gsap.registerEffect({
  name: "fade",
  effect: (target: FadeTarget, config: FadeEffectConfig): gsap.core.Tween => {
    return gsap.to(target, { duration: config.duration, opacity: 0 });
  },
  defaults: { duration: 2 } as FadeEffectConfig,
  extendTimeline: true,
});

export { gsap, useGSAP, ScrollTrigger, SplitText };
