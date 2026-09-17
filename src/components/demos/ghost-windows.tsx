import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

function Bar({ className }: { className?: string }) {
  return <span className={cn("block h-1.5 rounded-full bg-hairline-strong", className)} />;
}

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-card border border-hairline bg-surface shadow-window">
      <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-hairline px-3">
        <span className="size-1.5 rounded-full bg-hairline-strong" />
        <span className="size-1.5 rounded-full bg-hairline-strong" />
        <span className="size-1.5 rounded-full bg-hairline-strong" />
        <span className="ml-2 text-micro text-subtle">{label}</span>
      </div>
      <div className="flex-1 p-3">{children}</div>
    </div>
  );
}

export function ChatGhost() {
  return (
    <Frame label="#launch-chat">
      <div className="flex h-full gap-3">
        <div className="w-10 space-y-2 rounded-control bg-sand p-2">
          <span className="block size-5 rounded-full bg-accent-tint" />
          <span className="block size-5 rounded-full bg-green-tint" />
          <span className="block size-5 rounded-full bg-amber-tint" />
        </div>
        <div className="flex-1 space-y-2.5">
          {["w-3/4", "w-1/2", "w-5/6", "w-3/5"].map((width) => (
            <div key={width} className="flex items-center gap-2">
              <span className="size-4 shrink-0 rounded-full bg-sand-deep" />
              <Bar className={cn("h-2", width)} />
            </div>
          ))}
          <div className="mt-3 h-6 rounded-control border border-hairline" />
        </div>
      </div>
    </Frame>
  );
}

export function DocGhost() {
  return (
    <Frame label="Launch brief.doc">
      <div className="space-y-2">
        <Bar className="h-3 w-1/2 bg-ink/70" />
        <Bar className="w-full" />
        <Bar className="w-11/12" />
        <Bar className="w-4/5" />
        <Bar className="mt-3 w-full" />
        <Bar className="w-2/3" />
      </div>
    </Frame>
  );
}

const sheetTints = ["bg-green-tint", "bg-surface", "bg-amber-tint", "bg-surface", "bg-surface", "bg-rose-tint"];

export function SheetGhost() {
  return (
    <Frame label="roadmap.xlsx">
      <div className="grid grid-cols-4 overflow-hidden rounded-sm border border-hairline">
        {Array.from({ length: 24 }, (_, i) => (
          <span
            key={i}
            className={cn("h-4 border-r border-b border-hairline", i % 4 === 3 && "border-r-0", sheetTints[i % sheetTints.length])}
          />
        ))}
      </div>
    </Frame>
  );
}

export function BoardGhost() {
  return (
    <Frame label="Old board tool">
      <div className="grid h-full grid-cols-3 gap-2">
        {[3, 2, 1].map((count, column) => (
          <div key={column} className="space-y-1.5 rounded-control bg-sand p-1.5">
            <Bar className="w-1/2" />
            {Array.from({ length: count }, (_, i) => (
              <span key={i} className="block h-6 rounded-sm bg-surface" />
            ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}
