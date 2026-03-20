import { PASSIONS } from "../constants/site";
import { PassionChip } from "./PassionChip";
import { Section } from "./Section";

export function PassionsBlock() {
  return (
    <Section className="pb-12 md:pb-16 lg:pb-20">
      <div
        className="flex flex-wrap gap-3 md:gap-4"
        role="list"
        aria-label="Passions"
      >
        {PASSIONS.map((passion) => (
          <div key={passion.id} role="listitem">
            <PassionChip passion={passion} />
          </div>
        ))}
      </div>
    </Section>
  );
}
