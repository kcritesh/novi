import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-sans font-semibold text-ink text-balance", {
  variants: {
    size: {
      "display-xl": "text-display-sm sm:text-display-md lg:text-display-xl",
      "display-lg": "text-display-sm sm:text-display-md lg:text-display-lg",
      "display-md": "text-display-sm lg:text-display-md",
      "display-sm": "text-display-sm",
      title: "text-title",
    },
  },
  defaultVariants: { size: "display-md" },
});

type HeadingProps = ComponentProps<"h2"> &
  VariantProps<typeof headingVariants> & {
    as?: "h1" | "h2" | "h3" | "h4";
  };

export function Heading({ as: Tag = "h2", size, className, ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ size }), className)} {...props} />;
}

export function Em({ className, ...props }: ComponentProps<"em">) {
  return (
    <em
      className={cn("font-serif text-[1.08em] font-normal tracking-[-0.01em] italic", className)}
      {...props}
    />
  );
}

export function Quiet({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("text-muted", className)} {...props} />;
}

const textVariants = cva("", {
  variants: {
    size: {
      "body-lg": "text-body-lg",
      body: "text-body",
      label: "text-label",
      caption: "text-caption",
      micro: "text-micro",
    },
    tone: {
      ink: "text-ink",
      muted: "text-muted",
      subtle: "text-subtle",
      accent: "text-accent-ink",
    },
  },
  defaultVariants: { size: "body", tone: "muted" },
});

type TextProps = ComponentProps<"p"> &
  VariantProps<typeof textVariants> & {
    as?: "p" | "span" | "div";
  };

export function Text({ as: Tag = "p", size, tone, className, ...props }: TextProps) {
  return <Tag className={cn(textVariants({ size, tone }), className)} {...props} />;
}
