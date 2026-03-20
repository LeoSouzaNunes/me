import { FEATURES } from "../constants/site";
import { FeatureCard } from "./FeatureCard";
import { Section } from "./Section";

interface FeaturesSectionProps {
  readonly onFeatureSelect?: (featureId: string) => void;
}

export function FeaturesSection({ onFeatureSelect }: FeaturesSectionProps) {
  return (
    <Section className="py-4 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        {FEATURES.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            onSelect={!feature.locked ? onFeatureSelect : undefined}
          />
        ))}
      </div>
    </Section>
  );
}
