import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import TriangleIcon from "../ui/TriangleIcon";
import type { ComponentProps } from "react";

interface CapabilitySection { title: string; items: string[]; }

interface SectorCapabilitiesSectionProps {
  title: string;
  sections: CapabilitySection[];
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
}

export default function SectorCapabilitiesSection({ title, sections, sectionProps }: SectorCapabilitiesSectionProps) {
  return (
    <Section
      {...sectionProps}
      background={sectionProps?.background || "bg-background"}
      className={`${sectionProps?.className || ""}`}
    >
      <SectionTitle
        title={title}
        titleColor="var(--color-primary-dark)"
        align="left"
        fontSize="md:text-3xl lg:text-4xl"
        underline={false}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-10">
        {sections.map((sec, i) => (
          <div key={`cap-${i}`}>
            <h4 className="text-primary-dark font-semibold">{sec.title}</h4>
            <ul className="mt-3 space-y-2 text-secondary-dark">
              {sec.items.map((it, idx) => (
                <li key={`cap-${i}-${idx}`} className="flex items-start">
                  <TriangleIcon className="inset-0 w-3 h-3 mt-1 mr-2 text-primary-medium rotate-90" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

