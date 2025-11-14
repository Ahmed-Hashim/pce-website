"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { FaDraftingCompass, FaHardHat } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";

interface ServiceCard {
  title: string;
  icon: React.ReactNode;
  backgroundImage: string;
  items: string[];
}


const defaultServices: ServiceCard[] = [
  {
    title: "Engineering Design",
    icon: <FaDraftingCompass className="w-6 h-6 sm:w-8 sm:h-8" />,
    backgroundImage: "/1.png",
    items: [
      "Concept, Preliminary and Schematic design, Detailed design and Construction documents",
      "Specifications",
      "Bill of materials",
      "Value Engineering"
    ]
  },
  {
    title: "Site Supervision",
    icon: <FaHardHat className="w-6 h-6 sm:w-8 sm:h-8" />,
    backgroundImage: "/2.png",
    items: [
      "Daily Project inspection and supervision",
      "Design review",
      "Shop drawing review",
      "Material submittal and approval",
      "Project specification conformity",
      "Safety compliance"
    ]
  },
  {
    title: "Project Management",
    icon: <FaChartLine className="w-6 h-6 sm:w-8 sm:h-8" />,
    backgroundImage: "/3.png",
    items: [
      "Projects planning, Monitoring & Control",
      "Cost Management",
      "Value Engineering Analysis",
      "Contracts administration",
      "Reporting (Periodical Reports)"
    ]
  }
];
export default function CoreServicesOverview({
  title = "Our Core Services",
  
}) {
  const [active, setActive] = useState(0);
  // UI labels to keep content configurable
  const uiLabels = {
    learnMore: "Learn More",
    expandSymbol: "+",
    tablistLabel: "Select a service",
  };

  return (
    <section className="py-[var(--space-section-y-mobile)] sm:py-[var(--space-section-y-sm)] md:py-[var(--space-section-y-md)] lg:py-[var(--space-section-y-lg)] bg-bg relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <SectionTitle
            title={title}
            titleColor="heading"
            outlineColor="var(--color-heading)"
            background={title.split(" ").pop()}
            align="center"
          />
        </div>

        {/* CARD TABS GRID */}
        <div
          role="tablist"
          aria-label={uiLabels.tablistLabel}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {defaultServices.map((service, i) => (
            <button
              key={i}
              role="tab"
              id={`service-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`service-panel-${i}`}
              aria-label={service.title}
              onClick={() => setActive(i)}
              className={`group rounded-xl border p-4 sm:p-5 text-center sm:text-left cursor-pointer transition-all duration-300 
                ${active === i 
                  ? "bg-accent/10 border-accent text-accent shadow-sm" 
                  : "border-border hover:bg-bg/40 text-heading"}`}
            >
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="text-accent">{service.icon}</div>
                <span className="hidden sm:inline text-base sm:text-lg font-semibold">{service.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* ACTIVE TAB CONTENT */}
        <div
          id={`service-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`service-tab-${active}`}
          className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[400px] border border-border rounded-xl overflow-hidden"
        >
          {/* BACKGROUND IMAGE */}
          <motion.div
            key={defaultServices[active].backgroundImage}
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url(${defaultServices[active].backgroundImage})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ duration: 0.4 }}
          />

          {/* DARK GRADIENT */}
          <div className="absolute inset-0 bg-linear-to-br from-bg/90 to-bg/60" />

          <div className="relative p-6 sm:p-8 md:p-12">
            {/* ICON */}
            <div className="text-accent mb-6">{defaultServices[active].icon}</div>

            {/* TITLE */}
            <h3 className="text-2xl sm:text-3xl font-bold text-heading mb-6">
              {defaultServices[active].title}
            </h3>

            {/* CONTENT */}
            <ul className="space-y-3">
              {defaultServices[active].items.map((item, index) => (
                <li key={index} className="flex items-start text-foreground-secondary">
                  <span className="text-accent mr-3 mt-[2px]">•</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* LEARN MORE */}
            <div className="mt-8 inline-flex items-center text-accent font-medium cursor-pointer">
              {uiLabels.learnMore}
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
