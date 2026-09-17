"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type Announcements,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type KeyboardCoordinateGetter,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion, type MotionValue } from "motion/react";

import { heroBoard, type ColumnId, type Task } from "@/content/content";
import { dragLift, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  ScriptedDragLayer,
  isScriptedTask,
  sameLocation,
  scriptLocation,
  scriptedBoard,
  type ScriptLocation,
  type Slots,
} from "./scripted-drag";
import { TaskCard } from "./task-card";

type Board = Record<ColumnId, Task[]>;

const noopSubscribe = () => () => {};

const columnIds = heroBoard.columns.map((column) => column.id);

function isColumnId(id: UniqueIdentifier): id is ColumnId {
  return (columnIds as UniqueIdentifier[]).includes(id);
}

function findColumn(board: Board, id: UniqueIdentifier): ColumnId | undefined {
  if (isColumnId(id)) return id;
  return columnIds.find((column) => board[column].some((task) => task.id === id));
}

function findTask(board: Board, id: UniqueIdentifier) {
  return columnIds.flatMap((column) => board[column]).find((task) => task.id === id);
}

// Default sortable coordinates only walk within a list; left/right arrows jump to the top of the adjacent column.
const keyboardCoordinates: KeyboardCoordinateGetter = (event, args) => {
  const { active, droppableRects } = args.context;
  const step = event.code === "ArrowRight" ? 1 : event.code === "ArrowLeft" ? -1 : 0;
  if (step === 0) return sortableKeyboardCoordinates(event, args);

  event.preventDefault();
  const current = active?.data.current?.sortable?.containerId as ColumnId | undefined;
  const target = current ? columnIds[columnIds.indexOf(current) + step] : undefined;
  const rect = target ? droppableRects.get(target) : undefined;
  return rect ? { x: rect.left, y: rect.top } : args.currentCoordinates;
};

function columnTitle(id: ColumnId) {
  return heroBoard.columns.find((column) => column.id === id)?.title ?? id;
}

type KanbanBoardProps = {
  onFirstDrag?: () => void;
  scrollDrag?: MotionValue<number>;
  className?: string;
};

