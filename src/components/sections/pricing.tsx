"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { pricing, type Billing } from "@/content/content";
import { Button, Em, Heading, Pill, Quiet, Section, Text } from "@/design-system";
import { rollNumber, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Plan = (typeof pricing.plans)[number];

function priceFor(plan: Plan, billing: Billing) {
  const value = billing === "yearly" ? plan.monthly * (1 - pricing.billing.yearlyDiscount) : plan.monthly;
  const [whole, cents] = value.toFixed(2).split(".");
  return { whole, cents: cents === "00" ? null : cents };
}

function BillingToggle({ billing, onChange }: { billing: Billing; onChange: (billing: Billing) => void }) {
  const options: Billing[] = ["monthly", "yearly"];
  return (
    <div
      role="group"
      aria-label="Billing period"
      className="inline-flex items-center rounded-control border border-hairline bg-surface p-1 shadow-hairline"
    >
      {options.map((option) => {
        const selected = billing === option;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option)}
            className={cn(
              "relative inline-flex h-10 cursor-pointer items-center gap-2 rounded-[calc(var(--radius-control)-2px)] px-4 text-label transition-colors duration-fast",
              selected ? "text-ink" : "text-muted hover:text-ink",
            )}
          >
            {selected && (
              <motion.span
                layoutId="billing-pill"
                transition={spring.snappy}
                className="absolute inset-0 rounded-[calc(var(--radius-control)-2px)] bg-sand"
              />
            )}
            <span className="relative">{pricing.billing[option]}</span>
            {option === "yearly" && (
              <Pill tone="green" className="relative">
                {pricing.billing.saving}
              </Pill>
            )}
          </button>
        );
      })}
    </div>
  );
}

function Price({ plan, billing }: { plan: Plan; billing: Billing }) {
  const { whole, cents } = priceFor(plan, billing);
  const direction = billing === "yearly" ? 1 : -1;

  return (
    <div className="flex items-baseline gap-1.5">
      <span className="relative inline-flex overflow-hidden text-display-md font-semibold text-ink tabular-nums">
        <span aria-hidden>$</span>
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.span
            key={`${whole}.${cents}`}
            custom={direction}
            variants={rollNumber}
            initial="enter"
            animate="center"
            exit="exit"
            transition={spring.snappy}
            className="inline-flex items-start"
          >
            <span className="sr-only">$</span>
            {whole}
            {cents && <span className="mt-1.5 text-title">.{cents}</span>}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="text-label text-muted">/ {plan.unit}</span>
    </div>
  );
}

function PlanCell({
  plan,
  billing,
  position,
}: {
  plan: Plan;
  billing: Billing;
  position: "first" | "middle" | "last";
}) {
  return (
    <RevealItem
      className={cn(
        "relative flex flex-col bg-surface p-6 sm:p-8",
        position === "first" && "rounded-t-panel lg:rounded-l-panel lg:rounded-tr-none",
        position === "last" && "rounded-b-panel lg:rounded-r-panel lg:rounded-bl-none",
        plan.featured && "z-10 rounded-panel shadow-lift ring-[1.5px] ring-accent lg:-my-3 lg:py-11",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-title font-semibold text-ink">{plan.name}</h3>
          <Text size="label" className="mt-1">
            {plan.audience}
          </Text>
        </div>
        {plan.featured && <Pill tone="solid">{pricing.popular}</Pill>}
      </div>

      <div className="mt-6">
        <Price plan={plan} billing={billing} />
        <Text size="caption" className="mt-1 h-5">
          {billing === "yearly" && plan.monthly > 0 ? pricing.billing.yearlyNote : null}
        </Text>
      </div>

      <Button
        variant={plan.featured ? "primary" : "outline"}
        block
        className="mt-4"
        onClick={() =>
          toast(pricing.toast.title, { description: pricing.toast.description.replace("{plan}", plan.name) })
        }
      >
        {plan.cta}
      </Button>

      <ul className="mt-7 space-y-3 border-t border-hairline pt-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-body text-ink">
            <Check
              aria-hidden
              className={cn("mt-1 size-4 shrink-0", plan.featured ? "text-accent" : "text-muted")}
              strokeWidth={2.25}
            />
            {feature}
          </li>
        ))}
      </ul>
    </RevealItem>
  );
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <Section id="pricing" index="05" label="Pricing">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Pill>{pricing.eyebrow}</Pill>
        <Heading className="mt-4">
          {pricing.heading.lead}{" "}
          <Quiet>
            {pricing.heading.quietLead} <Em>{pricing.heading.emphasis}</Em> {pricing.heading.quietTail}
          </Quiet>
        </Heading>
        <Text size="body-lg" className="mt-4">
          {pricing.support}
        </Text>
        <div className="mt-8">
          <BillingToggle billing={billing} onChange={setBilling} />
        </div>
      </Reveal>

      <RevealGroup className="mx-auto mt-12 grid max-w-5xl gap-px rounded-panel border border-hairline bg-hairline lg:grid-cols-3">
        {pricing.plans.map((plan, index) => (
          <PlanCell
            key={plan.id}
            plan={plan}
            billing={billing}
            position={index === 0 ? "first" : index === pricing.plans.length - 1 ? "last" : "middle"}
          />
        ))}
      </RevealGroup>

      <Text size="caption" className="mt-6 text-center">
        {pricing.footnote}
      </Text>
    </Section>
  );
}
