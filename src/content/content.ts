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

export type Tone = "accent" | "green" | "amber" | "rose" | "neutral";
export type Person = { name: string; tone: Exclude<Tone, "neutral"> };
export type TaskTag = { label: string; tone: Tone };
export type Task = {
  id: string;
  title: string;
  tag: TaskTag;
  due: string;
  assignees: Person[];
};
export type ColumnId = "todo" | "doing" | "done";

export const people = {
  maya: { name: "Maya Lin", tone: "accent" },
  joshua: { name: "Joshua Reed", tone: "green" },
  ana: { name: "Ana Ortiz", tone: "rose" },
  sam: { name: "Sam Patel", tone: "amber" },
} satisfies Record<string, Person>;

export const tags = {
  design: { label: "Design", tone: "accent" },
  bug: { label: "Bug", tone: "rose" },
  marketing: { label: "Marketing", tone: "amber" },
  research: { label: "Research", tone: "green" },
} satisfies Record<string, TaskTag>;

export const heroBoard: {
  breadcrumb: { project: string; view: string };
  hint: string;
  columns: { id: ColumnId; title: string }[];
  tasks: Record<ColumnId, Task[]>;
} = {
  breadcrumb: { project: "Launch", view: "Q3 / Board" },
  hint: "Try dragging a card",
  columns: [
    { id: "todo", title: "To do" },
    { id: "doing", title: "In progress" },
    { id: "done", title: "Done" },
  ],
  tasks: {
    todo: [
      { id: "t1", title: "Write launch email", tag: tags.marketing, due: "Sep 24", assignees: [people.maya, people.sam] },
      { id: "t2", title: "Sprint planning", tag: tags.research, due: "Sep 25", assignees: [people.joshua] },
      { id: "t3", title: "Invite beta users", tag: tags.marketing, due: "Sep 27", assignees: [people.ana, people.maya] },
    ],
    doing: [
      { id: "t4", title: "Homepage hero copy", tag: tags.design, due: "Sep 23", assignees: [people.ana, people.joshua] },
      { id: "t5", title: "Pricing page QA", tag: tags.bug, due: "Sep 26", assignees: [people.sam] },
    ],
    done: [
      { id: "t6", title: "Fix onboarding bug", tag: tags.bug, due: "Sep 19", assignees: [people.joshua, people.maya] },
    ],
  },
};
