import Link from "next/link";

const features = [
  {
    icon: "👥",
    title: "Employee Management",
    description: "Manage employee details, roles and departments with ease.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: "📅",
    title: "Leave Management",
    description: "Handle leave requests and track attendance in real-time.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: "📋",
    title: "Project Management",
    description: "Create, assign and track projects and tasks efficiently.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: "📁",
    title: "File Management",
    description: "Store and share important files securely within your team.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: "🔔",
    title: "Notifications",
    description: "Stay updated with real-time alerts and important updates.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: "📊",
    title: "Reports & Analytics",
    description: "Get insightful reports to make better decisions.",
    color: "bg-pink-100 text-pink-600",
  },
];

const techStack = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Prisma", category: "ORM" },
  { name: "JWT", category: "Auth" },
];

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Features", href: "#features" },
  { label: "Tech Stack", href: "#tech" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function OMSPage() {
  return (
    <div
      data-theme="light"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-slate-50"
    >
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <div>
              <span className="font-display text-lg font-bold text-foreground">
                OMS
              </span>
              <span className="ml-2 hidden text-sm text-muted-foreground sm:inline">
                Office Management System
              </span>
            </div>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="https://oms.neptechpal.com.np/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Explore Project
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-purple-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left content */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-3.5 w-3.5"
                >
                  <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                </svg>
                Portfolio Project
              </span>

              <h1 className="mt-6 font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Office Management{" "}
                <span className="text-primary">System (OMS)</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                A modern and efficient web application to manage office
                operations including employees, leave requests, projects, files,
                and notifications - all in one place.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://oms.neptechpal.com.np/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  View Project
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a
                  href="https://github.com/sabinaadhikari99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm text-foreground transition-colors hover:border-primary"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.06.67-3.71-1.3-3.71-1.3-.5-1.27-1.22-1.61-1.22-1.61-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.21.92.1-.71.38-1.2.7-1.48-2.44-.28-5.01-1.22-5.01-5.44 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.13a10.4 10.4 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.75 1.13 2.95 0 4.23-2.58 5.16-5.03 5.43.39.34.74 1.01.74 2.04 0 1.47-.01 2.66-.01 3.02 0 .29.2.64.76.53 4.36-1.46 7.51-5.58 7.51-10.44C23.01 5.24 18.27.5 12 .5Z" />
                  </svg>
                  View Code
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                {[
                  { icon: "✓", text: "Role-based Access" },
                  { icon: "✓", text: "Real-time Updates" },
                  { icon: "✓", text: "Clean & Responsive UI" },
                ].map((badge) => (
                  <span
                    key={badge.text}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                      {badge.icon}
                    </span>
                    {badge.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Right - Device mockups */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Laptop mockup */}
                <div className="relative mx-auto w-full max-w-2xl">
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-2.5">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-400" />
                        <div className="h-3 w-3 rounded-full bg-yellow-400" />
                        <div className="h-3 w-3 rounded-full bg-green-400" />
                      </div>
                      <div className="ml-4 flex flex-1 items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs text-gray-400 shadow-sm">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-3.5 w-3.5"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="M21 21l-4.35-4.35" />
                        </svg>
                        Search anything...
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-3.5 w-3.5"
                          >
                            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                          </svg>
                        </div>
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                          AD
                        </div>
                      </div>
                    </div>

                    {/* Dashboard content */}
                    <div className="grid grid-cols-[200px_1fr]">
                      {/* Sidebar */}
                      <div className="border-r border-gray-100 bg-gray-50/50 p-4">
                        <div className="mb-6 flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="h-4 w-4"
                            >
                              <rect x="3" y="3" width="7" height="7" rx="1" />
                              <rect
                                x="14"
                                y="3"
                                width="7"
                                height="7"
                                rx="1"
                              />
                              <rect
                                x="3"
                                y="14"
                                width="7"
                                height="7"
                                rx="1"
                              />
                              <rect
                                x="14"
                                y="14"
                                width="7"
                                height="7"
                                rx="1"
                              />
                            </svg>
                          </div>
                          <span className="font-display text-sm font-bold text-foreground">
                            OMS
                          </span>
                        </div>
                        <nav className="space-y-1">
                          {[
                            { label: "Dashboard", active: true },
                            { label: "Employees", active: false },
                            { label: "Leave Requests", active: false },
                            { label: "Projects", active: false },
                            { label: "Files", active: false },
                            { label: "Notifications", active: false },
                            { label: "Settings", active: false },
                          ].map((item) => (
                            <div
                              key={item.label}
                              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                                item.active
                                  ? "bg-primary/10 font-medium text-primary"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              <div className="h-4 w-4 rounded bg-gray-300" />
                              {item.label}
                            </div>
                          ))}
                        </nav>
                      </div>

                      {/* Main content */}
                      <div className="p-6">
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-foreground">
                            Welcome back, <span className="text-primary">Admin</span>
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Here&apos;s what&apos;s happening in your office today.
                          </p>
                        </div>

                        {/* Stats grid */}
                        <div className="mb-6 grid grid-cols-4 gap-4">
                          {[
                            {
                              label: "Total Employees",
                              value: "24",
                              icon: "👥",
                              color: "bg-blue-50",
                            },
                            {
                              label: "Pending Leaves",
                              value: "3",
                              icon: "📅",
                              color: "bg-yellow-50",
                            },
                            {
                              label: "Active Projects",
                              value: "6",
                              icon: "📋",
                              color: "bg-green-50",
                            },
                            {
                              label: "Unread Notifications",
                              value: "5",
                              icon: "🔔",
                              color: "bg-purple-50",
                            },
                          ].map((stat) => (
                            <div
                              key={stat.label}
                              className={`rounded-xl ${stat.color} p-4`}
                            >
                              <div className="text-2xl">{stat.icon}</div>
                              <div className="mt-2 text-2xl font-bold text-foreground">
                                {stat.value}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Recent activity */}
                        <div className="rounded-xl border border-gray-100 bg-white p-4">
                          <h4 className="mb-3 font-medium text-foreground">
                            Recent Activities
                          </h4>
                          <div className="space-y-3">
                            {[
                              {
                                text: "Rohan Shrestha submitted a leave request",
                                time: "2 hours ago",
                              },
                              {
                                text: 'New project "Website Redesign" created',
                                time: "4 hours ago",
                              },
                              {
                                text: "Sita Sharma uploaded a file",
                                time: "5 hours ago",
                              },
                              {
                                text: "Anil KC joined the team",
                                time: "1 day ago",
                              },
                            ].map((activity, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between text-sm"
                              >
                                <span className="text-gray-600">
                                  {activity.text}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {activity.time}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tablet mockup (positioned behind laptop) */}
                <div className="absolute -right-8 top-12 w-48 rotate-3 rounded-xl border border-gray-200 bg-white shadow-xl">
                  <div className="border-b border-gray-100 bg-gray-50 px-3 py-2">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-red-400" />
                      <div className="h-2 w-2 rounded-full bg-yellow-400" />
                      <div className="h-2 w-2 rounded-full bg-green-400" />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="mb-2 text-xs font-semibold text-foreground">
                      OMS Dashboard
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded bg-gray-200" />
                      <div className="h-2 w-3/4 rounded bg-gray-200" />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-12 rounded bg-blue-50" />
                        <div className="h-12 rounded bg-yellow-50" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile mockup */}
                <div className="absolute -right-16 bottom-8 w-28 rounded-2xl border border-gray-200 bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-2 py-1.5">
                    <span className="text-[8px] font-bold text-foreground">
                      OMS
                    </span>
                    <div className="flex gap-0.5">
                      <div className="h-1 w-1 rounded-full bg-gray-300" />
                      <div className="h-1 w-1 rounded-full bg-gray-300" />
                      <div className="h-1 w-1 rounded-full bg-gray-300" />
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="mb-1 text-[7px] font-semibold text-foreground">
                      Welcome back,
                    </div>
                    <div className="mb-2 text-[8px] font-bold text-primary">
                      Admin
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1 rounded bg-blue-50 p-1">
                        <span className="text-[8px]">👥</span>
                        <div>
                          <div className="text-[6px] text-gray-500">Total</div>
                          <div className="text-[8px] font-bold">24</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded bg-yellow-50 p-1">
                        <span className="text-[8px]">📅</span>
                        <div>
                          <div className="text-[6px] text-gray-500">
                            Pending
                          </div>
                          <div className="text-[8px] font-bold">3</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded bg-green-50 p-1">
                        <span className="text-[8px]">📋</span>
                        <div>
                          <div className="text-[6px] text-gray-500">
                            Projects
                          </div>
                          <div className="text-[8px] font-bold">6</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="text-sm font-medium uppercase tracking-widest text-primary">
              KEY FEATURES
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
              Everything You Need for a{" "}
              <span className="text-primary">Smarter Office</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Streamline your daily operations with powerful features designed
              for modern workplaces.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${feature.color}`}
                >
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="border-y border-border bg-card py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="text-sm font-medium uppercase tracking-widest text-primary">
              TECHNOLOGIES
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground">
              Built with Modern{" "}
              <span className="text-primary">Tech Stack</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Leveraging the latest technologies for a fast, secure and scalable
              application.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="group rounded-xl border border-border bg-background p-6 text-center transition-all hover:border-primary hover:bg-accent"
              >
                <div className="text-sm font-medium text-muted-foreground">
                  {tech.category}
                </div>
                <div className="mt-2 text-lg font-semibold text-foreground">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-medium uppercase tracking-widest text-primary">
                ABOUT THE PROJECT
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold text-foreground">
                Designed for{" "}
                <span className="text-primary">Modern Workplaces</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                The Office Management System was built to streamline internal
                operations for teams of all sizes. It provides a centralized
                platform where administrators can manage employees, track leave
                requests, oversee projects, and share files securely.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                With role-based access control, real-time notifications and a
                clean responsive interface, OMS makes everyday office management
                simple and efficient.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://oms.neptechpal.com.np/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  View Live Demo
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M14 4h6v6M20 4l-9 9" />
                    <path d="M18 14v4.5A1.5 1.5 0 0116.5 20h-11A1.5 1.5 0 014 18.5v-11A1.5 1.5 0 015.5 6H10" />
                  </svg>
                </a>
                <a
                  href="https://github.com/sabinaadhikari99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm text-foreground transition-colors hover:border-primary"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.06.67-3.71-1.3-3.71-1.3-.5-1.27-1.22-1.61-1.22-1.61-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.21.92.1-.71.38-1.2.7-1.48-2.44-.28-5.01-1.22-5.01-5.44 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.13a10.4 10.4 0 015.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.75 1.13 2.95 0 4.23-2.58 5.16-5.03 5.43.39.34.74 1.01.74 2.04 0 1.47-.01 2.66-.01 3.02 0 .29.2.64.76.53 4.36-1.46 7.51-5.58 7.51-10.44C23.01 5.24 18.27.5 12 .5Z" />
                  </svg>
                  View Source Code
                </a>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: "🔐",
                  title: "Secure Auth",
                  desc: "JWT-based authentication",
                },
                {
                  icon: "⚡",
                  title: "Real-time",
                  desc: "Instant notifications",
                },
                {
                  icon: "📱",
                  title: "Responsive",
                  desc: "Works on all devices",
                },
                {
                  icon: "🎨",
                  title: "Clean UI",
                  desc: "Intuitive interface",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="mt-3 font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section id="contact" className="border-y border-border bg-card py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-foreground">
            Ready to{" "}
            <span className="text-primary">Explore the Project?</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Check out the live demo or browse the source code to see how OMS
            works.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://oms.neptechpal.com.np/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Launch Live Demo
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="https://github.com/sabinaadhikari99"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-8 py-4 text-base text-foreground transition-colors hover:border-primary"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.06.67-3.71-1.3-3.71-1.3-.5-1.27-1.22-1.61-1.22-1.61-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.21.92.1-.71.38-1.2.7-1.48-2.44-.28-5.01-1.22-5.01-5.44 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.13a10.4 10.4 0 015.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.75 1.13 2.95 0 4.23-2.58 5.16-5.03 5.43.39.34.74 1.01.74 2.04 0 1.47-.01 2.66-.01 3.02 0 .29.2.64.76.53 4.36-1.46 7.51-5.58 7.51-10.44C23.01 5.24 18.27.5 12 .5Z" />
              </svg>
              View Source Code
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <span className="font-display text-xl font-bold text-foreground">
              OMS
            </span>
            <p className="mt-2 text-sm text-muted-foreground">
              Office Management System - Built by Sabina Adhikari
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}
