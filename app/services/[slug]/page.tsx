import PageHero from "../../components/ui/PageHero";
// Removed direct UI imports moved into subcomponents
import { getSectorBySlug, sectorsData } from "../../data/sectors";
import { projectsData } from "../../data/projects";
import { getOtherNews } from "../../data/news";
import { getOtherBlogs } from "../../data/blog";
// Removed unused UI helpers now encapsulated in subcomponents
import SectorDescriptionSection from "../../components/sectors/SectorDescriptionSection";
import SectorOverviewSection from "../../components/sectors/SectorOverviewSection";
import SectorMetricsSection from "../../components/sectors/SectorMetricsSection";
import SectorFeaturedImageSection from "../../components/sectors/SectorFeaturedImageSection";
import SectorApproachSection from "../../components/sectors/SectorApproachSection";
import SectorCapabilitiesSection from "../../components/sectors/SectorCapabilitiesSection";
import SectorTeamSection from "../../components/sectors/SectorTeamSection";
import SectorFeaturedProjectsSection from "../../components/sectors/SectorFeaturedProjectsSection";
import SectorInsightsSection from "../../components/sectors/SectorInsightsSection";

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getSectorBySlug(slug);

  if (!service) {
    const pageHero = {
      title: "Sector Not Found",
      subtitle: "",
      imageSrc: "/2.png",
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Sectors", href: "/sectors" },
      ],
    };
    return (
      <div className="min-h-screen bg-primary-dark">
        <PageHero
          title={pageHero.title}
          subtitle={pageHero.subtitle}
          breadcrumbs={pageHero.breadcrumbs}
          imageSrc={pageHero.imageSrc}
        />
      </div>
    );
  }

  const pageHero = {
    title: service.title,
    subtitle: service.subtitle || "",
    imageSrc: service.heroImage,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Sectors", href: "/sectors" },
      { label: service.title, href: `/sectors/${service.slug}` },
    ],
  };

  const overviewTitle = "Sector Overview";
  const overviewGroups = [
    {
      title: "What the sector covers",
      items: [
        "End-to-end delivery across core disciplines",
        "Standards compliance and stakeholder coordination",
        "Documentation, approvals, and execution support",
      ],
    },
    {
      title: "Value provided",
      items: [
        "Reduced risk through structured governance",
        "Higher efficiency and predictable outcomes",
        "Transparent reporting and measurable results",
      ],
    },
    {
      title: "Key features",
      items: service.highlights || [
        "Structured workflows and expert review",
        "Quality controls and safety alignment",
        "Data-backed decision support",
      ],
    },
    {
      title: "Why it matters",
      items: [
        "Accelerates delivery while maintaining quality",
        "Improves collaboration and reduces rework",
        "Builds confidence with clear accountability",
      ],
    },
  ];

  const metricsStats =
    service.stats && service.stats.length > 0
      ? service.stats
      : [
          { value: "1st", label: "Market position" },
          { value: "300+", label: "Projects or clients" },
          { value: "66%", label: "Efficiency improvement" },
        ];
  const metricsGridClass =
    metricsStats.length === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3";

  const featuredImageSrc = service.heroImage;
  const featuredImageCaption = service.subtitle || "";

  const approachTitle = "Our Approach";
  const approach = {
    methodology: [
      "Integrated, discipline-led delivery",
      "Evidence-based design and supervision",
    ],
    process: [
      "Plan → Design → Review → Execute",
      "Progress tracking with defined checkpoints",
    ],
    philosophy: [
      "Precision, clarity, and responsibility",
      "Simplicity in systems and workflows",
    ],
    steps: [
      "Assess context and constraints",
      "Design and validate alternatives",
      "Coordinate stakeholders and approvals",
      "Execute with continuous QA/QC",
    ],
  };

  const capabilitiesTitle = "Capabilities / Sectors Included";
  const capabilitySections = [
    {
      title: "Operations",
      items: ["Daily coordination", "Compliance checks", "Issue resolution"],
    },
    {
      title: "Optimization",
      items: [
        "Value engineering",
        "Lean workflows",
        "Cost-performance balance",
      ],
    },
    {
      title: "Technology",
      items: [
        "Digital review",
        "Model-based coordination",
        "Reporting automation",
      ],
    },
    {
      title: "Strategy & Planning",
      items: ["Scope definition", "Risk controls", "Milestone governance"],
    },
  ];

  const teamTitle = "Team Members / Experts";
  const teamMembers = [
    {
      name: "Lead Engineer",
      role: "Discipline Lead",
      title: "Discipline Lead",
      imageSrc: "/1.png",
      description: "Leads multi-disciplinary coordination and delivery.",
      stats: {
        projects: 120,
        years: 12,
        scope: ["Design", "Coordination", "QA/QC"],
      },
      locations: ["Egypt", "UAE", "KSA"],
    },
    {
      name: "Site Supervisor",
      role: "Field Operations",
      title: "Field Operations",
      imageSrc: "/2.png",
      description: "Ensures quality, safety, and compliance on site.",
      stats: {
        projects: 90,
        years: 10,
        scope: ["Supervision", "Safety", "Compliance"],
      },
      locations: ["Egypt", "KSA"],
    },
    {
      name: "Design Manager",
      role: "Design Governance",
      title: "Design Governance",
      imageSrc: "/3.png",
      description: "Oversees design reviews and specifications.",
      stats: {
        projects: 110,
        years: 11,
        scope: ["Specifications", "Reviews", "Documentation"],
      },
      locations: ["Egypt", "UAE"],
    },
    {
      name: "Project Controls",
      role: "Planning & Reporting",
      title: "Planning & Reporting",
      imageSrc: "/4.png",
      description: "Tracks progress and performance metrics.",
      stats: {
        projects: 75,
        years: 9,
        scope: ["Scheduling", "Cost", "Performance"],
      },
      locations: ["Egypt"],
    },
  ];

  const featuredProjectsTitle = "Featured Projects / Case Studies";
  const featuredProjects = projectsData.slice(0, 4);

  const insightsTitle = "Related News & Insights";
  const insightsCta = "Read More";
  const relatedNews = getOtherNews("", 3).map((n) => ({
    href: `/news/${n.slug}`,
    title: n.title,
    imageSrc: n.imageSrc,
    date: n.date,
  }));
  const relatedBlogs = getOtherBlogs("", 3).map((b) => ({
    href: `/blog/${b.slug}`,
    title: b.title,
    imageSrc: b.imageSrc,
    date: b.date,
  }));
  const insightsItems = [...relatedNews, ...relatedBlogs].slice(0, 3);

  return (
    <div className="min-h-screen">
      <PageHero
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumbs={pageHero.breadcrumbs}
        imageSrc={pageHero.imageSrc}
      />

      {/* SectorDescriptionSection */}
      <SectorDescriptionSection description={service.description} sectionProps={{ background: "bg-background"}} />

      {/* SectorOverviewSection */}
      <SectorOverviewSection title={overviewTitle} groups={overviewGroups} sectionProps={{ background: "bg-neutral-light/20"}} />

      {/* SectorMetricsSection */}
      <SectorMetricsSection stats={metricsStats} gridClass={metricsGridClass} />

      {/* SectorFeaturedImageSection */}
      <SectorFeaturedImageSection imageSrc={featuredImageSrc} alt={service.title} caption={featuredImageCaption} sectionProps={{ background: "bg-background"}} />

      {/* SectorApproachSection */}
      <SectorApproachSection title={approachTitle} approach={approach} sectionProps={{ background: "bg-neutral-light/20"}} />

      {/* SectorCapabilitiesSection */}
      <SectorCapabilitiesSection title={capabilitiesTitle} sections={capabilitySections} sectionProps={{ background: "bg-background"}} />

      {/* SectorTeamSection */}
      <SectorTeamSection title={teamTitle} members={teamMembers} sectionProps={{ background: "bg-neutral-light/20"}} />
      {/* SectorFeaturedProjectsSection */}
      <SectorFeaturedProjectsSection title={featuredProjectsTitle} items={featuredProjects} />

      {/* SectorInsightsSection */}
      <SectorInsightsSection title={insightsTitle} items={insightsItems} ctaLabel={insightsCta} sectionProps={{ background: "bg-neutral-light/20" }} />
     
    </div>
  );
}

export function generateStaticParams() {
  return sectorsData.map((s) => ({ slug: s.slug }));
}
