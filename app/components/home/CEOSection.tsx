"use client";
import SectionTitle from "../ui/SectionTitle";
import CEOCard from "../ui/CEOCard";

interface CEO {
  name: string;
  title: string;
  company: string;
  description: string;
  imageSrc: string;
}

interface CompanyInfo {
  name: string;
  description: string;
}

interface CEOSectionProps {
  eyebrow?: string;
  title: string;
  background?: string;
  outlineColor?: string;
  titleColor?: string;
  backgroundTextColor?: string;
  ceos: CEO[];
  companies?: CompanyInfo[];
}

export default function CEOSection({
  title,
  background,
  ceos,
}: CEOSectionProps) {
  return (
    <section className="bg-linear-to-br from-accent/30 to-heading/20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title={title}
          background={background}
          outlineColor="var(--color-neutral-light)"
          titleColor="bg"
          align="center"
          className="mb-16"
        />
    
        {/* CEO Profiles */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {ceos.map((ceo, index) => (
            <CEOCard
              key={index}
              ceo={ceo}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
