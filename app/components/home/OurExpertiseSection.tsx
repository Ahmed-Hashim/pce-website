"use client";

import Image from "next/image";
import SectionTitle from "../ui/SectionTitle";

interface ExpertiseItem {
  icon?: React.ReactNode;
  imageSrc?: string;
  title: string;
  description?: string;
  metric?: string;
  metricValue?: string;
  progress?: number;
}

interface OurExpertiseSectionProps {
  title: string;
  eyebrow?: string;
  background?: string;
  outlineColor?: string;
  titleColor?: string;
  items: ExpertiseItem[];
}

export default function OurExpertiseSection({
  title,
  eyebrow,
  background,
  outlineColor = "var(--color-primary-dark)",
  titleColor = "heading",
  items,
}: OurExpertiseSectionProps) {
  return (
    <section className="relative  bg-linear-to-br from-white via-gray-50 to-gray-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,var(--color-primary-medium)_0%,transparent_50%),radial-gradient(circle_at_75%_75%,var(--color-secondary-light)_0%,transparent_50%)]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20">
          {/* {eyebrow && (
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-linear-to-br from-transparent to-primary-medium" />
              <span className="text-sm font-medium text-primary-medium uppercase tracking-widest">
                {eyebrow}
              </span>
              <div className="h-px w-12 bg-linear-to-br from-primary-medium to-transparent" />
            </div>
          )} */}
          <SectionTitle
            title={title}
            background={background || title.split(" ").pop()}
            outlineColor={outlineColor}
            titleColor={titleColor}
            align="center"
          />
        </div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 ease-out border border-gray-100 hover:border-primary-medium/20"
            >
              {/* Hover Background Effect */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary-medium/5 to-secondary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon/Image Container - Centered and Larger */}
                <div className="mb-8">
                  {item.imageSrc ? (
                    <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <Image 
                        src={item.imageSrc} 
                        alt={item.title} 
                        width={96} 
                        height={96} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-xl bg-linear-to-br from-primary-medium/10 to-secondary-light/10 flex items-center justify-center text-primary-medium group-hover:scale-110 transition-all duration-300">
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-primary-dark group-hover:text-primary-medium transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description
                  {item.description && (
                    <p className="text-sm text-gray-600 leading-tight group-hover:text-gray-700 transition-colors duration-300">
                      {item.description}
                    </p>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
