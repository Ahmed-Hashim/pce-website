export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectSection {
  title: string;
  content?: string;
  items?: string[];
}

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  location: string;
  year: string;
  heroImage: string;
  gallery?: string[];
  stats?: ProjectStat[];
  sections?: ProjectSection[];
  sectors?: string[];
}

export const projectsData: ProjectItem[] = [
  {
    slug: "commercial-complex",
    title: "Commercial Complex Development",
    description:
      "Modern commercial complex featuring sustainable design and cutting-edge infrastructure.",
    category: "Commercial",
    location: "Dubai, UAE",
    year: "2024",
    heroImage: "/1.png",
    sectors: ["Commercial"],
    gallery: ["/1.png", "/2.png", "/3.png"],
    stats: [
      { label: "Built-up Area", value: "45,000 m²" },
      { label: "Floors", value: "28" },
      { label: "Sustainability", value: "LEED Gold" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A high-performance mixed-use complex that integrates retail, office, and public space, optimized for energy efficiency and user comfort.",
      },
      {
        title: "Scope",
        items: [
          "Architectural and structural design",
          "MEP coordination",
          "Value engineering and specifications",
        ],
      },
    ],
  },
  {
    slug: "manufacturing-facility",
    title: "Industrial Manufacturing Facility",
    description:
      "State-of-the-art manufacturing facility with advanced automation systems.",
    category: "Industrial",
    location: "Abu Dhabi, UAE",
    year: "2023",
    heroImage: "/2.png",
    sectors: ["Industrial"],
    gallery: ["/2.png", "/3.png", "/4.png"],
    stats: [
      { label: "Production Lines", value: "12" },
      { label: "Plot Area", value: "120,000 m²" },
      { label: "Compliance", value: "ISO 9001" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A modern facility designed for scalability and operational excellence, focusing on safety and throughput.",
      },
      {
        title: "Scope",
        items: [
          "Process engineering",
          "Utilities and infrastructure",
          "Construction supervision",
        ],
      },
    ],
  },
  {
    slug: "residential-tower",
    title: "Residential Tower Project",
    description:
      "Luxury residential tower with premium amenities and smart home integration.",
    category: "Residential",
    location: "Sharjah, UAE",
    year: "2024",
    heroImage: "/3.png",
    sectors: ["Residential"],
    gallery: ["/3.png", "/4.png", "/1.png"],
    stats: [
      { label: "Units", value: "180" },
      { label: "Amenities", value: "Sky lounge, pool, gym" },
      { label: "Connectivity", value: "Smart systems" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A refined residential experience designed around comfort, technology, and community.",
      },
      {
        title: "Scope",
        items: [
          "Architectural concept and detailed design",
          "Structural analysis",
          "MEP systems integration",
        ],
      },
    ],
  },
  {
    slug: "infrastructure-development",
    title: "Infrastructure Development",
    description:
      "Large-scale infrastructure project improving urban connectivity and efficiency.",
    category: "Infrastructure",
    location: "Dubai, UAE",
    year: "2023",
    heroImage: "/4.png",
    sectors: ["Infrastructure"],
    gallery: ["/4.png", "/2.png", "/1.png"],
    stats: [
      { label: "Network Length", value: "85 km" },
      { label: "Phases", value: "4" },
      { label: "Impact", value: "Regional connectivity" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A strategic urban infrastructure program delivering resilient and future-ready transport systems.",
      },
      {
        title: "Scope",
        items: [
          "Master planning",
          "Civil and structural works",
          "Quality assurance and supervision",
        ],
      },
    ],
  },
  {
    slug: "commercial-complex",
    title: "Commercial Complex Development",
    description:
      "Modern commercial complex featuring sustainable design and cutting-edge infrastructure.",
    category: "Commercial",
    location: "Dubai, UAE",
    year: "2024",
    heroImage: "/1.png",
    sectors: ["Commercial"],
    gallery: ["/1.png", "/2.png", "/3.png"],
    stats: [
      { label: "Built-up Area", value: "45,000 m²" },
      { label: "Floors", value: "28" },
      { label: "Sustainability", value: "LEED Gold" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A high-performance mixed-use complex that integrates retail, office, and public space, optimized for energy efficiency and user comfort.",
      },
      {
        title: "Scope",
        items: [
          "Architectural and structural design",
          "MEP coordination",
          "Value engineering and specifications",
        ],
      },
    ],
  },
  {
    slug: "manufacturing-facility",
    title: "Industrial Manufacturing Facility",
    description:
      "State-of-the-art manufacturing facility with advanced automation systems.",
    category: "Industrial",
    location: "Abu Dhabi, UAE",
    year: "2023",
    heroImage: "/2.png",
    sectors: ["Industrial"],
    gallery: ["/2.png", "/3.png", "/4.png"],
    stats: [
      { label: "Production Lines", value: "12" },
      { label: "Plot Area", value: "120,000 m²" },
      { label: "Compliance", value: "ISO 9001" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A modern facility designed for scalability and operational excellence, focusing on safety and throughput.",
      },
      {
        title: "Scope",
        items: [
          "Process engineering",
          "Utilities and infrastructure",
          "Construction supervision",
        ],
      },
    ],
  },
  {
    slug: "residential-tower",
    title: "Residential Tower Project",
    description:
      "Luxury residential tower with premium amenities and smart home integration.",
    category: "Residential",
    location: "Sharjah, UAE",
    year: "2024",
    heroImage: "/3.png",
    sectors: ["Residential"],
    gallery: ["/3.png", "/4.png", "/1.png"],
    stats: [
      { label: "Units", value: "180" },
      { label: "Amenities", value: "Sky lounge, pool, gym" },
      { label: "Connectivity", value: "Smart systems" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A refined residential experience designed around comfort, technology, and community.",
      },
      {
        title: "Scope",
        items: [
          "Architectural concept and detailed design",
          "Structural analysis",
          "MEP systems integration",
        ],
      },
    ],
  },
  {
    slug: "infrastructure-development",
    title: "Infrastructure Development",
    description:
      "Large-scale infrastructure project improving urban connectivity and efficiency.",
    category: "Infrastructure",
    location: "Dubai, UAE",
    year: "2023",
    heroImage: "/4.png",
    sectors: ["Infrastructure"],
    gallery: ["/4.png", "/2.png", "/1.png"],
    stats: [
      { label: "Network Length", value: "85 km" },
      { label: "Phases", value: "4" },
      { label: "Impact", value: "Regional connectivity" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A strategic urban infrastructure program delivering resilient and future-ready transport systems.",
      },
      {
        title: "Scope",
        items: [
          "Master planning",
          "Civil and structural works",
          "Quality assurance and supervision",
        ],
      },
    ],
  },
  {
    slug: "commercial-complex",
    title: "Commercial Complex Development",
    description:
      "Modern commercial complex featuring sustainable design and cutting-edge infrastructure.",
    category: "Commercial",
    location: "Dubai, UAE",
    year: "2024",
    heroImage: "/1.png",
    sectors: ["Commercial"],
    gallery: ["/1.png", "/2.png", "/3.png"],
    stats: [
      { label: "Built-up Area", value: "45,000 m²" },
      { label: "Floors", value: "28" },
      { label: "Sustainability", value: "LEED Gold" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A high-performance mixed-use complex that integrates retail, office, and public space, optimized for energy efficiency and user comfort.",
      },
      {
        title: "Scope",
        items: [
          "Architectural and structural design",
          "MEP coordination",
          "Value engineering and specifications",
        ],
      },
    ],
  },
  {
    slug: "manufacturing-facility",
    title: "Industrial Manufacturing Facility",
    description:
      "State-of-the-art manufacturing facility with advanced automation systems.",
    category: "Industrial",
    location: "Abu Dhabi, UAE",
    year: "2023",
    heroImage: "/2.png",
    sectors: ["Industrial"],
    gallery: ["/2.png", "/3.png", "/4.png"],
    stats: [
      { label: "Production Lines", value: "12" },
      { label: "Plot Area", value: "120,000 m²" },
      { label: "Compliance", value: "ISO 9001" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A modern facility designed for scalability and operational excellence, focusing on safety and throughput.",
      },
      {
        title: "Scope",
        items: [
          "Process engineering",
          "Utilities and infrastructure",
          "Construction supervision",
        ],
      },
    ],
  },
  {
    slug: "residential-tower",
    title: "Residential Tower Project",
    description:
      "Luxury residential tower with premium amenities and smart home integration.",
    category: "Residential",
    location: "Sharjah, UAE",
    year: "2024",
    heroImage: "/3.png",
    sectors: ["Residential"],
    gallery: ["/3.png", "/4.png", "/1.png"],
    stats: [
      { label: "Units", value: "180" },
      { label: "Amenities", value: "Sky lounge, pool, gym" },
      { label: "Connectivity", value: "Smart systems" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A refined residential experience designed around comfort, technology, and community.",
      },
      {
        title: "Scope",
        items: [
          "Architectural concept and detailed design",
          "Structural analysis",
          "MEP systems integration",
        ],
      },
    ],
  },
  {
    slug: "infrastructure-development",
    title: "Infrastructure Development",
    description:
      "Large-scale infrastructure project improving urban connectivity and efficiency.",
    category: "Infrastructure",
    location: "Dubai, UAE",
    year: "2023",
    heroImage: "/4.png",
    sectors: ["Infrastructure"],
    gallery: ["/4.png", "/2.png", "/1.png"],
    stats: [
      { label: "Network Length", value: "85 km" },
      { label: "Phases", value: "4" },
      { label: "Impact", value: "Regional connectivity" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A strategic urban infrastructure program delivering resilient and future-ready transport systems.",
      },
      {
        title: "Scope",
        items: [
          "Master planning",
          "Civil and structural works",
          "Quality assurance and supervision",
        ],
      },
    ],
  },
  {
    slug: "commercial-complex",
    title: "Commercial Complex Development",
    description:
      "Modern commercial complex featuring sustainable design and cutting-edge infrastructure.",
    category: "Commercial",
    location: "Dubai, UAE",
    year: "2024",
    heroImage: "/1.png",
    sectors: ["Commercial"],
    gallery: ["/1.png", "/2.png", "/3.png"],
    stats: [
      { label: "Built-up Area", value: "45,000 m²" },
      { label: "Floors", value: "28" },
      { label: "Sustainability", value: "LEED Gold" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A high-performance mixed-use complex that integrates retail, office, and public space, optimized for energy efficiency and user comfort.",
      },
      {
        title: "Scope",
        items: [
          "Architectural and structural design",
          "MEP coordination",
          "Value engineering and specifications",
        ],
      },
    ],
  },
  {
    slug: "manufacturing-facility",
    title: "Industrial Manufacturing Facility",
    description:
      "State-of-the-art manufacturing facility with advanced automation systems.",
    category: "Industrial",
    location: "Abu Dhabi, UAE",
    year: "2023",
    heroImage: "/2.png",
    sectors: ["Industrial"],
    gallery: ["/2.png", "/3.png", "/4.png"],
    stats: [
      { label: "Production Lines", value: "12" },
      { label: "Plot Area", value: "120,000 m²" },
      { label: "Compliance", value: "ISO 9001" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A modern facility designed for scalability and operational excellence, focusing on safety and throughput.",
      },
      {
        title: "Scope",
        items: [
          "Process engineering",
          "Utilities and infrastructure",
          "Construction supervision",
        ],
      },
    ],
  },
  {
    slug: "residential-tower",
    title: "Residential Tower Project",
    description:
      "Luxury residential tower with premium amenities and smart home integration.",
    category: "Residential",
    location: "Sharjah, UAE",
    year: "2024",
    heroImage: "/3.png",
    sectors: ["Residential"],
    gallery: ["/3.png", "/4.png", "/1.png"],
    stats: [
      { label: "Units", value: "180" },
      { label: "Amenities", value: "Sky lounge, pool, gym" },
      { label: "Connectivity", value: "Smart systems" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A refined residential experience designed around comfort, technology, and community.",
      },
      {
        title: "Scope",
        items: [
          "Architectural concept and detailed design",
          "Structural analysis",
          "MEP systems integration",
        ],
      },
    ],
  },
  {
    slug: "infrastructure-development",
    title: "Infrastructure Development",
    description:
      "Large-scale infrastructure project improving urban connectivity and efficiency.",
    category: "Infrastructure",
    location: "Dubai, UAE",
    year: "2023",
    heroImage: "/4.png",
    sectors: ["Infrastructure"],
    gallery: ["/4.png", "/2.png", "/1.png"],
    stats: [
      { label: "Network Length", value: "85 km" },
      { label: "Phases", value: "4" },
      { label: "Impact", value: "Regional connectivity" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A strategic urban infrastructure program delivering resilient and future-ready transport systems.",
      },
      {
        title: "Scope",
        items: [
          "Master planning",
          "Civil and structural works",
          "Quality assurance and supervision",
        ],
      },
    ],
  },
  {
    slug: "commercial-complex",
    title: "Commercial Complex Development",
    description:
      "Modern commercial complex featuring sustainable design and cutting-edge infrastructure.",
    category: "Commercial",
    location: "Dubai, UAE",
    year: "2024",
    heroImage: "/1.png",
    sectors: ["Commercial"],
    gallery: ["/1.png", "/2.png", "/3.png"],
    stats: [
      { label: "Built-up Area", value: "45,000 m²" },
      { label: "Floors", value: "28" },
      { label: "Sustainability", value: "LEED Gold" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A high-performance mixed-use complex that integrates retail, office, and public space, optimized for energy efficiency and user comfort.",
      },
      {
        title: "Scope",
        items: [
          "Architectural and structural design",
          "MEP coordination",
          "Value engineering and specifications",
        ],
      },
    ],
  },
  {
    slug: "manufacturing-facility",
    title: "Industrial Manufacturing Facility",
    description:
      "State-of-the-art manufacturing facility with advanced automation systems.",
    category: "Industrial",
    location: "Abu Dhabi, UAE",
    year: "2023",
    heroImage: "/2.png",
    sectors: ["Industrial"],
    gallery: ["/2.png", "/3.png", "/4.png"],
    stats: [
      { label: "Production Lines", value: "12" },
      { label: "Plot Area", value: "120,000 m²" },
      { label: "Compliance", value: "ISO 9001" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A modern facility designed for scalability and operational excellence, focusing on safety and throughput.",
      },
      {
        title: "Scope",
        items: [
          "Process engineering",
          "Utilities and infrastructure",
          "Construction supervision",
        ],
      },
    ],
  },
  {
    slug: "residential-tower",
    title: "Residential Tower Project",
    description:
      "Luxury residential tower with premium amenities and smart home integration.",
    category: "Residential",
    location: "Sharjah, UAE",
    year: "2024",
    heroImage: "/3.png",
    sectors: ["Residential"],
    gallery: ["/3.png", "/4.png", "/1.png"],
    stats: [
      { label: "Units", value: "180" },
      { label: "Amenities", value: "Sky lounge, pool, gym" },
      { label: "Connectivity", value: "Smart systems" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A refined residential experience designed around comfort, technology, and community.",
      },
      {
        title: "Scope",
        items: [
          "Architectural concept and detailed design",
          "Structural analysis",
          "MEP systems integration",
        ],
      },
    ],
  },
  {
    slug: "infrastructure-development",
    title: "Infrastructure Development",
    description:
      "Large-scale infrastructure project improving urban connectivity and efficiency.",
    category: "Infrastructure",
    location: "Dubai, UAE",
    year: "2023",
    heroImage: "/4.png",
    sectors: ["Infrastructure"],
    gallery: ["/4.png", "/2.png", "/1.png"],
    stats: [
      { label: "Network Length", value: "85 km" },
      { label: "Phases", value: "4" },
      { label: "Impact", value: "Regional connectivity" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A strategic urban infrastructure program delivering resilient and future-ready transport systems.",
      },
      {
        title: "Scope",
        items: [
          "Master planning",
          "Civil and structural works",
          "Quality assurance and supervision",
        ],
      },
    ],
  },
  {
    slug: "commercial-complex",
    title: "Commercial Complex Development",
    description:
      "Modern commercial complex featuring sustainable design and cutting-edge infrastructure.",
    category: "Commercial",
    location: "Dubai, UAE",
    year: "2024",
    heroImage: "/1.png",
    sectors: ["Commercial"],
    gallery: ["/1.png", "/2.png", "/3.png"],
    stats: [
      { label: "Built-up Area", value: "45,000 m²" },
      { label: "Floors", value: "28" },
      { label: "Sustainability", value: "LEED Gold" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A high-performance mixed-use complex that integrates retail, office, and public space, optimized for energy efficiency and user comfort.",
      },
      {
        title: "Scope",
        items: [
          "Architectural and structural design",
          "MEP coordination",
          "Value engineering and specifications",
        ],
      },
    ],
  },
  {
    slug: "manufacturing-facility",
    title: "Industrial Manufacturing Facility",
    description:
      "State-of-the-art manufacturing facility with advanced automation systems.",
    category: "Industrial",
    location: "Abu Dhabi, UAE",
    year: "2023",
    heroImage: "/2.png",
    sectors: ["Industrial"],
    gallery: ["/2.png", "/3.png", "/4.png"],
    stats: [
      { label: "Production Lines", value: "12" },
      { label: "Plot Area", value: "120,000 m²" },
      { label: "Compliance", value: "ISO 9001" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A modern facility designed for scalability and operational excellence, focusing on safety and throughput.",
      },
      {
        title: "Scope",
        items: [
          "Process engineering",
          "Utilities and infrastructure",
          "Construction supervision",
        ],
      },
    ],
  },
  {
    slug: "residential-tower",
    title: "Residential Tower Project",
    description:
      "Luxury residential tower with premium amenities and smart home integration.",
    category: "Residential",
    location: "Sharjah, UAE",
    year: "2024",
    heroImage: "/3.png",
    sectors: ["Residential"],
    gallery: ["/3.png", "/4.png", "/1.png"],
    stats: [
      { label: "Units", value: "180" },
      { label: "Amenities", value: "Sky lounge, pool, gym" },
      { label: "Connectivity", value: "Smart systems" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A refined residential experience designed around comfort, technology, and community.",
      },
      {
        title: "Scope",
        items: [
          "Architectural concept and detailed design",
          "Structural analysis",
          "MEP systems integration",
        ],
      },
    ],
  },
  {
    slug: "infrastructure-development",
    title: "Infrastructure Development",
    description:
      "Large-scale infrastructure project improving urban connectivity and efficiency.",
    category: "Infrastructure",
    location: "Dubai, UAE",
    year: "2023",
    heroImage: "/4.png",
    sectors: ["Infrastructure"],
    gallery: ["/4.png", "/2.png", "/1.png"],
    stats: [
      { label: "Network Length", value: "85 km" },
      { label: "Phases", value: "4" },
      { label: "Impact", value: "Regional connectivity" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A strategic urban infrastructure program delivering resilient and future-ready transport systems.",
      },
      {
        title: "Scope",
        items: [
          "Master planning",
          "Civil and structural works",
          "Quality assurance and supervision",
        ],
      },
    ],
  },
  {
    slug: "commercial-complex",
    title: "Commercial Complex Development",
    description:
      "Modern commercial complex featuring sustainable design and cutting-edge infrastructure.",
    category: "Commercial",
    location: "Dubai, UAE",
    year: "2024",
    heroImage: "/1.png",
    sectors: ["Commercial"],
    gallery: ["/1.png", "/2.png", "/3.png"],
    stats: [
      { label: "Built-up Area", value: "45,000 m²" },
      { label: "Floors", value: "28" },
      { label: "Sustainability", value: "LEED Gold" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A high-performance mixed-use complex that integrates retail, office, and public space, optimized for energy efficiency and user comfort.",
      },
      {
        title: "Scope",
        items: [
          "Architectural and structural design",
          "MEP coordination",
          "Value engineering and specifications",
        ],
      },
    ],
  },
  {
    slug: "manufacturing-facility",
    title: "Industrial Manufacturing Facility",
    description:
      "State-of-the-art manufacturing facility with advanced automation systems.",
    category: "Industrial",
    location: "Abu Dhabi, UAE",
    year: "2023",
    heroImage: "/2.png",
    sectors: ["Industrial"],
    gallery: ["/2.png", "/3.png", "/4.png"],
    stats: [
      { label: "Production Lines", value: "12" },
      { label: "Plot Area", value: "120,000 m²" },
      { label: "Compliance", value: "ISO 9001" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A modern facility designed for scalability and operational excellence, focusing on safety and throughput.",
      },
      {
        title: "Scope",
        items: [
          "Process engineering",
          "Utilities and infrastructure",
          "Construction supervision",
        ],
      },
    ],
  },
  {
    slug: "residential-tower",
    title: "Residential Tower Project",
    description:
      "Luxury residential tower with premium amenities and smart home integration.",
    category: "Residential",
    location: "Sharjah, UAE",
    year: "2024",
    heroImage: "/3.png",
    sectors: ["Residential"],
    gallery: ["/3.png", "/4.png", "/1.png"],
    stats: [
      { label: "Units", value: "180" },
      { label: "Amenities", value: "Sky lounge, pool, gym" },
      { label: "Connectivity", value: "Smart systems" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A refined residential experience designed around comfort, technology, and community.",
      },
      {
        title: "Scope",
        items: [
          "Architectural concept and detailed design",
          "Structural analysis",
          "MEP systems integration",
        ],
      },
    ],
  },
  {
    slug: "infrastructure-development",
    title: "Infrastructure Development",
    description:
      "Large-scale infrastructure project improving urban connectivity and efficiency.",
    category: "Infrastructure",
    location: "Dubai, UAE",
    year: "2023",
    heroImage: "/4.png",
    sectors: ["Infrastructure"],
    gallery: ["/4.png", "/2.png", "/1.png"],
    stats: [
      { label: "Network Length", value: "85 km" },
      { label: "Phases", value: "4" },
      { label: "Impact", value: "Regional connectivity" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A strategic urban infrastructure program delivering resilient and future-ready transport systems.",
      },
      {
        title: "Scope",
        items: [
          "Master planning",
          "Civil and structural works",
          "Quality assurance and supervision",
        ],
      },
    ],
  },
];

const norm = (s: string) => decodeURIComponent(s).toLowerCase();
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getProjectBySlug = (slug: string) => {
  const n = norm(slug);
  const direct = projectsData.find((p) => norm(p.slug) === n);
  if (direct) return direct;
  const byTitle = projectsData.find((p) => slugify(p.title) === n);
  return byTitle || undefined;
};

