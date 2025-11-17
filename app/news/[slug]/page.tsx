import ContentDetail from "../../components/ui/ContentDetail";
import ContentGrid from "../../components/ui/ContentGrid";
import Section from "../../components/ui/Section";
import SectionTitle from "../../components/ui/SectionTitle";
import { getNewsBySlug, getOtherNews } from "../../data/news";

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) {
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "News", href: "/news" },
    ];
    return (
      <ContentDetail title="News Item Not Found" imageSrc="/2.png" breadcrumbs={breadcrumbs} content={["The requested news item could not be found."]} />
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    { label: item.title, href: `/news/${item.slug}` },
  ];

  const related = getOtherNews(item.slug, 3).map((n) => ({ href: `/news/${n.slug}`, title: n.title, imageSrc: n.imageSrc, date: n.date, tag: n.tag, excerpt: n.excerpt }));

  const relatedTitle = "Related News";
  const relatedCta = "Read More";

  return (
    <div className="min-h-screen">
      <ContentDetail title={item.title} subtitle={item.subtitle} imageSrc={item.imageSrc} breadcrumbs={breadcrumbs} date={item.date} tag={item.tag} content={item.content} />
      {related.length > 0 ? (
        <Section background="bg-background" className="py-(--space-section-y-md)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle title={relatedTitle} titleColor="var(--color-primary-dark)" align="left" className="mb-8" fontSize="md:text-3xl lg:text-4xl" />
            <ContentGrid items={related} ctaLabel={relatedCta} />
          </div>
        </Section>
      ) : null}
    </div>
  );
}

