export interface NewsItem {
  slug: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  date: string;
  tag?: string;
  excerpt?: string;
  content: string[];
}

export const newsItems: NewsItem[] = [
  {
    slug: "new-regional-office-launch",
    title: "New Regional Office Launch",
    imageSrc: "/3.png",
    date: "Nov 2025",
    tag: "Top",
    excerpt: "Expanding presence to serve regional partners more effectively.",
    content: [
      "The new hub enables faster response times and deeper local collaboration.",
      "Facilities support training, project coordination, and client workshops.",
    ],
  },
  {
    slug: "partnership-announcement",
    title: "Partnership Announcement",
    imageSrc: "/1.png",
    date: "Nov 2025",
    tag: "Top",
    excerpt: "Strategic collaboration to advance delivery and innovation.",
    content: [
      "The partnership focuses on integrated solutions across key markets.",
      "Joint initiatives will enhance capacity and accelerate deployments.",
    ],
  },
  {
    slug: "award-excellence-engineering",
    title: "Award for Excellence in Engineering",
    imageSrc: "/4.png",
    date: "Oct 2025",
    tag: "Top",
    excerpt: "Recognition for outstanding quality and impact across projects.",
    content: [
      "Our teams demonstrated leadership in design precision and delivery.",
      "This honor reflects a sustained commitment to client outcomes.",
    ],
  },
  {
    slug: "press-release-contract-win",
    title: "Press Release: Contract Win",
    imageSrc: "/2.png",
    date: "Oct 2025",
    content: [
      "A major multi-year engagement will drive transformation across assets.",
      "Our scope includes design, supervision, and performance management.",
    ],
  },
  {
    slug: "csr-initiative-update",
    title: "CSR Initiative Update",
    imageSrc: "/4.png",
    date: "Sep 2025",
    content: [
      "Programs delivered measurable community benefits and environmental stewardship.",
      "We detail new initiatives planned for the coming quarter.",
    ],
  },
  {
    slug: "leadership-appointment",
    title: "Leadership Appointment",
    imageSrc: "/3.png",
    date: "Aug 2025",
    content: [
      "New executive leadership strengthens strategic direction and delivery.",
      "Experience spans large-scale programs and cross-border operations.",
    ],
  },
  {
    slug: "project-milestone-achieved",
    title: "Project Milestone Achieved",
    imageSrc: "/1.png",
    date: "Aug 2025",
    content: [
      "Key phase completion unlocks downstream workstreams and value.",
      "Teams maintained schedule adherence under complex constraints.",
    ],
  },
  {
    slug: "industry-event-participation",
    title: "Industry Event Participation",
    imageSrc: "/3.png",
    date: "Jul 2025",
    content: [
      "Engaging with peers to share insights and emerging practices.",
      "Sessions highlighted digital transformation across the sector.",
    ],
  },
  {
    slug: "technology-adoption-announcement",
    title: "Technology Adoption Announcement",
    imageSrc: "/2.png",
    date: "Jul 2025",
    content: [
      "New platform capabilities improve coordination and quality assurance.",
      "Rollout plans include training and phased integration.",
    ],
  },
];

export const getNewsBySlug = (slug: string) => newsItems.find((n) => n.slug === slug);
export const getOtherNews = (currentSlug: string, limit = 3) => newsItems.filter((n) => n.slug !== currentSlug).slice(0, limit);

