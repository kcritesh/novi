"use client";

import type { ComponentProps } from "react";
import { motion } from "motion/react";

import { buttonVariants } from "@/design-system";
import { spring, toggleLine } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MenuToggleProps = ComponentProps<"button"> & {
  open: boolean;
  animateOnMount?: boolean;
};

export function MenuToggle({ open, animateOnMount = false, className, ...props }: MenuToggleProps) {
  const initial = animateOnMount ? "closed" : false;
  const state = open ? "open" : "closed";

  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), className)}
      {...props}
    >
      <span aria-hidden className="relative block h-4 w-5">
        <motion.span
          className="absolute inset-x-0 top-1/2 -mt-px h-0.5 rounded-full bg-ink"
          variants={toggleLine.top}
          initial={initial}
          animate={state}
          transition={spring.snappy}
        />
        <motion.span
          className="absolute inset-x-0 top-1/2 -mt-px h-0.5 rounded-full bg-ink"
          variants={toggleLine.bottom}
          initial={initial}
          animate={state}
          transition={spring.snappy}
        />
      </span>
    </button>
  );
}
