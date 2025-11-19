import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";
import type { ComponentProps } from "react";

interface ContactChannel {
  label: string;
  value: string;
  href: string;
}

interface HoursItem {
  label: string;
  value: string;
}

interface HoursInfo {
  title: string;
  items: HoursItem[];
}

interface DirectContactsSectionProps {
  title: string;
  backgroundText?: string;
  titleColor?: string;
  outlineColor?: string;
  align?: "left" | "center" | "right";
  fontSize?: string;
  underline?: boolean;
  contactChannels: ContactChannel[];
  hours: HoursInfo;
  mapImage: string;
  sectionProps?: Omit<ComponentProps<typeof Section>, "children">;
}

export default function DirectContactsSection({
  title,
  backgroundText = "CONTACT",
  titleColor = "var(--color-primary-dark)",
  outlineColor = "var(--color-neutral-light)",
  align = "left",
  fontSize = "md:text-3xl lg:text-4xl",
  underline = false,
  contactChannels,
  hours,
  mapImage,
  sectionProps,
}: DirectContactsSectionProps) {
  return (
    <Section
      {...sectionProps}
      background={sectionProps?.background || "bg-background"}
      className={`${sectionProps?.className || ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title={title}
          background={backgroundText}
          outlineColor={outlineColor}
          titleColor={titleColor}
          align={align}
          className="mb-8"
          fontSize={fontSize}
          underline={underline}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {contactChannels.map((c, i) => (
            <a
              key={`cc-${i}`}
              href={c.href}
              className="group block rounded-sm border border-secondary-dark/40 bg-background p-5 hover:border-primary-medium/50 transition-colors"
            >
              <div className="text-xs uppercase tracking-wide text-secondary-dark/80">
                {c.label}
              </div>
              <div className="mt-1 text-primary-dark font-semibold">{c.value}</div>
            </a>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-sm border border-secondary-dark/40 bg-background p-6">
            <h4 className="text-primary-dark font-semibold tracking-tight">
              {hours.title}
            </h4>
            <div className="mt-3 space-y-2">
              {hours.items.map((h, i) => (
                <div key={`hr-${i}`} className="flex items-center justify-between">
                  <div className="text-secondary-dark">{h.label}</div>
                  <div className="text-primary-dark font-medium">{h.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm overflow-hidden border border-secondary-dark">
            <div className="relative h-64 md:h-80 lg:h-96">
              <Image src={mapImage} alt="Map" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

