import { Section } from "./Section";
import { SITE_CONFIG } from "../constants/site";

export function HeroSection() {
    return (
        <Section as="header" className="py-6 md:py-16 lg:py-24">
            <h1 className="font-dot text-xl md:text-2xl tracking-[0.10em] leading-none text-text-primary">
                I'm Leo, developer @{" "}
                <a
                    href={SITE_CONFIG.arcticLeafUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary transition-colors duration-200 ease hover:text-blue-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-border-hover"
                >
                    arcticleaf
                </a>
            </h1>
            <p className="font-mono text-md md:text-lg text-text-muted mt-4">
                Showcasing some passions with code
            </p>
        </Section>
    );
}
