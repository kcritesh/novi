"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Check, CheckCircle2 } from "lucide-react";

import { howItWorks } from "@/content/content";
import { Avatar, AvatarStack, Pill } from "@/design-system";
import { useScript } from "@/hooks/use-script";
import { fadeUp, spring, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { ship } = howItWorks.visuals;

// Cards land in Done one at a time, then the project flips to shipped.
const delays = [900, ...ship.column.tasks.map(() => 900), 400];
const landed = (step: number) => Math.max(0, Math.min(ship.column.tasks.length, step - 1));

type MiniCard = (typeof ship.column.tasks)[number];

function MiniCard({ task, done }: { task: MiniCard; done: boolean }) {
  return (
    <motion.div
      layoutId={task.title}
      initial={false}
      animate={{ rotate: 0 }}
      transition={spring.soft}
      className="rounded-card border border-hairline bg-surface p-2.5 shadow-card"
    >
      <p className="flex items-start gap-1.5 text-caption text-ink">
        {done && <Check aria-hidden className="mt-0.5 size-3.5 shrink-0 text-green-ink" strokeWidth={2.5} />}
        <span className="min-w-0">{task.title}</span>
      </p>
      {!done && (
        <div className="mt-2 flex items-center justify-between">
          <Pill tone={task.tag.tone}>{task.tag.label}</Pill>
          <Avatar name={task.owner.name} src={task.owner.photo} tone={task.owner.tone} size="xs" />
        </div>
      )}
    </motion.div>
  );
}

function Count({ value }: { value: number }) {
  return (
    <span className="relative inline-flex h-5 min-w-5 items-center justify-center overflow-hidden rounded-full bg-sand px-1.5 text-micro font-medium text-muted tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={spring.snappy}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

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
          initial={{ pathLength: ship.done.count / ship.total }}
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
  const moved = landed(step);
  const done = ship.done.count + moved;
  const shipped = step === delays.length;
  const flown = (index: number) => index < moved;

  return (
    <LayoutGroup id="ship">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.12)}
        className="grid h-full items-center gap-4 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
      >
        <motion.div variants={fadeUp} className="rounded-card border border-hairline bg-surface shadow-card">
          <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5">
            <span className="truncate text-label font-semibold text-ink">{ship.project}</span>
            <span className="hidden items-center gap-0.5 rounded-sm border border-hairline bg-paper p-0.5 text-micro sm:inline-flex">
              {ship.tabs.map((tab, index) => (
                <span
                  key={tab}
                  className={cn(
                    "rounded-xs px-2 py-0.5",
                    index === 0 ? "bg-surface text-ink shadow-card" : "text-subtle",
                  )}
                >
                  {tab}
                </span>
              ))}
            </span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-hairline">
            <div className="min-h-44 p-2.5">
              <p className="mb-2 flex items-center gap-1.5 px-0.5 text-micro text-subtle">
                {ship.column.name} <Count value={ship.column.tasks.length - moved} />
              </p>
              <div className="flex flex-col gap-2">
                {ship.column.tasks.map(
                  (task, index) => !flown(index) && <MiniCard key={task.title} task={task} done={false} />,
                )}
              </div>
            </div>
            <div className="min-h-44 p-2.5">
              <p className="mb-2 flex items-center gap-1.5 px-0.5 text-micro text-subtle">
                {ship.done.name} <Count value={done} />
              </p>
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute inset-x-2 -top-2 h-2 rounded-t-card border border-b-0 border-hairline bg-surface"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-1 -top-1 h-2 rounded-t-card border border-b-0 border-hairline bg-surface"
                />
                <div className="relative flex flex-col gap-2">
                  {ship.column.tasks.map(
                    (task, index) => flown(index) && <MiniCard key={task.title} task={task} done />,
                  )}
                  {ship.done.visible.map((title) => (
                    <p
                      key={title}
                      className="flex items-start gap-1.5 rounded-card border border-hairline bg-surface p-2.5 text-caption text-ink"
                    >
                      <Check
                        aria-hidden
                        className="mt-0.5 size-3.5 shrink-0 text-green-ink"
                        strokeWidth={2.5}
                      />
                      <span className="min-w-0">{title}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="relative rounded-card border border-hairline bg-surface shadow-window"
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
                <Avatar
                  key={person.name}
                  name={person.name}
                  src={person.photo}
                  tone={person.tone}
                  size="sm"
                />
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
      </motion.div>
    </LayoutGroup>
  );
}
