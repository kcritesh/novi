"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, CheckCircle2 } from "lucide-react";

import { howItWorks } from "@/content/content";
import { Avatar, AvatarStack, Pill } from "@/design-system";
import { useScript } from "@/hooks/use-script";
import { fadeUp, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { ship } = howItWorks.visuals;

// Remaining tasks tick to done one at a time, then the project flips to shipped.
const remaining = ship.total - ship.startDone;
const delays = [900, ...Array.from({ length: remaining }, () => 800), 400];

function Ring({ done }: { done: number }) {
  return (
    <div className="relative mx-auto size-28">
      <svg aria-hidden viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle cx="50" cy="50" r="44" className="fill-none stroke-sand" strokeWidth="8" />
        <motion.circle
          cx="50"
          cy="50"
          r="44"
          className="fill-none stroke-accent"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: ship.startDone / ship.total }}
          animate={{ pathLength: done / ship.total }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-display-sm leading-none font-semibold text-ink tabular-nums">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={done}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={spring.snappy}
              className="inline-block"
            >
              {done}
            </motion.span>
          </AnimatePresence>
          <span className="text-label font-normal text-muted"> / {ship.total}</span>
        </p>
        <p className="mt-1 text-micro text-muted">{ship.tasksDone}</p>
      </div>
    </div>
  );
}

export function ShipStep() {
  const step = useScript(delays);
  const done = ship.startDone + Math.max(0, Math.min(remaining, step - 1));
  const shipped = step === delays.length;

  return (
    <div className="flex h-full items-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative mx-auto w-full max-w-sm rounded-card border border-hairline bg-surface shadow-window"
      >
        <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3">
          <span className="truncate text-label font-semibold text-ink">{ship.project}</span>
          <AnimatePresence mode="popLayout" initial={false}>
            {shipped ? (
              <motion.span
                key="shipped"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={spring.bouncy}
              >
                <Pill tone="green">
                  <Check strokeWidth={2.5} />
                  {ship.status.shipped}
                </Pill>
              </motion.span>
            ) : (
              <motion.span key="open" exit={{ opacity: 0, scale: 0.8 }} transition={spring.snappy}>
                <Pill tone="amber">{ship.status.open}</Pill>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="px-4 py-5">
          <Ring done={done} />
          <ol className="relative mt-5 grid grid-cols-4">
            <span aria-hidden className="absolute top-3.5 right-[12.5%] left-[12.5%] h-px bg-hairline" />
            {ship.milestones.map((milestone, index) => {
              const last = index === ship.milestones.length - 1;
              const reached = !last || shipped;
              return (
                <li key={milestone} className="relative flex flex-col items-center gap-1.5 text-center">
                  <span
                    className={cn(
                      "relative flex size-7 items-center justify-center rounded-full transition-colors duration-slow",
                      reached ? "bg-green-tint text-green-ink" : "border-2 border-accent bg-surface",
                    )}
                  >
                    {reached ? (
                      <Check aria-hidden className="size-3.5" strokeWidth={2.5} />
                    ) : (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-accent"
                        animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                  </span>
                  <span className={cn("text-micro", last && !shipped ? "text-accent-ink" : "text-ink")}>
                    {milestone}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="flex items-center justify-between border-t border-hairline px-4 py-2.5">
          <AvatarStack>
            {ship.team.map((person) => (
              <Avatar key={person.name} name={person.name} src={person.photo} tone={person.tone} size="sm" />
            ))}
          </AvatarStack>
          <Pill tone="outline">{ship.due}</Pill>
        </div>

        {shipped && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...spring.bouncy, delay: 0.2 }}
            className="absolute -top-4 right-3 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-2.5 py-1 text-caption font-medium text-ink shadow-lift"
          >
            <CheckCircle2 aria-hidden className="size-4 text-green-ink" />
            {ship.chip}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
