import { contact, emailHref, links, whatsappHref } from "@/content/profile";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import {
  LocationIcon,
  MailIcon,
  PhoneIcon,
  SkypeIcon,
} from "./Icons";

const contactInfo = [
  {
    label: "Phone",
    value: `+${links.WHATSAPP_NUMBER}`,
    href: `tel:+${links.WHATSAPP_NUMBER}`,
    Icon: PhoneIcon,
  },
  {
    label: "Email",
    value: links.EMAIL_ADDRESS,
    href: emailHref,
    Icon: MailIcon,
  },
  {
    label: "Skype",
    value: "example",
    href: undefined,
    Icon: SkypeIcon,
  },
  {
    label: "Location",
    value: "2464 Royal Ln. Mesa, New Jersey 45463",
    href: undefined,
    Icon: LocationIcon,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#2D4A3E] py-24 md:py-32"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Left - Info */}
          <div className="text-white">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="text-sm font-semibold tracking-wider text-accent">
                  Contact Us
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h2
                id="contact-heading"
                className="mt-4 font-display text-4xl font-bold md:text-5xl"
              >
                Let&rsquo;s Talk for{" "}
                <span className="text-accent italic">Your Next Projects</span>
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-gray-300">
                {contact.body}
              </p>
            </Reveal>

            {/* Contact info list */}
            <Reveal delay={240}>
              <ul className="mt-10 space-y-6">
                {contactInfo.map(({ label, value, href, Icon }) => (
                  <li key={label} className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {label}
                      </span>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 block text-base text-white transition-colors duration-300 hover:text-accent"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-base text-white">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right - Form */}
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
