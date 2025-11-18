export interface JobItem {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements?: string[];
}

export const jobsData: JobItem[] = [
  {
    slug: "architect",
    title: "Architect",
    department: "Architecture",
    location: "Cairo, Egypt",
    type: "Full-time",
    description: "Lead architectural design across commercial and residential projects with strong coordination and documentation.",
    requirements: [
      "5+ years in architectural design",
      "Experience with multi-disciplinary coordination",
      "Strong documentation and specifications",
    ],
  },
  {
    slug: "structural-engineer",
    title: "Structural Engineer",
    department: "Structural",
    location: "Riyadh, KSA",
    type: "Full-time",
    description: "Deliver structural analysis and design for complex, multi-story assets with safety and performance focus.",
    requirements: [
      "5+ years in structural engineering",
      "Concrete and steel design experience",
      "Codes and standards familiarity",
    ],
  },
  {
    slug: "mechanical-engineer",
    title: "Mechanical Engineer",
    department: "Mechanical",
    location: "Dubai, UAE",
    type: "Full-time",
    description: "MEP design and supervision across industrial and commercial facilities with QA/QC discipline.",
    requirements: [
      "5+ years in mechanical design",
      "Industrial HVAC and utilities",
      "Coordination with electrical and civil",
    ],
  },
  {
    slug: "electrical-engineer",
    title: "Electrical Engineer",
    department: "Electrical",
    location: "Sharjah, UAE",
    type: "Full-time",
    description: "Electrical systems design, safety compliance, and site supervision for high-capacity facilities.",
    requirements: [
      "5+ years in electrical design",
      "Power distribution and low current",
      "Safety standards and compliance",
    ],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    department: "Project Management",
    location: "Cairo, Egypt",
    type: "Full-time",
    description: "Manage multi-sector programs with governance, stakeholder coordination, and reporting.",
    requirements: [
      "7+ years in project management",
      "PMP or equivalent is a plus",
      "Cross-disciplinary coordination",
    ],
  },
  {
    slug: "site-supervisor",
    title: "Site Supervisor",
    department: "Construction Supervision",
    location: "Erbil, Iraq",
    type: "Full-time",
    description: "Daily site supervision, contractor compliance, and continuous QA/QC.",
    requirements: [
      "5+ years on-site supervision",
      "Contractor coordination",
      "QA/QC practices",
    ],
  },
];

