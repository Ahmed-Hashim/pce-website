"use client";
import Section from "../ui/Section";
import { FiChevronDown } from "react-icons/fi";
import type { ComponentProps } from "react";

interface FilterLabels {
  location: string;
  sectorTag: string;
  sector: string;
  all: string;
  reset: string;
}

interface TagItem {
  slug: string;
  title: string;
}

interface ProjectsFiltersSectionProps {
  filterLabels: FilterLabels;
  locations: string[];
  sectorTags: TagItem[];
  sectors: string[];
  selectedLocation: string;
  selectedSectorTag: string;
  selectedSector: string;
  onChangeLocation: (value: string) => void;
  onChangeSectorTag: (value: string) => void;
  onChangeSector: (value: string) => void;
  onReset: () => void;
  sectionProps?: Omit<ComponentProps<typeof Section>, "children">;
}

export default function ProjectsFiltersSection({
  filterLabels,
  locations,
  sectorTags,
  sectors,
  selectedLocation,
  selectedSectorTag,
  selectedSector,
  onChangeLocation,
  onChangeSectorTag,
  onChangeSector,
  onReset,
  sectionProps,
}: ProjectsFiltersSectionProps) {
  return (
    <Section {...sectionProps} className={`${sectionProps?.className || ""} pb-0`}>
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
                  onChange={(e) => onChangeLocation(e.target.value)}
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
                  onChange={(e) => onChangeSectorTag(e.target.value)}
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
                  onChange={(e) => onChangeSector(e.target.value)}
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
                onClick={onReset}
                className="inline-flex items-center justify-center h-11 px-4 rounded-sm border border-secondary-dark/40 bg-white/60 text-primary-dark hover:bg-white/80 transition-colors"
              >
                {filterLabels.reset}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

