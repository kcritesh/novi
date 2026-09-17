"use client";

import type { PointerEvent } from "react";

export function useSpotlight<T extends HTMLElement>() {
  function onPointerMove(event: PointerEvent<T>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return { onPointerMove };
}
