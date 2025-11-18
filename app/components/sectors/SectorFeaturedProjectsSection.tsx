import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import ProjectsGrid, { ProjectListItem } from "../ui/ProjectsGrid";
import type { ComponentProps } from "react";

interface SectorFeaturedProjectsSectionProps {
  title: string;
  items: ProjectListItem[];
  gridClass?: string;
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
}

export default function SectorFeaturedProjectsSection({ title, items, gridClass, sectionProps }: SectorFeaturedProjectsSectionProps) {
  return (
    <Section {...sectionProps}>
      <SectionTitle
        title={title}
        titleColor="var(--color-primary-dark)"
        align="left"
        fontSize="md:text-3xl lg:text-4xl"
        underline={false}
      />
      <ProjectsGrid items={items} gridClass={gridClass || "mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 "} />
    </Section>
  );
}
