import { sections, skillGroups } from "@/content/profile";
import Reveal from "./Reveal";
import Section from "./Section";
import SkillChip from "./SkillChip";

/**
 * Skills as grouped tiles rather than proficiency bars.
 *
 * The profile data also carries a `featuredSkills` list with percentages. Those
 * numbers are self-assessed and unverifiable, so they are deliberately not
 * rendered here — the grouping communicates the same thing without asserting a
 * precision that does not exist.
 */
export default function Skills() {
  return (
    <Section id="skills" copy={sections.skills}>
      <div className="space-y-8">
        {skillGroups.map((group, groupIndex) => (
          <Reveal key={group.title} delay={groupIndex * 70}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {group.title}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {group.items.map((item) => (
                <SkillChip key={item} name={item} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
