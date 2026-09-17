import { sections, skillGroups } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";
import SkillTile from "./SkillTile";

/**
 * Skills as logo tiles, grouped by where they sit in the stack.
 *
 * The profile data also carries a `featuredSkills` list with percentages.
 * Those numbers are self-assessed and unverifiable, so they are deliberately
 * not rendered - the grouping says the same thing without asserting a
 * precision that does not exist.
 */
export default function Skills() {
  return (
    <Section id="skills" copy={sections.skills}>
      <div className="space-y-10">
        {skillGroups.map((group, groupIndex) => (
          <Reveal key={group.title} delay={groupIndex * 70}>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {group.title}
            </h3>
            <ul className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {group.items.map((item) => (
                <SkillTile key={item} name={item} />
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
