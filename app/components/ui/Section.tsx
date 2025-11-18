import React from "react";

interface SectionProps {
  background?: string;
  container?: boolean;
  maxWidthClass?: string;
  paddingXClass?: string;
  className?: string;
  id?: string;
  children: React.ReactNode;
}

export default function Section({
  background = "",
  container = true,
  maxWidthClass = "max-w-7xl",
  paddingXClass = "px-4 sm:px-6",
  className = "",
  id,
  children,
}: SectionProps) {
  const sectionClasses = `${background} ${className}`.trim();
  if (!container) {
    return (
      <section id={id} className={sectionClasses}>
        {children}
      </section>
    );
  }
  return (
    <section id={id} className={sectionClasses}>
      <div className={` mx-auto ${maxWidthClass} ${paddingXClass}`}>
        {children}
      </div>
    </section>
  );
}

