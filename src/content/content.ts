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
    replay: "Replay thread",
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
      groups: [
        {
          name: "Website",
          tasks: [
            { title: "Homepage hero copy", owner: people.ana, due: "Sep 23" },
            { title: "Pricing page QA", owner: people.sam, due: "Sep 26" },
          ],
        },
        {
          name: "Launch comms",
          tasks: [
            { title: "Write launch email", owner: people.maya, due: "Sep 24" },
            { title: "Invite beta users", owner: people.joshua, due: "Sep 27" },
          ],
        },
      ],
    },
    ship: {
      project: "Launch — Q3",
      status: "Shipped",
      progressLabel: "24 of 24 tasks done",
      milestones: ["Research", "Design", "Build", "Launch"],
      note: "Shipped two days early.",
    },
  },
} as const;
