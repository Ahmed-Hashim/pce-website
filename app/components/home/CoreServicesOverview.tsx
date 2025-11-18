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
  image: string;
  items: ServiceItem[];
  callToAction?: string;
}

interface CoreServicesOverviewProps {
  title?: string; // make optional
  eyebrow?: string;
  services: ServiceCardData[];
  backgroundText?: string;
}

export default function CoreServicesOverview({
  title,
  services,
}: CoreServicesOverviewProps) {
  return (
    <section id="core-sectors" className="relative overflow-hidden ">
      <div className="absolute inset-0 pointer-events-none">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        {title && (
          <div className="text-center mb-16 sm:mb-20">
            <SectionTitle
              title={title}
              outlineColor="var(--color-primary-dark)"
              titleColor="heading"
              align="center"
            />
          </div>
        )}

        {/* Services Grid */}
        <div className="grid px-4 lg:px-0 grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              icon={service.icon}
              image={service.image}
              items={service.items}
              callToAction={service.callToAction}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
