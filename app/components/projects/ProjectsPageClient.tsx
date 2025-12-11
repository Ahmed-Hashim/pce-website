"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProjectsFiltersSection from "./ProjectsFiltersSection";
import ProjectsGridSection from "./ProjectsGridSection";
import ProjectsPaginationSection from "./ProjectsPaginationSection";
import type { ProjectListItem, ProjectFilters } from "@/app/data/projectTypes";

interface ProjectsPageClientProps {
    projects: ProjectListItem[];
    filters: ProjectFilters;
}

const filterLabels = {
    location: "Country",
    sectorTag: "Sector",
    sector: "Category",
    all: "All",
    reset: "Reset",
};

const paginationConfig = { itemsPerPage: 12 };

export default function ProjectsPageClient({
    projects,
    filters,
}: ProjectsPageClientProps) {
    const searchParams = useSearchParams();
    const initialSector = searchParams.get("sector");

    const [selectedLocation, setSelectedLocation] = useState<string>("all");
    const [selectedSectorTag, setSelectedSectorTag] = useState<string>(initialSector || "all");
    const [selectedSector, setSelectedSector] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    
    // Track previous prop for synchronization during render
    const [prevInitialSector, setPrevInitialSector] = useState(initialSector);

    // Sync state with URL params during render (avoids useEffect cascading)
    if (initialSector !== prevInitialSector) {
        setPrevInitialSector(initialSector);
        setSelectedSectorTag(initialSector || "all");
    }

    // Transform filters to expected format
    const locations = useMemo(
        () => filters.countries.map((c) => c.name),
        [filters.countries]
    );
    const sectorTags = useMemo(
        () => filters.sectors.map((s) => ({ slug: s.name, title: s.name })),
        [filters.sectors]
    );
    const sectors = useMemo(
        () => filters.categories.map((c) => c.name),
        [filters.categories]
    );

    // Filter projects
    const filteredProjects = useMemo(() => {
        return projects.filter((p) => {
            const locationOk =
                selectedLocation === "all" || p.country_name === selectedLocation;
            const sectorOk =
                selectedSector === "all" ||
                (p.categories || []).includes(selectedSector);
            const sectorTagOk =
                selectedSectorTag === "all" ||
                (p.sectors || []).includes(selectedSectorTag);
            return locationOk && sectorOk && sectorTagOk;
        });
    }, [projects, selectedLocation, selectedSector, selectedSectorTag]);

    // Pagination
    const totalPages = Math.max(
        1,
        Math.ceil(filteredProjects.length / paginationConfig.itemsPerPage)
    );
    const page = Math.min(currentPage, totalPages);
    const startIndex = (page - 1) * paginationConfig.itemsPerPage;
    const paginatedProjects = filteredProjects.slice(
        startIndex,
        startIndex + paginationConfig.itemsPerPage
    );

    // Transform to grid items format
    const gridItems = paginatedProjects.map((p) => ({
        slug: p.slug,
        title: p.name,
        category: p.country_name || p.location || p.service_name || "Project",
        year: p.date ? new Date(p.date).getFullYear().toString() : "",
        heroImage: p.main_image_url || "/1.png",
    }));

    const resetFilters = () => {
        setSelectedLocation("all");
        setSelectedSectorTag("all");
        setSelectedSector("all");
        setCurrentPage(1);
    };

    return (
        <div className="bg-primary-dark/80">
            <ProjectsFiltersSection
                filterLabels={filterLabels}
                locations={locations}
                sectorTags={sectorTags}
                sectors={sectors}
                selectedLocation={selectedLocation}
                selectedSectorTag={selectedSectorTag}
                selectedSector={selectedSector}
                onChangeLocation={(v) => {
                    setSelectedLocation(v);
                    setCurrentPage(1);
                }}
                onChangeSectorTag={(v) => {
                    setSelectedSectorTag(v);
                    setCurrentPage(1);
                }}
                onChangeSector={(v) => {
                    setSelectedSector(v);
                    setCurrentPage(1);
                }}
                onReset={resetFilters}
            />

            <ProjectsGridSection
                items={gridItems}
                gridClass="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0.5"
                sectionProps={{ className: "mt-0" }}
            />

            <ProjectsPaginationSection
                page={page}
                totalPages={totalPages}
                prevLabel="Previous"
                nextLabel="Next"
                padLength={2}
                onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
                onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                isPrevDisabled={currentPage <= 1}
                isNextDisabled={page >= totalPages}
            />
        </div>
    );
}
