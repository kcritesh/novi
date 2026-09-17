import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-page px-5 sm:px-8", className)} {...props} />;
}

type SectionProps = Omit<ComponentProps<"section">, "id"> & {
  id: string;
  railed?: boolean;
  containerClassName?: string;
  children: ReactNode;
};

export function Section({
  id,
  railed = true,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      tabIndex={-1}
      className={cn("relative border-t border-hairline outline-none", className)}
      {...props}
    >
      <Container
        className={cn(
          "relative py-20 sm:py-24 lg:py-32",
          railed && "lg:border-x lg:border-hairline",
          containerClassName,
        )}
      >
        {children}
      </Container>
    </section>
  );
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("rounded-card border border-hairline bg-surface shadow-card", className)} {...props} />
  );
}
