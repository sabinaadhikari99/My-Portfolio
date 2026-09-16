import Image from "next/image";
import { certifications, sections } from "@/content/profile";
import Reveal from "./Reveal";
import CertificateViewer from "./CertificateViewer";
import Section from "./Section";
import { AwardIcon, ExternalIcon } from "./Icons";

/**
 * Credentials as cards that flip on hover: issuer and title on the front, the
 * certificate scan on the back.
 *
 * The flip is hover-driven on pointer devices and focus-driven for keyboard
 * users (`focus-within`), so the back face is reachable without a mouse. Where
 * a card has no scan, the back shows the issuer detail as text instead.
 */
export default function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <Section id="certifications" copy={sections.certifications}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => {
          return (
            <Reveal as="li" key={`${cert.name}-${cert.issuer}`} delay={i * 80}>
              <CertificateViewer
                cert={cert}
                className="group block h-52 w-full text-left [perspective:1200px]"
              >
                <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-focus-within:[transform:rotateY(180deg)] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="glass gradient-border absolute inset-0 flex flex-col justify-between rounded-2xl p-5 [backface-visibility:hidden]">
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className="grid size-10 place-items-center rounded-xl text-primary-foreground"
                        style={{ background: "var(--gradient-brand)" }}
                      >
                        <AwardIcon className="h-[18px] w-[18px]" />
                      </span>
                      {cert.category ? (
                        <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
                          {cert.category}
                        </span>
                      ) : null}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold leading-snug">
                        {cert.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {cert.issuer} · {cert.date}
                      </p>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="glass gradient-border absolute inset-0 overflow-hidden rounded-2xl bg-[oklch(9%_0.03_274)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    {cert.image ? (
                      /* `contain`, not `cover`: these scans are a mix of
                         landscape course certificates and portrait A4 letters,
                         and cropping a portrait page to a landscape card leaves
                         nothing but the letterhead. Landscape scans still very
                         nearly fill the card at this ratio. */
                      <Image
                        src={cert.image}
                        alt={`${cert.name} certificate issued by ${cert.issuer}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-2"
                      />
                    ) : null}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, oklch(0.115 0.038 274 / 94%), oklch(0.115 0.038 274 / 35%) 60%, transparent)",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-sm font-semibold leading-snug">
                        {cert.name}
                      </p>
                      {cert.image ? (
                        <span className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-cyan">
                          <ExternalIcon className="h-3.5 w-3.5" />
                          View certificate
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </CertificateViewer>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
