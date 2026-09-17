"use client";

import { useState } from "react";

import { features, importFlow } from "@/content/content";
import { Button, LogoMark } from "@/design-system";
import { ImportModal } from "./import-modal";
import { sourceGlyphs } from "./source-glyphs";

const connectors = ["M0 14 C 40 14, 50 60, 96 60", "M0 60 L 96 60", "M0 106 C 40 106, 50 60, 96 60"];

export function ImportDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div aria-hidden className="flex items-center justify-center">
        <div className="flex flex-col gap-3">
          {importFlow.sources.map((source) => {
            const Glyph = sourceGlyphs[source.id];
            return (
              <span
                key={source.id}
                className="flex size-11 items-center justify-center rounded-card border border-hairline bg-surface text-ink shadow-card"
              >
                <Glyph className="size-5" />
              </span>
            );
          })}
        </div>
        <svg viewBox="0 0 96 120" className="h-38 w-24 shrink-0 overflow-visible" fill="none">
          {connectors.map((d) => (
            <path
              key={d}
              d={d}
              className="animate-dash-flow stroke-hairline-strong"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <span className="flex size-14 items-center justify-center rounded-panel border border-accent-line bg-accent-tint shadow-card">
          <LogoMark className="size-8" />
        </span>
      </div>

      <ImportModal
        open={open}
        onOpenChange={setOpen}
        trigger={
          <Button variant="outline" size="md" className="self-start">
            {features.import.cta}
          </Button>
        }
      />
    </div>
  );
}
