import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full font-medium ring-2 ring-surface select-none",
  {
    variants: {
      tone: {
        accent: "bg-accent-tint text-accent-ink",
        green: "bg-green-tint text-green-ink",
        amber: "bg-amber-tint text-amber-ink",
        rose: "bg-rose-tint text-rose-ink",
        ink: "bg-ink text-white",
      },
      size: {
        xs: "size-5 text-micro",
        sm: "size-6 text-micro",
        md: "size-8 text-caption",
      },
    },
    defaultVariants: { tone: "accent", size: "sm" },
  },
);

export type AvatarTone = NonNullable<VariantProps<typeof avatarVariants>["tone"]>;

type AvatarProps = Omit<ComponentProps<"span">, "children"> &
  VariantProps<typeof avatarVariants> & {
    name: string;
  };

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({ name, tone, size, className, ...props }: AvatarProps) {
  return (
    <span
      role="img"
      aria-label={name}
      title={name}
      className={cn(avatarVariants({ tone, size }), className)}
      {...props}
    >
      {initials(name)}
    </span>
  );
}

export function AvatarStack({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("flex -space-x-1", className)} {...props} />;
}
