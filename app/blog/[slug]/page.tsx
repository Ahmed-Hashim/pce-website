"use cache";
import type { Metadata } from "next";
import ContentDetail from "../../components/ui/ContentDetail";
import ContentGrid, { ContentItem } from "../../components/ui/ContentGrid";
import Section from "../../components/ui/Section";
import SectionTitle from "../../components/ui/SectionTitle";
import { createClient } from "@/utils/supabase/supabaseServer";

// Helper to slugify title (same as in blog page)
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

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

async function getBlogBySlugFromSupabase(slug: string) {
  const supabase = await createClient();
  // Fetch all published blogs to find the matching slug
  // Ideally, we should have a slug column in the DB
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true);

  if (error || !blogs) return null;

  return blogs.find((blog) => slugify(blog.title) === slug);
}

async function getRelatedBlogs(currentId: number, limit: number = 3) {
  const supabase = await createClient();
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .neq("id", currentId)
    .limit(limit);

  if (!blogs) return [];
  return blogs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlugFromSupabase(slug);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested blog article could not be found.",
    };
  }

  const description = post.short_description?.substring(0, 160) || post.title;
  const tags = Array.isArray(post.tags) ? post.tags.map(String) : [];

  return {
    title: post.title,
    description,
    keywords: ["PCE blog", "engineering insights", ...tags],
    openGraph: {
      title: post.title,
      description,
      type: "article",
      images: post.main_image_url ? [post.main_image_url] : undefined,
      publishedTime: post.created_at || undefined,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlugFromSupabase(slug);

  if (!post) {
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
    ];
    return (
      <ContentDetail
        title="Article Not Found"
        imageSrc="/4.png"
        breadcrumbs={breadcrumbs}
        content={["The requested article could not be found."]}
      />
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    // { label: post.title, href: `/blog/${slug}` },
  ];

  const relatedPosts = await getRelatedBlogs(post.id, 3);
  const related: ContentItem[] = relatedPosts.map((p) => ({
    href: `/blog/${slugify(p.title)}`,
    title: p.title,
    imageSrc: p.main_image_url || "/4.png",

    date: p.created_at
      ?
      new Date(p.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
      : "",
    tag: p.tags && Array.isArray(p.tags) ? (p.tags[0] as string) : undefined,
    excerpt: p.short_description || "",
  }));

  const relatedTitle = "Related Articles";
  const relatedCta = "Read More";

  // Process content to extract TOC and inject IDs
  const { processedContent, toc } = processContent(post.body || "");
  const contentArray = [processedContent];

  return (
    <article className="min-h-screen bg-primary-dark">
      <ContentDetail
        title={post.title}
        subtitle={post.short_description || undefined}
        imageSrc={post.main_image_url || "/4.png"}
        breadcrumbs={breadcrumbs}
        theme="dark"

        date={
          post.created_at
            ?
            new Date(post.created_at).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })
            : undefined
        }
        tag={
          post.tags && Array.isArray(post.tags)
            ? (post.tags[0] as string)
            : undefined
        }
        content={contentArray}
        toc={toc}
      />
      {related.length > 0 ? (
        <Section
          background="bg-white/5"
          className="py-(--space-section-y-md)"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              title={relatedTitle}
              titleColor="text-white"
              align="left"
              className="mb-8"
              fontSize="md:text-3xl lg:text-4xl"
            />
            <ContentGrid items={related} ctaLabel={relatedCta} />
          </div>
        </Section>
      ) : null}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.short_description,
            "image": post.main_image_url,
            "datePublished": post.created_at,
            "dateModified": post.updated_at || post.created_at,
            "author": {
              "@type": "Person",
              "name":  "PCE Team"
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
              "@id": `https://pce.com/blog/${slug}`
            },
            "keywords": Array.isArray(post.tags) ? post.tags.join(", ") : ""
          })
        }}
      />
    </article>
  );
}

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: blogs } = await supabase
    .from("blogs")
    .select("title")
    .eq("published", true);

  if (!blogs || blogs.length === 0) {
    return [{ slug: "no-posts-found" }];
  }

  return blogs.map((blog) => ({
    slug: slugify(blog.title),
  }));
}
