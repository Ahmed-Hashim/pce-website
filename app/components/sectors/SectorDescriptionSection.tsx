import Section from "../ui/Section";
import type { ComponentProps } from "react";

interface SectorDescriptionSectionProps {
  description?: string;
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
  textColor?: string;
}

export default function SectorDescriptionSection({
  description,
  sectionProps,
  textColor = "text-secondary-dark"
}: SectorDescriptionSectionProps) {
  return (
    <Section
      {...sectionProps}
      background={sectionProps?.background || "bg-background"}
      className={`${sectionProps?.className || ""}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-0">
        {description ? (
          <p className={`${textColor} leading-tight`}>{description}</p>
        ) : null}
      </div>
    </Section>
  );
}

