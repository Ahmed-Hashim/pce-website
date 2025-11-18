import SectionTitle from "../ui/SectionTitle";
import LeaderCard from "../ui/LeaderCard";
import Section from "../ui/Section";
import type { ComponentProps } from "react";

interface PersonItem {
  name: string;
  role: string;
  imageSrc?: string;
  title?: string;
  description?: string;
  stats: {
    projects: number;
    years: number;
    scope: string[];
  };
  locations?: string[];
}

interface LeadershipListsProps {
  title: string;
  background?: string;
  directors: PersonItem[];
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
}

export default function LeadershipLists({
  title,
  background,
  directors = [],
  sectionProps,
}: LeadershipListsProps) {
  return (
    <Section
      {...sectionProps}
      container={sectionProps?.container ?? false}
      className={`bg-background ${sectionProps?.className || ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={title}
          background={background}
          outlineColor="var(--color-neutral-light)"
          titleColor="var(--color-primary-dark)"
          align="center"
        />
        <div className="mt-4">
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-7 justify-items-center">
            {directors.map((m, i) => (
              <LeaderCard key={`leader-${i}`} person={m} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
