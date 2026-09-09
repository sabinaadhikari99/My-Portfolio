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
} as const;

/**
 * Social + contact links. These are the ONLY places URLs are defined.
 * Leave unverified personal links empty so they are not rendered as broken links.
 */
export const links = {
  // Taken from your own public repository URL.
  GITHUB_URL: "https://github.com/sabinaadhikari99",
  LINKEDIN_URL: "",
  EMAIL_ADDRESS: "",
  // International format, digits only, no leading "+" — e.g. 9779800000000
  WHATSAPP_NUMBER: "",
  RESUME_URL: "",
} as const;

export const whatsappHref = links.WHATSAPP_NUMBER
  ? `https://wa.me/${links.WHATSAPP_NUMBER}`
  : undefined;
export const mailtoHref = links.EMAIL_ADDRESS
  ? `mailto:${links.EMAIL_ADDRESS}`
  : undefined;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
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
  {
    name: "Office Management System",
    year: "2025",
    summary:
      "A Django backend for internal office operations, organised into separate domains for HR, finance, tasking, communications and system operations.",
    problem:
      "Small offices run on scattered spreadsheets. The system brings staff records, project work, task assignment and finance into one permissioned application.",
    features: [
      "Modular Django apps per department (HR, finance, tasking, comms, sysops)",
      "Account and role management across departments",
      "Project and task tracking tied to staff records",
    ],
    tech: ["Django", "Python", "SQLite", "REST APIs"],
    github: undefined,
  },
];

export type TimelineItem = {
  title: string;
  org: string;
  meta?: string;
  period: string;
  points: string[];
};

export const experience: TimelineItem[] = [];

export const education: TimelineItem[] = [];

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
};

/**
 * Leave this array empty if you have nothing to list — the section hides itself
 * rather than showing placeholder credentials.
 */
export const certifications: Certification[] = [];

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
