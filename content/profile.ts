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
  location: "Pokhara, Nepal",
  // 2-3 sentences shown under the hero headline.
  intro:
    "I work across the stack - Next.js and React on the front end, Django, DRF and FastAPI on the back end - and I spend most of my time on projects where a real workflow gets simpler because of something I built. Lately that has meant applied AI: retrieval, embeddings and language models wired into products people actually use.",
  availability: "Open to software engineering roles and internships",
  // Full-length portrait. Lives in public/.
  photo: "/sabina-adhikari.jpg",
  // Square head-and-shoulders crop of the same photograph, for the places the
  // picture is rendered small and round: the nav, the footer, the résumé
  // masthead and the browser tab icon.
  avatar: "/sabina-avatar.jpg",
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
  FACEBOOK_URL: "https://www.facebook.com/sabina.adhikari.92505956",
  // International format, digits only, no leading "+" — e.g. 9779800000000
  WHATSAPP_NUMBER: "9779806689443",
  RESUME_URL: "https://drive.google.com/file/d/1rRKokPWv-ypsZZqt8isiOHgUA3vtbvUR/view?usp=sharing",
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
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
] as const;

export const about = {
  // Sabina's own words, used verbatim. Note that the résumé page renders
  // paragraphs[0] as its summary line.
  paragraphs: [
    "Great software begins with a simple idea - and the curiosity to turn that idea into something meaningful. That curiosity has shaped my journey as a software engineer at Pokhara University, where I continue to explore, learn, and build digital solutions that combine thoughtful experiences with reliable technology.",
    "My journey began with Python and Django, grew into building REST APIs with Django REST Framework, and evolved into creating modern, responsive interfaces with Next.js and React. Along the way, I’ve learned that good software isn’t just about writing code - it’s about understanding real problems and building solutions that genuinely work.",
    "My journey includes SkillSync AI, my college project focused on connecting people with opportunities through AI-powered career and job-matching features. I’ve also contributed to a Multi-Vendor Inventory Management System, working with multi-tenant architecture, inventory and warehouse management, stock transactions, order integration, and data consistency.",
    "Beyond that, I’ve worked on the Office Management System (OMS), developing client management, real-time team communication, leave management, and permission-based workflows, and on Prakriti Ayurvedic, a full-stack platform combining thoughtful UI, content management, booking, authentication, and backend systems.",
    "I believe the most meaningful technology is built with both logic and purpose. Every challenge teaches me something new, every project pushes me to grow, and every line of code is a small step toward building something that truly matters.",
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
    items: ["Django", "Django REST Framework", "Python", "Blog API", "JWT auth"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "Neon", "SQLite"],
  },
  {
    title: "AI & data",
    items: ["Sentence Transformers", "FAISS", "Gemini API", "scikit-learn", "NumPy", "pandas"],
  },
  {
    title: "Tools & deployment",
    items: ["Git", "GitHub", "Docker", "Postman", "Swagger", "Railway", "VS Code"],
  },
];

export type FeaturedSkill = {
  name: string;
  percentage: number;
  icon: string;
};

/**
 * Featured skills shown in the skills section with proficiency percentages.
 * Icons are text-based abbreviations or emojis for simplicity.
 */
export const featuredSkills: FeaturedSkill[] = [
  { name: "Next.js", percentage: 95, icon: "N" },
  { name: "React", percentage: 92, icon: "R" },
  { name: "TypeScript", percentage: 90, icon: "TS" },
  { name: "Python", percentage: 88, icon: "Py" },
  { name: "Django", percentage: 85, icon: "Dj" },
  { name: "PostgreSQL", percentage: 82, icon: "Pg" },
];

