import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-page px-5 sm:px-8", className)} {...props} />;
}

type SectionProps = Omit<ComponentProps<"section">, "id"> & {
  id: string;
  index?: string;
  label?: string;
  railed?: boolean;
  containerClassName?: string;
  children: ReactNode;
};

export function Section({
  id,
  index,
  label,
  railed = true,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section id={id} className={cn("relative border-t border-hairline", className)} {...props}>
      <Container
        className={cn(
          "relative py-20 sm:py-24 lg:py-32",
          railed && "lg:border-x lg:border-hairline",
          containerClassName,
        )}
      >
        {index && label && <RailLabel index={index} label={label} />}
        {children}
      </Container>
    </section>
  );
}

export function RailLabel({ index, label }: { index: string; label: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-1/2 -left-10 hidden origin-center -translate-y-1/2 -rotate-90 text-micro whitespace-nowrap text-subtle xl:block"
    >
      {index} — {label}
    </span>
  );
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-card border border-hairline bg-surface shadow-card", className)}
      {...props}
    />
  );
}
