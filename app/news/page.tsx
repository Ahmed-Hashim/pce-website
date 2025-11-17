import PageHero from "../components/ui/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import ContentGrid, { ContentItem } from "../components/ui/ContentGrid";
import Section from "../components/ui/Section";

const pageHero = {
  title: "News",
  subtitle: "Announcements and press",
  imageSrc: "/2.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
  ],
};

const topStories: ContentItem[] = [
  { href: "/news/new-regional-office-launch", title: "New Regional Office Launch", imageSrc: "/3.png", date: "Nov 2025", tag: "Top" },
  { href: "/news/partnership-announcement", title: "Partnership Announcement", imageSrc: "/1.png", date: "Nov 2025", tag: "Top" },
  { href: "/news/award-excellence-engineering", title: "Award for Excellence in Engineering", imageSrc: "/4.png", date: "Oct 2025", tag: "Top" },
];

const allNews: ContentItem[] = [
  { href: "/news/press-release-contract-win", title: "Press Release: Contract Win", imageSrc: "/2.png", date: "Oct 2025" },
  { href: "/news/csr-initiative-update", title: "CSR Initiative Update", imageSrc: "/4.png", date: "Sep 2025" },
  { href: "/news/leadership-appointment", title: "Leadership Appointment", imageSrc: "/3.png", date: "Aug 2025" },
  { href: "/news/project-milestone-achieved", title: "Project Milestone Achieved", imageSrc: "/1.png", date: "Aug 2025" },
  { href: "/news/industry-event-participation", title: "Industry Event Participation", imageSrc: "/3.png", date: "Jul 2025" },
  { href: "/news/technology-adoption-announcement", title: "Technology Adoption Announcement", imageSrc: "/2.png", date: "Jul 2025" },
];

const sectionText = {
  topStoriesTitle: "Top Stories",
  allNewsTitle: "All News",
  ctaLabel: "Read More",
};

export default function NewsPage() {
  return (
    <div className="min-h-screen">
      <PageHero title={pageHero.title} subtitle={pageHero.subtitle} breadcrumbs={pageHero.breadcrumbs} imageSrc={pageHero.imageSrc} />

      <Section background="bg-background" className="py-(--space-section-y-md)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title={sectionText.topStoriesTitle} titleColor="var(--color-primary-dark)" align="left" className="mb-8" fontSize="md:text-3xl lg:text-4xl" />
          <ContentGrid items={topStories} ctaLabel={sectionText.ctaLabel} />
        </div>
      </Section>

      <Section background="bg-background" className="py-(--space-section-y-md)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title={sectionText.allNewsTitle} titleColor="var(--color-primary-dark)" align="left" className="mb-8" fontSize="md:text-3xl lg:text-4xl" />
          <ContentGrid items={allNews} ctaLabel={sectionText.ctaLabel} />
        </div>
      </Section>
    </div>
  );
}
