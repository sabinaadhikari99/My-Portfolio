import { links, mailtoHref, whatsappHref } from "@/content/profile";
import { GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "./Icons";

export const socials = [
  { label: "GitHub", href: links.GITHUB_URL, Icon: GitHubIcon, external: true },
  { label: "LinkedIn", href: links.LINKEDIN_URL, Icon: LinkedInIcon, external: true },
  { label: "WhatsApp", href: whatsappHref, Icon: WhatsAppIcon, external: true },
  { label: "Email", href: mailtoHref, Icon: MailIcon, external: false },
] as const;

type Props = { className?: string };

/** Compact icon row. Each link keeps a visible-to-screen-readers name. */
export default function SocialLinks({ className = "" }: Props) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
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
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:bg-accent-soft hover:text-accent"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          </li>
        ) : null,
      )}
    </ul>
  );
}
