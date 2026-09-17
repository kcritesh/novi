import type { StaticImageData } from "next/image";

import anaPhoto from "@/assets/avatars/ana.jpg";
import joshuaPhoto from "@/assets/avatars/joshua.jpg";
import mayaPhoto from "@/assets/avatars/maya.jpg";
import samPhoto from "@/assets/avatars/sam.jpg";

export type NavLink = { label: string; href: `#${string}` };

export const site = {
  name: "Novi",
  title: "Novi: Run your team without the tab switching",
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

export const notFound = {
  code: "404",
  headline: { lead: "This page wandered", emphasis: "off the board." },
  support: "The link may be old, or the page moved. Everything else is right where you left it.",
  primaryCta: { label: "Back home", href: "/" },
  secondaryCta: { label: "Explore features", href: "/#features" },
} as const;

export type Tone = "accent" | "green" | "amber" | "rose" | "neutral";
export type Person = { name: string; tone: Exclude<Tone, "neutral">; photo: StaticImageData };
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
  maya: { name: "Maya Lin", tone: "accent", photo: mayaPhoto },
  joshua: { name: "Joshua Reed", tone: "green", photo: joshuaPhoto },
  ana: { name: "Ana Ortiz", tone: "rose", photo: anaPhoto },
  sam: { name: "Sam Patel", tone: "amber", photo: samPhoto },
} satisfies Record<string, Person>;

export const heroProof = {
  people: [people.maya, people.joshua, people.ana, people.sam],
  rating: 5,
  label: "Loved by 40+ small teams",
} as const;

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
  scrollDrag: { taskId: string; path: ColumnId[] };
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
      {
        id: "t1",
        title: "Write launch email",
        tag: tags.marketing,
        due: "Sep 24",
        assignees: [people.maya, people.sam],
      },
      { id: "t2", title: "Sprint planning", tag: tags.research, due: "Sep 25", assignees: [people.joshua] },
      {
        id: "t3",
        title: "Invite beta users",
        tag: tags.marketing,
        due: "Sep 27",
        assignees: [people.ana, people.maya],
      },
    ],
    doing: [
      {
        id: "t4",
        title: "Homepage hero copy",
        tag: tags.design,
        due: "Sep 23",
        assignees: [people.ana, people.joshua],
      },
      { id: "t5", title: "Pricing page QA", tag: tags.bug, due: "Sep 26", assignees: [people.sam] },
    ],
    done: [
      {
        id: "t6",
        title: "Fix onboarding bug",
        tag: tags.bug,
        due: "Sep 19",
        assignees: [people.joshua, people.maya],
      },
    ],
  },
  scrollDrag: { taskId: "t1", path: ["todo", "doing"] },
};

export type Wordmark = "fieldwork" | "loop" | "parcel" | "northwind" | "kiln" | "sundial";

export const proof = {
  eyebrow: "Trusted by small teams at",
  statement: "40+ studios and startups plan their week in Novi.",
  logos: [
    { id: "fieldwork", name: "Fieldwork" },
    { id: "loop", name: "Loop & Co" },
    { id: "parcel", name: "Parcel" },
    { id: "northwind", name: "Northwind Studio" },
    { id: "kiln", name: "Kiln" },
    { id: "sundial", name: "Sundial" },
  ] satisfies { id: Wordmark; name: string }[],
} as const;

export type ImportSourceId = "trello" | "asana" | "sheet";

