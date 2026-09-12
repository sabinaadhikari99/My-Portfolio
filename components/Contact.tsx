import { contact, emailHref, links, whatsappHref } from "@/content/profile";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import { ArrowIcon, GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "./Icons";

const channels = [
  {
    label: "Email",
    value: links.EMAIL_ADDRESS,
    href: emailHref,
    Icon: MailIcon,
    external: true,
  },
  {
    label: "WhatsApp",
    value: `+${links.WHATSAPP_NUMBER}`,
    href: whatsappHref,
    Icon: WhatsAppIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "Connect with me",
    href: links.LINKEDIN_URL,
    Icon: LinkedInIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "See the code",
    href: links.GITHUB_URL,
    Icon: GitHubIcon,
    external: true,
  },
].filter((channel) => channel.href);

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-border py-24 md:py-32"
    >
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-heading" className="mt-4 font-display text-h2 font-bold text-foreground">
            {contact.heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {contact.body}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <Reveal>
             {channels.length ? (
               <ul className="divide-y divide-border border-y border-border">
                 {channels.map(({ label, value, href, Icon, external }) => (
                   <li key={label}>
                     <a
                       href={href}
                       {...(external
                         ? { target: "_blank", rel: "noopener noreferrer" }
                         : {})}
                       className="group flex items-center gap-4 py-5 transition-colors duration-300 hover:text-accent"
                     >
                       <Icon className="h-5 w-5 shrink-0 text-subtle transition-colors duration-300 group-hover:text-accent" />
                       <span className="min-w-0 flex-1">
                         <span className="eyebrow block">{label}</span>
                         <span className="mt-1 block truncate text-base text-foreground transition-colors duration-300 group-hover:text-accent">
                           {value}
                         </span>
                       </span>
                       <ArrowIcon className="h-4 w-4 shrink-0 text-subtle transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                     </a>
                   </li>
                 ))}
               </ul>
             ) : (
               <p className="border-y border-border py-5 text-muted-foreground">
                 Contact details will be added here soon.
               </p>
             )}
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
