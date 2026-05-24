import type { Metadata } from "next";
import PageHero from "../components/ui/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import ContentGrid, { ContentItem } from "../components/ui/ContentGrid";
import Section from "../components/ui/Section";
import { createClient } from "@/utils/supabase/supabaseServer";
import { slugify } from "@/lib/slugify";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read PCE's latest insights on engineering trends, construction technology, project management best practices, and industry thought leadership.",
  keywords: ["engineering blog", "construction insights", "industry news", "thought leadership", "engineering trends", "project management articles"],
  openGraph: {
    title: "Blog | PCE",
    description: "Read PCE's latest insights on engineering trends and construction technology.",
    type: "website",
  },
  alternates: {
    canonical: "/blog",
  },
};

const pageHero = {
  title: "Blog",
  subtitle: "Insights and updates",
  imageSrc: "/4.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ],
};

const sectionText = {
  featuredTitle: "Featured Articles",
  latestTitle: "Latest Posts",
  ctaLabel: "Read More",
};

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-96 w-full bg-gray-200 dark:bg-zinc-800 rounded-sm animate-pulse"
        />
      ))}
    </div>
  );
}

async function FeaturedPosts() {
  "use cache";
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("featured", true)
    .eq("published", true)
    .limit(3);

  if (error) {
    console.error("Supabase Error (Featured):", error);
    return (
      <div className="text-center py-12 col-span-full">
        <p className="text-zinc-600 dark:text-zinc-400">
          Unable to load featured posts.
        </p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <p className="text-center col-span-full text-zinc-500">
        No featured posts found.
      </p>
    );
  }

  const items: ContentItem[] = posts.map((post) => ({
    href: `/blog/${slugify(post.title)}`,
    title: post.title,
    imageSrc: post.main_image_url || "/4.png",

    date: post.created_at
      ?
      new Date(post.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
      : "",
    tag: "Featured",
    excerpt: post.short_description || "",
  }));

  return <ContentGrid items={items} ctaLabel={sectionText.ctaLabel} />;
}

async function LatestPosts() {
  "use cache";
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("blogs")
    .select("*")
    .neq("featured", true) // Exclude featured to avoid duplication
    .eq("published", true)
    .order("id", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Supabase Error (Latest):", error);
    return (
      <div className="text-center py-12 col-span-full">
        <p className="text-zinc-600 dark:text-zinc-400">
          Unable to load latest posts.
        </p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <p className="text-center col-span-full text-zinc-500">
        No latest posts found.
      </p>
    );
  }

  const items: ContentItem[] = posts.map((post) => ({
    href: `/blog/${slugify(post.title)}`,
    title: post.title,
    imageSrc: post.main_image_url || "/4.png",

    date: post.created_at
      ?
      new Date(post.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
      : "",
    excerpt: post.short_description || "",
  }));

  return <ContentGrid items={items} ctaLabel={sectionText.ctaLabel} />;
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-primary-dark">
      <PageHero
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumbs={pageHero.breadcrumbs}
        // imageSrc={pageHero.imageSrc}
      />

      <Section background="bg-primary-dark" className="py-(--space-section-y-md)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title={sectionText.featuredTitle}
            titleColor="text-white"
            align="left"
            className="mb-8"
            fontSize="md:text-3xl lg:text-4xl"
          />
          <Suspense fallback={<BlogSkeleton />}>
            <FeaturedPosts />
          </Suspense>
        </div>
      </Section>

      <Section background="bg-white/5" className="py-(--space-section-y-md)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title={sectionText.latestTitle}
            titleColor="text-white"
            align="left"
            className="mb-8"
            fontSize="md:text-3xl lg:text-4xl"
          />
          <Suspense fallback={<BlogSkeleton />}>
            <LatestPosts />
          </Suspense>
        </div>
      </Section>
    </div>
  );
}
