"use client";

import type { RefObject } from "react";
import { Hand, HandGrab } from "lucide-react";
import { cubicBezier, motion, useTransform, type MotionValue } from "motion/react";

import { heroBoard, type ColumnId, type Task } from "@/content/content";
import { dragLift, ease, scrollDrag } from "@/lib/motion";
import { TaskCard } from "./task-card";

export type Slots = Partial<Record<ColumnId, { x: number; y: number; width: number }>>;
export type ScriptLocation = { column: ColumnId; ghost: boolean; over: ColumnId | null };

const { taskId, path } = heroBoard.scrollDrag;
const hops = path.length - 1;
const travelEase = cubicBezier(...ease.inOutSoft);
const scriptedTask = Object.values(heroBoard.tasks)
  .flat()
  .find((task) => task.id === taskId);

function ramp(value: number, [from, to]: readonly [number, number]) {
  return Math.min(1, Math.max(0, (value - from) / (to - from)));
}

// Splits overall progress into the active hop and the local progress within it.
function hopAt(progress: number) {
  const scaled = Math.min(1, Math.max(0, progress)) * hops;
  const hop = Math.min(Math.floor(scaled), hops - 1);
  return { hop, t: scaled - hop };
}

export function scriptLocation(progress: number): ScriptLocation {
  const { hop, t } = hopAt(progress);
  const ghost = t > scrollDrag.lift[0] && t < scrollDrag.drop[1];
  // Like a real drag, the card's slot moves to the target column halfway through travel.
  const arrived = t >= 0.5;
  return {
    column: path[arrived ? hop + 1 : hop],
    ghost,
    over: ghost && arrived ? path[hop + 1] : null,
  };
}

export function sameLocation(a: ScriptLocation, b: ScriptLocation) {
  return a.column === b.column && a.ghost === b.ghost && a.over === b.over;
}

export function scriptedBoard(column: ColumnId): Record<ColumnId, Task[]> {
  const without = (id: ColumnId) => heroBoard.tasks[id].filter((task) => task.id !== taskId);
  const board = { todo: without("todo"), doing: without("doing"), done: without("done") };
  if (scriptedTask) board[column] = [scriptedTask, ...board[column]];
  return board;
}

export function isScriptedTask(id: string) {
  return id === taskId;
}

type ScriptedDragLayerProps = {
  progress: MotionValue<number>;
  slots: RefObject<Slots>;
};

export function ScriptedDragLayer({ progress, slots }: ScriptedDragLayerProps) {
  function frame(value: number) {
    const { hop, t } = hopAt(value);
    const from = slots.current[path[hop]];
    const to = slots.current[path[hop + 1]];
    const lift = ramp(t, scrollDrag.lift) * (1 - ramp(t, scrollDrag.drop));
    const travel = travelEase(ramp(t, scrollDrag.travel));
    const sway = Math.sin(Math.PI * travel);
    const x = from && to ? from.x + (to.x - from.x) * travel : 0;
    const y = from && to ? from.y + (to.y - from.y) * travel - sway * scrollDrag.arc : 0;
    const width = from?.width ?? 0;

    return {
      x,
      y,
      width,
      lift,
      visible: from && to && t > scrollDrag.lift[0] && t < scrollDrag.drop[1] ? 1 : 0,
      rotate: dragLift.rotate * lift + sway * 1.5,
      scale: 1 + (dragLift.scale - 1) * lift,
      cursor:
        from && to
          ? ramp(t, [scrollDrag.cursor[0], scrollDrag.lift[0]]) *
            (1 - ramp(t, [scrollDrag.drop[1], scrollDrag.cursor[1]]))
          : 0,
      cursorX: x + width * 0.62,
      cursorY: y + 20,
    };
  }

  const x = useTransform(progress, (value) => frame(value).x);
  const y = useTransform(progress, (value) => frame(value).y);
  const width = useTransform(progress, (value) => frame(value).width);
  const lift = useTransform(progress, (value) => frame(value).lift);
  const opacity = useTransform(progress, (value) => frame(value).visible);
  const rotate = useTransform(progress, (value) => frame(value).rotate);
  const scale = useTransform(progress, (value) => frame(value).scale);
  const cursor = useTransform(progress, (value) => frame(value).cursor);
  const cursorX = useTransform(progress, (value) => frame(value).cursorX);
  const cursorY = useTransform(progress, (value) => frame(value).cursorY);
  const openHand = useTransform(lift, (value) => 1 - Math.min(1, value * 2));
  const grabHand = useTransform(openHand, (value) => 1 - value);
  const press = useTransform(lift, (value) => 1 - value * 0.12);

  if (!scriptedTask) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
      <motion.div className="absolute top-0 left-0" style={{ x, y, width, rotate, scale, opacity }}>
        <motion.div className="absolute inset-0 rounded-card shadow-lift" style={{ opacity: lift }} />
        <TaskCard task={scriptedTask} className="relative" />
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 size-5 text-ink"
        style={{ x: cursorX, y: cursorY, opacity: cursor, scale: press }}
      >
        <motion.span className="absolute inset-0" style={{ opacity: openHand }}>
          <Hand className="size-5 fill-surface" />
        </motion.span>
        <motion.span className="absolute inset-0" style={{ opacity: grabHand }}>
          <HandGrab className="size-5 fill-surface" />
        </motion.span>
      </motion.div>
    </div>
  );
}
