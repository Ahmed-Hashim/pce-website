export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  date: string;
  tag?: string;
  excerpt?: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "engineering-excellence-lessons-recent-projects",
    title: "Engineering Excellence: Lessons from Recent Projects",
    imageSrc: "/1.png",
    date: "Nov 2025",
    tag: "Featured",
    excerpt: "Operational rigor and design precision across complex deliveries.",
    content: [
      "We examine delivery methodologies that ensured predictability and quality across multi-disciplinary projects.",
      "From early stakeholder alignment to rigorous QA cycles, the practices outlined here build durable success.",
    ],
  },
  {
    slug: "design-systems-building-consistency-at-scale",
    title: "Design Systems: Building Consistency at Scale",
    imageSrc: "/2.png",
    date: "Nov 2025",
    tag: "Featured",
    excerpt: "Governance and patterns for coherent interfaces across portfolios.",
    content: [
      "Establishing shared tokens, grid rules, and component libraries improves velocity and uniformity.",
      "We discuss adoption strategies and common pitfalls in large organizations.",
    ],
  },
  {
    slug: "sustainable-infrastructure-road-ahead",
    title: "Sustainable Infrastructure: The Road Ahead",
    imageSrc: "/3.png",
    date: "Oct 2025",
    tag: "Featured",
    excerpt: "Balancing resilience, cost, and environmental impact.",
    content: [
      "Designing for lifecycle performance requires integrated planning and material stewardship.",
      "We review frameworks that align sustainability with business outcomes.",
    ],
  },
  {
    slug: "project-delivery-frameworks-that-work",
    title: "Project Delivery Frameworks That Work",
    imageSrc: "/2.png",
    date: "Oct 2025",
    content: [
      "Execution models that combine clarity, cadence, and measurable checkpoints.",
      "We outline artifacts that improve collaboration across teams and vendors.",
    ],
  },
  {
    slug: "client-centered-design-practical-methods",
    title: "Client-Centered Design: Practical Methods",
    imageSrc: "/3.png",
    date: "Sep 2025",
    content: [
      "A structured approach to discovery, validation, and iterative refinement.",
      "How to embed feedback loops without disrupting delivery timelines.",
    ],
  },
  {
    slug: "digital-twin-adoption-construction",
    title: "Digital Twin Adoption in Construction",
    imageSrc: "/1.png",
    date: "Aug 2025",
    content: [
      "Use cases where virtual replicas reduce risk and improve coordination.",
      "Integration considerations across BIM, IoT, and analytics stacks.",
    ],
  },
  {
    slug: "quality-assurance-complex-builds",
    title: "Quality Assurance in Complex Builds",
    imageSrc: "/4.png",
    date: "Aug 2025",
    content: [
      "Ensuring traceability and accountability across subcontractors and disciplines.",
      "Sampling strategies and acceptance criteria that withstand audits.",
    ],
  },
  {
    slug: "risk-management-essentials-large-projects",
    title: "Risk Management Essentials for Large Projects",
    imageSrc: "/3.png",
    date: "Jul 2025",
    content: [
      "A practical toolkit for identifying, quantifying, and mitigating project risks.",
      "Beyond registers: operational mechanisms that keep risks visible.",
    ],
  },
  {
    slug: "operational-excellence-systems-culture",
    title: "Operational Excellence: Systems and Culture",
    imageSrc: "/2.png",
    date: "Jul 2025",
    content: [
      "Combining lean practices with supportive tooling and leadership habits.",
      "Creating feedback-rich environments that sustain improvement.",
    ],
  },
];

export const getBlogBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
export const getOtherBlogs = (currentSlug: string, limit = 3) => blogPosts.filter((p) => p.slug !== currentSlug).slice(0, limit);

