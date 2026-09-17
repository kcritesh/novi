import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type LogoMarkProps = ComponentProps<"svg"> & { tone?: "brand" | "ink" };

export function LogoMark({ tone = "brand", className, ...props }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-7", className)} {...props}>
      <rect x="2" y="2" width="19" height="19" rx="6" className="fill-ink" />
      <rect
        x="11"
        y="11"
        width="19"
        height="19"
        rx="6"
        className={tone === "brand" ? "fill-accent" : "fill-ink-soft"}
      />
      <path d="M11 17a6 6 0 0 1 6-6h4v4a6 6 0 0 1-6 6h-4z" className="fill-paper" opacity="0.55" />
    </svg>
  );
}

type LogoProps = ComponentProps<"span"> & { tone?: "brand" | "ink" };

export function Logo({ tone = "brand", className, ...props }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-ink", className)} {...props}>
      <LogoMark tone={tone} />
      <span className="text-title leading-none font-semibold tracking-[-0.04em]">novi</span>
    </span>
  );
}
