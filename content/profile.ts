/**
 * Single source of truth for every piece of personal content on the site.
 * Edit this file to update the portfolio — no component changes required.
 *
 * Optional personal fields stay empty until verified values are available.
 */

export const person = {
  name: "Sabina Adhikari",
  // Short role label shown in the nav, metadata and footer.
  role: "Software Engineer",
  // Hero headline supporting line. Keep it to one clear sentence.
  tagline: "I build web applications and AI-assisted tools.",
  location: "Nepal",
  // 2-3 sentences shown under the hero headline.
  intro:
    "I work across the stack — Next.js and React on the front end, Django, DRF and FastAPI on the back end — and I spend most of my time on projects where a real workflow gets simpler because of something I built. Lately that has meant applied AI: retrieval, embeddings and language models wired into products people actually use.",
  availability: "Open to software engineering roles and internships",
  // Portrait shown in the hero and on the résumé. Lives in public/.
  photo: "/sabina-adhikari.jpg",
} as const;

/**
 * Social + contact links. These are the ONLY places URLs are defined.
 * Leave unverified personal links empty so they are not rendered as broken links.
 */
export const links = {
  // Taken from your own public repository URL.
  GITHUB_URL: "https://github.com/sabinaadhikari99",
  LINKEDIN_URL: "https://www.linkedin.com/in/sabina-adhikari-340092263/",
  EMAIL_ADDRESS: "adhikarysabu098@gmail.com",
  // International format, digits only, no leading "+" — e.g. 9779800000000
  WHATSAPP_NUMBER: "9779806689443",
  RESUME_URL: "/resume",
} as const;

export const whatsappHref = links.WHATSAPP_NUMBER
  ? `https://wa.me/${links.WHATSAPP_NUMBER}`
  : undefined;

/**
 * Gmail's web compose rather than a `mailto:` link. `mailto:` hands the visitor
 * off to whichever desktop client their OS registered (Microsoft Mail on a
 * default Windows install), which is a dead end for anyone who reads mail in a
 * browser tab. Open these with target="_blank".
 */
export const emailHref = links.EMAIL_ADDRESS
  ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(links.EMAIL_ADDRESS)}`
  : undefined;

/** Gmail compose prefilled with a subject and body. */
export function emailComposeHref(subject: string, body: string) {
  if (!links.EMAIL_ADDRESS) return undefined;
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: links.EMAIL_ADDRESS,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/** wa.me deep link prefilled with a message the visitor still has to send. */
export function whatsappComposeHref(text: string) {
  if (!links.WHATSAPP_NUMBER) return undefined;
  return `https://wa.me/${links.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
] as const;

export const about = {
  paragraphs: [
    "I'm a software engineer from Nepal who works mainly on web applications. I started with Python and Django, moved into REST API design with Django REST Framework, and now build interfaces in Next.js and React on top of the APIs I write.",
    "The work I enjoy most sits where a messy real-world process meets a system that has to be correct: multi-tenant data isolation, role-based permissions, matching a person's skills against a job description. Those problems have edge cases you only find by building the thing and using it.",
    "Recently I've been working with applied AI — sentence embeddings, FAISS vector search and the Gemini API — as part of a career-matching platform. I'm interested in how retrieval and language models fit into ordinary product features rather than standing alone as a demo.",
  ],
  // Small stat strip beside the copy. Keep these honest and verifiable.
  facts: [
    { label: "Focus", value: "Full-stack web & applied AI" },
    { label: "Core stack", value: "Next.js · Django · PostgreSQL" },
    { label: "Currently", value: person.availability },
  ],
} as const;

export type SkillGroup = { title: string; items: string[] };

