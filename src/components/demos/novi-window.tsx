"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { Hand, LayoutGrid, MessageSquare, Settings, FileText } from "lucide-react";

import { heroBoard } from "@/content/content";
import { LogoMark } from "@/design-system";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { scrollDrag, spring } from "@/lib/motion";
import { KanbanBoard } from "./kanban-board";

const railIcons = [
  { Icon: LayoutGrid, label: "Boards", active: true },
  { Icon: MessageSquare, label: "Threads", active: false },
  { Icon: FileText, label: "Docs", active: false },
  { Icon: Settings, label: "Settings", active: false },
];

const hops = heroBoard.scrollDrag.path.length - 1;

// Scrubs 0→1 over `perHop` viewport heights per hop, starting once the window nears the viewport bottom.
function useScrollDragProgress(target: RefObject<HTMLElement | null>) {
  const { scrollY } = useScroll();
  const start = useMotionValue(0);
  const end = useMotionValue(1);

  useEffect(() => {
    const node = target.current;
    if (!node) return;
    const measure = () => {
      let top = 0;
      for (
        let el: HTMLElement | null = node;
        el;
        el = el.offsetParent instanceof HTMLElement ? el.offsetParent : null
      ) {
        top += el.offsetTop;
      }
      const { range } = scrollDrag;
      const from = Math.max(0, top - window.innerHeight * range.start);
      start.set(from);
      end.set(from + window.innerHeight * range.perHop * hops);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [target, start, end]);

  return useTransform(() =>
    Math.min(1, Math.max(0, (scrollY.get() - start.get()) / (end.get() - start.get()))),
  );
}

export function NoviWindow() {
  const [hasDragged, setHasDragged] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const progress = useScrollDragProgress(windowRef);
  const reduceMotion = usePrefersReducedMotion();
  const isGrid = useMediaQuery("(min-width: 40rem)");
  const scripted = !reduceMotion && isGrid && !hasDragged;

  return (
    <div
      ref={windowRef}
      className="overflow-hidden rounded-panel border border-hairline bg-surface shadow-window"
    >
      <div className="flex h-10 items-center gap-1.5 border-b border-hairline px-4">
        <span className="size-2.5 rounded-full bg-hairline-strong" />
        <span className="size-2.5 rounded-full bg-hairline-strong" />
        <span className="size-2.5 rounded-full bg-hairline-strong" />
      </div>

      <div className="flex">
        <nav
          aria-label="Workspace"
          className="hidden w-14 shrink-0 flex-col items-center gap-1 border-r border-hairline py-3 sm:flex"
        >
          <LogoMark className="mb-3 size-6" />
          {railIcons.map(({ Icon, label, active }) => (
            <span
              key={label}
              title={label}
              className={
                active
                  ? "inline-flex size-9 items-center justify-center rounded-control bg-accent-tint text-accent-ink"
                  : "inline-flex size-9 items-center justify-center rounded-control text-subtle"
              }
            >
              <Icon aria-hidden className="size-4" />
              <span className="sr-only">{label}</span>
            </span>
          ))}
        </nav>

        <div className="min-w-0 flex-1 p-4 sm:p-5">
          {/* Fixed height: the hint pill unmounts after the first drag and must not resize the window. */}
          <div className="mb-4 flex h-8 items-center justify-between gap-3">
            <p className="truncate text-body font-semibold text-ink">
              {heroBoard.breadcrumb.project}
              <span className="hidden font-normal text-muted sm:inline"> — {heroBoard.breadcrumb.view}</span>
            </p>
            <AnimatePresence>
              {!hasDragged && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0, transition: { ...spring.soft, delay: 1.6 } }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-hairline bg-paper px-2.5 py-1 text-caption text-muted"
                >
                  <motion.span
                    animate={{ rotate: [0, -14, 0] }}
                    transition={{ duration: 1.2, repeat: 3, repeatDelay: 1.4, delay: 2 }}
                    className="inline-flex"
                  >
                    <Hand aria-hidden className="size-3.5" />
                  </motion.span>
                  {heroBoard.hint}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <KanbanBoard onFirstDrag={() => setHasDragged(true)} scrollDrag={scripted ? progress : undefined} />
        </div>
      </div>
    </div>
  );
}
