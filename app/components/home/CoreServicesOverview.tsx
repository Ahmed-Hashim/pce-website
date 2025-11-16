"use client";

import SectionTitle from "../ui/SectionTitle";
import ServiceCard from "../ui/ServiceCard";

interface ServiceItem {
  title: string;
  description: string;
}

interface ServiceCardData {
  title: string;
  icon: string;
  items: ServiceItem[];
  callToAction?: string;
}

interface CoreServicesOverviewProps {
  title: string;
  eyebrow?: string;
  services: ServiceCardData[];
  backgroundText?: string;
}

export default function CoreServicesOverview({
  title,
  eyebrow,
  services,
  backgroundText,
}: CoreServicesOverviewProps) {
  const spineOffsets = ["10%", "35%", "60%", "85%"];

  return (
    <section id="core-services" className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {spineOffsets.map((top, i) => (
          <div key={i} className="absolute left-0" style={{ top }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-10 h-10 sm:w-12 sm:h-12 opacity-15">
              <path d="M 0 50 L 100 0 L 100 100 Z" fill="none" stroke="var(--color-secondary-light)" strokeWidth="1.5" />
            </svg>
          </div>
        ))}
        <div className="absolute right-[-20px] top-[20%] w-64 h-64 sm:w-80 sm:h-80 opacity-10">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full rotate-12">
            <path d="M 0 50 L 100 0 L 100 100 Z" fill="var(--color-primary-medium)" />
          </svg>
        </div>
        <div className="absolute left-8 bottom-8 w-16 h-16 opacity-20">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M 0 50 L 100 0 L 100 100 Z" fill="var(--color-primary-dark)" />
          </svg>
        </div>
      </div>
      <div className="max-w-6xl mx-auto ">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <SectionTitle
            title={title}
            background={backgroundText || title.split(" ").pop()}
            outlineColor="var(--color-primary-dark)"
            titleColor="heading"
            align="center"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              icon={service.icon}
              items={service.items}
              callToAction={service.callToAction}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
