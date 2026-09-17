"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Check, Users } from "lucide-react";

import { howItWorks, type Person } from "@/content/content";
import { Avatar, Pill } from "@/design-system";
import { useScript } from "@/hooks/use-script";
import { fadeUp, spring, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { organize } = howItWorks.visuals;

type Stage = "tray" | "landed" | "picking" | "owned" | "dated";
const stages: Stage[] = ["tray", "landed", "picking", "owned", "dated"];

// Each group's incoming card walks through 4 sub-steps; the chip pops after the last one.
const perTask = stages.length - 1;
const delays = [700, ...organize.groups.flatMap(() => [700, 650, 450, 600])];
delays.pop();
delays.push(500);

function stageOf(step: number, index: number): Stage {
  const local = step - 1 - index * perTask;
  return stages[Math.max(0, Math.min(perTask, local))];
}

const laneTone = { accent: "bg-accent", amber: "bg-amber-ink" } as const;

function Card({ title, tilt, className }: { title: string; tilt: number; className?: string }) {
  return (
    <motion.div
      layoutId={title}
      initial={false}
      animate={{ rotate: tilt }}
      transition={spring.soft}
      className={cn(
        "flex items-center justify-between gap-3 rounded-card border border-hairline bg-surface px-3 py-2.5 shadow-lift",
        className,
      )}
    >
      <span className="truncate text-caption text-ink">{title}</span>
      <span className="flex items-center gap-2">
        <span className="size-5 rounded-full border border-dashed border-hairline-strong" />
        <Pill tone="neutral" className="text-subtle">
          {organize.noDate}
        </Pill>
      </span>
    </motion.div>
  );
}

function OwnerPicker({ owner }: { owner: Person }) {
  const choices = [owner, ...organize.assignees.filter((p) => p !== owner)].slice(0, 3);
  return (
    <motion.ul
      initial={{ opacity: 0, y: -4, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.96 }}
      transition={spring.snappy}
      className="absolute top-full right-0 z-10 mt-1.5 w-36 rounded-card border border-hairline bg-surface p-1 shadow-lift"
    >
      {choices.map((person) => (
        <li
          key={person.name}
          className={cn(
            "flex items-center gap-2 rounded-sm px-1.5 py-1 text-caption text-ink",
            person === owner && "bg-accent-tint",
          )}
        >
          <Avatar name={person.name} src={person.photo} tone={person.tone} size="xs" />
          <span className="flex-1 truncate">{person.name.split(" ")[0]}</span>
          {person === owner && <Check aria-hidden className="size-3.5 text-accent" strokeWidth={2.5} />}
        </li>
      ))}
    </motion.ul>
  );
}

type RowProps = {
  title: string;
  owner: Person;
  due: string;
  stage?: Stage;
  layoutId?: string;
};

function Row({ title, owner, due, stage = "dated", layoutId }: RowProps) {
  const owned = stage === "owned" || stage === "dated";
  return (
    <motion.div
      layoutId={layoutId}
      initial={false}
      animate={{ rotate: 0 }}
      transition={spring.soft}
      className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-4 py-2.5"
    >
      <span className="truncate text-caption text-ink">{title}</span>
      <span className="relative inline-flex items-center gap-1.5 text-caption text-muted">
        {owned ? (
          <motion.span initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={spring.bouncy}>
            <Avatar name={owner.name} src={owner.photo} tone={owner.tone} size="xs" />
          </motion.span>
        ) : (
          <span className="size-5 rounded-full border border-dashed border-hairline-strong" />
        )}
        <AnimatePresence>{stage === "picking" && <OwnerPicker owner={owner} />}</AnimatePresence>
      </span>
      {stage === "dated" ? (
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={spring.bouncy}
        >
          <Pill tone="neutral">{due}</Pill>
        </motion.span>
      ) : (
        <Pill tone="neutral" className="text-subtle">
          {organize.noDate}
        </Pill>
      )}
    </motion.div>
  );
}

export function OrganizeStep() {
  const step = useScript(delays);
  const unsorted = organize.groups.filter((_, index) => stageOf(step, index) === "tray").length;
  const done = step === delays.length;

  return (
    <LayoutGroup id="organize">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.1)}
        className="flex h-full flex-col justify-center gap-5"
      >
        <motion.div variants={fadeUp} className="rounded-card border border-sand-deep bg-sand/70">
          <p className="border-b border-sand-deep px-4 py-2 text-caption text-muted">
            <span className="font-medium text-ink">{organize.inbox.label}</span> · {unsorted}{" "}
            {organize.inbox.unsorted}
          </p>
          <div className="relative grid min-h-[4.5rem] grid-cols-2 items-center gap-6 px-6 py-3">
            {unsorted === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center gap-1.5 text-caption text-muted"
              >
                <Check aria-hidden className="size-3.5 text-green-ink" strokeWidth={2.5} />
                {organize.allSorted}
              </motion.p>
            )}
            {organize.groups.map((group, index) =>
              stageOf(step, index) === "tray" ? (
                <Card
                  key={group.incoming.title}
                  title={group.incoming.title}
                  tilt={group.incoming.tilt}
                  className={index % 2 ? "-mt-2" : "mt-1"}
                />
              ) : (
                <span key={group.incoming.title} />
              ),
            )}
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {organize.groups.map((group, index) => {
            const stage = stageOf(step, index);
            return (
              <motion.div
                key={group.name}
                variants={fadeUp}
                className="relative rounded-card border border-hairline bg-surface shadow-card"
              >
                <div className="flex items-center justify-between border-b border-hairline bg-paper px-4 py-2.5">
                  <span className="flex items-center gap-2 text-label font-semibold text-ink">
                    <span aria-hidden className={cn("size-2 rounded-xs", laneTone[group.tone])} />
                    {group.name}
                  </span>
                  <span className="text-micro text-subtle tabular-nums">
                    {stage === "tray" ? 1 : 2} tasks
                  </span>
                </div>
                <Row {...group.placed} />
                <div className="border-t border-hairline">
                  {stage === "tray" ? (
                    <div className="m-2 rounded-card border border-dashed border-accent-line bg-accent-tint/60 px-4 py-2 text-center text-caption text-accent-ink/70">
                      {organize.emptySlot}
                    </div>
                  ) : (
                    <Row {...group.incoming} stage={stage} layoutId={group.incoming.title} />
                  )}
                </div>
                {done && index === organize.groups.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={spring.bouncy}
                    className="absolute -top-4 right-3 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-2.5 py-1 text-caption font-medium text-ink shadow-lift"
                  >
                    <Users aria-hidden className="size-4 text-accent" />
                    {organize.chip}
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </LayoutGroup>
  );
}