export const features = {
  eyebrow: "Features",
  heading: { lead: "Everything your team needs,", emphasis: "nothing", tail: "it doesn't." },
  support: "Four tools you already juggle, rebuilt to work as one.",
  link: { label: "See how it works", href: "#how-it-works" },
  boards: {
    title: "Boards that move at your speed",
    description: "Plan sprints and track tasks without hunting through spreadsheets.",
    columns: ["To do", "Doing", "Done"],
    cards: [
      { id: "b1", title: "Onboarding flow", tone: "accent" },
      { id: "b2", title: "Release notes", tone: "amber" },
      { id: "b3", title: "Fix date picker", tone: "rose" },
      { id: "b4", title: "User interviews", tone: "green" },
    ],
  },
  threads: {
    title: "Threads, not another inbox",
    description: "Keep project conversations attached to the work itself.",
    task: { title: "Homepage hero copy", tag: tags.design },
    messages: [
      { author: people.ana, text: "First pass is in. Shorter headline, same promise." },
      { author: people.joshua, text: "Love it. Can we test “tab switching” as the hook?" },
      { author: people.maya, text: "Shipping that version to review now." },
    ],
    reactions: 3,
  },
  timeline: {
    title: "One timeline for the whole team",
    description: "Every deadline and milestone in one shared view.",
    start: "2026-09-15",
    days: 28,
    milestones: [
      {
        label: "Research",
        tone: "green",
        from: 0,
        to: 7,
        owner: people.joshua,
        detail: "5 interviews synthesized",
      },
      {
        label: "Design",
        tone: "amber",
        from: 5,
        to: 14,
        owner: people.ana,
        detail: "Hero and pricing screens",
      },
      {
        label: "Build",
        tone: "rose",
        from: 12,
        to: 23,
        owner: people.sam,
        detail: "Board, threads, timeline",
      },
      {
        label: "Launch",
        tone: "accent",
        from: 21,
        to: 28,
        owner: people.maya,
        detail: "Email, changelog, socials",
      },
    ],
    dueHeading: "In flight around",
    empty: "Nothing scheduled. Enjoy the quiet.",
    scrubberLabel: "Timeline date",
  },
  import: {
    title: "Works the way you already do",
    description: "Import from Trello, Asana, or a spreadsheet in minutes.",
    cta: "Try import",
  },
} as const;

export const importFlow = {
  title: "Import your work",
  description: "Bring your boards over in under a minute.",
  sources: [
    { id: "trello", label: "Trello", tasks: 24 },
    { id: "asana", label: "Asana", tasks: 31 },
    { id: "sheet", label: "Spreadsheet", tasks: 18 },
  ] satisfies { id: ImportSourceId; label: string; tasks: number }[],
  steps: ["Reading boards", "Mapping {count} tasks", "Setting up your workspace"],
  undoNote: "You can undo this anytime.",
  start: "Import",
  cancel: "Cancel",
  done: {
    title: "{count} tasks imported",
    description: "Your {source} board is ready in Novi.",
    primary: "Open board",
    secondary: "Import another",
  },
} as const;

export type StepId = "import" | "organize" | "ship";

export const howItWorks = {
  eyebrow: "How it works",
  heading: {
    lead: "From scattered to shipped",
    quietLead: "in three",
    emphasis: "calm",
    quietTail: "steps.",
  },
  link: { label: "Start with an import", href: "#features" },
  steps: [
    {
      id: "import",
      number: "01",
      title: "Import",
      description: "Pull boards from Trello, Asana, or a spreadsheet. Nothing gets lost.",
    },
    {
      id: "organize",
      number: "02",
      title: "Organize",
      description: "Group work into projects, assign owners, set due dates.",
    },
    {
      id: "ship",
      number: "03",
      title: "Ship",
      description: "Track progress on one board and one timeline until it's done.",
    },
  ] satisfies { id: StepId; number: string; title: string; description: string }[],
  visuals: {
    import: {
      sources: ["Trello — Marketing", "Asana — Q3 Launch", "roadmap.csv"],
      board: "Launch — Q3",
      tasks: [
        { title: "Write launch email", owner: people.maya },
        { title: "Fix onboarding bug", owner: people.joshua },
        { title: "Homepage hero copy", owner: people.ana },
        { title: "Pricing page QA", owner: people.sam },
      ],
      chip: "24 tasks imported",
    },
    organize: {
      inbox: { label: "Inbox", unsorted: "unsorted" },
      emptySlot: "Waiting for task",
      allSorted: "All sorted",
      noDate: "No date",
      chip: "4 owners · all dated",
      assignees: [people.ana, people.joshua, people.maya, people.sam],
      groups: [
        {
          name: "Website",
          tone: "accent",
          placed: { title: "Homepage hero copy", owner: people.ana, due: "Sep 23" },
          incoming: { title: "Pricing page QA", owner: people.sam, due: "Sep 26", tilt: 1.5 },
        },
        {
          name: "Launch comms",
          tone: "amber",
          placed: { title: "Write launch email", owner: people.maya, due: "Sep 24" },
          incoming: { title: "Invite beta users", owner: people.joshua, due: "Sep 27", tilt: -2 },
        },
      ],
    },
    ship: {
      project: "Launch — Q3",
      startDone: 21,
      total: 24,
      tasksDone: "tasks done",
      status: { open: "On track", shipped: "Shipped" },
      milestones: ["Research", "Design", "Build", "Launch"],
      team: [people.maya, people.joshua, people.ana, people.sam],
      due: "Due Oct 3",
      chip: "Shipped · 2 days early",
    },
  },
} as const;