export function KanbanBoard({ onFirstDrag, scrollDrag, className }: KanbanBoardProps) {
  const dndId = useId();
  const [boardState, setBoard] = useState<Board>(heroBoard.tasks);
  const [script, setScript] = useState<ScriptLocation | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lists = useRef<Partial<Record<ColumnId, HTMLUListElement>>>({});
  const slots = useRef<Slots>({});
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const boardBeforeDrag = useRef<Board | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: keyboardCoordinates }),
  );

  useEffect(() => {
    if (!scrollDrag) return;
    const sync = (progress: number) =>
      setScript((prev) => {
        const next = scriptLocation(progress);
        return prev && sameLocation(prev, next) ? prev : next;
      });
    sync(scrollDrag.get());
    return scrollDrag.on("change", sync);
  }, [scrollDrag]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!scrollDrag || !grid) return;
    const measure = () => {
      for (const id of columnIds) {
        const list = lists.current[id];
        if (list) slots.current[id] = { x: list.offsetLeft, y: list.offsetTop, width: list.offsetWidth };
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    return () => observer.disconnect();
  }, [scrollDrag]);

  const location = scrollDrag ? script : null;
  const board = location ? scriptedBoard(location.column) : boardState;
  const activeTask = activeId ? findTask(board, activeId) : undefined;

  const announcements: Announcements = {
    onDragStart: ({ active }) => `Picked up ${findTask(board, active.id)?.title ?? "card"}.`,
    onDragOver: ({ active, over }) => {
      const column = over ? findColumn(board, over.id) : undefined;
      return column ? `${findTask(board, active.id)?.title} is over ${columnTitle(column)}.` : undefined;
    },
    onDragEnd: ({ active, over }) => {
      const column = over ? findColumn(board, over.id) : undefined;
      return column
        ? `Dropped ${findTask(board, active.id)?.title} in ${columnTitle(column)}.`
        : "Drop cancelled.";
    },
    onDragCancel: () => "Drag cancelled. Card returned to its column.",
  };

  function handleDragStart({ active }: DragStartEvent) {
    boardBeforeDrag.current = board;
    setBoard(board);
    setActiveId(active.id);
    onFirstDrag?.();
  }

  // Cross-column moves happen live while hovering so the target column opens a gap immediately.
  function handleDragOver({ active, over }: DragOverEvent) {
    if (!over) return;
    setBoard((current) => {
      const from = findColumn(current, active.id);
      const to = findColumn(current, over.id);
      if (!from || !to || from === to) return current;

      const moving = current[from].find((task) => task.id === active.id);
      if (!moving) return current;

      const overIndex = current[to].findIndex((task) => task.id === over.id);
      const insertAt = overIndex === -1 ? current[to].length : overIndex;

      return {
        ...current,
        [from]: current[from].filter((task) => task.id !== active.id),
        [to]: [...current[to].slice(0, insertAt), moving, ...current[to].slice(insertAt)],
      };
    });
  }

  // On mobile the grid is a snap carousel; settle on the column the card landed in.
  function scrollToColumn(column: ColumnId | undefined) {
    const grid = gridRef.current;
    const section = column ? lists.current[column]?.closest("section") : null;
    if (!grid || !section || grid.scrollWidth <= grid.clientWidth) return;
    grid.scrollTo({
      left: section.offsetLeft - parseFloat(getComputedStyle(grid).paddingLeft),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  function handleDragCancel() {
    setActiveId(null);
    if (boardBeforeDrag.current) {
      setBoard(boardBeforeDrag.current);
      scrollToColumn(findColumn(boardBeforeDrag.current, activeId ?? ""));
    }
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    scrollToColumn(findColumn(board, active.id));
    if (!over) return;
    setBoard((current) => {
      const column = findColumn(current, active.id);
      if (!column || column !== findColumn(current, over.id)) return current;
      const from = current[column].findIndex((task) => task.id === active.id);
      const to = current[column].findIndex((task) => task.id === over.id);
      if (from === -1 || to === -1 || from === to) return current;
      return { ...current, [column]: arrayMove(current[column], from, to) };
    });
  }

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      autoScroll={{ threshold: { x: 0.25, y: 0.2 }, acceleration: 14 }}
      accessibility={{
        announcements,
        screenReaderInstructions: {
          draggable:
            "To pick up a card, press space or enter. Use the arrow keys to move it between columns, then press space or enter to drop, or escape to cancel.",
        },
      }}
    >
      <div
        ref={gridRef}
        className={cn(
          "relative -mx-4 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0",
          // Snap fights dnd-kit's incremental auto-scroll, pinning the board to the current column.
          activeId !== null && "snap-none",
          className,
        )}
      >
        {heroBoard.columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={board[column.id]}
            activeId={activeId}
            ghost={location?.ghost === true}
            highlighted={location?.over === column.id}
            animateLayout={scrollDrag !== undefined}
            listRef={(node) => {
              if (node) lists.current[column.id] = node;
            }}
          />
        ))}
        {scrollDrag && <ScriptedDragLayer progress={scrollDrag} slots={slots} />}
      </div>

      {isClient &&
        createPortal(
          <DragOverlay dropAnimation={{ duration: 220, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
            {activeTask ? (
              <motion.div initial={{ scale: 1, rotate: 0 }} animate={dragLift} transition={spring.snappy}>
                <TaskCard task={activeTask} lifted className="cursor-grabbing" />
              </motion.div>
            ) : null}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );
}

type KanbanColumnProps = {
  id: ColumnId;
  title: string;
  tasks: Task[];
  activeId: UniqueIdentifier | null;
  ghost: boolean;
  highlighted: boolean;
  animateLayout: boolean;
  listRef: (node: HTMLUListElement | null) => void;
};

function KanbanColumn({
  id,
  title,
  tasks,
  activeId,
  ghost,
  highlighted,
  animateLayout,
  listRef,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <section
      aria-label={`${title}, ${tasks.length} ${tasks.length === 1 ? "card" : "cards"}`}
      className={cn(
        "flex w-[78%] shrink-0 snap-start flex-col rounded-card bg-paper p-2 transition-colors duration-fast sm:w-auto",
        (isOver || highlighted) && "bg-accent-tint",
      )}
    >
      <header className="flex items-center gap-2 px-1.5 pt-1 pb-2.5">
        <span className="text-label font-medium text-ink">{title}</span>
        <span className="relative inline-flex h-5 min-w-5 items-center justify-center overflow-hidden rounded-full bg-sand px-1.5 text-micro font-medium text-muted tabular-nums">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={tasks.length}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={spring.snappy}
            >
              {tasks.length}
            </motion.span>
          </AnimatePresence>
        </span>
      </header>
      <SortableContext id={id} items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        <ul
          ref={(node) => {
            setNodeRef(node);
            listRef(node);
          }}
          className="flex min-h-24 flex-1 flex-col gap-2"
        >
          {tasks.map((task) => (
            <SortableTask
              key={task.id}
              task={task}
              dimmed={task.id === activeId || (ghost && isScriptedTask(task.id))}
              animateLayout={animateLayout}
            />
          ))}
        </ul>
      </SortableContext>
    </section>
  );
}

type SortableTaskProps = { task: Task; dimmed: boolean; animateLayout: boolean };

function SortableTask({ task, dimmed, animateLayout }: SortableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className="touch-manipulation"
    >
      <motion.div layout={animateLayout ? "position" : false} transition={spring.snappy}>
        <TaskCard
          task={task}
          {...attributes}
          {...listeners}
          className={cn(
            "cursor-grab transition-[opacity,border-color,box-shadow] duration-fast hover:border-hairline-strong",
            dimmed && "border-dashed border-hairline-strong bg-paper opacity-50 shadow-none",
          )}
        />
      </motion.div>
    </li>
  );
}