export type Project = {
  name: string;
  year: string;
  summary: string;
  problem: string;
  features: string[];
  tech: string[];
  tags: string[];
  github?: string;
  demo?: string;
  /**
   * Optional screenshot, e.g. "/projects/skillsync.png" for a file at
   * public/projects/skillsync.png. Omit it and a typographic plate is drawn
   * instead — never a broken image or unrelated stock photography.
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
    tags: ["AI/ML", "Web App", "Full Stack"],
    github: "https://github.com/sabinaadhikari99/Project-II",
    image: "/projects/skillsync.png",
  },
  {
    name: "Online Pharmacy",
    year: "2026",
    summary:
      "An online pharmacy storefront for browsing and ordering medicines, supplements, skincare, baby care products and health devices across Nepal.",
    problem:
      "Customers need a clear way to find genuine health products, understand delivery and payment options, and manage orders from one dependable storefront.",
    features: [
      "Product browsing by medicine, supplement, skincare and personal-care categories",
      "Product search, pricing and stock availability for everyday health products",
      "Customer accounts with orders, wishlist, reviews and notifications",
      "eSewa, Khalti and cash-on-delivery payment options",
      "Delivery information and prescription guidance for regulated medicines",
    ],
    tech: ["Next.js", "E-commerce", "Nepal delivery", "eSewa", "Khalti"],
    tags: ["UI/UX Design", "Web Design", "E-commerce"],
    demo: "https://pharmafrontend.neptechpal.com.np/",
    image: "/projects/pharmacy.jpg",
  },
  {
    name: "Prakritik Ayurveda Spa",
    year: "2026",
    summary:
      "A wellness website for a Pokhara Ayurvedic spa, helping visitors discover traditional therapies, packages and a clear path to booking an appointment.",
    problem:
      "Wellness treatments can be difficult to compare online. Visitors need practical information about each therapy, who it suits, what it includes and how to book.",
    features: [
      "Therapy catalogue covering Ayurvedic massage, Shirodhara, Panchakarma and recovery treatments",
      "Treatment packages with schedules, inclusions and pricing context",
      "Editorial content that helps visitors choose the right therapy",
      "Appointment booking, WhatsApp contact and location details for Lakeside, Pokhara",
    ],
    tech: ["Next.js", "Content-driven UI", "Booking flow", "Responsive design"],
    tags: ["UI/UX Design", "Web Design", "Branding"],
    demo: "https://prakritikayurvedicspa.com/",
    image: "/projects/spa.jpg",
  },
  {
    name: "Office Management System",
    year: "2026",
    summary:
      "A secure office management dashboard for authenticated teams to access and manage day-to-day operational workflows.",
    problem:
      "Internal operations need a focused workspace where authorized staff can sign in and work with company information without exposing it through a public-facing site.",
    features: [
      "Dedicated sign-in experience for office users",
      "Protected dashboard entry point for authenticated workflows",
      "Password recovery link for account access support",
      "Focused internal-tool interface separate from the public marketing site",
    ],
    tech: ["Web application", "Authentication", "Dashboard UI", "Role-based workflows"],
    tags: ["UI/UX Design", "Dashboard", "Web App"],
    demo: "https://oms.neptechpal.com.np/dashboard",
    image: "/projects/oms.png",
  },
];

export type TimelineItem = {
  title: string;
  org: string;
  meta?: string;
  period: string;
  points: string[];
};

/** Most recent first — the timeline renders this order as-is. */
export const experience: TimelineItem[] = [
  {
    // Every line below is taken from the completion certificate issued by
    // Nep Tech Pal on 26 Aug 2026; nothing here is inferred.
    title: "Backend Intern",
    org: "Nep Tech Pal Pvt. Ltd.",
    meta: "Jalpa Road, Pokhara",
    period: "May – Aug 2026",
    points: [
      "Three-month internship in the Development Department, working across both backend and frontend.",
      "Contributed to the design, development, testing and documentation of web applications built with Django and Next.js.",
      "Worked on RESTful API design, relational database engineering, frontend integration and secure coding practice.",
    ],
  },
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
    name: "Certificate of Internship Completion - Backend Intern",
    issuer: "Nep Tech Pal Pvt. Ltd., Pokhara",
    // The signed copy carries an issue date of 26 August 2026; an earlier
    // revision reads 27 August. Month and year are true of both.
    date: "August 2026",
    category: "Internship",
    image: "/certificates/nep-tech-pal-internship.jpeg",
  },
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
    issuer: "CS4ALL - co-funded by the European Union",
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
      description: "This site - a Next.js portfolio with a Neon-backed contact form.",
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
  body: "Open to software engineering opportunities, internships, and impactful collaborations. Let's connect.",
} as const;

