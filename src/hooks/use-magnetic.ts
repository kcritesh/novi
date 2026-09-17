"use client";

import type { PointerEvent } from "react";
import { useMotionValue, useSpring } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { spring } from "@/lib/motion";

export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const reduceMotion = usePrefersReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, spring.snappy);
  const y = useSpring(rawY, spring.snappy);

  function onPointerMove(event: PointerEvent<T>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    rawY.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onPointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return { style: { x, y }, onPointerMove, onPointerLeave };
}
