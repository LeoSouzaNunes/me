import { Lock } from "lucide-react";
import type { Feature } from "../types";

interface FeatureCardProps {
  readonly feature: Feature;
  readonly onSelect?: (featureId: string) => void;
}

export function FeatureCard({ feature, onSelect }: FeatureCardProps) {
  const isClickable = !feature.locked && onSelect;

  const baseClass =
    "relative z-[2] bg-bg-surface border border-border rounded-md p-3 md:p-6";

  const content = (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-dot text-lg uppercase tracking-[0.10em] leading-tight text-text-primary">
          {feature.title}
        </h3>
        {feature.locked && (
          <Lock
            className="w-4 h-4 text-text-hint flex-shrink-0 ml-3"
            aria-hidden="true"
          />
        )}
      </div>
      <p className="font-sans text-base tracking-[0.04em] text-text-muted leading-normal mt-2">
        {feature.description}
      </p>
      {feature.locked && (
        <span className="font-mono text-xs uppercase tracking-[0.06em] text-text-hint mt-3 inline-block">
          Coming soon
        </span>
      )}
    </>
  );

  if (isClickable) {
    return (
      <button
        onClick={() => onSelect(feature.id)}
        className={`${baseClass} text-left w-full transition-colors duration-200 ease cursor-pointer hover:border-border-hover focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-border-hover`}
        aria-label={`Open ${feature.title}`}
      >
        {content}
      </button>
    );
  }

  return (
    <article
      className={
        feature.locked
          ? `${baseClass} pointer-events-none select-none`
          : baseClass
      }
      aria-disabled={feature.locked}
    >
      {content}
    </article>
  );
}
