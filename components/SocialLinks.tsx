import { emailHref, links, whatsappHref } from "@/content/profile";
import { GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "./Icons";

export const socials = [
  { label: "GitHub", href: links.GITHUB_URL, Icon: GitHubIcon, external: true },
  { label: "LinkedIn", href: links.LINKEDIN_URL, Icon: LinkedInIcon, external: true },
  { label: "WhatsApp", href: whatsappHref, Icon: WhatsAppIcon, external: true },
  { label: "Email", href: emailHref, Icon: MailIcon, external: true },
] as const;

type Props = {
  className?: string;
  /**
   * "ghost" is the quiet row used in the footer; "solid" is the filled circle
   * treatment the hero uses, where the icons act as primary entry points.
   */
  variant?: "ghost" | "solid";
};

const styles = {
  ghost:
    "h-10 w-10 text-muted-foreground hover:bg-accent hover:text-primary",
  solid:
    "h-11 w-11 border border-border bg-card text-foreground shadow-[0_1px_2px_rgba(21,23,28,0.04)] hover:border-primary hover:bg-primary hover:text-primary-foreground",
} as const;

/** Compact icon row. Each link keeps a visible-to-screen-readers name. */
export default function SocialLinks({ className = "", variant = "ghost" }: Props) {
  return (
    <ul className={`flex items-center ${variant === "solid" ? "gap-2.5" : "gap-1"} ${className}`}>
      {socials.map(({ label, href, Icon, external }) =>
        href ? (
          <li key={label}>
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              aria-label={label}
              title={label}
              className={`flex items-center justify-center rounded-full transition-colors duration-300 ${styles[variant]}`}
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          </li>
        ) : null,
      )}
    </ul>
  );
}
