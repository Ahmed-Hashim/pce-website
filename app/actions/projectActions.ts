"use server";

import { createClient } from "@/utils/supabase/supabaseServer";
import { Tables } from "@/utils/supabase/supabase";
import type {
    ProjectWithRelations,
    ProjectListItem,
    ProjectFilters,
} from "@/app/data/projectTypes";

// =============================================================================
// Type Definitions for Supabase Query Results
// =============================================================================

/** Result type for join queries on categories */
interface CategoryJoin {
    categories: Tables<"categories"> | null;
}

/** Result type for join queries on sectors */
interface SectorJoin {
    sectors: Tables<"sectors"> | null;
}

/** Result type for project_team with leadership join */
interface ProjectTeamWithLeader extends Tables<"project_team"> {
    leadership_team: Tables<"leadership_team"> | null;
}

/** Generic result wrapper for consistent error handling */
export type ActionResult<T> =
    | { data: T; error: null }
    | { data: null; error: string };

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Type guard to filter out null values from arrays
 */
function isNotNull<T>(value: T | null): value is T {
    return value !== null;
}

/**
 * Safely extracts name from a relation object
 */
function extractName(obj: { name: string } | null | undefined): string | null {
    return obj?.name ?? null;
}

// =============================================================================
// Server Actions
// =============================================================================

/**
 * Fetches all projects with basic relations for the list page.
 * Results are cached using Next.js 'use cache' directive.
 * 
 * @returns ActionResult containing array of projects or error message
 */
export async function getProjects(): Promise<ActionResult<ProjectListItem[]>> {
    "use cache";
    const supabase = await createClient();

    // Fetch projects with service name and country
    const { data: projects, error } = await supabase
        .from("projects")
        .select(`
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
        `)
        .order("id", { ascending: false });

    if (error) {
        console.error("Error fetching projects:", error);
        return { data: null, error: `Failed to fetch projects: ${error.message}` };
    }

    // Fetch categories for each project
    const { data: projectCategories, error: categoriesError } = await supabase
        .from("projects_categories")
        .select(`
            project_id,
            categories (id, name)
        `);

    if (categoriesError) {
        console.error("Error fetching project categories:", categoriesError);
    }

    // Fetch sectors for each project
    const { data: projectSectors, error: sectorsError } = await supabase
        .from("projects_sectors")
        .select(`
            project_id,
            sectors (id, name)
        `);

    if (sectorsError) {
        console.error("Error fetching project sectors:", sectorsError);
    }

    // Type-safe mapping of projects with their categories and sectors
    const mappedProjects: ProjectListItem[] = (projects ?? []).map((p) => {
        // Extract category names with proper typing
        const categories = (projectCategories ?? [])
            .filter((pc) => pc.project_id === p.id)
            .map((pc) => extractName(pc.categories as { name: string } | null))
            .filter(isNotNull);

        // Extract sector names with proper typing
        const sectors = (projectSectors ?? [])
            .filter((ps) => ps.project_id === p.id)
            .map((ps) => extractName(ps.sectors as { name: string } | null))
            .filter(isNotNull);

        return {
            id: p.id,
            slug: p.slug ?? String(p.id),
            name: p.name,
            location: p.location,
            country_id: p.country_id,
            country_name: extractName(p.countries as { id: number; name: string } | null),
            date: p.date,
            main_image_url: p.main_image_url,
            service_name: extractName(p.services as { name: string } | null),
            categories,
            sectors,
        };
    });

    return { data: mappedProjects, error: null };
}

/**
 * Fetches a single project by slug with all relations.
 * Falls back to ID lookup if slug is numeric and not found.
 * 
 * @param slug - Project slug or numeric ID
 * @returns ActionResult containing project with relations or error message
 */
