import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import LeaderCard from "../ui/LeaderCard";
import type { ComponentProps } from "react";

interface PersonItem {
  name: string;
  role: string;
  imageSrc?: string;
  title?: string;
  description?: string;
  stats: { projects: number; years: number; scope: string[] };
  locations?: string[];
}

interface SectorTeamSectionProps {
  title: string;
  members: PersonItem[];
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
}

export default function SectorTeamSection({ title, members, sectionProps }: SectorTeamSectionProps) {
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
      <div className="mt-10">
        <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-7 justify-items-center">
          {members.map((m, i) => (
            <LeaderCard key={`leader-${i}`} person={m} />
          ))}
        </div>
      </div>
    </Section>
  );
}

