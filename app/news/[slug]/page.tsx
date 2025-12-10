"use cache";
import ContentDetail from "../../components/ui/ContentDetail";
import ContentGrid, { ContentItem } from "../../components/ui/ContentGrid";
import Section from "../../components/ui/Section";
import SectionTitle from "../../components/ui/SectionTitle";
import { createClient } from "@/utils/supabase/supabaseServer";
// import { notFound } from "next/navigation";

function processContent(htmlContent: string) {
  const toc: { id: string; text: string; level: number }[] = [];
  
  // Improved regex to handle:
  // 1. Both h2 and h3
  // 2. Case insensitive (h2, H2, h3, H3)
  // 3. Attributes in the tag (e.g. <h2 class="foo">)
  const processedContent = htmlContent.replace(/<(h[23])(?:[^>]*)>(.*?)<\/\1>/gi, (match, tag, text) => {
    // Strip HTML tags from text for the TOC label if any exist nested
    const cleanText = text.replace(/<[^>]*>/g, "");
    
    // Determine level
    const level = parseInt(tag.charAt(1), 10);
    
    // Generate slug
    const id = cleanText
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special chars
      .replace(/[\s_-]+/g, "-") // Replace spaces with dashes
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
      
    toc.push({ id, text: cleanText, level });
    
    // Return with ID injected
    return `<${tag} id="${id}">${text}</${tag}>`;
  });
  
  return { processedContent, toc };
}

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: item, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !item) {
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "News", href: "/news" },
    ];
    return (
      <ContentDetail 
        title="News Item Not Found" 
        imageSrc="/2.png" 
        breadcrumbs={breadcrumbs} 
        content={["The requested news item could not be found."]} 
      />
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    // { label: item.title, href: `/news/${item.slug}` },
  ];

  // Fetch related news (excluding current one)
  const { data: relatedItems } = await supabase
    .from("news")
    .select("*")
    .neq("slug", slug)
    .order("published_at", { ascending: false })
    .limit(3);

  const related: ContentItem[] = (relatedItems || []).map((n) => ({
    href: `/news/${n.slug}`,
    title: n.title,
    imageSrc: n.main_image_url || "",
    date: n.published_at 
      ? new Date(n.published_at).toLocaleDateString("en-US", { 
          month: "short", 
          year: "numeric" 
        }) 
      : "",
    tag: Array.isArray(n.tags) && n.tags.length > 0 ? String(n.tags[0]) : (typeof n.tags === 'string' ? n.tags : undefined),
    excerpt: n.meta_description || ""
  }));

  const relatedTitle = "Related News";
  const relatedCta = "Read More";

  // Parse tags for the main item
  const mainTag = Array.isArray(item.tags) && item.tags.length > 0 
    ? String(item.tags[0]) 
    : (typeof item.tags === 'string' ? item.tags : undefined);

  // Format date
  const formattedDate = item.published_at 
    ? new Date(item.published_at).toLocaleDateString("en-US", { 
        month: "short", 
        year: "numeric" 
      }) 
    : undefined;

  // Process content to extract TOC and inject IDs
  const { processedContent, toc } = processContent(item.body || "");
  const contentArray = [processedContent];

  return (
    <div className="min-h-screen">
      <ContentDetail 
        title={item.title} 
        subtitle={item.meta_description || undefined} // mapped meta_description to subtitle as per blog logic usually uses short_description
        imageSrc={item.main_image_url || ""} 
        breadcrumbs={breadcrumbs} 
        date={formattedDate} 
        tag={mainTag} 
        content={contentArray} 
        toc={toc}
      />
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

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: newsItems } = await supabase.from("news").select("slug");
  
  return (newsItems || [])
    .filter((n) => n.slug) // ensure slug is not null
    .map((n) => ({ slug: n.slug! }));
}
