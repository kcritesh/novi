"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { motion } from "motion/react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { spring } from "@/lib/motion";
import { BoardGhost, ChatGhost, DocGhost, SheetGhost } from "./ghost-windows";

type Placement = { x: number; y: number; rotate: number; scale: number };

type Ghost = {
  key: string;
  Window: ComponentType;
  float: Omit<Placement, "scale">;
  rest: Placement;
};

// Offsets are measured from the layer's anchor near the window's top edge, not its
// centre, so the opening float stays above the fold whatever the window's height is.
// `rest` then keeps each ghost tucked behind the window's edge: half the 320px box
// stays covered, so only a blurred sliver reads as "the old tabs, still there".
const ghosts: Ghost[] = [
  {
    key: "chat",
    Window: ChatGhost,
    float: { x: -250, y: -12, rotate: -9 },
    rest: { x: -505, y: 85, rotate: -8, scale: 0.92 },
  },
  {
    key: "doc",
    Window: DocGhost,
    float: { x: -90, y: 98, rotate: 6 },
    rest: { x: -455, y: 365, rotate: 5, scale: 0.86 },
  },
  {
    key: "sheet",
    Window: SheetGhost,
    float: { x: 110, y: -32, rotate: 8 },
    rest: { x: 505, y: 70, rotate: 7, scale: 0.92 },
  },
  {
    key: "board",
    Window: BoardGhost,
    float: { x: 260, y: 78, rotate: -5 },
    rest: { x: 460, y: 375, rotate: -5, scale: 0.86 },
  },
];

const MERGE_DELAY_MS = { desktop: 1100, mobile: 350 };

// Widest ghost edge (505 + 160) doubled: below this the resting ghosts clip.
const CAN_REST = "(min-width: 85rem)";

const restStyle = ({ x, y, rotate, scale }: Placement) => ({
  opacity: 0.72,
  x,
  y,
  rotate,
  scale,
  filter: "blur(4px)",
});

const goneStyle = { opacity: 0, x: 0, y: 40, rotate: 0, scale: 0.55, filter: "blur(4px)" };

export function TabCollapse({ children }: { children: ReactNode }) {
  const reduceMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 48rem)", true);
  const canRest = useMediaQuery(CAN_REST, false);
  const [merged, setMerged] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const delay = isDesktop ? MERGE_DELAY_MS.desktop : MERGE_DELAY_MS.mobile;
    const timer = window.setTimeout(() => setMerged(true), delay);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, isDesktop]);

  const settled = reduceMotion || merged;
  const showGhosts = !reduceMotion || canRest;

  return (
    <div className="relative">
      {showGhosts && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-4 z-0 hidden md:block"
        >
          {ghosts.map(({ key, Window, float, rest }, index) => (
            <motion.div
              key={key}
              className="absolute top-0 left-1/2 -ml-40 h-52 w-80"
              initial={
                reduceMotion
                  ? restStyle(rest)
                  : {
                      opacity: 0,
                      x: float.x * 1.25,
                      y: float.y - 60,
                      rotate: float.rotate * 1.4,
                      scale: 0.94,
                      filter: "blur(0px)",
                    }
              }
              animate={
                settled
                  ? {
                      ...(canRest ? restStyle(rest) : goneStyle),
                      transition: { ...spring.soft, delay: index * 0.04 },
                    }
                  : {
                      opacity: 1,
                      x: float.x,
                      y: float.y,
                      rotate: [float.rotate, float.rotate + 1.2, float.rotate - 0.8, float.rotate],
                      scale: 1,
                      filter: "blur(0px)",
                      transition: {
                        default: { ...spring.gentle, delay: index * 0.08 },
                        rotate: {
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: "mirror",
                          delay: 0.35 + index * 0.08,
                        },
                      },
                    }
              }
            >
              <Window />
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 24 }}
        animate={settled ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 24 }}
        transition={{ ...spring.soft, delay: settled && !reduceMotion ? 0.12 : 0 }}
        className="relative z-10 origin-top"
      >
        {children}
      </motion.div>
    </div>
  );
}
