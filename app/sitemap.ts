import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { slugify } from "@/lib/slugify";
import staticLastmod from "@/lib/static-lastmod.json";

const BASE_URL = SITE_URL;

// Per-route last-edit dates, generated from git history at build time
// (scripts/gen-static-lastmod.mjs). Falls back to "now" if a route is missing.
const lastmodMap = staticLastmod as Record<string, string>;
const staticDate = (path: string) =>
    lastmodMap[path] ? new Date(lastmodMap[path]) : new Date();

// Parse a DB timestamp into a Date, returning undefined when absent/invalid so
// we can omit <lastmod> rather than emit a misleading one.
const toDate = (value?: string | null): Date | undefined => {
    if (!value) return undefined;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? undefined : d;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages — lastModified comes from the source file's last git commit.
    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: staticDate("/"), changeFrequency: "weekly", priority: 1 },
        { url: `${BASE_URL}/about`, lastModified: staticDate("/about"), changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/services`, lastModified: staticDate("/services"), changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/projects`, lastModified: staticDate("/projects"), changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/blog`, lastModified: staticDate("/blog"), changeFrequency: "daily", priority: 0.8 },
        { url: `${BASE_URL}/news`, lastModified: staticDate("/news"), changeFrequency: "daily", priority: 0.8 },
        { url: `${BASE_URL}/careers`, lastModified: staticDate("/careers"), changeFrequency: "weekly", priority: 0.7 },
        { url: `${BASE_URL}/contact`, lastModified: staticDate("/contact"), changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/policy-privacy`, lastModified: staticDate("/policy-privacy"), changeFrequency: "yearly", priority: 0.3 },
        { url: `${BASE_URL}/terms-and-conditions`, lastModified: staticDate("/terms-and-conditions"), changeFrequency: "yearly", priority: 0.3 },
    ];

    // Dynamic pages - fetch from Supabase at runtime
    let dynamicPages: MetadataRoute.Sitemap = [];

    try {
        // Dynamically import to avoid build-time issues
        const { createClient } = await import("@/utils/supabase/supabaseServer");
        const supabase = await createClient();

        // Fetch all dynamic content. Column lists match the real schema:
        // - projects/services have no slug-of-modification timestamp -> no lastmod
        // - blogs/news expose updated_at; careers exposes created_at
        const [
            { data: projects },
            { data: services },
            { data: blogs },
            { data: news },
            { data: careers },
        ] = await Promise.all([
            supabase.from("projects").select("slug"),
            supabase.from("services").select("name"),
            supabase.from("blogs").select("title, updated_at, created_at").eq("published", true),
            supabase.from("news").select("slug, updated_at, published_at").eq("published", true),
            supabase.from("careers").select("job_title, created_at"),
        ]);

        // Project pages — real slug column; no per-row timestamp available.
        const projectPages: MetadataRoute.Sitemap = (projects || [])
            .filter((p) => p.slug)
            .map((p) => ({
                url: `${BASE_URL}/projects/${p.slug}`,
                changeFrequency: "monthly" as const,
                priority: 0.7,
            }));

        // Service pages — slug derived from name (no slug column); no timestamp.
        const servicePages: MetadataRoute.Sitemap = (services || [])
            .filter((s) => s.name)
            .map((s) => ({
                url: `${BASE_URL}/services/${slugify(s.name)}`,
                changeFrequency: "monthly" as const,
                priority: 0.8,
            }));

        // Blog pages — slug derived from title; lastmod from updated_at/created_at.
        const blogPages: MetadataRoute.Sitemap = (blogs || [])
            .filter((b) => b.title)
            .map((b) => ({
                url: `${BASE_URL}/blog/${slugify(b.title)}`,
                lastModified: toDate(b.updated_at) ?? toDate(b.created_at),
                changeFrequency: "weekly" as const,
                priority: 0.6,
            }));

        // News pages — real slug column; lastmod from updated_at/published_at.
        const newsPages: MetadataRoute.Sitemap = (news || [])
            .filter((n) => n.slug)
            .map((n) => ({
                url: `${BASE_URL}/news/${n.slug}`,
                lastModified: toDate(n.updated_at) ?? toDate(n.published_at),
                changeFrequency: "weekly" as const,
                priority: 0.6,
            }));

        // Career pages — slug derived from job_title (no slug column);
        // lastmod from created_at.
        const careerPages: MetadataRoute.Sitemap = (careers || [])
            .filter((c) => c.job_title)
            .map((c) => ({
                url: `${BASE_URL}/careers/${slugify(c.job_title)}`,
                lastModified: toDate(c.created_at),
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