export const seo = {
  title: `${person.name} - ${person.role}`,
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

/**
 * Section headings, in the reference's three-part form: an uppercase eyebrow
 * pill, a title where one phrase carries the brand gradient, and a lead.
 * Kept here so copy changes never require touching a component.
 */
export type SectionCopy = {
  eyebrow: string;
  /** Title text before the gradient phrase. */
  before?: string;
  /** The phrase rendered in the brand gradient. */
  accent: string;
  /** Title text after the gradient phrase. */
  after?: string;
  lead?: string;
};

export const sections: Record<string, SectionCopy> = {
  about: {
    eyebrow: "About",
    before: "Engineering with",
    accent: "intent",
  },
  experience: {
    eyebrow: "Experience",
    before: "Where I have been",
    accent: "building",
    lead: "A timeline of my experience.",
  },
  skills: {
    eyebrow: "Skills",
    before: "The",
    accent: "toolkit",
    after: "behind the work",
    lead: "Languages, frameworks and services I have actually shipped with, grouped by where they sit in the stack.",
  },
  projects: {
    eyebrow: "Projects",
    before: "Work that",
    accent: "ships",
    lead: "Turning requirements into thoughtful, real-world solutions.",
  },
  github: {
    eyebrow: "GitHub",
    before: "Code, in",
    accent: "public",
    lead: "Repositories and language mix pulled live from the GitHub API.",
  },
  certifications: {
    eyebrow: "Certifications",
    before: "Verified",
    accent: "credentials",
    lead: "Hover a card to see what each programme covered.",
  },
  contact: {
    eyebrow: "Contact",
    before: "Let's build something",
    accent: "meaningful",
    lead: contact.body,
  },
};

/**
 * Cycled by the hero typewriter. Each line has to be a true description of the
 * stack in `skillGroups` — this is the first claim a visitor reads.
 */
export const heroRoles = [
  "Full-Stack Web Developer",
  "Next.js & React",
  "Django & API Integration",
  "AI Enthusiast",
] as const;

/**
 * About cards. Mirrors the reference's icon + lines + highlight layout using
 * only facts that exist elsewhere in this file. There is no Education card
 * because `education` is empty — an invented degree is worse than a gap.
 */
export type AboutCard = {
  icon: "education" | "focus" | "stack" | "availability";
  title: string;
  lines: string[];
  /** Short pill in the top-right corner of the card. */
  highlight: string;
  /** Makes the whole card a link. */
  href?: string;
};

export const aboutCards: AboutCard[] = [
  {
    icon: "education",
    title: "Education",
    lines: [
      "Bachelor of Software Engineering",
      "Pokhara University",
      "Diploma in Computer Engineering (9-12)",
      "Shree Ambika Secondary School",
    ],
    highlight: "Engineering",
  },
  {
    icon: "focus",
    title: "Focus",
    lines: ["Full-stack web applications", "AI and ML"],
    highlight: "Product-first",
  },
  {
    icon: "stack",
    title: "Core stack",
    lines: [
      "Next.js, React, TypeScript",
      "Django, DRF, Python",
      "PostgreSQL, Neon",
    ],
    highlight: "End to end",
  },
  {
    icon: "availability",
    title: "Currently",
    lines: [person.availability, "Fastest reply: email or WhatsApp"],
    highlight: "Available",
  },
];

/**
 * Technologies that orbit the laptop in the hero.
 *
 * Every entry must also appear in `skillGroups` — this is a presentation
 * subset, not a second source of truth. `hue` is the technology's own brand
 * colour, pulled toward the site's palette so the nodes read as a set rather
 * than as a row of logos. `mobile` marks the five kept on small screens.
 */
export type HeroSkill = {
  name: string;
  /** CSS colour for the glowing node beside the label. */
  hue: string;
  /** Anchor position over the laptop stage, in percent. */
  x: number;
  y: number;
  /** Drift pattern. Mixed on purpose so no two neighbours move alike. */
  motion: "orbit" | "sweepX" | "sweepY" | "figure8";
  /** Seconds for one full cycle. */
  period: number;
  /** Drift amplitude in pixels. */
  amplitude: number;
  mobile?: boolean;
};

export const heroSkills: HeroSkill[] = [
  { name: "Next.js",    hue: "#e8edf7", x: 14, y: 16, motion: "figure8", period: 17, amplitude: 14, mobile: true },
  { name: "React",      hue: "#61dafb", x: 78, y: 12, motion: "orbit",   period: 14, amplitude: 16, mobile: true },
  { name: "TypeScript", hue: "#4b8bf5", x: 91, y: 38, motion: "sweepY",  period: 11, amplitude: 18 },
  { name: "Python",     hue: "#ffd43b", x: 86, y: 68, motion: "orbit",   period: 19, amplitude: 13, mobile: true },
  { name: "Django",     hue: "#44b78b", x: 66, y: 90, motion: "sweepX",  period: 15, amplitude: 20, mobile: true },
  { name: "FastAPI",    hue: "#05998b", x: 34, y: 94, motion: "figure8", period: 21, amplitude: 15 },
  { name: "PostgreSQL", hue: "#7aa7d9", x: 8,  y: 72, motion: "orbit",   period: 16, amplitude: 14 },
  { name: "Tailwind",   hue: "#38bdf8", x: 4,  y: 44, motion: "sweepY",  period: 13, amplitude: 17 },
  { name: "FAISS",      hue: "#a78bfa", x: 46, y: 5,  motion: "sweepX",  period: 18, amplitude: 19, mobile: true },
  { name: "Git",        hue: "#f0724a", x: 26, y: 78, motion: "orbit",   period: 12, amplitude: 12 },
];

/**
 * Footer. `quote` is rendered in italics under the social row — it defaults to
 * the tagline above, which is Sabina's own sentence rather than a quotation
 * attributed to anyone. Replace it with whatever line you want standing there.
 */
export const footer = {
  quote: "Turning Ideas into Impact",
};

/**
 * Maps a skill in `skillGroups` to its glyph in content/brand-icons.ts.
 *
 * Kept separate from `skillGroups` so `items` stays a plain string list - the
 * résumé joins it straight into a line of text. A skill with no entry here, or
 * one whose technology simply has no brand mark (FAISS, "REST API design"),
 * falls back to a lettermark tile rather than a blank square.
 */
export type SkillIcon =
  /** A slug in content/brand-icons.ts. */
  | string
  /** A logo file in public/, for a technology Simple Icons does not carry.
   *  `color` drives the tile's hover ring and glow. */
  | { src: string; color: string };

export const skillIcons: Record<string, SkillIcon> = {
  "Next.js": "nextdotjs",
  React: "react",
  TypeScript: "typescript",
  JavaScript: "javascript",
  HTML: "html5",
  CSS: "css",
  "Tailwind CSS": "tailwindcss",
  Django: "django",
  "Django REST Framework": "djangorest",
  Python: "python",
  "JWT auth": "jsonwebtokens",
  "Blog API": { src: "/skills/blog-api.png", color: "#e27642" },
  PostgreSQL: "postgresql",
  Neon: "neon",
  SQLite: "sqlite",
  "Sentence Transformers": "huggingface",
  "Gemini API": "googlegemini",
  "scikit-learn": "scikitlearn",
  NumPy: "numpy",
  pandas: "pandas",
  Git: "git",
  GitHub: "github",
  Docker: "docker",
  Postman: "postman",
  Swagger: "swagger",
  Railway: "railway",
};