/**
 * Only technologies that appear in your actual projects are listed here.
 * Add or remove freely — the layout adapts to the number of groups.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Django", "Django REST Framework", "FastAPI", "Python", "REST API design", "JWT auth"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL (Neon)", "SQLite"],
  },
  {
    title: "AI & data",
    items: ["Sentence Transformers", "FAISS", "Gemini API", "scikit-learn", "NumPy", "pandas"],
  },
  {
    title: "Tools & deployment",
    items: ["Git", "GitHub", "Docker", "Postman", "Railway", "VS Code"],
  },
];

export type Project = {
  name: string;
  year: string;
  summary: string;
  problem: string;
  features: string[];
  tech: string[];
  github?: string;
  demo?: string;
  /**
   * Optional screenshot, e.g. "/projects/skillsync.png" for a file at
   * public/projects/skillsync.png. Omit it and a typographic cover is drawn
   * instead — no broken or stock imagery.
   */
  image?: string;
};

export const projects: Project[] = [
  {
    name: "SkillSync AI",
    year: "2025",
    summary:
      "An AI-powered career development platform that analyses a candidate's profile, finds the gaps against real job requirements, and recommends roles worth applying for.",
    problem:
      "Job seekers rarely learn why they were filtered out. SkillSync reads a CV, extracts the skills it actually contains, compares them against live job postings, and turns the difference into a concrete list of things to learn.",
    features: [
      "CV parsing and ATS-friendly CV generation from a structured profile",
      "Semantic skill-gap analysis using sentence embeddings and FAISS similarity search",
      "Job recommendations scored against the candidate's extracted skill set",
      "A FastAPI microservice separating the ML workload from the Django application",
      "Recruiter accounts, skill quizzes and an assistant chatbot built on the Gemini API",
    ],
    tech: [
      "Django",
      "Django REST Framework",
      "FastAPI",
      "Sentence Transformers",
      "FAISS",
      "Gemini API",
      "PostgreSQL",
    ],
    github: "https://github.com/sabinaadhikari99/Project-II",
    image: "/projects/skillsync.png",
  },
  {
    name: "Multi-Vendor Inventory Management API",
    year: "2025",
    summary:
      "A production-ready multi-tenant backend where each vendor runs a fully isolated store, customers shop across stores, and platform admins manage the vendors.",
    problem:
      "Multi-vendor commerce needs strict data isolation without a database per tenant. Every request carries a tenant slug, and the permission layer guarantees one vendor can never read another's products, stock or orders.",
    features: [
      "Shared-database multi-tenancy with per-tenant isolation via an X-Tenant-Slug header",
      "Role-based access control across platform admin, vendor admin, employee and customer",
      "Multi-warehouse inventory, with stock routed to the warehouse nearest the delivery city",
      "JWT authentication with token blacklisting on logout, plus Google OAuth 2.0 sign-in",
      "Orders, coupons, reviews, wishlists, notifications and reporting endpoints",
      "Swagger and ReDoc API documentation",
    ],
    tech: ["Django", "Django REST Framework", "PostgreSQL", "SimpleJWT", "Docker", "Railway"],
    github: undefined,
    demo: "https://inventory-management-api-production.up.railway.app",
  },
];

export type TimelineItem = {
  title: string;
  org: string;
  meta?: string;
  period: string;
  points: string[];
};

export const experience: TimelineItem[] = [
  {
    // The reference letter states the internship and its dates but no job
    // title, so this is a neutral placeholder — change it to whatever you
    // actually went by. Dates converted from Jestha 26 – Kartik 30, 2079 BS.
    title: "IT Intern",
    org: "IT Prasad (Prasad IT Marmat Kendra)",
    meta: "Pokhara, Nepal",
    period: "Jun – Nov 2022",
    // Drawn only from what the letter itself says. Replace these with the
    // concrete work you did — what you built, and in what stack.
    points: [
      "Five-month internship working across the company's core service division.",
      "Took assigned project work through research, practical implementation and documentation.",
    ],
  },
];

export const education: TimelineItem[] = [];

