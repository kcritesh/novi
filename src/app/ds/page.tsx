"use client";

import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Avatar,
  AvatarStack,
  Button,
  Card,
  Em,
  Heading,
  Input,
  Kbd,
  Logo,
  Pill,
  Quiet,
  Section,
  Text,
} from "@/design-system";

const swatches = [
  "bg-paper",
  "bg-surface",
  "bg-sand",
  "bg-ink",
  "bg-muted",
  "bg-hairline",
  "bg-accent",
  "bg-accent-tint",
  "bg-green-tint",
  "bg-amber-tint",
  "bg-rose-tint",
];

export default function DesignSystemPreview() {
  return (
    <main id="main">
      <Section id="ds-type" index="00" label="Type" className="border-t-0">
        <Logo />
        <div className="mt-10 space-y-6">
          <Heading as="h1" size="display-xl">
            Run your team without the <Em>tab switching.</Em>
          </Heading>
          <Heading size="display-md">
            Everything your team needs, <Quiet><Em>nothing</Em> it doesn&apos;t.</Quiet>
          </Heading>
          <Heading as="h3" size="title">Boards that move at your speed</Heading>
          <Text size="body-lg">Novi brings tasks, docs, and conversations into one calm workspace.</Text>
          <Text size="label" tone="ink">Label ink</Text>
          <Text size="caption">Caption muted</Text>
        </div>
      </Section>

      <Section id="ds-color" index="00" label="Color">
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
          {swatches.map((s) => (
            <div key={s} className="space-y-1.5">
              <div className={`h-14 rounded-card border border-hairline ${s}`} />
              <Text size="micro">{s.replace("bg-", "")}</Text>
            </div>
          ))}
        </div>
      </Section>

      <Section id="ds-controls" index="00" label="Controls">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Start free</Button>
          <Button variant="ink">Start free</Button>
          <Button variant="outline">
            See how it works <ArrowRight />
          </Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Talk to us →</Button>
          <Button size="sm" variant="outline">Small</Button>
          <Button size="lg">Large</Button>
          <Button onClick={() => toast.success("You're on the list", { description: "Product notes, once a month." })}>
            Toast
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Import your work</DialogTitle>
              <DialogDescription>Bring your boards over in under a minute.</DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Pill>Features</Pill>
          <Pill tone="outline" size="md">New · Timeline view <ArrowRight /></Pill>
          <Pill tone="solid">Most popular</Pill>
          <Pill tone="green">Save 20%</Pill>
          <Pill tone="amber">Marketing</Pill>
          <Pill tone="rose">Bug</Pill>
          <Pill tone="neutral">Neutral</Pill>
          <AvatarStack>
            <Avatar name="Maya Lin" />
            <Avatar name="Joshua Reed" tone="green" />
            <Avatar name="Ana Ortiz" tone="rose" />
          </AvatarStack>
          <Kbd>⌘K</Kbd>
        </div>
        <div className="mt-6 flex max-w-md gap-2">
          <Input placeholder="you@team.com" type="email" aria-label="Email" />
          <Button variant="ink">Subscribe</Button>
        </div>
        <Card className="dot-grid mt-6 h-40" />
      </Section>
    </main>
  );
}
