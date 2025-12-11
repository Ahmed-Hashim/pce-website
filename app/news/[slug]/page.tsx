"use cache";
import type { Metadata } from "next";
import ContentDetail from "../../components/ui/ContentDetail";
import { ContentItem } from "../../components/ui/ContentGrid";

import SectionTitle from "../../components/ui/SectionTitle";
import { createClient } from "@/utils/supabase/supabaseServer";
import Image from "next/image";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: item } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!item) {
    return {
      title: "News Not Found",
      description: "The requested news article could not be found.",
    };
  }

  const description = item.meta_description?.substring(0, 160) || item.title;
  const tags = Array.isArray(item.tags) ? item.tags.map(String) : [];

  return {
    title: item.title,
    description,
    keywords: ["PCE news", "company news", ...tags],
    openGraph: {
      title: item.title,
      description,
      type: "article",
      images: item.main_image_url ? [item.main_image_url] : undefined,
      publishedTime: item.published_at || undefined,
    },
    alternates: {
      canonical: `/news/${slug}`,
    },
  };
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
    <article className="min-h-screen bg-primary-dark">
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
      {related && related.length > 0 && (
        <section className="bg-neutral-light/20 py-16 md:py-24 border-t border-neutral-light">
          <div className="container mx-auto px-4">
            <SectionTitle
              eyebrow="Stay Updated"
              title="More News"
              align="left"
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {related.map((relatedItem) => (
                <div key={relatedItem.href} className="group grid grid-cols-12 gap-6 items-start">
                  <a href={relatedItem.href} className="col-span-12 md:col-span-5 block overflow-hidden rounded-sm relative aspect-4/3">
                    <Image
                      src={relatedItem.imageSrc || "/images/placeholder.jpg"}
                      alt={relatedItem.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </a>
                  <div className="col-span-12 md:col-span-7">
                    <div className="flex items-center gap-3 mb-2 text-sm text-secondary-dark">
                      <span className="px-2 py-0.5 bg-neutral-light rounded text-xs font-medium uppercase tracking-wider">News</span>
                      <span>{relatedItem.date}</span>
                    </div>
                    <a href={relatedItem.href} className="block">
                      <h3 className="text-lg font-bold text-primary-dark group-hover:text-primary-medium transition-colors mb-2 line-clamp-2">
                        {relatedItem.title}
                      </h3>
                      <p className="text-secondary-dark text-sm line-clamp-2 mb-3">
                        {relatedItem.excerpt}
                      </p>
                      <span className="text-primary-medium text-sm font-semibold underline underline-offset-4 decoration-primary-medium/30 group-hover:decoration-primary-medium">Read Full Story</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": item.title,
            "description": item.meta_description,
            "image": [item.main_image_url],
            "datePublished": item.published_at,
            "dateModified": item.updated_at || item.published_at,
            "author": {
              "@type": "Organization",
              "name": "PCE"
            },
            "publisher": {
              "@type": "Organization",
              "name": "PCE",
              "logo": {
                "@type": "ImageObject",
                "url": "https://pce.com/pce-logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://pce.com/news/${slug}`
            }
          })
        }}
      />
    </article>
  );
}

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: news } = await supabase.from("news").select("slug");

  return (news || [])
    .filter((n) => n.slug) // ensure slug is not null
    .map((n) => ({ slug: n.slug! }));
}
