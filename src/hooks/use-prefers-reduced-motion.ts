"use client";

import { useMediaQuery } from "./use-media-query";

// Motion's useReducedMotion reads matchMedia during the first client render, which breaks hydration
// for reduced-motion users. This version renders the server snapshot first, then updates.
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
