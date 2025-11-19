import PageHero from "./PageHero";
import Section from "./Section";

interface Breadcrumb {
  label: string;
  href: string;
}

interface ContentDetailProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  breadcrumbs: Breadcrumb[];
  date?: string;
  tag?: string;
  content: string[];
}

export default function ContentDetail({ title, subtitle, imageSrc, breadcrumbs, date, tag, content }: ContentDetailProps) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} imageSrc={imageSrc} />
      <Section background="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 text-secondary-dark">
            {date ? <div className="text-xs md:text-sm">{date}</div> : null}
            {tag ? <div className="rounded-md bg-primary-dark/90 text-button-text text-xs px-2 py-1">{tag}</div> : null}
          </div>
          <div className="mt-6 space-y-4">
            {content.map((html, i) => (
              <div
                key={i}
                className="text-secondary-dark leading-relaxed"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
