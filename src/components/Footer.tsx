import { useRef, useEffect } from "react";
import { SITE_CONFIG, SOCIAL_LINKS } from "../constants/site";
import { GravityToggle } from "./GravityToggle";

const linkClasses =
  "font-mono text-sm uppercase tracking-[0.06em] text-text-muted transition-colors duration-200 ease hover:text-text-primary focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-border-hover";

interface FooterProps {
  readonly gravity: boolean;
  readonly onGravityToggle: () => void;
  readonly onHeightChange?: (height: number) => void;
}

export function Footer({ gravity, onGravityToggle, onHeightChange }: FooterProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || !onHeightChange) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        onHeightChange(entry.contentRect.height + entry.target.clientHeight - entry.contentRect.height);
      }
    });
    onHeightChange(ref.current.offsetHeight);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onHeightChange]);

  return (
    <footer ref={ref} className="relative z-[2] bg-bg border-t border-border mt-6 md:mt-16 lg:mt-20">
      <div className="max-w-page mx-auto px-6 md:px-8 lg:px-12 py-6">
        <nav
          className="flex flex-wrap items-center gap-5 md:gap-8"
          aria-label="Social links"
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
            >
              {link.label}
            </a>
          ))}
          <a href={SITE_CONFIG.licenseUrl} className={linkClasses}>
            License
          </a>
          <div className="flex items-center gap-2 ml-auto">
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-text-hint">
              Gravity
            </span>
            <GravityToggle enabled={gravity} onToggle={onGravityToggle} />
          </div>
        </nav>
      </div>
    </footer>
  );
}
