import Image from "next/image";
import { footer, person } from "@/content/profile";
import SocialLinks from "./SocialLinks";
import { ArrowUpIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      <div className="shell flex flex-col items-center py-14 text-center">
        <span className="gradient-border relative mb-5 block size-16 overflow-hidden rounded-full">
          <Image
            src={person.avatar}
            alt={person.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </span>

        <p className="font-display text-xl font-bold uppercase tracking-[0.12em]">
          {person.name}
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground">{person.role}</p>

        <SocialLinks variant="solid" className="mt-6 justify-center" />

        {footer.quote ? (
          /* Set as a pull quote: display face, generous size, and oversized
             quotation marks set in the brand gradient. The marks are decorative
             and aria-hidden, so a screen reader hears only the line. */
          <blockquote className="relative mt-9 max-w-xl px-8 sm:px-10">
            <span
              aria-hidden
              className="gradient-text absolute -top-5 left-0 font-display text-5xl leading-none sm:text-6xl"
            >
              &ldquo;
            </span>
            <p className="font-display text-lg italic leading-snug tracking-tight text-foreground sm:text-2xl">
              {footer.quote}
            </p>
            <span
              aria-hidden
              className="gradient-text absolute -bottom-7 right-0 font-display text-5xl leading-none sm:text-6xl"
            >
              &rdquo;
            </span>
          </blockquote>
        ) : null}

        {/* Icon only, so it needs an accessible name of its own - without one
            a screen reader announces nothing but "link". */}
        <a
          href="#top"
          aria-label="Back to top"
          title="Back to top"
          className="glass gradient-border mt-8 grid size-11 place-items-center rounded-full text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
        >
          <ArrowUpIcon className="h-4 w-4" />
        </a>

        <p className="mt-8 text-xs text-subtle">
          © {year} {person.name}
        </p>
      </div>
    </footer>
  );
}
