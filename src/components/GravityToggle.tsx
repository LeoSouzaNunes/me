interface GravityToggleProps {
  readonly enabled: boolean;
  readonly onToggle: () => void;
}

export function GravityToggle({ enabled, onToggle }: GravityToggleProps) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={enabled}
      aria-label="Toggle gravity"
      className="relative inline-flex items-center h-4 w-8 rounded-sm border border-border bg-bg-surface transition-colors duration-200 ease hover:border-border-hover focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-border-hover"
    >
      <span
        className={`inline-block h-2.5 w-2.5 rounded-sm bg-text-hint transition-all duration-200 ease ${
          enabled ? "translate-x-4 bg-text-primary" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
