"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Hand, LayoutGrid, MessageSquare, Settings, FileText } from "lucide-react";

import { heroBoard } from "@/content/content";
import { LogoMark } from "@/design-system";
import { spring } from "@/lib/motion";
import { KanbanBoard } from "./kanban-board";

const railIcons = [
  { Icon: LayoutGrid, label: "Boards", active: true },
  { Icon: MessageSquare, label: "Threads", active: false },
  { Icon: FileText, label: "Docs", active: false },
  { Icon: Settings, label: "Settings", active: false },
];

export function NoviWindow() {
  const [hasDragged, setHasDragged] = useState(false);

  return (
    <div className="overflow-hidden rounded-panel border border-hairline bg-surface shadow-window">
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
          <div className="mb-4 flex items-center justify-between gap-3">
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
          <KanbanBoard onFirstDrag={() => setHasDragged(true)} />
        </div>
      </div>
    </div>
  );
}
