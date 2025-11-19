import Section from "../ui/Section";
import ProjectsGrid, { ProjectListItem } from "../ui/ProjectsGrid";
import type { ComponentProps } from "react";

interface ProjectsGridSectionProps {
  items: ProjectListItem[];
  gridClass?: string;
  sectionProps?: Omit<ComponentProps<typeof Section>, "children">;
}

export default function ProjectsGridSection({ items, gridClass, sectionProps }: ProjectsGridSectionProps) {
  return (
    <Section {...sectionProps} className={`${sectionProps?.className || ""} pt-0`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ProjectsGrid items={items} gridClass={gridClass} />
      </div>
    </Section>
  );
}

