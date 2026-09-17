"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { motion } from "motion/react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { spring } from "@/lib/motion";
import { BoardGhost, ChatGhost, DocGhost, SheetGhost } from "./ghost-windows";

type Ghost = {
  key: string;
  Window: ComponentType;
  x: number;
  y: number;
  rotate: number;
};

const ghosts: Ghost[] = [
  { key: "chat", Window: ChatGhost, x: -250, y: -40, rotate: -9 },
  { key: "doc", Window: DocGhost, x: -90, y: 70, rotate: 6 },
  { key: "sheet", Window: SheetGhost, x: 110, y: -60, rotate: 8 },
  { key: "board", Window: BoardGhost, x: 260, y: 50, rotate: -5 },
];

const MERGE_DELAY_MS = { desktop: 1100, mobile: 350 };

export function TabCollapse({ children }: { children: ReactNode }) {
  const reduceMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 48rem)", true);
  const [merged, setMerged] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const delay = isDesktop ? MERGE_DELAY_MS.desktop : MERGE_DELAY_MS.mobile;
    const timer = window.setTimeout(() => setMerged(true), delay);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, isDesktop]);

  const showWindow = reduceMotion || merged;

  return (
    <div className="relative">
      {!reduceMotion && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 z-20 hidden md:block">
          {ghosts.map(({ key, Window, x, y, rotate }, index) => (
            <motion.div
              key={key}
              className="absolute top-0 left-1/2 -ml-40 h-52 w-80"
              initial={{ opacity: 0, x: x * 1.25, y: y - 60, rotate: rotate * 1.4, scale: 0.94 }}
              animate={
                merged
                  ? {
                      opacity: 0,
                      x: 0,
                      y: 40,
                      rotate: 0,
                      scale: 0.55,
                      transition: { ...spring.soft, delay: index * 0.04 },
                    }
                  : {
                      opacity: 1,
                      x,
                      y,
                      rotate: [rotate, rotate + 1.2, rotate - 0.8, rotate],
                      scale: 1,
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
        animate={showWindow ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 24 }}
        transition={{ ...spring.soft, delay: showWindow && !reduceMotion ? 0.12 : 0 }}
        className="relative z-10 origin-top"
      >
        {children}
      </motion.div>
    </div>
  );
}
