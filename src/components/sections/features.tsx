"use client";

import type { ReactNode } from "react";
import { ArrowRight, CalendarRange, Import, LayoutGrid, MessageSquare, type LucideIcon } from "lucide-react";

import { BoardShuffleDemo } from "@/components/demos/board-shuffle-demo";
import { ImportDemo } from "@/components/demos/import-demo";
import { ThreadDemo } from "@/components/demos/thread-demo";
import { TimelineDemo } from "@/components/demos/timeline-demo";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { features } from "@/content/content";
import { Em, Heading, Pill, Quiet, Section, Text } from "@/design-system";
import { useSpotlight } from "@/hooks/use-spotlight";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  children: ReactNode;
};

function FeatureCard({ icon: Icon, title, description, className, children }: FeatureCardProps) {
  const spotlight = useSpotlight<HTMLElement>();

  return (
    <RevealItem className={cn("h-full", className)}>
      <article
        onPointerMove={spotlight.onPointerMove}
        className={cn(
          "group relative isolate flex h-full flex-col overflow-hidden rounded-panel border border-hairline bg-surface p-5 shadow-card sm:p-7",
          "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-slow",
          "before:bg-[radial-gradient(28rem_circle_at_var(--spot-x,50%)_var(--spot-y,50%),var(--color-accent-tint),transparent_65%)]",
          "hover:before:opacity-100",
        )}
      >
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Icon aria-hidden className="size-5 shrink-0 text-ink sm:size-6" strokeWidth={1.5} />
          <h3 className="text-body-lg leading-snug font-semibold text-ink sm:text-title">{title}</h3>
        </div>
        <Text className="mt-1.5 max-w-md text-label sm:text-body">{description}</Text>
        <div className="mt-5 flex-1 sm:mt-7">{children}</div>
      </article>
    </RevealItem>
  );
}

export function Features() {
  return (
    <Section id="features">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <Reveal className="max-w-3xl">
          <Pill>{features.eyebrow}</Pill>
          <Heading className="mt-4">
            {features.heading.lead}{" "}
            <Quiet>
              <Em>{features.heading.emphasis}</Em> {features.heading.tail}
            </Quiet>
          </Heading>
        </Reveal>
        <Reveal className="lg:max-w-xs lg:pb-2">
          <Text size="body-lg">{features.support}</Text>
          <a
            href={features.link.href}
            className="group mt-1 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-label font-medium text-ink underline decoration-hairline-strong underline-offset-4 transition-colors duration-fast hover:decoration-ink"
          >
            {features.link.label}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-fast group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>
      </div>

      <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-5">
        <FeatureCard
          icon={LayoutGrid}
          title={features.boards.title}
          description={features.boards.description}
          className="md:col-span-2 lg:col-span-3"
        >
          <BoardShuffleDemo />
        </FeatureCard>
        <FeatureCard
          icon={Import}
          title={features.import.title}
          description={features.import.description}
          className="lg:col-span-2"
        >
          <ImportDemo />
        </FeatureCard>
        <FeatureCard
          icon={MessageSquare}
          title={features.threads.title}
          description={features.threads.description}
          className="lg:col-span-2"
        >
          <ThreadDemo />
        </FeatureCard>
        <FeatureCard
          icon={CalendarRange}
          title={features.timeline.title}
          description={features.timeline.description}
          className="md:col-span-2 lg:col-span-3"
        >
          <TimelineDemo />
        </FeatureCard>
      </RevealGroup>
    </Section>
  );
}
