import { person } from "@/content/profile";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl text-foreground">{person.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {person.role} — {person.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <SocialLinks className="-ml-2 md:ml-0 md:-mr-2" />
          <p className="text-xs text-subtle">
            © {year} {person.name}. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
