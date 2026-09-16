import Backdrop from "@/components/Backdrop";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import GitHub from "@/components/GitHub";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

/**
 * Section order follows the reference: introduction, who I am, where I have
 * worked, what I work with, what I have built, the public record, credentials,
 * then how to get in touch.
 *
 * The reference also carries Open Source, LeetCode stats, Achievements and
 * Mentorship sections. There is no real data for any of those in the profile,
 * so they are absent rather than filled with invented content.
 */
export default function Home() {
  return (
    <>
      <Backdrop />
      <Header />
      <main id="main" className="relative">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <GitHub />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
