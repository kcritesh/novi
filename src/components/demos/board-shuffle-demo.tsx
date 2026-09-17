"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";

import { features } from "@/content/content";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CardId = (typeof features.boards.cards)[number]["id"];
type Columns = CardId[][];

const initialColumns: Columns = [["b1", "b2"], ["b3"], ["b4"]];

const toneDot = {
  accent: "bg-accent",
  amber: "bg-amber-ink",
  rose: "bg-rose-ink",
  green: "bg-green-ink",
} as const;

const cardsById = Object.fromEntries(features.boards.cards.map((card) => [card.id, card]));

// Moves the top card of the leftmost unfinished column one step right; once every card is done, the board resets.
function advance(columns: Columns): Columns {
  const last = columns.length - 1;
  const from = columns.slice(0, last).findIndex((column) => column.length > 0);
  if (from === -1) return initialColumns;
  const next = columns.map((column) => [...column]);
  const [card] = next[from].splice(0, 1);
  next[from + 1].push(card);
  return next;
}

export function BoardShuffleDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [columns, setColumns] = useState<Columns>(initialColumns);

  const running = inView && !paused && !reduceMotion;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setColumns(advance), 1600);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <div
      ref={ref}
      aria-hidden
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className="grid grid-cols-3 gap-2"
    >
      <LayoutGroup>
        {features.boards.columns.map((title, index) => (
          <div key={title} className="flex min-h-40 flex-col gap-1.5 rounded-control bg-paper p-1.5">
            <div className="flex items-center justify-between px-1 pt-0.5 pb-1">
              <span className="text-caption font-medium text-ink">{title}</span>
              <span className="text-micro text-subtle tabular-nums">{columns[index].length}</span>
            </div>
            {columns[index].map((id) => {
              const card = cardsById[id];
              return (
                <motion.div
                  key={id}
                  layoutId={`shuffle-${id}`}
                  transition={spring.soft}
                  className="rounded-control border border-hairline bg-surface px-2 py-2 shadow-card"
                >
                  <div className="flex items-center gap-1.5">
                    <span className={cn("size-1.5 shrink-0 rounded-full", toneDot[card.tone])} />
                    <span className="truncate text-caption text-ink">{card.title}</span>
                  </div>
                  <span className="mt-2 block h-1 w-2/3 rounded-full bg-hairline" />
                </motion.div>
              );
            })}
          </div>
        ))}
      </LayoutGroup>
    </div>
  );
}