export async function getProjectBySlug(
    slug: string
): Promise<ActionResult<ProjectWithRelations>> {
    "use cache";

    if (!slug || slug.trim() === '') {
        return { data: null, error: 'Project slug is required' };
    }

    const supabase = await createClient();

    // Try to find by slug first
    let { data: project, error } = await supabase
        .from("projects")
        .select(`
            *,
            services (*),
            clients (*),
            countries (*)
        `)
        .eq("slug", slug)
        .single();

    // If not found by slug, try by id (if slug is numeric)
    if (error && !isNaN(Number(slug))) {
        const { data: projectById, error: idError } = await supabase
            .from("projects")
            .select(`
                *,
                services (*),
                clients (*),
                countries (*)
            `)
            .eq("id", Number(slug))
            .single();

        if (!idError && projectById) {
            project = projectById;
            error = null;
        }
    }

    if (error || !project) {
        const errorMessage = error?.code === 'PGRST116'
            ? 'Project not found'
            : `Failed to fetch project: ${error?.message ?? 'Unknown error'}`;
        console.error("Error fetching project:", error);
        return { data: null, error: errorMessage };
    }

    // Fetch categories with proper typing
    const { data: categoriesData } = await supabase
        .from("projects_categories")
        .select("categories (*)")
        .eq("project_id", project.id);

    // Fetch sectors with proper typing
    const { data: sectorsData } = await supabase
        .from("projects_sectors")
        .select("sectors (*)")
        .eq("project_id", project.id);

    // Fetch gallery
    const { data: galleryData } = await supabase
        .from("project_gallery")
        .select("*")
        .eq("project_id", project.id);

    // Fetch team with leadership join
    const { data: teamData } = await supabase
        .from("project_team")
        .select(`
            *,
            leadership_team (*)
        `)
        .eq("project_id", project.id);

    // Build the result with proper typing (no 'as any')
    const categories: Tables<"categories">[] = (categoriesData ?? [])
        .map((c) => (c as CategoryJoin).categories)
        .filter(isNotNull);

    const sectors: Tables<"sectors">[] = (sectorsData ?? [])
        .map((s) => (s as SectorJoin).sectors)
        .filter(isNotNull);

    const team = (teamData ?? []).map((t) => {
        const teamMember = t as ProjectTeamWithLeader;
        return {
            ...teamMember,
            leader: teamMember.leadership_team ?? null,
        };
    });

    const result: ProjectWithRelations = {
        ...project,
        service: (project.services as Tables<"services">) ?? null,
        client: (project.clients as Tables<"clients">) ?? null,
        country: (project.countries as Tables<"countries">) ?? null,
        categories,
        sectors,
        gallery: galleryData ?? [],
        team,
    };

    return { data: result, error: null };
}

/**
 * Fetches filter options for the projects page.
 * Only includes countries that have at least one project.
 * 
 * @returns ActionResult containing filter options or error message
 */
export async function getProjectFilters(): Promise<ActionResult<ProjectFilters>> {
    "use cache";
    const supabase = await createClient();

    // Fetch countries that have projects
    const { data: projectsWithCountry, error: projectsError } = await supabase
        .from("projects")
        .select("country_id")
        .not("country_id", "is", null);

    if (projectsError) {
        console.error("Error fetching projects for filters:", projectsError);
        return { data: null, error: `Failed to fetch filter data: ${projectsError.message}` };
    }

    const countryIds = [...new Set(
        (projectsWithCountry ?? [])
            .map((p) => p.country_id)
            .filter(isNotNull)
    )];

    // Fetch country details (only if there are countries with projects)
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

    const result: ProjectFilters = {
        countries: countries ?? [],
        categories: categories ?? [],
        sectors: sectors ?? [],
        services: services ?? [],
    };

    return { data: result, error: null };
}

/**
 * Gets all project slugs for static generation (generateStaticParams).
 * 
 * @returns ActionResult containing array of project slugs or error message
 */
export async function getAllProjectSlugs(): Promise<ActionResult<string[]>> {
    "use cache";
    const supabase = await createClient();

    const { data: projects, error } = await supabase
        .from("projects")
        .select("id, slug");

    if (error) {
        console.error("Error fetching project slugs:", error);
        return { data: null, error: `Failed to fetch project slugs: ${error.message}` };
    }

    const slugs = (projects ?? []).map((p) => p.slug ?? String(p.id));
    return { data: slugs, error: null };
}

// =============================================================================
// Backward Compatibility Wrappers (optional - can remove if updating consumers)
// =============================================================================

/**
 * @deprecated Use getProjects() which returns ActionResult for better error handling
 */
export async function getProjectsLegacy(): Promise<ProjectListItem[]> {
    const result = await getProjects();
    return result.data ?? [];
}

/**
 * @deprecated Use getProjectBySlug() which returns ActionResult for better error handling
 */
export async function getProjectBySlugLegacy(slug: string): Promise<ProjectWithRelations | null> {
    const result = await getProjectBySlug(slug);
    return result.data ?? null;
}

/**
 * @deprecated Use getProjectFilters() which returns ActionResult for better error handling
 */
export async function getProjectFiltersLegacy(): Promise<ProjectFilters> {
    const result = await getProjectFilters();
    return result.data ?? { countries: [], categories: [], sectors: [], services: [] };
}

/**
 * @deprecated Use getAllProjectSlugs() which returns ActionResult for better error handling
 */
export async function getAllProjectSlugsLegacy(): Promise<string[]> {
    const result = await getAllProjectSlugs();
    return result.data ?? [];
}
