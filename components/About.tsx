import Image from "next/image";
import { about, aboutCards, sections } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";
import {
  BriefcaseIcon,
  GraduationCapIcon,
  LayersIcon,
  TargetIcon,
} from "./Icons";

const ICONS = {
  education: GraduationCapIcon,
  focus: TargetIcon,
  stack: LayersIcon,
  availability: BriefcaseIcon,
} as const;

const WHAT_I_BUILD = [
  { label: "SkillSync AI", icon: "✦" },
  { label: "MultiVendor", icon: "◈" },
  { label: "OMS", icon: "▣" },
  { label: "Prakriti Ayurvedic", icon: "❋" },
];

/**
 * About section: premium dark layout with profile image, prose, and info cards.
 *
 * Desktop: three-column grid (image | content | cards).
 * Tablet: two-column (content + cards, image above).
 * Mobile: single stacked column.
 */
export default function About() {
  return (
    <Section id="about" copy={sections.about}>
      <div className="grid items-stretch gap-8 lg:grid-cols-[3fr_5fr_4fr] lg:gap-6 xl:gap-10">
        {/* Left — Profile image */}
        <Reveal className="relative hidden h-full lg:block" delay={0}>
          <div className="about-image-wrapper sticky flex h-full flex-col justify-start">
            {/* Outer offset frame */}
            <div className="absolute -inset-2 rounded-[2rem] border border-indigo-500/20" />
            <div className="absolute -inset-1 rounded-[1.85rem] border border-white/[0.06]" />

            {/* Main image container */}
            <div className="about-image-frame group relative flex min-h-0 flex-1 overflow-hidden rounded-[1.75rem] border border-white/10 transition-all duration-300 hover:border-white/20">
              <Image
                src="/final-about.jpg"
                alt="Sabina Adhikari"
                width={400}
                height={520}
                className="h-full w-full object-cover"
                priority
              />
              {/* Subtle inner shadow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
                style={{
                  boxShadow:
                    "inset 0 0 40px 10px oklch(11.5% 0.038 274 / 0.6)",
                }}
              />
            </div>

            {/* Ambient glow */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] opacity-40 blur-3xl transition-opacity duration-300 group-hover:opacity-50"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 20%, oklch(55.2% 0.22 264 / 0.4), transparent 50%), radial-gradient(ellipse at 70% 80%, oklch(54.1% 0.245 293 / 0.35), transparent 50%)",
              }}
            />

            {/* Corner accent dots */}
            <div className="absolute -left-1 top-8 flex flex-col gap-1.5 opacity-40">
              <div className="h-1 w-1 rounded-full bg-indigo-400" />
              <div className="h-1 w-1 rounded-full bg-indigo-400/60" />
              <div className="h-1 w-1 rounded-full bg-indigo-400/30" />
            </div>
          </div>
        </Reveal>

        {/* Centre — Prose + What I Build */}
        <Reveal className="space-y-6" delay={80}>
          {/* Mobile profile image */}
          <div className="lg:hidden">
            <div className="relative mx-auto max-w-[280px]">
              {/* Outer offset frame */}
              <div className="absolute -inset-2 rounded-[1.75rem] border border-indigo-500/20" />
              <div className="absolute -inset-1 rounded-[1.6rem] border border-white/[0.06]" />

              {/* Main image container */}
              <div className="about-image-frame group relative overflow-hidden rounded-[1.5rem] border border-white/10 transition-all duration-300 hover:border-white/20">
                <Image
                  src="/final-about.jpg"
                  alt="Sabina Adhikari"
                  width={400}
                  height={520}
                  className="aspect-[4/5] h-auto w-full object-cover"
                  priority
                />
                {/* Subtle inner shadow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[1.5rem]"
                  style={{
                    boxShadow:
                      "inset 0 0 30px 8px oklch(11.5% 0.038 274 / 0.5)",
                  }}
                />
              </div>

              {/* Ambient glow */}
              <div
                aria-hidden
                className="absolute -inset-4 -z-10 rounded-[1.5rem] opacity-30 blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 20%, oklch(55.2% 0.22 264 / 0.35), transparent 50%), radial-gradient(ellipse at 70% 80%, oklch(54.1% 0.245 293 / 0.3), transparent 50%)",
                }}
              />
            </div>
          </div>

          {/* About paragraphs */}
          <div className="space-y-4">
            {about.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-center text-sm leading-[14pt] text-muted-foreground sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* What I Build */}
          <div className="pt-[13pt] text-center">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-subtle">
              What I Build
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {WHAT_I_BUILD.map((item) => (
                <span
                  key={item.label}
                  className="glass inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-300 hover:border-white/20 hover:text-foreground"
                >
                  <span className="text-[10px] opacity-70">{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right — Info cards */}
        <div className="flex flex-col gap-3">
          {aboutCards.map((card, i) => {
            const Icon = ICONS[card.icon];
            const { href, lineIcons } = card;

            const body = (
              <div className="flex items-start gap-4">
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-xl text-primary-foreground"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <div className="mt-1.5 space-y-2 text-[13px] leading-relaxed text-muted-foreground">
                    {card.lines.map((line, j) => (
                      <p
                        key={j}
                        className={
                          j > 0 ? "border-t border-white/[0.06] pt-2" : ""
                        }
                      >
                        {lineIcons?.[j] && (
                          <span className="mr-1.5 inline-block opacity-70">
                            {lineIcons[j]}
                          </span>
                        )}
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );

            return (
              <Reveal key={card.title} delay={160 + i * 80}>
                {href ? (
                  <a
                    href={href}
                    className="glass gradient-border card-hover group block rounded-2xl p-4"
                  >
                    {body}
                  </a>
                ) : (
                  <article className="glass gradient-border card-hover rounded-2xl p-4">
                    {body}
                  </article>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
