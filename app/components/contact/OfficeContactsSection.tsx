import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import type { ComponentProps } from "react";

interface OfficeInfo {
  title: string;
  addressLines: string[];
  phone: string;
}

interface OfficeContactsSectionProps {
  title: string;
  backgroundText?: string;
  titleColor?: string;
  outlineColor?: string;
  align?: "left" | "center" | "right";
  fontSize?: string;
  underline?: boolean;
  offices: OfficeInfo[];
  sectionProps?: Omit<ComponentProps<typeof Section>, "children">;
}

export default function OfficeContactsSection({
  title,
  backgroundText = "OFFICES",
  titleColor = "var(--color-primary-dark)",
  outlineColor = "var(--color-neutral-light)",
  align = "left",
  fontSize = "md:text-3xl lg:text-4xl",
  underline = false,
  offices,
  sectionProps,
}: OfficeContactsSectionProps) {
  return (
    <Section
      {...sectionProps}
      background={sectionProps?.background || "bg-background"}
      className={`${sectionProps?.className || ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title={title}
          background={backgroundText}
          outlineColor={outlineColor}
          titleColor={titleColor}
          align={align}
          className="mb-8"
          fontSize={fontSize}
          underline={underline}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offices.map((office, i) => (
            <div
              key={`office-${i}`}
              className="rounded-sm border border-secondary-dark/40 bg-background p-6"
            >
              <h4 className="text-primary-dark font-semibold tracking-tight">
                {office.title}
              </h4>
              <div className="mt-3 text-secondary-dark space-y-1">
                {office.addressLines.map((line, idx) => (
                  <div key={`addr-${i}-${idx}`}>{line}</div>
                ))}
              </div>
              <div className="mt-4 text-primary-dark">{office.phone}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

