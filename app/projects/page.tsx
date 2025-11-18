"use client";
import { useMemo, useState } from "react";
import PageHero from "../components/ui/PageHero";
import ProjectsGrid from "../components/ui/ProjectsGrid";
import { projectsData } from "../data/projects";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

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

  const pad = (n: number) => n.toString().padStart(2, "0");
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

      <section className="pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-sm border border-secondary-dark/30 bg-primary-dark/5 p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-end">
              <div>
                <label className="block text-xs tracking-wide text-secondary-dark mb-2">
                  {filterLabels.location}
                </label>
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full h-11 rounded-sm border border-secondary-dark/40 bg-white/70 backdrop-blur appearance-none px-3 pr-10 text-secondary-dark focus:border-primary-medium focus:outline-none"
                  >
                    <option value="all">{filterLabels.all}</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary-dark/70" />
                </div>
              </div>
              <div>
              <label className="block text-xs tracking-wide text-secondary-dark mb-2">
                {filterLabels.sectorTag}
              </label>
              <div className="relative">
                <select
                    value={selectedSectorTag}
                    onChange={(e) => setSelectedSectorTag(e.target.value)}
                    className="w-full h-11 rounded-sm border border-secondary-dark/40 bg-white/70 backdrop-blur appearance-none px-3 pr-10 text-secondary-dark focus:border-primary-medium focus:outline-none"
                  >
                    <option value="all">{filterLabels.all}</option>
                    {sectorTags.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary-dark/70" />
              </div>
              </div>
              <div>
                <label className="block text-xs tracking-wide text-secondary-dark mb-2">
                  {filterLabels.sector}
                </label>
                <div className="relative">
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full h-11 rounded-sm border border-secondary-dark/40 bg-white/70 backdrop-blur appearance-none px-3 pr-10 text-secondary-dark focus:border-primary-medium focus:outline-none"
                  >
                    <option value="all">{filterLabels.all}</option>
                    {sectors.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary-dark/70" />
                </div>
              </div>
              <div className="flex md:justify-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center justify-center h-11 px-4 rounded-sm border border-secondary-dark/40 bg-white/60 text-primary-dark hover:bg-white/80 transition-colors"
                >
                  {filterLabels.reset}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectsGrid items={paginatedProjects} className="px-4 md:px-0 pt-0" />

      <section className="flex items-center justify-center gap-6 pt-0">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          aria-label="Previous"
          className="inline-flex items-center justify-center w-10 h-10 rounded-sm border border-border bg-primary-dark text-button-text hover:bg-primary-medium transition-colors"
          disabled={currentPage <= 1}
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm tracking-widest text-secondary-dark">
          {pad(page)} / {pad(totalPages)}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          aria-label="Next"
          className="inline-flex items-center justify-center w-10 h-10 rounded-sm border border-border bg-primary-dark text-button-text hover:bg-primary-medium transition-colors"
          disabled={page >= totalPages}
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </section>
    </>
  );
}
