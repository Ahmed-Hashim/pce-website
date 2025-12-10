import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import TriangleIcon from "../ui/TriangleIcon";
import type { ComponentProps } from "react";

export interface SectorGridItem {
  title: string;
  items: string[];
}

interface SectorGridSectionProps {
  title: string;
  groups: SectorGridItem[];
  columns?: 2 | 3 | 4;
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
}

export default function SectorGridSection({ title, groups, columns = 4, sectionProps }: SectorGridSectionProps) {
  const gridClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4"
  }[columns];

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
      <div className={`grid grid-cols-1 ${gridClass} gap-10 mt-10`}>
        {groups.map((group, i) => (
          <div key={`group-${i}`}>
            <h4 className="text-primary-dark font-semibold text-lg">{group.title}</h4>
            <ul className="mt-3 space-y-2 text-secondary-dark">
              {group.items.map((it, idx) => (
                <li key={`group-${i}-${idx}`} className="flex items-start">
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
