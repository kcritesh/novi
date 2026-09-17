import type { ReactNode } from "react";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { proof, type Wordmark } from "@/content/content";
import { Section, Text } from "@/design-system";

const wordmarks: Record<Wordmark, ReactNode> = {
  fieldwork: <span className="font-serif text-[1.9rem] tracking-tight">Fieldwork</span>,
  loop: <span className="text-[1.6rem] font-semibold tracking-[-0.04em]">Loop &amp; Co</span>,
  parcel: (
    <span className="inline-flex items-start gap-0.5 text-[1.65rem] font-bold tracking-[-0.05em]">
      Parcel
      <svg viewBox="0 0 10 10" aria-hidden className="mt-1 size-2.5 fill-current">
        <path d="M0 0h10v10H6V4H0z" />
      </svg>
    </span>
  ),
  northwind: <span className="text-[1.35rem] font-light tracking-[0.02em]">Northwind Studio</span>,
  kiln: <span className="font-mono text-[1.7rem] font-bold tracking-[-0.08em] uppercase">Kiln</span>,
  sundial: (
    <span className="inline-flex items-start gap-1 text-[1.6rem] font-medium tracking-[-0.03em]">
      Sundial
      <svg viewBox="0 0 10 10" aria-hidden className="mt-1 size-2 fill-none stroke-current" strokeWidth="1.6">
        <circle cx="5" cy="5" r="3.8" />
      </svg>
    </span>
  ),
};

export function ProofGrid() {
  return (
    <Section id="proof" index="02" label="Proof" containerClassName="py-16 sm:py-20 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_2fr] lg:gap-0">
        <div className="lg:pr-10">
          <Text size="label">{proof.eyebrow}</Text>
          <p className="mt-3 max-w-sm text-title text-balance text-ink">{proof.statement}</p>
        </div>

        <RevealGroup
          role="list"
          aria-label="Customer logos"
          className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-3"
        >
          {proof.logos.map((logo) => (
            <RevealItem
              key={logo.id}
              role="listitem"
              className="group flex h-24 items-center justify-center bg-surface text-ink sm:h-28 lg:h-32"
            >
              <span className="sr-only">{logo.name}</span>
              <span
                aria-hidden
                className="scale-80 whitespace-nowrap opacity-55 grayscale transition-[opacity,translate] duration-base ease-out-soft group-hover:-translate-y-0.5 group-hover:opacity-100 sm:scale-100"
              >
                {wordmarks[logo.id]}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
