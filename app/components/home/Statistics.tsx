import React from "react";
import SectionTitle from "../ui/SectionTitle";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface StatisticsProps {
  title: string;
  eyebrow?: string;
  background?: string;
  stats: Stat[];
  titleColor?: string;
  backgroundTextColor?: string;
  outlineColor?: string;
  backgroundOpacity?: number;
}

const Statistics: React.FC<StatisticsProps> = ({
  title,
  stats,
  backgroundOpacity,
}) => {
  return (
    <section className="py-[var(--space-section-y-mobile)] sm:py-[var(--space-section-y-sm)] md:py-[var(--space-section-y-md)] lg:py-[var(--space-section-y-lg)] bg-background relative overflow-hidden">
      {/* Background image with brand color overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{ backgroundImage: "url('/bg-comp.png')" }}
      >
        <div className="absolute inset-0 bg-[--color-primary-dark] opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          title={title}
          background={title.split(" ").pop()}
          align="center"
          className="mb-24"
          titleColor="heading"
          outlineColor="var(--color-neutral-light)"
          backgroundOpacity={backgroundOpacity}
        />
        <div className="relative">
          {/* Dotted line for desktop view */}
          <div className="absolute top-14 left-0 w-full h-px border-t-2 border-dotted border-secondary-dark hidden md:block"></div>

          <div className="flex flex-col md:flex-row justify-between text-center space-y-16 md:space-y-0">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center w-full md:w-1/4 px-4"
              >
                {/* Icon with pointer */}
                <div className="relative">
                  <div className="w-28 h-28 bg-primary-medium rounded-full flex items-center justify-center text-button-text text-5xl">
                    {stat.icon}
                  </div>
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-0 h-0 
                    border-l-15 border-l-transparent 
                    border-r-15 border-r-transparent 
                    border-t-15 border-t-primary-medium"
                  ></div>
                </div>

                {/* Text content */}
                <div className="mt-10">
                  <p className="text-2xl font-bold text-primary-medium">
                    {stat.value}
                  </p>
                  <p className="text-secondary-dark mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
