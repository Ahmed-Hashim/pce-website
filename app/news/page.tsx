import PageHero from "../components/ui/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import ContentGrid, { ContentItem } from "../components/ui/ContentGrid";
import Section from "../components/ui/Section";
import { createClient } from "@/utils/supabase/supabaseServer";
import { Suspense } from "react";

const pageHero = {
  title: "News",
  subtitle: "Announcements and press",
  imageSrc: "/2.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
  ],
};

const sectionText = {
  topStoriesTitle: "Top Stories",
  allNewsTitle: "All News",
  ctaLabel: "Read More",
};

function NewsSkeleton() {
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

async function TopStories() {
  "use cache";
  const supabase = await createClient();
  const { data: stories, error } = await supabase
    .from("news")
    .select("*")
    .eq("top_story", true)
    .eq("published", true)
    .limit(3);

  if (error) {
    console.error("Supabase Error (Top Stories):", error);
    return (
      <div className="text-center py-12 col-span-full">
        <p className="text-zinc-600 dark:text-zinc-400">
          Unable to load top stories.
        </p>
      </div>
    );
  }

  if (!stories || stories.length === 0) {
    // If no top stories, we might just return null or a message.
    // Returning null hides the section content but keeps the title if parent renders it.
    // For now, let's return a message.
    return (
      <p className="text-center col-span-full text-zinc-500">
        No top stories found.
      </p>
    );
  }

  const items: ContentItem[] = stories.map((story) => ({
    href: `/news/${story.slug}`,
    title: story.title,
    imageSrc: story.main_image_url || "/3.png",
    date: story.published_at
      ? new Date(story.published_at).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "",
    tag: "Top",
    excerpt: story.meta_description || "",
  }));

  return <ContentGrid items={items} ctaLabel={sectionText.ctaLabel} />;
}

async function AllNews() {
  "use cache";
  const supabase = await createClient();
  const { data: news, error } = await supabase
    .from("news")
    .select("*")
    // Exclude top stories to avoid duplication if desired, or remove this line to show all.
    // Usually "All News" below "Top Stories" implies "The Rest" or "Latest". 
    // Following the blog pattern (Latest Posts excluding Featured), I will exclude top stories.
    .neq("top_story", true) 
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Supabase Error (All News):", error);
    return (
      <div className="text-center py-12 col-span-full">
        <p className="text-zinc-600 dark:text-zinc-400">
          Unable to load news.
        </p>
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <p className="text-center col-span-full text-zinc-500">
        No additional news found.
      </p>
    );
  }

  const items: ContentItem[] = news.map((item) => ({
    href: `/news/${item.slug}`,
    title: item.title,
    imageSrc: item.main_image_url || "/2.png",
    date: item.published_at
      ? new Date(item.published_at).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "",
    tag: Array.isArray(item.tags) && item.tags.length > 0 ? String(item.tags[0]) : (typeof item.tags === 'string' ? item.tags : undefined),
    excerpt: item.meta_description || "",
  }));

  return <ContentGrid items={items} ctaLabel={sectionText.ctaLabel} />;
}

export default function NewsPage() {
  return (
    <div className="min-h-screen">
      <PageHero 
        title={pageHero.title} 
        subtitle={pageHero.subtitle} 
        breadcrumbs={pageHero.breadcrumbs} 
        imageSrc={pageHero.imageSrc} 
      />

      <Section background="bg-background" className="py-(--space-section-y-md)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle 
            title={sectionText.topStoriesTitle} 
            titleColor="var(--color-primary-dark)" 
            align="left" 
            className="mb-8" 
            fontSize="md:text-3xl lg:text-4xl" 
          />
          <Suspense fallback={<NewsSkeleton />}>
            <TopStories />
          </Suspense>
        </div>
      </Section>

      <Section background="bg-background" className="py-(--space-section-y-md)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle 
            title={sectionText.allNewsTitle} 
            titleColor="var(--color-primary-dark)" 
            align="left" 
            className="mb-8" 
            fontSize="md:text-3xl lg:text-4xl" 
          />
          <Suspense fallback={<NewsSkeleton />}>
            <AllNews />
          </Suspense>
        </div>
      </Section>
    </div>
  );
}
