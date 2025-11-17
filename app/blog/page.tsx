import PageHero from "../components/ui/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import ContentGrid, { ContentItem } from "../components/ui/ContentGrid";
import Section from "../components/ui/Section";

const pageHero = {
  title: "Blog",
  subtitle: "Insights and updates",
  imageSrc: "/4.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ],
};

const featuredPosts: ContentItem[] = [
  { href: "/blog/engineering-excellence-lessons-recent-projects", title: "Engineering Excellence: Lessons from Recent Projects", imageSrc: "/1.png", date: "Nov 2025", tag: "Featured" },
  { href: "/blog/design-systems-building-consistency-at-scale", title: "Design Systems: Building Consistency at Scale", imageSrc: "/2.png", date: "Nov 2025", tag: "Featured" },
  { href: "/blog/sustainable-infrastructure-road-ahead", title: "Sustainable Infrastructure: The Road Ahead", imageSrc: "/3.png", date: "Oct 2025", tag: "Featured" },
];

const latestPosts: ContentItem[] = [
  { href: "/blog/project-delivery-frameworks-that-work", title: "Project Delivery Frameworks That Work", imageSrc: "/2.png", date: "Oct 2025" },
  { href: "/blog/client-centered-design-practical-methods", title: "Client-Centered Design: Practical Methods", imageSrc: "/3.png", date: "Sep 2025" },
  { href: "/blog/digital-twin-adoption-construction", title: "Digital Twin Adoption in Construction", imageSrc: "/1.png", date: "Aug 2025" },
  { href: "/blog/quality-assurance-complex-builds", title: "Quality Assurance in Complex Builds", imageSrc: "/4.png", date: "Aug 2025" },
  { href: "/blog/risk-management-essentials-large-projects", title: "Risk Management Essentials for Large Projects", imageSrc: "/3.png", date: "Jul 2025" },
  { href: "/blog/operational-excellence-systems-culture", title: "Operational Excellence: Systems and Culture", imageSrc: "/2.png", date: "Jul 2025" },
];

const sectionText = {
  featuredTitle: "Featured Articles",
  latestTitle: "Latest Posts",
  ctaLabel: "Read More",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <PageHero title={pageHero.title} subtitle={pageHero.subtitle} breadcrumbs={pageHero.breadcrumbs} imageSrc={pageHero.imageSrc} />

      <Section background="bg-background" className="py-(--space-section-y-md)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title={sectionText.featuredTitle} titleColor="var(--color-primary-dark)" align="left" className="mb-8" fontSize="md:text-3xl lg:text-4xl" />
          <ContentGrid items={featuredPosts} ctaLabel={sectionText.ctaLabel} />
        </div>
      </Section>

      <Section background="bg-background" className="py-(--space-section-y-md)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title={sectionText.latestTitle} titleColor="var(--color-primary-dark)" align="left" className="mb-8" fontSize="md:text-3xl lg:text-4xl" />
          <ContentGrid items={latestPosts} ctaLabel={sectionText.ctaLabel} />
        </div>
      </Section>
    </div>
  );
}
