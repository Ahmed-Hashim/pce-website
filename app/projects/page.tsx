"use client";
import { useMemo, useState } from "react";
import PageHero from "../components/ui/PageHero";
import { projectsData } from "../data/projects";
import ProjectsFiltersSection from "../components/projects/ProjectsFiltersSection";
import ProjectsGridSection from "../components/projects/ProjectsGridSection";
import ProjectsPaginationSection from "../components/projects/ProjectsPaginationSection";

const pageHero = {
  title: "Projects",
  subtitle: "Selected Work",
  imageSrc: "/4.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
  ],
};

export default function ProjectsPage() {
  const filterLabels = {
    location: "Location",
    sectorTag: "Sector",
    sector: "Category",
    all: "All",
    reset: "Reset",
  };
  const paginationConfig = { itemsPerPage: 12 };

  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedSectorTag, setSelectedSectorTag] = useState<string>("all");
  const [selectedSector, setSelectedSector] = useState<string>("all");

  const locations = useMemo(
    () => Array.from(new Set(projectsData.map((p) => p.location))).sort(),
    []
  );
  const sectors = useMemo(
    () => Array.from(new Set(projectsData.map((p) => p.category))).sort(),
    []
  );
  const sectorTags = useMemo(() => {
    const tags = new Set<string>();
    projectsData.forEach((p) => (p.sectors || []).forEach((t) => tags.add(t)));
    return Array.from(tags).sort().map((t) => ({ slug: t, title: t }));
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      const locationOk =
        selectedLocation === "all" || p.location === selectedLocation;
      const sectorOk = selectedSector === "all" || p.category === selectedSector;
      const sectorTagOk =
        selectedSectorTag === "all" || (p.sectors || []).includes(selectedSectorTag);
      return locationOk && sectorOk && sectorTagOk;
    });
  }, [selectedLocation, selectedSector, selectedSectorTag]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / paginationConfig.itemsPerPage));
  const page = Math.min(currentPage, totalPages);
  const startIndex = (page - 1) * paginationConfig.itemsPerPage;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + paginationConfig.itemsPerPage
  );

  const prevLabel = "Previous";
  const nextLabel = "Next";
  const padLength = 2;
  const resetFilters = () => {
    setSelectedLocation("all");
    setSelectedSectorTag("all");
    setSelectedSector("all");
    setCurrentPage(1);
  };

  return (
    <>
      <PageHero
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumbs={pageHero.breadcrumbs}
        imageSrc={pageHero.imageSrc}
      />

      {/* ProjectsFiltersSection */}
      <ProjectsFiltersSection
        filterLabels={filterLabels}
        locations={locations}
        sectorTags={sectorTags}
        sectors={sectors}
        selectedLocation={selectedLocation}
        selectedSectorTag={selectedSectorTag}
        selectedSector={selectedSector}
        onChangeLocation={setSelectedLocation}
        onChangeSectorTag={setSelectedSectorTag}
        onChangeSector={setSelectedSector}
        onReset={resetFilters}
      />

      {/* ProjectsGridSection */}
      <ProjectsGridSection items={paginatedProjects} gridClass="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2" sectionProps={{ className: "pt-0" }} />

      {/* ProjectsPaginationSection */}
      <ProjectsPaginationSection
        page={page}
        totalPages={totalPages}
        prevLabel={prevLabel}
        nextLabel={nextLabel}
        padLength={padLength}
        onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
        onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        isPrevDisabled={currentPage <= 1}
        isNextDisabled={page >= totalPages}
      />
    </>
  );
}
