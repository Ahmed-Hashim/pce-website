import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import ContentGrid from "../ui/ContentGrid";
import type { ComponentProps } from "react";

interface ContentItem { href: string; title: string; imageSrc: string; date?: string; tag?: string; }

interface SectorInsightsSectionProps {
  title: string;
  items: ContentItem[];
  ctaLabel?: string;
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
}

export default function SectorInsightsSection({ title, items, ctaLabel, sectionProps }: SectorInsightsSectionProps) {
  if (!items || items.length === 0) return null;
  return (
    <Section {...sectionProps} background={sectionProps?.background || "bg-background"}>
      <SectionTitle
        title={title}
        titleColor="var(--color-primary-dark)"
        align="left"
        fontSize="md:text-3xl lg:text-4xl"
        className="mb-0"
      />
      <ContentGrid items={items} ctaLabel={ctaLabel} className="mt-6 md:mt-8" />
    </Section>
  );
}

