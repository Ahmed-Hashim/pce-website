"use server";

import { createClient } from "@/utils/supabase/supabaseServer";
import type {
    ProjectWithRelations,
    ProjectListItem,
    ProjectFilters,
} from "@/app/data/projectTypes";

/**
 * Fetch all projects with basic relations for the list page
 */
export async function getProjects(): Promise<ProjectListItem[]> {
    "use cache";
    const supabase = await createClient();

    // Fetch projects with service name and country
    const { data: projects, error } = await supabase
        .from("projects")
        .select(
            `
      id,
      slug,
      name,
      location,
      country_id,
      date,
      main_image_url,
      service_id,
      services (name),
      countries (id, name)
    `
        )
        .order("id", { ascending: false });

    if (error) {
        console.error("Error fetching projects:", error);
        return [];
    }

    // Fetch categories for each project
    const { data: projectCategories } = await supabase
        .from("projects_categories")
        .select(
            `
      project_id,
      categories (id, name)
    `
        );

    // Fetch sectors for each project
    const { data: projectSectors } = await supabase
        .from("projects_sectors")
        .select(
            `
      project_id,
      sectors (id, name)
    `
        );

    // Map projects with their categories and sectors
    return (projects || []).map((p) => {
        const categories = (projectCategories || [])
            .filter((pc) => pc.project_id === p.id)
            .map((pc) => (pc.categories as { name: string } | null)?.name)
            .filter((name): name is string => !!name);

        const sectors = (projectSectors || [])
            .filter((ps) => ps.project_id === p.id)
            .map((ps) => (ps.sectors as { name: string } | null)?.name)
            .filter((name): name is string => !!name);

        return {
            id: p.id,
            slug: p.slug || String(p.id),
            name: p.name,
            location: p.location,
            country_id: p.country_id,
            country_name: (p.countries as { id: number; name: string } | null)?.name || null,
            date: p.date,
            main_image_url: p.main_image_url,
            service_name: (p.services as { name: string } | null)?.name || null,
            categories,
            sectors,
        };
    });
}

/**
 * Fetch a single project by slug with all relations
 */
export async function getProjectBySlug(
    slug: string
): Promise<ProjectWithRelations | null> {
    "use cache";
    const supabase = await createClient();

    // Try to find by slug first, then by id if slug is numeric
    let query = supabase
        .from("projects")
        .select(
            `
      *,
      services (*),
      clients (*),
      countries (*)
    `
        )
        .eq("slug", slug)
        .single();

    let { data: project, error } = await query;

    // If not found by slug, try by id
    if (error && !isNaN(Number(slug))) {
        const { data: projectById, error: idError } = await supabase
            .from("projects")
            .select(
                `
        *,
        services (*),
        clients (*),
        countries (*)
      `
            )
            .eq("id", Number(slug))
            .single();

        if (!idError) {
            project = projectById;
            error = null;
        }
    }

    if (error || !project) {
        console.error("Error fetching project:", error);
        return null;
    }

    // Fetch categories
    const { data: categoriesData } = await supabase
        .from("projects_categories")
        .select("categories (*)")
        .eq("project_id", project.id);

    // Fetch sectors
    const { data: sectorsData } = await supabase
        .from("projects_sectors")
        .select("sectors (*)")
        .eq("project_id", project.id);

    // Fetch gallery
    const { data: galleryData } = await supabase
        .from("project_gallery")
        .select("*")
        .eq("project_id", project.id);

    // Fetch team
    const { data: teamData } = await supabase
        .from("project_team")
        .select(
            `
      *,
      leadership_team (*)
    `
        )
        .eq("project_id", project.id);

    return {
        ...project,
        service: project.services || null,
        client: project.clients || null,
        country: project.countries || null,
        categories: (categoriesData || [])
            .map((c) => c.categories)
            .filter((c): c is NonNullable<typeof c> => c !== null) as any[],
        sectors: (sectorsData || [])
            .map((s) => s.sectors)
            .filter((s): s is NonNullable<typeof s> => s !== null) as any[],
        gallery: galleryData || [],
        team: (teamData || []).map((t) => ({
            ...t,
            leader: t.leadership_team || null,
        })) as any[],
    };
}

/**
 * Fetch filter options for projects page
 */
export async function getProjectFilters(): Promise<ProjectFilters> {
    "use cache";
    const supabase = await createClient();

    // Fetch countries that have projects
    const { data: projectsWithCountry } = await supabase
        .from("projects")
        .select("country_id")
        .not("country_id", "is", null);

    const countryIds = [...new Set(
        (projectsWithCountry || [])
            .map((p) => p.country_id)
            .filter((id): id is number => id !== null)
    )];

    // Fetch country details
    const { data: countries } = countryIds.length > 0
        ? await supabase
            .from("countries")
            .select("id, name")
            .in("id", countryIds)
            .order("name")
        : { data: [] };

    // Fetch all categories
    const { data: categories } = await supabase
        .from("categories")
        .select("id, name")
        .order("name");

    // Fetch all sectors
    const { data: sectors } = await supabase
        .from("sectors")
        .select("id, name")
        .order("name");

    // Fetch all services
    const { data: services } = await supabase
        .from("services")
        .select("id, name")
        .order("name");

    return {
        countries: countries || [],
        categories: categories || [],
        sectors: sectors || [],
        services: services || [],
    };
}

/**
 * Get all project slugs for static generation
 */
export async function getAllProjectSlugs(): Promise<string[]> {
    "use cache";
    const supabase = await createClient();

    const { data: projects } = await supabase
        .from("projects")
        .select("id, slug");

    return (projects || []).map((p) => p.slug || String(p.id));
}
