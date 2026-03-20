import type { Passion } from "../types";

interface PassionChipProps {
  readonly passion: Passion;
}

export function PassionChip({ passion }: PassionChipProps) {
  return (
    <span className="inline-flex items-center px-4 py-2 bg-bg-surface border border-border rounded-sm font-sans text-ui uppercase tracking-[0.06em] text-text-primary">
      {passion.label}
    </span>
  );
}
