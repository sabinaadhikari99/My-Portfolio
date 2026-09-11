import Reveal from "./Reveal";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  /** Optional sentence sitting under the section title. */
  lead?: string;
  children: React.ReactNode;
  /** Paints the band in white to separate it from the paper background. */
  surface?: boolean;
};

/**
 * The shared section shell: an uppercase label, a large serif heading, an
 * optional lead paragraph, then content. Every section on the page uses it so
 * the rhythm and spacing stay identical top to bottom.
 */
export default function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  surface = false,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={
        surface
          ? "border-y border-border bg-card py-24 md:py-32"
          : "py-24 md:py-32"
      }
    >
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id={`${id}-heading`}
            className="mt-4 font-display text-h2 text-foreground"
          >
            {title}
          </h2>
          {lead ? (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {lead}
            </p>
          ) : null}
        </Reveal>
        <div className="mt-14 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
