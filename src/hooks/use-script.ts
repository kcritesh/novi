"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

// Advances through a timed sequence once on mount; `delays[i]` is the wait before step i + 1.
// Reduced motion skips straight to the final step.
export function useScript(delays: readonly number[]) {
  const reduceMotion = usePrefersReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    let index = 0;
    let timer: number | undefined;
    const next = () => {
      if (index >= delays.length) return;
      timer = window.setTimeout(() => {
        index += 1;
        setStep(index);
        next();
      }, delays[index]);
    };
    next();
    return () => window.clearTimeout(timer);
  }, [reduceMotion, delays]);

  return reduceMotion ? delays.length : step;
}
