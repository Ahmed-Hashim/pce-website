import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import TriangleIcon from "../ui/TriangleIcon";
import type { ComponentProps } from "react";

interface ApproachData {
  methodology: string[];
  process: string[];
  philosophy: string[];
  steps: string[];
}

interface SectorApproachSectionProps {
  title: string;
  approach: ApproachData;
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
}

export default function SectorApproachSection({ title, approach, sectionProps }: SectorApproachSectionProps) {
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
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between gap-10">
        <div>
          <h4 className="text-primary-dark font-semibold">Methodology</h4>
          <ul className="mt-3 space-y-2 text-secondary-dark">
            {approach.methodology.map((it, i) => (
              <li key={`m-${i}`} className="flex items-start">
                <TriangleIcon className="inset-0 w-3 h-3 mt-1 mr-2 text-primary-medium rotate-90" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-primary-dark font-semibold">Process</h4>
          <ul className="mt-3 space-y-2 text-secondary-dark">
            {approach.process.map((it, i) => (
              <li key={`p-${i}`} className="flex items-start">
                <TriangleIcon className="inset-0 w-3 h-3 mt-1 mr-2 text-primary-medium rotate-90" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-primary-dark font-semibold">Philosophy</h4>
          <ul className="mt-3 space-y-2 text-secondary-dark">
            {approach.philosophy.map((it, i) => (
              <li key={`ph-${i}`} className="flex items-start">
                <TriangleIcon className="inset-0 w-3 h-3 mt-1 mr-2 text-primary-medium rotate-90" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-primary-dark font-semibold">Steps</h4>
          <ul className="mt-3 space-y-2 text-secondary-dark">
            {approach.steps.map((it, i) => (
              <li key={`s-${i}`} className="flex items-start">
                <TriangleIcon className="inset-0 w-3 h-3 mt-1 mr-2 text-primary-medium rotate-90" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

