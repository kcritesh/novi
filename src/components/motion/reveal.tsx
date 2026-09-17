"use client";

import type { ComponentProps } from "react";
import { motion } from "motion/react";

import { fadeUp, inViewOnce, stagger } from "@/lib/motion";

type RevealProps = ComponentProps<typeof motion.div>;

export function Reveal(props: RevealProps) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={inViewOnce} variants={fadeUp} {...props} />
  );
}

type RevealGroupProps = ComponentProps<typeof motion.div> & { gap?: number; delay?: number };

export function RevealGroup({ gap = 0.07, delay = 0, ...props }: RevealGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={stagger(gap, delay)}
      {...props}
    />
  );
}

export function RevealItem(props: RevealProps) {
  return <motion.div variants={fadeUp} {...props} />;
}