export type Billing = "monthly" | "yearly";

export const pricing = {
  eyebrow: "Pricing",
  heading: { lead: "Simple pricing", quietLead: "for", emphasis: "small", quietTail: "teams." },
  support: "Start free. Upgrade when your team grows.",
  billing: {
    monthly: "Monthly",
    yearly: "Yearly",
    saving: "Save 20%",
    yearlyDiscount: 0.2,
    yearlyNote: "Billed yearly",
  },
  popular: "Most popular",
  footnote: "Prices in USD. Cancel anytime.",
  toast: { title: "You're early!", description: "Novi is a demo. Picked plan: {plan}." },
  plans: [
    {
      id: "free",
      name: "Free",
      audience: "For getting started",
      monthly: 0,
      unit: "forever",
      cta: "Start free",
      featured: false,
      features: [
        "Up to 10 members",
        "Unlimited boards",
        "Threads on every task",
        "Import from Trello & Asana",
      ],
    },
    {
      id: "team",
      name: "Team",
      audience: "For growing teams",
      monthly: 8,
      unit: "user / month",
      cta: "Start 14-day trial",
      featured: true,
      features: [
        "Everything in Free",
        "Unlimited members",
        "Timeline view",
        "Guest access",
        "Priority support",
      ],
    },
    {
      id: "business",
      name: "Business",
      audience: "For multi-team orgs",
      monthly: 16,
      unit: "user / month",
      cta: "Talk to us",
      featured: false,
      features: [
        "Everything in Team",
        "SSO & SCIM",
        "Advanced permissions",
        "Audit log",
        "Dedicated onboarding",
      ],
    },
  ],
} as const;

export const cta = {
  heading: { lead: "Your team's", emphasis: "calmer", tail: "week starts today." },
  support: "Free for teams up to 10. No credit card.",
  primary: { label: "Start free", href: "#pricing" },
  secondary: { label: "Talk to us" },
  toast: { title: "We'd love to chat", description: "Novi is a demo, but thanks for asking." },
  week: {
    title: "This week",
    tasks: [
      { title: "Update launch roadmap", tag: { label: "Ready", tone: "green" }, done: true },
      { title: "Define Q3 design system", tag: { label: "Reviewing", tone: "rose" }, done: true },
      { title: "Onboard new designer", tag: { label: "Ready", tone: "green" }, done: true },
      { title: "Finalize marketing copy", tag: { label: "Pending", tone: "amber" }, done: false },
    ],
  },
} as const;

export type SocialId = "x" | "linkedin" | "github";

export const footer = {
  tagline: "One calm place for fast teams.",
  newsletter: {
    label: "Email address",
    placeholder: "you@team.com",
    submit: "Subscribe",
    loading: "Subscribing",
    success: "Subscribed",
    helper: "Product notes, once a month.",
    invalid: "Enter a valid email, like you@team.com.",
    toastSuccess: { title: "You're on the list", description: "First product note lands next month." },
    toastError: { title: "That email looks off", description: "Check for typos and try again." },
  },
  groups: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Changelog", href: "#" },
        { label: "Integrations", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Customers", href: "#proof" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Guides", href: "#how-it-works" },
        { label: "Templates", href: "#" },
        { label: "Help center", href: "#" },
        { label: "Community", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Security", href: "#" },
        { label: "Cookies", href: "#" },
      ],
    },
  ],
  socials: [
    { id: "x", label: "Novi on X", href: "https://x.com" },
    { id: "linkedin", label: "Novi on LinkedIn", href: "https://www.linkedin.com" },
    { id: "github", label: "Novi on GitHub", href: "https://github.com/kcritesh/novi" },
  ] satisfies { id: SocialId; label: string; href: string }[],
  legal: {
    company: "Novi Labs",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
} as const;
