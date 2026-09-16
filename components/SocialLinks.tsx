import { emailHref, links, whatsappHref } from "@/content/profile";
import {
  FacebookIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  WhatsAppIcon,
} from "./Icons";

export const socials = [
  { label: "GitHub", href: links.GITHUB_URL, Icon: GitHubIcon, external: true },
  { label: "LinkedIn", href: links.LINKEDIN_URL, Icon: LinkedInIcon, external: true },
  { label: "Facebook", href: links.FACEBOOK_URL, Icon: FacebookIcon, external: true },
  { label: "WhatsApp", href: whatsappHref, Icon: WhatsAppIcon, external: true },
  { label: "Email", href: emailHref, Icon: MailIcon, external: true },
] as const;

type Props = {
  className?: string;
  variant?: "ghost" | "solid";
};

const styles = {
  ghost:
    "h-10 w-10 text-muted-foreground transition-colors hover:text-foreground",
  solid:
    "glass gradient-border h-11 w-11 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:text-foreground hover:shadow-[0_0_24px_-4px_oklch(0.552_0.22_264/0.7)]",
} as const;

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
