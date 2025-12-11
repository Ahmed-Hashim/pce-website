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
    <Section {...sectionProps} className={`${sectionProps?.className || ""} pb-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-primary-dark p-6 md:p-8 shadow-lg rounded-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-white">
                {filterLabels.location}
              </label>
              <div className="relative group">
                <select
                  value={selectedLocation}
                  onChange={(e) => onChangeLocation(e.target.value)}
                  className="w-full h-12 bg-neutral-50 border-b-2 border-neutral-200 hover:border-primary-dark focus:border-primary-dark transition-colors appearance-none px-4 pr-10 text-primary-dark font-medium focus:outline-none rounded-t-sm"
                >
                  <option value="all">{filterLabels.all}</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 group-hover:text-primary-dark transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-white">
                {filterLabels.sectorTag}
              </label>
              <div className="relative group">
                <select
                  value={selectedSectorTag}
                  onChange={(e) => onChangeSectorTag(e.target.value)}
                  className="w-full h-12 bg-neutral-50 border-b-2 border-neutral-200 hover:border-primary-dark focus:border-primary-dark transition-colors appearance-none px-4 pr-10 text-primary-dark font-medium focus:outline-none rounded-t-sm"
                >
                  <option value="all">{filterLabels.all}</option>
                  {sectorTags.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 group-hover:text-primary-dark transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-white">
                {filterLabels.sector}
              </label>
              <div className="relative group">
                <select
                  value={selectedSector}
                  onChange={(e) => onChangeSector(e.target.value)}
                  className="w-full h-12 bg-neutral-50 border-b-2 border-neutral-200 hover:border-primary-dark focus:border-primary-dark transition-colors appearance-none px-4 pr-10 text-primary-dark font-medium focus:outline-none rounded-t-sm"
                >
                  <option value="all">{filterLabels.all}</option>
                  {sectors.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 group-hover:text-primary-dark transition-colors" />
              </div>
            </div>

            <div className="flex md:justify-end pb-1">
              <button
                type="button"
                onClick={onReset}
                className="group relative inline-flex items-center justify-center h-12 px-8 text-sm font-medium uppercase tracking-wider border-white  text-white border  hover:bg-primary-medium transition-all duration-300 rounded-sm overflow-hidden"
              >
                <span className="relative z-10">{filterLabels.reset}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

