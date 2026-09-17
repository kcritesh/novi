"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { setLenis } from "@/lib/lenis";

export function SmoothScroll() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({ duration: 1.5, autoRaf: true });
    setLenis(lenis);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  return null;
}
