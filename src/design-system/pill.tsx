import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const pillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        accent: "bg-accent-tint text-accent-ink",
        solid: "bg-accent text-white",
        outline: "border border-hairline bg-surface text-ink shadow-hairline",
        neutral: "bg-sand text-ink",
        green: "bg-green-tint text-green-ink",
        amber: "bg-amber-tint text-amber-ink",
        rose: "bg-rose-tint text-rose-ink",
      },
      size: {
        sm: "h-6 px-2.5 text-caption",
        md: "h-8 px-3.5 text-label",
      },
    },
    defaultVariants: { tone: "accent", size: "sm" },
  },
);

export type PillTone = NonNullable<VariantProps<typeof pillVariants>["tone"]>;

type PillProps = ComponentProps<"span"> & VariantProps<typeof pillVariants>;

export function Pill({ tone, size, className, ...props }: PillProps) {
  return <span className={cn(pillVariants({ tone, size }), className)} {...props} />;
}
