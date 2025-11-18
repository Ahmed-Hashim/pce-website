import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import TriangleIcon from "../ui/TriangleIcon";
import type { ComponentProps } from "react";

interface OverviewGroup {
  title: string;
  items: string[];
}

interface SectorOverviewSectionProps {
  title: string;
  groups: OverviewGroup[];
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
}

export default function SectorOverviewSection({ title, groups, sectionProps }: SectorOverviewSectionProps) {
  return (
    <Section
      {...sectionProps}
      background={sectionProps?.background || "bg-background"}
      className={`${sectionProps?.className || ""}`}
    >
      <SectionTitle
        title={title}
        align="left"
        fontSize="md:text-3xl lg:text-4xl"
        underline={false}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        {groups.map((group, i) => (
          <div key={`ov-${i}`}>
            <h3 className="text-base md:text-lg font-semibold text-primary-dark">{group.title}</h3>
            <ul className="mt-3 space-y-2 text-secondary-dark">
              {group.items.map((it, idx) => (
                <li key={`ov-${i}-${idx}`} className="flex items-start">
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

