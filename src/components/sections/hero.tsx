"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { NoviWindow } from "@/components/demos/novi-window";
import { TabCollapse } from "@/components/demos/tab-collapse";
import { hero } from "@/content/content";
import { Button, Em, Heading, Pill, Section, Text } from "@/design-system";
import { useMagnetic } from "@/hooks/use-magnetic";
import { fadeUp, spring, stagger } from "@/lib/motion";

function Scribble() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 16"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 -bottom-1.5 h-3 w-full overflow-visible sm:-bottom-2 sm:h-4"
    >
      <motion.path
        d="M3 11 C 48 4, 96 13, 148 8 S 246 3, 297 9"
        fill="none"
        className="stroke-accent"
        strokeWidth={3}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: 0.7 },
          opacity: { duration: 0.01, delay: 0.7 },
        }}
      />
    </svg>
  );
}

export function Hero() {
  const magnetic = useMagnetic<HTMLAnchorElement>(0.3);

  return (
    <Section
      id="overview"
      index="01"
      label="Overview"
      className="overflow-hidden border-t-0"
      containerClassName="pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] dot-grid dot-grid-fade"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.08)}
        className="relative text-center"
      >
        <motion.div variants={fadeUp}>
          <a href={hero.announcement.href} className="group inline-flex rounded-full">
            <Pill
              tone="outline"
              size="md"
              className="transition-colors duration-fast group-hover:border-hairline-strong"
            >
              {hero.announcement.label}
              <ArrowRight
                aria-hidden
                className="transition-transform duration-fast group-hover:translate-x-0.5"
              />
            </Pill>
          </a>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Heading as="h1" size="display-xl" className="mx-auto mt-6 max-w-5xl text-pretty">
            {hero.headline.lead}{" "}
            <span className="relative inline-block whitespace-nowrap">
              <Em>{hero.headline.emphasis}</Em>
              <Scribble />
            </span>
          </Heading>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Text size="body-lg" className="mx-auto mt-6 max-w-xl text-balance">
            {hero.support}
          </Text>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <motion.a
              href={hero.primaryCta.href}
              style={magnetic.style}
              onPointerMove={magnetic.onPointerMove}
              onPointerLeave={magnetic.onPointerLeave}
              whileTap={{ scale: 0.97 }}
              transition={spring.snappy}
            >
              {hero.primaryCta.label}
            </motion.a>
          </Button>
          <Button asChild variant="outline" size="lg" className="group w-full sm:w-auto">
            <a href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
              <ArrowDown
                aria-hidden
                className="transition-transform duration-fast group-hover:translate-y-0.5"
              />
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <div className="relative mx-auto mt-14 max-w-5xl sm:mt-16">
        <TabCollapse>
          <NoviWindow />
        </TabCollapse>
      </div>
    </Section>
  );
}
