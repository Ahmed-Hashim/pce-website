import Section from "../ui/Section";
import type { ComponentProps } from "react";

interface MetricStat { value: string; label: string; }

interface SectorMetricsSectionProps {
  stats: MetricStat[];
  gridClass?: string;
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
}

export default function SectorMetricsSection({ stats, gridClass, sectionProps }: SectorMetricsSectionProps) {
  if (!stats || stats.length === 0) return null;
  return (
    <Section
      {...sectionProps}
      container={sectionProps?.container ?? false}
      className={`bg-primary-dark ${sectionProps?.className || ""}`}
    >
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid ${gridClass || "grid-cols-3"} gap-8`}>
          {stats.map((stat, index) => (
            <div key={`metric-${index}`} className="text-center">
              <h3 className="text-white font-extrabold tracking-tight">{stat.value}</h3>
              <div className="text-white/70 uppercase tracking-wide mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

