import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full min-w-0 rounded-control border border-hairline bg-surface px-3.5 text-body text-ink shadow-hairline",
        "transition-[border-color,box-shadow] duration-fast ease-out-soft placeholder:text-subtle",
        "focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent-tint focus-visible:outline-none",
        "aria-invalid:border-rose-ink aria-invalid:ring-rose-tint",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-sm border border-hairline bg-surface px-1 font-mono text-micro text-muted",
        className,
      )}
      {...props}
    />
  );
}
