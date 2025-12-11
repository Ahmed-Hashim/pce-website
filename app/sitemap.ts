import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pce.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages with their priorities
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/services`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/projects`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/news`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/careers`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/policy-privacy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms-and-conditions`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    // Dynamic pages - fetch from Supabase at runtime
    let dynamicPages: MetadataRoute.Sitemap = [];

    try {
        // Dynamically import to avoid build-time issues
        const { createClient } = await import("@/utils/supabase/supabaseServer");
        const supabase = await createClient();

        // Helper to slugify text
        const slugify = (text: string) =>
            text
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-");

        // Fetch all dynamic content (only columns that exist)
        const [
            { data: projects },
            { data: services },
            { data: blogs },
            { data: news },
            { data: careers },
        ] = await Promise.all([
            supabase.from("projects").select("slug"),
            supabase.from("services").select("name"),
            supabase.from("blogs").select("title").eq("published", true),
            supabase.from("news").select("slug").eq("published", true),
            supabase.from("careers").select("job_title"),
        ]);

        // Project pages
        const projectPages: MetadataRoute.Sitemap = (projects || []).map((p) => ({
            url: `${BASE_URL}/projects/${p.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }));

        // Service pages
        const servicePages: MetadataRoute.Sitemap = (services || []).map((s) => ({
            url: `${BASE_URL}/services/${slugify(s.name)}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        }));

        // Blog pages
        const blogPages: MetadataRoute.Sitemap = (blogs || []).map((b) => ({
            url: `${BASE_URL}/blog/${slugify(b.title)}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.6,
        }));

        // News pages
        const newsPages: MetadataRoute.Sitemap = (news || []).map((n) => ({
            url: `${BASE_URL}/news/${n.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.6,
        }));

        // Career pages
        const careerPages: MetadataRoute.Sitemap = (careers || []).map((c) => ({
            url: `${BASE_URL}/careers/${slugify(c.job_title)}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.5,
        }));

        dynamicPages = [
            ...projectPages,
            ...servicePages,
            ...blogPages,
            ...newsPages,
            ...careerPages,
        ];
    } catch (error) {
        console.error("Error fetching dynamic sitemap data:", error);
        // Continue with static pages only if database fetch fails
    }

    return [...staticPages, ...dynamicPages];
}
