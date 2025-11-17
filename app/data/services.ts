export interface ServiceSection {
  title: string;
  items?: string[];
  content?: string;
}

export interface ServiceItemData {
  slug: string;
  title: string;
  subtitle?: string;
  heroImage: string;
  description?: string;
  sections: ServiceSection[];
  stats?: { label: string; value: string }[];
  highlights?: string[];
  cta?: { primaryText?: string; primaryHref?: string; secondaryText?: string; secondaryHref?: string };
}

export const servicesData: ServiceItemData[] = [
  {
    slug: "engineering-design",
    title: "Engineering Design",
    subtitle: "Concept to Detailed Delivery",
    heroImage: "/2.png",
    description:
      "Comprehensive engineering design services from concept and schematic stages to detailed construction documentation.",
    stats: [
      { label: "Disciplines", value: "6+" },
      { label: "Projects Delivered", value: "250+" },
      { label: "Regions", value: "12+" },
      { label: "Years", value: "16+" },
    ],
    highlights: [
      "Concept, preliminary and schematic design",
      "Detailed design and construction documents",
      "Specifications and bill of materials",
      "Value engineering",
    ],
    cta: { primaryText: "Get Consultation", primaryHref: "/contact", secondaryText: "Explore Projects", secondaryHref: "/projects" },
    sections: [
      {
        title: "Capabilities",
        items: [
          "Concept, preliminary and schematic design",
          "Detailed design and construction documents",
          "Specifications and bill of materials",
          "Value engineering",
        ],
      },
    ],
  },
  {
    slug: "site-supervision",
    title: "Site Supervision",
    subtitle: "Quality, Safety, Compliance",
    heroImage: "/bg-2.png",
    description:
      "End-to-end site supervision ensuring design conformity, quality standards, and safety compliance across all activities.",
    stats: [
      { label: "Daily Inspections", value: "150+" },
      { label: "Sites", value: "40+" },
      { label: "Incidents Prevented", value: "1000+" },
      { label: "Regions", value: "8+" },
    ],
    highlights: [
      "Daily project inspection and supervision",
      "Design and shop drawing review",
      "Material submittal and approval",
      "Project specification conformity",
      "Safety compliance",
    ],
    cta: { primaryText: "Speak to an Expert", primaryHref: "/contact", secondaryText: "View Services", secondaryHref: "/services" },
    sections: [
      {
        title: "Scope",
        items: [
          "Daily project inspection and supervision",
          "Design and shop drawing review",
          "Material submittal and approval",
          "Project specification conformity",
          "Safety compliance",
        ],
      },
    ],
  },
];

export const getServiceBySlug = (slug: string) =>
  servicesData.find((s) => s.slug === slug);
