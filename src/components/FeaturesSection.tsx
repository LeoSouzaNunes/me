import { FEATURES } from "../constants/site";
import { FeatureCard } from "./FeatureCard";
import { Section } from "./Section";

export function FeaturesSection() {
    return (
        <Section className="py-4 md:py-16 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                {FEATURES.map((feature) => (
                    <FeatureCard key={feature.id} feature={feature} />
                ))}
            </div>
        </Section>
    );
}
