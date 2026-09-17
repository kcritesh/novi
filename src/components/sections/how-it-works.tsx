"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useScroll, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";

import { stepVisuals } from "@/components/demos/step-visuals";
import { Reveal } from "@/components/motion/reveal";
import { howItWorks, type StepId } from "@/content/content";
import { Em, Heading, Pill, Quiet, Section, Text } from "@/design-system";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Step = (typeof howItWorks.steps)[number];

function Canvas({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-panel border border-hairline bg-surface p-5 shadow-card sm:p-8",
        className,
      )}
    >
      <div aria-hidden className="absolute inset-0 dot-grid opacity-70" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function InViewVisual({ id }: { id: StepId }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const Visual = stepVisuals[id];
  return (
    <div ref={ref} className="min-h-80">
      {inView && <Visual />}
    </div>
  );
}

type StepItemProps = {
  step: Step;
  active: boolean;
  onActive: (id: StepId) => void;
};

function StepItem({ step, active, onActive }: StepItemProps) {
  const ref = useRef<HTMLLIElement>(null);
  // Only a thin band in the middle of the viewport counts, so exactly one step is current at a time.
  const centered = useInView(ref, { margin: "-48% 0px -48% 0px" });

  useEffect(() => {
    if (centered) onActive(step.id);
  }, [centered, onActive, step.id]);

  return (
    <li ref={ref} className="relative py-8 lg:flex lg:min-h-[52vh] lg:items-center lg:py-0">
      <div className="lg:pl-8" aria-current={active ? "step" : undefined}>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-caption text-subtle">{step.number}</span>
          <h3
            className={cn(
              "text-display-sm font-semibold transition-colors duration-slow ease-out-soft",
              active ? "text-ink" : "text-ink lg:text-subtle",
            )}
          >
            {step.title}
          </h3>
        </div>
        <Text
          size="body-lg"
          className={cn(
            "mt-3 max-w-sm pl-10 transition-colors duration-slow ease-out-soft",
            !active && "lg:text-subtle",
          )}
        >
          {step.description}
        </Text>
        <div className="mt-6 lg:hidden">
          <Canvas>
            <InViewVisual id={step.id} />
          </Canvas>
        </div>
      </div>
    </li>
  );
}

export function HowItWorks() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState<StepId>(howItWorks.steps[0].id);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start center", "end center"] });
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const ActiveVisual = stepVisuals[active];

  return (
    <Section id="how-it-works">
      <Reveal className="max-w-3xl">
        <Pill>{howItWorks.eyebrow}</Pill>
        <Heading className="mt-4">
          {howItWorks.heading.lead}{" "}
          <Quiet>
            {howItWorks.heading.quietLead} <Em>{howItWorks.heading.emphasis}</Em>{" "}
            {howItWorks.heading.quietTail}
          </Quiet>
        </Heading>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:mt-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="relative">
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-0 hidden w-0.5 rounded-full bg-hairline lg:block"
          >
            <motion.div className="h-full origin-top rounded-full bg-accent" style={{ scaleY: progress }} />
          </div>
          <ol ref={listRef} className="divide-y divide-hairline lg:divide-y-0">
            {howItWorks.steps.map((step) => (
              <StepItem key={step.id} step={step} active={active === step.id} onActive={setActive} />
            ))}
          </ol>
          <a
            href={howItWorks.link.href}
            className="group inline-flex min-h-11 items-center gap-1.5 rounded-sm text-label font-medium text-ink underline decoration-hairline-strong underline-offset-4 transition-colors duration-fast hover:decoration-ink lg:ml-8"
          >
            {howItWorks.link.label}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-fast group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-[calc(50vh-15rem)]">
            <Canvas className="h-120">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={spring.soft}
                  className="h-full"
                >
                  <ActiveVisual />
                </motion.div>
              </AnimatePresence>
            </Canvas>
            <div className="mt-4 flex justify-center gap-2" aria-hidden>
              {howItWorks.steps.map((step) => (
                <span
                  key={step.id}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-base ease-out-soft",
                    active === step.id ? "w-6 bg-accent" : "w-1.5 bg-hairline-strong",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
