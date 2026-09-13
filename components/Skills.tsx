import { featuredSkills } from "@/content/profile";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-white py-24 md:py-32"
      aria-labelledby="skills-heading"
    >
      <div className="shell">
        {/* Header */}
        <Reveal className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="text-sm font-semibold tracking-wider text-accent">
              My Favorite Tools
            </span>
          </div>
          <h2
            id="skills-heading"
            className="mt-4 font-display text-4xl font-bold md:text-5xl"
          >
            <span className="text-accent italic">Exploring the Tools</span>
            <br />
            <span className="text-[#1a1a2e]">Behind My Designs</span>
          </h2>
        </Reveal>

        {/* Skills grid */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {featuredSkills.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 70}>
              <div className="group flex flex-col items-center rounded-[2rem] bg-gray-100 px-4 py-8 text-center transition-all duration-300 hover:bg-gray-200 hover:shadow-lg">
                {/* Icon circle */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-bold text-[#1E293B] shadow-sm transition-transform duration-300 group-hover:scale-110">
                  {skill.icon}
                </div>

                {/* Percentage */}
                <div className="mt-5 text-3xl font-bold text-[#1a1a2e]">
                  {skill.percentage}%
                </div>

                {/* Skill name */}
                <div className="mt-2 text-sm font-medium text-gray-600">
                  {skill.name}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
