import PageHero from "../../components/ui/PageHero";
import ProjectsGrid from "../../components/ui/ProjectsGrid";
import Section from "../../components/ui/Section";
import SectionTitle from "../../components/ui/SectionTitle";
import ContentGrid from "../../components/ui/ContentGrid";
import Image from "next/image";
import { getSectorBySlug, sectorsData } from "../../data/sectors";
import { projectsData } from "../../data/projects";
import { getOtherNews } from "../../data/news";
import { getOtherBlogs } from "../../data/blog";

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
    {
      title: "Support Sectors",
      items: ["Documentation", "Training", "Stakeholder communications"],
    },
  ];

  const teamTitle = "Team Members / Experts";
  const teamMembers = [
    {
      name: "Lead Engineer",
      role: "Discipline Lead",
      imageSrc: "/1.png",
      description: "Leads multi-disciplinary coordination and delivery.",
    },
    {
      name: "Site Supervisor",
      role: "Field Operations",
      imageSrc: "/2.png",
      description: "Ensures quality, safety, and compliance on site.",
    },
    {
      name: "Design Manager",
      role: "Design Governance",
      imageSrc: "/3.png",
      description: "Oversees design reviews and specifications.",
    },
    {
      name: "Project Controls",
      role: "Planning & Reporting",
      imageSrc: "/4.png",
      description: "Tracks progress and performance metrics.",
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

      <section className="py-(--space-section-y-md) bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          {service.description ? (
            <p className="text-secondary-dark leading-relaxed">
              {service.description}
            </p>
          ) : null}
        </div>
      </section>

      <Section background="bg-background" className="py-(--space-section-y-md)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title={overviewTitle}
            titleColor="var(--color-primary-dark)"
            align="left"
            className="mb-8"
            fontSize="md:text-3xl lg:text-4xl"
            underline={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {overviewGroups.map((group, i) => (
              <div key={`ov-${i}`}>
                <h3 className="text-base md:text-lg font-semibold text-primary-dark">
                  {group.title}
                </h3>
                <ul className="mt-3 space-y-2 text-secondary-dark">
                  {group.items.map((it, idx) => (
                    <li key={`ov-${i}-${idx}`} className="flex items-start">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-medium mr-3"></span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {metricsStats && metricsStats.length > 0 ? (
        <section className="bg-primary-dark py-(--space-section-y-md)">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className={`grid ${metricsGridClass} gap-8`}>
              {metricsStats.map((stat, index) => (
                <div key={`metric-${index}`} className="text-center">
                  <div className="text-white font-extrabold tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-white/70 uppercase text-xs md:text-sm tracking-wide mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Section background="bg-background" className="py-(--space-section-y-md)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-sm overflow-hidden border border-secondary-dark">
            <div className="relative h-64 md:h-80 lg:h-96">
              <Image
                src={featuredImageSrc}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          {featuredImageCaption ? (
            <p className="mt-4 text-secondary-dark text-sm md:text-base">
              {featuredImageCaption}
            </p>
          ) : null}
        </div>
      </Section>

      <Section background="bg-background" className="py-(--space-section-y-md)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title={approachTitle}
            titleColor="var(--color-primary-dark)"
            align="left"
            className="mb-8"
            fontSize="md:text-3xl lg:text-4xl"
            underline={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <h4 className="text-primary-dark font-semibold">Methodology</h4>
              <ul className="mt-3 space-y-2 text-secondary-dark">
                {approach.methodology.map((it, i) => (
                  <li key={`m-${i}`} className="flex items-start">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-medium mr-3"></span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-primary-dark font-semibold">Process</h4>
              <ul className="mt-3 space-y-2 text-secondary-dark">
                {approach.process.map((it, i) => (
                  <li key={`p-${i}`} className="flex items-start">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-medium mr-3"></span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-primary-dark font-semibold">Philosophy</h4>
              <ul className="mt-3 space-y-2 text-secondary-dark">
                {approach.philosophy.map((it, i) => (
                  <li key={`ph-${i}`} className="flex items-start">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-medium mr-3"></span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-primary-dark font-semibold">Steps</h4>
              <ul className="mt-3 space-y-2 text-secondary-dark">
                {approach.steps.map((it, i) => (
                  <li key={`s-${i}`} className="flex items-start">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-medium mr-3"></span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {service.sections && service.sections.length > 0 ? (
        <Section
          background="bg-background"
          className="py-(--space-section-y-md)"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {service.sections.map((sec, i) => (
                <div key={`sec-${i}`}>
                  <h3 className="text-base md:text-lg font-semibold text-primary-dark">
                    {sec.title}
                  </h3>
                  {sec.content ? (
                    <p className="mt-3 text-secondary-dark">{sec.content}</p>
                  ) : null}
                  {sec.items && sec.items.length > 0 ? (
                    <ul className="mt-3 space-y-2 text-secondary-dark">
                      {sec.items.map((it, idx) => (
                        <li
                          key={`sec-${i}-it-${idx}`}
                          className="flex items-start"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-medium mr-3"></span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <Section background="bg-background" className="py-(--space-section-y-md)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title={capabilitiesTitle}
            titleColor="var(--color-primary-dark)"
            align="left"
            className="mb-8"
            fontSize="md:text-3xl lg:text-4xl"
            underline={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {capabilitySections.map((sec, i) => (
              <div key={`cap-${i}`}>
                <h4 className="text-primary-dark font-semibold">{sec.title}</h4>
                <ul className="mt-3 space-y-2 text-secondary-dark">
                  {sec.items.map((it, idx) => (
                    <li key={`cap-${i}-${idx}`} className="flex items-start">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-medium mr-3"></span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section background="bg-background" className="py-(--space-section-y-md)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title={teamTitle}
            titleColor="var(--color-primary-dark)"
            align="left"
            className="mb-8"
            fontSize="md:text-3xl lg:text-4xl"
            underline={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((m, i) => (
              <div key={`tm-${i}`} className="text-center">
                <div className="relative mx-auto w-28 h-28 md:w-32 md:h-32 rounded-sm overflow-hidden">
                  <Image
                    src={m.imageSrc}
                    alt={m.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4">
                  <div className="text-base font-semibold text-primary-dark">
                    {m.name}
                  </div>
                  <div className="text-xs text-secondary-dark">{m.role}</div>
                </div>
                {m.description ? (
                  <p className="mt-3 text-secondary-dark text-sm leading-relaxed">
                    {m.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section background="bg-background" className="py-(--space-section-y-md)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title={featuredProjectsTitle}
            titleColor="var(--color-primary-dark)"
            align="left"
            className="mb-8"
            fontSize="md:text-3xl lg:text-4xl"
            underline={false}
          />
          <ProjectsGrid items={featuredProjects} className="" />
        </div>
      </Section>

      {insightsItems.length > 0 ? (
        <Section
          background="bg-background"
          className="py-(--space-section-y-md)"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              title={insightsTitle}
              titleColor="var(--color-primary-dark)"
              align="left"
              className="mb-8"
              fontSize="md:text-3xl lg:text-4xl"
            />
            <ContentGrid items={insightsItems} ctaLabel={insightsCta} />
          </div>
        </Section>
      ) : null}

      {service.cta && (service.cta.primaryText || service.cta.secondaryText) ? (
        <section className="py-(--space-section-y-md) bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {service.cta.primaryText && (
                <a
                  href={service.cta.primaryHref || "/contact"}
                  className="inline-flex items-center justify-center h-12 px-6 rounded-sm bg-primary-dark text-button-text hover:bg-primary-medium transition-colors"
                >
                  {service.cta.primaryText}
                </a>
              )}
              {service.cta.secondaryText && (
                <a
                  href={service.cta.secondaryHref || "/sectors"}
                  className="inline-flex items-center justify-center h-12 px-6 rounded-sm border border-secondary-dark text-primary-dark hover:text-primary-medium transition-colors"
                >
                  {service.cta.secondaryText}
                </a>
              )}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export function generateStaticParams() {
  return sectorsData.map((s) => ({ slug: s.slug }));
}
