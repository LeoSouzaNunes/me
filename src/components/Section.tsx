import type { ReactNode } from "react";

interface SectionProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: "section" | "header" | "footer" | "main";
  readonly id?: string;
}

export function Section({
  children,
  className = "",
  as: Tag = "section",
  id,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={`max-w-page mx-auto px-6 md:px-8 lg:px-12 ${className}`}
    >
      {children}
    </Tag>
  );
}
