import { Tables, Json } from "@/utils/supabase/supabase";

// Type for the points JSONB field
export interface ProjectPoint {
    title: string;
    description: string;
}

// Base project type from database
export type Project = Tables<"projects">;

// Project with all joined relations for detail page
export interface ProjectWithRelations extends Project {
    service?: Tables<"services"> | null;
    client?: Tables<"clients"> | null;
    country?: Tables<"countries"> | null;
    categories?: Tables<"categories">[];
    sectors?: Tables<"sectors">[];
    gallery?: Tables<"project_gallery">[];
    team?: (Tables<"project_team"> & {
        leader?: Tables<"leadership_team"> | null;
    })[];
}

// Simplified project type for grid display
export interface ProjectListItem {
    id: number;
    slug: string;
    name: string;
    location: string | null;
    country_id: number | null;
    country_name: string | null;
    date: string | null;
    main_image_url: string | null;
    service_name?: string | null;
    categories?: string[];
    sectors?: string[];
}

// Filter options for the projects page
export interface ProjectFilters {
    countries: { id: number; name: string }[];
    categories: { id: number; name: string }[];
    sectors: { id: number; name: string }[];
    services: { id: number; name: string }[];
}

