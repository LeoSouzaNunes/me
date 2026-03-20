import { Lock } from "lucide-react";
import type { Feature } from "../types";

interface FeatureCardProps {
  readonly feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <article
      className={
        feature.locked
          ? "relative z-[2] bg-bg-surface border border-border rounded-md p-3 md:p-6 pointer-events-none select-none"
          : "relative z-[2] bg-bg-surface border border-border rounded-md p-3 md:p-6"
      }
      aria-disabled={feature.locked}
    >
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
    </article>
  );
}
