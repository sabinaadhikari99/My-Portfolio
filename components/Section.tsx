import Reveal from "./Reveal";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  surface?: boolean;
};

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
            className="mt-4 font-display text-h2 font-bold tracking-tight text-foreground"
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
