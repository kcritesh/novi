"use client";

import { motion } from "motion/react";
import { Check, CheckCircle2 } from "lucide-react";

import { howItWorks, type StepId } from "@/content/content";
import { Avatar } from "@/design-system";
import { fadeUp, spring, stagger } from "@/lib/motion";
import { OrganizeStep } from "./organize-step";
import { ShipStep } from "./ship-step";
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
              <Avatar name={task.owner.name} src={task.owner.photo} tone={task.owner.tone} />
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}

export const stepVisuals: Record<StepId, () => React.JSX.Element> = {
  import: ImportVisual,
  organize: OrganizeStep,
  ship: ShipStep,
};
