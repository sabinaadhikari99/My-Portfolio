import type { SectionCopy } from "@/content/profile";
import Reveal from "./Reveal";

type Props = {
  id: string;
  copy: SectionCopy;
  children: React.ReactNode;
};

/**
 * Standard section frame: an uppercase eyebrow pill, a heading where one
 * phrase carries the brand gradient, an optional lead, then the content.
 *
 * Every section on the page uses this, which is what keeps the vertical rhythm
 * and heading scale identical from About all the way to Contact.
 */
export default function Section({ id, copy, children }: Props) {
  const { eyebrow, before, accent, after, lead } = copy;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="section-pad shell relative"
    >
      <Reveal className="mb-10 max-w-2xl sm:mb-14">
        <span className="glass inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </span>
        <h2
          id={`${id}-heading`}
          className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl"
        >
          {before ? `${before} ` : ""}
          <span className="gradient-text">{accent}</span>
          {after ? ` ${after}` : ""}
        </h2>
        {lead ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {lead}
          </p>
        ) : null}
      </Reveal>
      {children}
    </section>
  );
}
