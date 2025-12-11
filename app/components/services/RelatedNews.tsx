import { createClient } from "@/utils/supabase/supabaseServer";
import ContentGrid from "../ui/ContentGrid";
import SectionTitle from "../ui/SectionTitle";
import Section from "../ui/Section";
import { Tables } from "@/utils/supabase/supabase";
import { Suspense } from "react";

interface RelatedNewsProps {
  serviceName: string;
}

export default function RelatedNews(props: RelatedNewsProps) {
  return (
    <Suspense fallback={<RelatedNewsSkeleton />}>
      <RelatedNewsContent {...props} />
    </Suspense>
  );
}

function RelatedNewsSkeleton() {
  return (
    <Section background="bg-primary-dark/95" className="py-(--space-section-y-md)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-10 w-64 bg-white/10 rounded-sm mb-8 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-4/3 bg-white/5 rounded-sm animate-pulse" />
          ))}
        </div>
      </div>
    </Section>
  );
}

async function RelatedNewsContent({ serviceName }: RelatedNewsProps) {
  "use cache";
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_related_news", {
    service_name: serviceName,
  });

  if (error) {
    console.error("Error fetching related news:", error);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }

  const newsItems = data.map((item: Tables<'news'>) => ({
    href: `/news/${item.slug}`,
    title: item.title,
    imageSrc: item.main_image_url || "/2.png",
    date: item.published_at ? new Date(item.published_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "",
    
  }));

  return (
    <Section background="bg-white/5" className="py-(--space-section-y-md)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Related News & Insights"
          titleColor="text-white"
          
          className="mb-8"
          
        />
        <ContentGrid items={newsItems} ctaLabel="Read More" />
      </div>
    </Section>
  );
}
