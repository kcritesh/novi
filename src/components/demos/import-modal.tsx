"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { importFlow, type ImportSourceId } from "@/content/content";
import { Button } from "@/design-system";
import { spring } from "@/lib/motion";
import { scrollToHash } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { sourceGlyphs } from "./source-glyphs";

type ImportModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
};

export function ImportModal({ open, onOpenChange, trigger }: ImportModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <ImportFlow onOpenBoard={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

type Phase = "pick" | "importing" | "done";

const STEP_MS = 850;

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

function ImportFlow({ onOpenBoard }: { onOpenBoard: () => void }) {
  const [phase, setPhase] = useState<Phase>("pick");
  const [sourceId, setSourceId] = useState<ImportSourceId>(importFlow.sources[0].id);
  const [step, setStep] = useState(0);

  const source = importFlow.sources.find((s) => s.id === sourceId) ?? importFlow.sources[0];
  const steps = importFlow.steps.map((label) => fill(label, { count: source.tasks }));
  const progress = (step + 0.5) / steps.length;

  useEffect(() => {
    if (phase !== "importing") return;
    const timer = window.setTimeout(() => {
      if (step < steps.length - 1) setStep(step + 1);
      else setPhase("done");
    }, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [phase, step, steps.length]);

  function startImport() {
    setStep(0);
    setPhase("importing");
  }

  if (phase === "done") {
    return (
      <div className="flex flex-col items-center py-4 text-center">
        <AnimatedCheck />
        <DialogTitle className="mt-5 pr-0">
          {fill(importFlow.done.title, { count: source.tasks })}
        </DialogTitle>
        <DialogDescription>{fill(importFlow.done.description, { source: source.label })}</DialogDescription>
        <div className="mt-7 flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-center">
          <Button variant="ghost" onClick={() => setPhase("pick")}>
            {importFlow.done.secondary}
          </Button>
          <Button
            autoFocus
            onClick={() => {
              onOpenBoard();
              window.setTimeout(() => scrollToHash("#overview"), 250);
            }}
          >
            {importFlow.done.primary}
          </Button>
        </div>
      </div>
    );
  }

  const importing = phase === "importing";

  return (
    <div>
      <DialogTitle>{importFlow.title}</DialogTitle>
      <DialogDescription>{importFlow.description}</DialogDescription>

      <fieldset disabled={importing} className="mt-6">
        <legend className="sr-only">Choose where to import from</legend>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {importFlow.sources.map((option) => {
            const Glyph = sourceGlyphs[option.id];
            return (
              <label
                key={option.id}
                className={cn(
                  "relative flex cursor-pointer flex-col items-center gap-2 rounded-card border border-hairline bg-paper px-2 py-4 text-label text-muted transition-[border-color,background-color,color,box-shadow] duration-fast",
                  "hover:border-hairline-strong has-checked:border-accent has-checked:bg-surface has-checked:text-ink has-checked:shadow-card",
                  "has-focus-visible:ring-4 has-focus-visible:ring-accent-tint has-disabled:cursor-default",
                )}
              >
                <input
                  type="radio"
                  name="import-source"
                  value={option.id}
                  checked={sourceId === option.id}
                  onChange={() => setSourceId(option.id)}
                  className="peer sr-only"
                />
                <Glyph aria-hidden className="size-7" />
                {option.label}
                <span className="absolute top-2 right-2 hidden size-4 items-center justify-center rounded-full bg-accent text-white peer-checked:flex">
                  <Check aria-hidden className="size-3" strokeWidth={3} />
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <AnimatePresence initial={false}>
        {importing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={spring.soft}
            className="overflow-hidden"
          >
            <ol className="mt-6 space-y-3" aria-live="polite">
              {steps.map((label, index) => {
                const state = index < step ? "done" : index === step ? "active" : "pending";
                if (state === "pending") return null;
                return (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={spring.soft}
                    className={cn(
                      "flex items-center gap-3 text-body",
                      state === "done" ? "text-muted" : "text-ink",
                    )}
                  >
                    {state === "done" ? (
                      <span className="flex size-5 items-center justify-center rounded-full bg-green-ink text-white">
                        <Check aria-hidden className="size-3" strokeWidth={3} />
                      </span>
                    ) : (
                      <Loader2 aria-hidden className="size-5 animate-spin text-accent" />
                    )}
                    <span className={state === "active" ? "font-medium" : undefined}>{label}</span>
                  </motion.li>
                );
              })}
            </ol>

            <div
              className="mt-6 h-1.5 overflow-hidden rounded-full bg-sand"
              role="progressbar"
              aria-label="Import progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
            >
              <motion.div
                className="h-full origin-left rounded-full bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress }}
                transition={{ duration: STEP_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-caption text-muted">{importFlow.undoNote}</p>
        <Button onClick={importing ? undefined : startImport} aria-disabled={importing}>
          {importing ? "Importing…" : `${importFlow.start} from ${source.label}`}
        </Button>
      </div>
    </div>
  );
}

function AnimatedCheck() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="size-16">
      <motion.circle
        cx="32"
        cy="32"
        r="30"
        className="fill-green-tint"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={spring.bouncy}
        style={{ originX: "50%", originY: "50%" }}
      />
      <motion.path
        d="M20 33 L28.5 41 L45 24"
        fill="none"
        className="stroke-green-ink"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}
