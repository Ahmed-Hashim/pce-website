import ContentDetail from "../../components/ui/ContentDetail";
import ContentGrid from "../../components/ui/ContentGrid";
import Section from "../../components/ui/Section";
import SectionTitle from "../../components/ui/SectionTitle";
import { getBlogBySlug, getOtherBlogs } from "../../data/blog";

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) {
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
    ];
    return (
      <ContentDetail title="Article Not Found" imageSrc="/4.png" breadcrumbs={breadcrumbs} content={["The requested article could not be found."]} />
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  const related = getOtherBlogs(post.slug, 3).map((p) => ({ href: `/blog/${p.slug}`, title: p.title, imageSrc: p.imageSrc, date: p.date, tag: p.tag, excerpt: p.excerpt }));

  const relatedTitle = "Related Articles";
  const relatedCta = "Read More";

  return (
    <div className="min-h-screen">
      <ContentDetail title={post.title} subtitle={post.subtitle} imageSrc={post.imageSrc} breadcrumbs={breadcrumbs} date={post.date} tag={post.tag} content={post.content} />
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

