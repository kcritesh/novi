"use client";

import { motion } from "motion/react";
import { Check, CheckCircle2, Rocket } from "lucide-react";

import { howItWorks, type StepId } from "@/content/content";
import { Avatar, Pill } from "@/design-system";
import { fadeUp, slideIn, spring, stagger } from "@/lib/motion";
import { sourceGlyphs } from "./source-glyphs";

const { visuals } = howItWorks;

const sourceIcons = [sourceGlyphs.trello, sourceGlyphs.asana, sourceGlyphs.sheet] as const;

function ImportVisual() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger(0.09)}
      className="grid h-full items-center gap-6 sm:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1.3fr)]"
    >
      <div className="flex flex-col gap-3">
        {visuals.import.sources.map((source, index) => {
          const Icon = sourceIcons[index];
          return (
            <motion.div
              key={source}
              variants={fadeUp}
              className="flex items-center gap-3 rounded-card border border-hairline bg-surface px-3.5 py-3 shadow-card"
            >
              <Icon aria-hidden className="size-5 shrink-0 text-ink" />
              <span className="truncate text-label text-ink">{source}</span>
            </motion.div>
          );
        })}
      </div>

      <svg
        aria-hidden
        viewBox="0 0 40 120"
        className="hidden h-32 w-10 overflow-visible sm:block"
        fill="none"
      >
        {["M0 20 C 22 20, 18 60, 40 60", "M0 60 L 40 60", "M0 100 C 22 100, 18 60, 40 60"].map((d) => (
          <path
            key={d}
            d={d}
            className="animate-dash-flow stroke-hairline-strong"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <motion.div
        variants={fadeUp}
        className="relative rounded-card border border-hairline bg-surface shadow-window"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ ...spring.bouncy, delay: 0.9 }}
          className="absolute -top-4 right-3 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-2.5 py-1 text-caption font-medium text-ink shadow-lift"
        >
          <CheckCircle2 aria-hidden className="size-4 text-green-ink" />
          {visuals.import.chip}
        </motion.span>
        <p className="border-b border-hairline px-4 py-3 text-label font-semibold text-ink">
          {visuals.import.board}
        </p>
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={stagger(0.12, 0.35)}
          className="divide-y divide-hairline"
        >
          {visuals.import.tasks.map((task) => (
            <motion.li key={task.title} variants={fadeUp} className="flex items-center gap-2.5 px-4 py-2.5">
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <Check aria-hidden className="size-2.5" strokeWidth={3} />
              </span>
              <span className="min-w-0 flex-1 truncate text-caption text-ink">{task.title}</span>
              <Avatar name={task.owner.name} tone={task.owner.tone} />
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}

function OrganizeVisual() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger(0.14)}
      className="flex h-full flex-col justify-center gap-4"
    >
      {visuals.organize.groups.map((group) => (
        <motion.div
          key={group.name}
          variants={fadeUp}
          className="overflow-hidden rounded-card border border-hairline bg-surface shadow-card"
        >
          <div className="flex items-center justify-between border-b border-hairline bg-paper px-4 py-2.5">
            <span className="text-label font-semibold text-ink">{group.name}</span>
            <span className="text-micro text-subtle tabular-nums">{group.tasks.length} tasks</span>
          </div>
          <motion.ul variants={stagger(0.1, 0.15)} className="divide-y divide-hairline">
            {group.tasks.map((task) => (
              <motion.li
                key={task.title}
                variants={slideIn}
                className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-4 py-2.5"
              >
                <span className="truncate text-caption text-ink">{task.title}</span>
                <span className="inline-flex items-center gap-1.5 text-caption text-muted">
                  <Avatar name={task.owner.name} tone={task.owner.tone} />
                  <span className="hidden sm:inline">{task.owner.name.split(" ")[0]}</span>
                </span>
                <Pill tone="neutral">{task.due}</Pill>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      ))}
    </motion.div>
  );
}

function ShipVisual() {
  const { ship } = visuals;
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger(0.12)}
      className="flex h-full flex-col justify-center gap-4"
    >
      <motion.div
        variants={fadeUp}
        className="rounded-card border border-hairline bg-surface p-5 shadow-window"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-label font-semibold text-ink">{ship.project}</span>
          <Pill tone="green">
            <Rocket aria-hidden />
            {ship.status}
          </Pill>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-sand">
          <motion.div
            className="h-full origin-left rounded-full bg-accent"
            initial={{ scaleX: 0.15 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          />
        </div>
        <p className="mt-2 text-caption text-muted tabular-nums">{ship.progressLabel}</p>
      </motion.div>

      <motion.ol variants={fadeUp} className="grid grid-cols-4 gap-2">
        {ship.milestones.map((milestone, index) => (
          <li key={milestone} className="flex flex-col items-center gap-2 text-center">
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...spring.bouncy, delay: 0.5 + index * 0.15 }}
              className="flex size-8 items-center justify-center rounded-full bg-green-tint text-green-ink"
            >
              <Check aria-hidden className="size-4" strokeWidth={2.5} />
            </motion.span>
            <span className="text-caption text-ink">{milestone}</span>
          </li>
        ))}
      </motion.ol>

      <motion.p variants={fadeUp} className="text-center text-caption text-muted">
        {ship.note}
      </motion.p>
    </motion.div>
  );
}

export const stepVisuals: Record<StepId, () => React.JSX.Element> = {
  import: ImportVisual,
  organize: OrganizeVisual,
  ship: ShipVisual,
};
