"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

import { Reveal } from "@/components/motion/reveal";
import { cta } from "@/content/content";
import { Button, Em, Heading, Pill, Section, Text } from "@/design-system";
import { useMagnetic } from "@/hooks/use-magnetic";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

function WeekCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const reduceMotion = usePrefersReducedMotion();
  const settled = inView || reduceMotion;

  return (
    <div
      ref={ref}
      aria-hidden
      className="rounded-panel border border-hairline bg-surface p-6 shadow-window sm:p-7 lg:w-[30rem] lg:rotate-3"
    >
      <p className="text-title font-semibold text-ink">{cta.week.title}</p>
      <ul className="mt-5 space-y-3.5">
        {cta.week.tasks.map((task, index) => {
          const checked = task.done || settled;
          const animateIn = !task.done;
          return (
            <li key={task.title} className="flex items-center gap-3">
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-sm border transition-colors duration-base",
                  checked ? "border-ink-soft bg-ink-soft text-white" : "border-hairline-strong bg-surface",
                )}
                style={animateIn ? { transitionDelay: "700ms" } : undefined}
              >
                {checked && (
                  <motion.span
                    initial={animateIn ? { scale: 0 } : false}
                    animate={{ scale: 1 }}
                    transition={{ ...spring.bouncy, delay: animateIn ? 0.75 : 0 }}
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </motion.span>
                )}
              </span>
              <span className="min-w-0 flex-1 truncate text-body text-ink">
                <span className={cn("relative transition-colors duration-slow", checked && "text-subtle")}>
                  {task.title}
                  <motion.span
                    className="absolute top-1/2 left-0 h-px w-full origin-left bg-subtle"
                    initial={{ scaleX: task.done ? 1 : 0 }}
                    animate={{ scaleX: checked ? 1 : 0 }}
                    transition={{
                      duration: 0.45,
                      delay: animateIn ? 0.9 + index * 0.02 : 0,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                  />
                </span>
              </span>
              <Pill tone={task.tag.tone} className="hidden min-[400px]:inline-flex">
                {task.tag.label}
              </Pill>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function CtaBand() {
  const magnetic = useMagnetic<HTMLAnchorElement>(0.3);

  return (
    <Section id="start" index="06" label="Start" containerClassName="py-16 sm:py-20 lg:py-24">
      <Reveal className="relative isolate overflow-hidden rounded-panel border border-accent-line bg-accent-tint">
        <div aria-hidden className="absolute inset-0 -z-10 dot-grid opacity-60" />
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 p-6 sm:p-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-0 lg:p-16">
          <div>
            <Heading size="display-lg" className="max-w-xl">
              {cta.heading.lead} <Em>{cta.heading.emphasis}</Em> {cta.heading.tail}
            </Heading>
            <Text size="body-lg" className="mt-5">
              {cta.support}
            </Text>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Button asChild size="lg">
                <motion.a
                  href={cta.primary.href}
                  style={magnetic.style}
                  onPointerMove={magnetic.onPointerMove}
                  onPointerLeave={magnetic.onPointerLeave}
                  whileTap={{ scale: 0.97 }}
                >
                  {cta.primary.label}
                </motion.a>
              </Button>
              <Button
                variant="link"
                className="group self-start sm:self-auto"
                onClick={() => toast(cta.toast.title, { description: cta.toast.description })}
              >
                {cta.secondary.label}
                <ArrowRight
                  aria-hidden
                  className="transition-transform duration-fast group-hover:translate-x-0.5"
                />
              </Button>
            </div>
          </div>
          <div className="lg:-mr-28 lg:-mb-28 lg:translate-y-6">
            <WeekCard />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
