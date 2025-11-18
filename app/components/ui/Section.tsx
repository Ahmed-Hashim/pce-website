import React, { forwardRef } from "react";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  background?: string;
  container?: boolean;
  maxWidthClass?: string;
  paddingXClass?: string;
  className?: string;
  id?: string;
  children: React.ReactNode;
};

const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    background = "",
    container = true,
    maxWidthClass = "max-w-7xl",
    paddingXClass = "px-4 sm:px-6",
    className = "",
    id,
    children,
    ...rest
  }: SectionProps,
  ref
) {
  const sectionClasses = `${background} ${className}`.trim();
  if (!container) {
    return (
      <section id={id} ref={ref} className={sectionClasses} {...rest}>
        {children}
      </section>
    );
  }
  return (
    <section id={id} ref={ref} className={sectionClasses} {...rest}>
      <div className={`${maxWidthClass} mx-auto ${paddingXClass}`}>
        {children}
      </div>
    </section>
  );
});

export default Section;
