import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap select-none",
    "transition-[background-color,border-color,color,box-shadow,translate] duration-fast ease-out-soft",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: "rounded-control bg-accent text-white shadow-card hover:bg-accent-hover",
        ink: "rounded-control bg-ink text-white shadow-card hover:bg-ink-soft",
        outline:
          "rounded-control border border-hairline bg-surface text-ink shadow-hairline hover:border-hairline-strong hover:bg-paper",
        ghost: "rounded-control text-ink hover:bg-sand",
        link: "rounded-sm text-ink underline decoration-hairline-strong underline-offset-4 hover:decoration-ink",
      },
      size: {
        sm: "h-9 px-3.5 text-label after:absolute after:-inset-1",
        md: "h-11 px-5 text-label",
        lg: "h-12 px-6 text-body",
        icon: "size-11",
      },
      block: {
        true: "w-full",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ className, variant, size, block, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp className={cn(buttonVariants({ variant, size, block }), className)} {...props} />;
}
