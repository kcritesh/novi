import type { Transition, Variants } from "motion/react";

export const spring = {
  snappy: { type: "spring", stiffness: 420, damping: 34, mass: 0.8 },
  soft: { type: "spring", stiffness: 260, damping: 30 },
  gentle: { type: "spring", stiffness: 140, damping: 22 },
  bouncy: { type: "spring", stiffness: 500, damping: 22 },
} satisfies Record<string, Transition>;

export const ease = {
  outSoft: [0.22, 1, 0.36, 1],
  inOutSoft: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  fast: 0.2,
  base: 0.3,
  slow: 0.4,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: spring.soft },
};

export const slideIn: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: spring.soft },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.slow, ease: ease.outSoft } },
};

export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: spring.snappy },
  exit: { opacity: 0, scale: 0.96, transition: { duration: duration.fast, ease: ease.outSoft } },
};

export function stagger(gap = 0.06, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: gap, delayChildren } },
  };
}

export const rollNumber: Variants = {
  enter: (direction: number) => ({ y: `${-60 * direction}%`, opacity: 0 }),
  center: { y: "0%", opacity: 1 },
  exit: (direction: number) => ({ y: `${60 * direction}%`, opacity: 0 }),
};

export const heroParallax: { y: string[]; scale: number[] } = { y: ["0%", "12%"], scale: [1, 1.06] };

export const dragLift = { scale: 1.04, rotate: 3 } as const;

// One scripted drag hop, as fractions of that hop's scroll range. Hero window scroll range is in viewport heights.
export const scrollDrag = {
  lift: [0.1, 0.25],
  travel: [0.25, 0.75],
  drop: [0.75, 0.9],
  cursor: [0.02, 0.98],
  arc: 14,
  range: { start: 0.85, end: 0.2, minDistance: 320 },
} as const;

// Timeline scrubber sweeps start→end while the demo's top climbs from 85% to 20% of the viewport, matching the hero drag.
// Snaps to `moves` evenly spaced jumps so the short scroll range doesn't flick through each date.
export const timelineScrub: { offset: ["start 0.85", "start 0.2"]; moves: number } = {
  offset: ["start 0.85", "start 0.2"],
  moves: 4,
};

export const inViewOnce = { once: true, margin: "0px 0px -12% 0px" } as const;

export const menuItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: spring.soft },
};

export const toggleLine = {
  top: { closed: { y: -4, rotate: 0 }, open: { y: 0, rotate: 45 } },
  bottom: { closed: { y: 4, rotate: 0 }, open: { y: 0, rotate: -45 } },
} satisfies Record<string, Variants>;
