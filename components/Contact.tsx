import {
  emailHref,
  links,
  person,
  sections,
  whatsappHref,
} from "@/content/profile";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import Section from "./Section";
import {
  DownloadIcon,
  FacebookIcon,
  GitHubIcon,
  LinkedInIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
} from "./Icons";

/**
 * The handle a reader actually scans, without the numeric id the platform
 * appends to disambiguate vanity URLs: "/in/sabina-adhikari-340092263" reads
 * as "/in/sabina-adhikari". The href still carries the full, working URL.
 */
function handle(url: string) {
  return url
    .replace(/^https?:\/\/(www\.)?[^/]+\//, "/")
    .replace(/\/$/, "")
    .replace(/[-.]\d{4,}$/, "");
}

/**
 * Contact tiles. Built only from links that exist in the profile data — an
 * absent number or URL drops its tile rather than rendering a dead one.
 */
const tiles = [
  {
    label: "Email",
    value: links.EMAIL_ADDRESS,
    href: emailHref,
    Icon: MailIcon,
  },
  {
    label: "Phone",
    value: links.WHATSAPP_NUMBER
      ? `+${links.WHATSAPP_NUMBER.slice(0, 3)} ${links.WHATSAPP_NUMBER.slice(3)}`
      : undefined,
    href: whatsappHref,
    Icon: PhoneIcon,
  },
  {
    label: "LinkedIn",
    value: links.LINKEDIN_URL ? handle(links.LINKEDIN_URL) : undefined,
    href: links.LINKEDIN_URL,
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    value: links.GITHUB_URL
      ? `@${links.GITHUB_URL.split("/").filter(Boolean).pop()}`
      : undefined,
    href: links.GITHUB_URL,
    Icon: GitHubIcon,
  },
  {
    label: "Facebook",
    value: links.FACEBOOK_URL ? handle(links.FACEBOOK_URL) : undefined,
    href: links.FACEBOOK_URL,
    Icon: FacebookIcon,
  },
  {
    label: "Location",
    value: person.location,
    // Maps search rather than a pinned coordinate: the place resolves however
    // Google thinks best for the reader's locale, and never 404s.
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(person.location)}`,
    Icon: LocationIcon,
  },
].filter(
  (t): t is {
    label: string;
    value: string;
    href: string | undefined;
    Icon: typeof MailIcon;
  } => Boolean(t.value),
);

export default function Contact() {
  return (
    <Section id="contact" copy={sections.contact}>
      <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <div className="glass gradient-border relative flex h-full flex-col overflow-hidden rounded-2xl p-5 sm:p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.541 0.245 293 / 55%), transparent 70%)",
              }}
            />

            <div className="relative z-10 grid gap-3 sm:grid-cols-2">
              {tiles.map(({ label, value, href, Icon }) => {
                const inner = (
                  <>
                    <Icon className="h-[18px] w-[18px] text-cyan" />
                    <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-foreground">
                      {value}
                    </p>
                  </>
                );

                return href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass card-hover block rounded-xl p-4"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label} className="glass rounded-xl p-4">
                    {inner}
                  </div>
                );
              })}
            </div>

            <a
              href={links.RESUME_URL}
              className="relative z-10 mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: "var(--gradient-brand)" }}
            >
              <DownloadIcon className="h-4 w-4" />
              Download Resume
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
