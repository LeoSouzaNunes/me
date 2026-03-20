import { useRef } from "react";

interface GravityToggleProps {
  readonly enabled: boolean;
  readonly onToggle: () => void;
}

async function requestGyroPermission() {
  const DOE = DeviceOrientationEvent as unknown as {
    requestPermission?: () => Promise<string>;
  };
  if (typeof DOE.requestPermission === "function") {
    try {
      const result = await DOE.requestPermission();
      return result === "granted";
    } catch {
      return false;
    }
  }
  return true;
}

export function GravityToggle({ enabled, onToggle }: GravityToggleProps) {
  const permissionRequested = useRef(false);

  const handleClick = async () => {
    if (!enabled && !permissionRequested.current) {
      permissionRequested.current = true;
      await requestGyroPermission();
    }
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
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
