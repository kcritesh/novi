export type NavLink = { label: string; href: `#${string}` };

export const site = {
  name: "Novi",
  title: "Novi — Run your team without the tab switching",
  description:
    "Novi brings tasks, docs, and conversations into one calm workspace built for small, fast moving teams.",
  tagline: "One calm place for fast teams.",
} as const;

export const nav = {
  links: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ] satisfies NavLink[],
  cta: { label: "Start free", href: "#pricing" },
  ctaNote: "Free for teams up to 10. No credit card.",
} as const;

export const hero = {
  announcement: { label: "New · Timeline view for every project", href: "#features" },
  headline: { lead: "Run your team without the", emphasis: "tab switching." },
  support:
    "Novi brings tasks, docs, and conversations into one calm workspace built for small, fast moving teams.",
  primaryCta: { label: "Start free", href: "#pricing" },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
} as const;
