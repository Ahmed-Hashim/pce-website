import Section from "../ui/Section";
import Image from "next/image";
import type { ComponentProps } from "react";

interface SectorFeaturedImageSectionProps {
  imageSrc: string;
  alt: string;
  caption?: string;
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
}

export default function SectorFeaturedImageSection({ imageSrc, alt, caption, sectionProps }: SectorFeaturedImageSectionProps) {
  return (
    <Section
      {...sectionProps}
      background={sectionProps?.background || "bg-background"}
      className={`${sectionProps?.className || ""}`}
    >
      <div className="rounded-sm overflow-hidden border border-secondary-dark">
        <div className="relative h-64 md:h-80 lg:h-96">
          <Image src={imageSrc} alt={alt} fill className="object-cover" />
        </div>
      </div>
      {caption ? (
        <p className="mt-4 text-secondary-dark text-sm md:text-base">{caption}</p>
      ) : null}
    </Section>
  );
}

