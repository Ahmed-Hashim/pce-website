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
}

export const servicesData: ServiceItemData[] = [
  {
    slug: "engineering-design",
    title: "Engineering Design",
    subtitle: "Concept to Detailed Delivery",
    heroImage: "/bg-2.png",
    description:
      "Comprehensive engineering design services from concept and schematic stages to detailed construction documentation.",
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

