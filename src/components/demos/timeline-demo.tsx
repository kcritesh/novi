"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";

import { features } from "@/content/content";
import { Avatar } from "@/design-system";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { spring, timelineScrub } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { start, days, milestones, scrubberLabel, dueHeading, empty } = features.timeline;

const barTone = {
  green: {
    on: "bg-green-tint text-green-ink border-green-ink/30",
    off: "bg-paper text-subtle border-hairline",
  },
  amber: {
    on: "bg-amber-tint text-amber-ink border-amber-ink/30",
    off: "bg-paper text-subtle border-hairline",
  },
  rose: { on: "bg-rose-tint text-rose-ink border-rose-ink/30", off: "bg-paper text-subtle border-hairline" },
  accent: {
    on: "bg-accent-tint text-accent-ink border-accent/40",
    off: "bg-paper text-subtle border-hairline",
  },
} as const;

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

function dateAt(day: number) {
  const date = new Date(`${start}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + day);
  return dateFormat.format(date);
}

const weekTicks = Array.from({ length: days / 7 + 1 }, (_, week) => week * 7);

export function TimelineDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pickedDay, setPickedDay] = useState(15);
  const [scrubDay, setScrubDay] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const scripted = !reduceMotion && !interacted;
  const { scrollYProgress } = useScroll({ target: rootRef, offset: timelineScrub.offset });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (scripted) setScrubDay((Math.round(progress * timelineScrub.moves) / timelineScrub.moves) * days);
  });

  const day = scripted ? scrubDay : pickedDay;

  const active = milestones.filter((m) => day >= m.from && day <= m.to);
  const activeText = active.length ? active.map((m) => m.label).join(", ") : "Nothing due";

  function dayFromPointer(clientX: number) {
    const track = trackRef.current;
    if (!track) return day;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return Math.round(ratio * days);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setInteracted(true);
    setDragging(true);
    setPickedDay(dayFromPointer(event.clientX));
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (dragging) setPickedDay(dayFromPointer(event.clientX));
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, number> = {
      ArrowRight: day + 1,
      ArrowUp: day + 1,
      ArrowLeft: day - 1,
      ArrowDown: day - 1,
      PageUp: day + 7,
      PageDown: day - 7,
      Home: 0,
      End: days,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    setInteracted(true);
    setPickedDay(Math.min(days, Math.max(0, moves[event.key])));
  }

  const percent = (day / days) * 100;

  return (
    <div ref={rootRef}>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="text-caption text-muted">
          <span className="font-medium text-ink tabular-nums">{dateAt(day)}</span>
          <span aria-hidden> · </span>
          <span>{activeText}</span>
        </p>
        <span className="hidden text-micro text-subtle sm:block">Drag the line</span>
      </div>

      <div
        ref={trackRef}
        className="relative cursor-ew-resize touch-none select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        <div className="relative h-6 border-b border-hairline">
          {weekTicks.map((tick) => (
            <span
              key={tick}
              className="absolute bottom-0 flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${(tick / days) * 100}%` }}
            >
              <span
                className={cn(
                  "mb-1.5 text-micro whitespace-nowrap text-subtle tabular-nums",
                  tick === 0 && "translate-x-1/2",
                  tick === days && "-translate-x-1/2",
                  tick !== 0 && tick !== days && "hidden sm:block",
                )}
              >
                {dateAt(tick)}
              </span>
              <span className="h-1.5 w-px bg-hairline-strong" />
            </span>
          ))}
        </div>

        <ul className="relative mt-3 grid gap-2 pb-1">
          {milestones.map((milestone) => {
            const on = day >= milestone.from && day <= milestone.to;
            return (
              <li key={milestone.label} className="relative h-7">
                <span
                  className={cn(
                    "absolute inset-y-0 flex items-center rounded-full border px-2.5 text-caption font-medium whitespace-nowrap transition-colors duration-base",
                    on ? barTone[milestone.tone].on : barTone[milestone.tone].off,
                  )}
                  style={{
                    left: `${(milestone.from / days) * 100}%`,
                    width: `${((milestone.to - milestone.from) / days) * 100}%`,
                  }}
                >
                  {milestone.label}
                </span>
              </li>
            );
          })}
        </ul>

        <motion.div
          className="pointer-events-none absolute top-5 bottom-0 w-px bg-accent"
          initial={false}
          animate={{ left: `${percent}%` }}
          transition={dragging ? { duration: 0 } : spring.snappy}
        >
          <div
            role="slider"
            tabIndex={0}
            aria-label={scrubberLabel}
            aria-valuemin={0}
            aria-valuemax={days}
            aria-valuenow={day}
            aria-valuetext={`${dateAt(day)}: ${activeText}`}
            onKeyDown={onKeyDown}
            className={cn(
              "pointer-events-auto absolute -top-2 left-1/2 flex size-11 -translate-x-1/2 cursor-grab items-start justify-center rounded-full outline-none",
              "focus-visible:[&>span]:ring-4 focus-visible:[&>span]:ring-accent-tint",
              dragging && "cursor-grabbing",
            )}
          >
            <span
              className={cn(
                "mt-0.5 size-3.5 rounded-full border-2 border-surface bg-accent shadow-card transition-transform duration-fast",
                dragging && "scale-125",
              )}
            />
          </div>
        </motion.div>
      </div>
      <div className="mt-6 border-t border-hairline pt-4">
        <p className="text-caption text-muted">
          {dueHeading} <span className="font-medium text-ink tabular-nums">{dateAt(day)}</span>
        </p>
        <ul className="mt-3 grid min-h-16 gap-2 sm:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {active.length === 0 && (
              <motion.li
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-caption text-subtle"
              >
                {empty}
              </motion.li>
            )}
            {active.map((milestone) => (
              <motion.li
                key={milestone.label}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={spring.soft}
                className="flex items-center gap-3 rounded-card border border-hairline bg-paper px-3 py-2.5"
              >
                <Avatar name={milestone.owner.name} src={milestone.owner.photo} tone={milestone.owner.tone} size="md" />
                <div className="min-w-0">
                  <p className="text-label font-medium text-ink">
                    {milestone.label}
                    <span className="font-normal text-muted"> · due {dateAt(milestone.to)}</span>
                  </p>
                  <p className="truncate text-caption text-muted">{milestone.detail}</p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
