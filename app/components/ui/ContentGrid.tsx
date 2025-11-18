import ContentCard from "./ContentCard";

export interface ContentItem {
  href: string;
  title: string;
  imageSrc: string;
  date?: string;
  tag?: string;
  excerpt?: string;
}

interface ContentGridProps {
  items: ContentItem[];
  gridClass?: string;
  className?: string;
  ctaLabel?: string;
}

export default function ContentGrid({ items, gridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8", className = "", ctaLabel }: ContentGridProps) {
  return (
    <div className={className}>
      <div className={gridClass}>
        {items.map((item, i) => (
          <ContentCard
            key={i}
            href={item.href}
            title={item.title}
            imageSrc={item.imageSrc}
            date={item.date}
            tag={item.tag}
            excerpt={item.excerpt}
            ctaLabel={ctaLabel}
          />
        ))}
      </div>
    </div>
  );
}
