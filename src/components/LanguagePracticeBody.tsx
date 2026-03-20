import { ArrowLeft } from "lucide-react";
import { Section } from "./Section";

interface LanguagePracticeBodyProps {
  readonly onBack: () => void;
}

export function LanguagePracticeBody({ onBack }: LanguagePracticeBodyProps) {
  return (
    <Section className="py-4 md:py-16 lg:py-20">
      <button
        onClick={onBack}
        className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] text-text-muted mb-6 transition-opacity duration-200 ease hover:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-border-hover"
        aria-label="Back to features"
      >
        <ArrowLeft className="w-3 h-3" aria-hidden="true" />
        Back
      </button>

      <h2 className="font-dot text-lg uppercase tracking-[0.10em] leading-tight text-text-primary">
        Language Practice
      </h2>
      <p className="font-sans text-base tracking-[0.04em] text-text-muted leading-normal mt-2">
        Interactive exercises for learning new languages.
      </p>
    </Section>
  );
}