export type Certification = {
  name: string;
  issuer: string;
  /** Month and year the credential was issued. */
  date: string;
  /** Short label above the title, e.g. "Cloud". */
  category?: string;
  /** Scan in public/certificates. Omit for a text-only card. */
  image?: string;
  /** Verification page, where the issuer provides one. */
  credentialUrl?: string;
};

/**
 * Leave this array empty if you have nothing to list — the section hides itself
 * rather than showing placeholder credentials.
 */
export const certifications: Certification[] = [
  {
    name: "Full Stack Web Development with Python and Django",
    issuer: "Swift Academy, Pokhara",
    date: "June 2026",
    category: "Web development",
    image: "/certificates/full-stack-python-django.jpeg",
  },
  {
    name: "Cloud and DevOps Technology",
    issuer: "Pokhara University",
    date: "April 2026",
    category: "Cloud",
    image: "/certificates/cloud-and-devops-technology.jpeg",
  },
  {
    name: "Security Analysis and Risk Management",
    issuer: "CS4ALL — co-funded by the European Union",
    date: "February 2026",
    category: "Security",
    image: "/certificates/security-analysis-and-risk-management.jpeg",
  },
];

/**
 * GitHub section. Repository metadata is pulled live from the GitHub API at
 * request time (see lib/github.ts) and falls back to the values here whenever
 * that call is rate-limited, so the section always renders.
 */
export const github = {
  username: "sabinaadhikari99",

  /**
   * Repositories to feature, in display order. `description` overrides the
   * one on GitHub — leave it empty to use whatever GitHub returns, which is
   * the better habit: writing it once on the repo improves your profile too.
   */
  pinned: [
    {
      repo: "Project-II",
      description:
        "AI career platform: CV parsing, semantic skill-gap analysis and scored job recommendations.",
      language: "Python",
    },
    {
      repo: "Multi-Vendor-",
      description:
        "Multi-tenant commerce backend with per-vendor data isolation, role-based access and multi-warehouse stock.",
      language: "Python",
    },
    {
      repo: "My-Portfolio",
      description: "This site — a Next.js portfolio with a Neon-backed contact form.",
      language: "TypeScript",
    },
    {
      repo: "Java-project-",
      description: "Online Banking Management System.",
      language: "Java",
    },
    {
      repo: "Django",
      description: "CRUD and authentication system built with Django.",
      language: "Python",
    },
    // No description written yet — the card shows the language instead of
    // invented copy. Add one here or on GitHub itself.
    { repo: "library-api-drf", description: "", language: "Python" },
  ],

  /** Languages to leave out of the distribution bar, e.g. "HTML", "CSS". */
  excludeLanguages: [] as string[],

  maxLanguages: 6,

  /**
   * Measured across all public repositories on 10 Sep 2026. Used only when the
   * live call fails. GitHub's counts already exclude vendored and generated
   * files, so the HTML and CSS here is template work, not third-party assets.
   */
  languageSnapshot: [
    { name: "Python", percent: 48.5 },
    { name: "HTML", percent: 30.2 },
    { name: "CSS", percent: 11.2 },
    { name: "JavaScript", percent: 8.3 },
    { name: "TypeScript", percent: 1.4 },
    { name: "Java", percent: 0.4 },
  ],
} as const;

export const contact = {
  heading: "Let's build something meaningful.",
  body: "I'm open to software engineering roles, internships, and collaboration on projects worth the effort. The fastest way to reach me is email or WhatsApp — I reply to everything.",
} as const;

export const seo = {
  title: `${person.name} — ${person.role}`,
  description: `${person.name} is a ${person.role.toLowerCase()} building web applications with Next.js, React, Django and PostgreSQL, and applied AI features with FastAPI, FAISS and the Gemini API.`,
  keywords: [
    person.name,
    `${person.name} developer`,
    `${person.name} portfolio`,
    "software engineer",
    "web developer",
    "Next.js developer",
    "Django developer",
    "full-stack developer Nepal",
  ],
} as const;
