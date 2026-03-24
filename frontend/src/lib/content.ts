/** Central config: edit here to personalize the portfolio. */

export const site = {
  name: "Sapan Khadka",
  /** Shown under the name — role framing, not a job title claim. */
  headline: "Software Engineer | AI Systems",
  tagline:
    "I build reliable systems and intelligent automation using Python and modern AI tools.",
  /** Shown in hero — semester / school context. */
  location: "Cape Girardeau, MO · CS undergrad (6th semester) · SEMO · May 2027",
  /** Place your PDF at frontend/public/resume.pdf for this link to work. */
  resumeUrl: "/resume.pdf",
  email: "sapankhadka110@gmail.com",
  schoolEmail: "skhadka24s@semo.edu",
  phone: "573-587-3215",
  github: "https://github.com/sapan-khadka",
  linkedin: "https://www.linkedin.com/in/sapan-khadka55/",
  kaggle: null as string | null,
  /** Short lines for the optional terminal-style ticker (hero). */
  typingLines: [
    "$ ingest → preprocess → llm.generate → validate → queue_reply",
    "$ pytest tests/ -q  # automation + Gmail API mocks",
    "→ focus: structured I/O, not ad-hoc model calls",
  ],
};

export const education = {
  institution: "Southeast Missouri State University (SEMO)",
  location: "Cape Girardeau, MO",
  degree: "B.S. Computer Science (STEM)",
  expectedGraduation: "May 2027",
};

/** 3–4 lines: problem-solving, systems, practical AI — no buzzwords. */
export const about = {
  lines: [
    "I like problems where the hard part is wiring things correctly: APIs, data, and clear boundaries between components.",
    "Python is where I spend most of my time—automation, backends, and preprocessing before anything touches a model.",
    "I use ML and LLMs as tools inside workflows: validate inputs, constrain outputs, and fail visibly when the model drifts.",
  ],
};

/** Grouped skills for the dedicated section — demonstrates scope without fluff. */
export const skillGroups = [
  {
    title: "Languages",
    items: ["Python (primary)", "JavaScript / TypeScript", "C"],
  },
  {
    title: "AI & machine learning",
    items: [
      "NLP preprocessing & text normalization",
      "LLM integration with structured request/response handling",
      "Lightweight evaluation and manual review loops",
    ],
  },
  {
    title: "Backend & systems",
    items: [
      "REST-style API design",
      "Async workflows & background-style tasks",
      "Automation scripts and integration glue",
    ],
  },
  {
    title: "Frameworks & tools",
    items: ["React", "Next.js", "Node.js", "FastAPI", "Git", "MySQL"],
  },
] as const;

/** Bullet-only; keep honest for an undergrad. */
export const experience = [
  {
    role: "B.S. Computer Science",
    org: "Southeast Missouri State University",
    period: "2023 — present",
    bullets: [
      "Coursework across data structures, databases, and software engineering practice.",
      "Side projects combining Python backends, APIs, and model-backed automation (see Projects).",
    ],
  },
  {
    role: "Student support & orientation",
    org: "Campus / peer programs",
    period: "Ongoing",
    bullets: [
      "Helping international students navigate campus systems and paperwork—clear communication under ambiguity.",
    ],
  },
] as const;

/** Fake-but-plausible log lines for the terminal band (cosmetic). */
export const terminalLog = [
  { t: "log", m: "INFO  worker.email.pipeline start job=thread_8f2a" },
  { t: "log", m: "INFO  preprocess.strip_quotes tokens_in=412 tokens_out=389" },
  { t: "out", m: "OK    gmail.send deferred=1 (human review)" },
  { t: "log", m: "INFO  api.fastapi POST /contact 201 24ms" },
  { t: "cmd", m: "$ curl -sSf localhost:8000/health" },
  { t: "out", m: '{"status":"ok"}' },
] as const;

export type ProjectCategory = "NLP" | "Web AI" | "Engineering";

export const PROJECT_FILTERS: readonly (ProjectCategory | "All")[] = [
  "All",
  "NLP",
  "Web AI",
  "Engineering",
] as const;

export type Project = {
  title: string;
  /** One-line hook. */
  summary: string;
  problem: string;
  approach: string;
  result: string;
  /** Extra technical detail — surfaced on hover (desktop) and in <details> (mobile). */
  deepDive: string;
  /** Optional expandable architecture blurb. */
  architecture: string;
  tech: string[];
  github?: string;
  demo: string | null;
  highlight: string;
  categories: ProjectCategory[];
};

export const projects: Project[] = [
  {
    title: "Smart Email Auto-Responder",
    summary:
      "Gmail-connected workflow that preprocesses threads and drafts replies with an LLM—review before send.",
    problem:
      "High-volume threads are slow to triage; calling a model without guardrails produces unsafe or off-topic drafts.",
    approach:
      "OAuth to Gmail, normalize and trim thread text, build a bounded context window, call the model with explicit constraints, then run lightweight checks before anything leaves the outbox.",
    result:
      "A Python + Streamlit tool you can point at real mailboxes: preprocessing, generation, and human review in one loop.",
    deepDive:
      "Pipeline stages are isolated (fetch → clean → build model request → generate → parse/validate). Failures surface in the UI instead of failing silently.",
    architecture:
      "Streamlit UI → Python services → Gmail API + LLM provider; secrets only in environment; minimal persistence beyond session state.",
    tech: ["Python", "Streamlit", "Gmail API", "OpenAI API", "NLP"],
    github: "https://github.com/sapan-khadka/email-auto-responder",
    demo: null,
    highlight: "NLP · automation",
    categories: ["NLP", "Web AI"],
  },
  {
    title: "Portfolio & FastAPI services",
    summary:
      "This site: static Next.js front, Python API for contact mail and optional chat with disciplined JSON boundaries.",
    problem:
      "A portfolio should load fast on the edge but still show backend craft: forms, CORS, and third-party calls done carefully.",
    approach:
      "Next.js for UI, FastAPI for POST routes, typed payloads, env-based keys, and responses the client can branch on.",
    result:
      "Production-shaped separation between static marketing and a small service layer you can run locally or deploy beside the app.",
    deepDive:
      "Chat route only calls the model when configured; otherwise it returns a deterministic fallback. Contact path validates fields and avoids putting secrets in the browser.",
    architecture:
      "Frontend (Vercel-ready static export or SSR) + FastAPI service; CORS restricted to known origins; shared JSON contracts.",
    tech: ["Next.js", "TypeScript", "Tailwind", "FastAPI", "Python"],
    github: "https://github.com/sapan-khadka/portfolio-website",
    demo: null,
    highlight: "Full-stack",
    categories: ["Web AI", "Engineering"],
  },
  {
    title: "Secure medicine store",
    summary:
      "Course-grade ecommerce-style app: auth, roles, and MySQL—practice in integrity and permission boundaries.",
    problem:
      "Need a credible full-stack exercise: not just CRUD, but who is allowed to see and change which rows.",
    approach:
      "Auth and session handling per course spec, server-side validation, relational schema for catalog and users, separation of guest vs signed-in flows.",
    result:
      "Working login, catalog, and cart-style flows with attention to validation and basic hardening habits.",
    deepDive:
      "Emphasis on parameterized queries, clear error paths, and keeping sensitive operations off the client.",
    architecture:
      "Traditional web stack for the assignment (HTML/CSS/JS front, server logic, MySQL as source of truth).",
    tech: ["HTML", "CSS", "JavaScript", "MySQL"],
    github: "https://github.com/sapan-khadka/secure-medicine-store",
    demo: null,
    highlight: "Backend · SQL",
    categories: ["Engineering"],
  },
];
