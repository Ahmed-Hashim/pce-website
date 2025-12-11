import { Suspense } from "react";
import Section from "../ui/Section";
import { createClient } from "@/utils/supabase/supabaseServer";
import BranchesGrid, { Branch } from "./BranchesGrid";
import type { ComponentProps } from "react";
import SectionTitle from "../ui/SectionTitle";

interface OurBranchesSectionProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  sectionEyebrow?: string;
  anchorId?: string;
  statsLabels?: {
    countries?: string;
    totalBranches?: string;
    global?: string;
    presence?: string;
  };
  labels?: {
    regionSuffix?: string;
    hqBadge?: string;
    locationsContacts?: string;
    viewDetails?: string;
    close?: string;
    branchCount?: string;
  };
  sectionProps?: Omit<ComponentProps<typeof Section>, "children">;
}

export default function OurBranchesSection({
  sectionTitle = "Global Presence",
  sectionSubtitle = "Strategic locations across key markets, delivering excellence worldwide",
  anchorId = "our-branches",
  labels,
  sectionProps,
}: OurBranchesSectionProps) {
  return (
    <Section
      {...sectionProps}
      container={sectionProps?.container ?? false}
      className={`relative ${sectionProps?.className || ""}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: `url("/globalmap.jpg")`,
        }}
      />
      <Suspense
        fallback={
          <BranchesSkeleton
            sectionTitle={sectionTitle}
            sectionSubtitle={sectionSubtitle}
          />
        }
      >
        <BranchesDataContent
          sectionTitle={sectionTitle}
          sectionSubtitle={sectionSubtitle}
          anchorId={anchorId}
          labels={labels}
        />
      </Suspense>
    </Section>
  );
}

async function BranchesDataContent({
  sectionTitle,
  sectionSubtitle,
  anchorId,
  labels,
}: {
  sectionTitle: string;
  sectionSubtitle: string;
  anchorId?: string;
  labels?: OurBranchesSectionProps["labels"];
}) {
  "use cache";
  const supabase = createClient();

  // Fetch countries and branches in parallel
  const [countriesResult, branchesResult] = await Promise.all([
    supabase.from("countries").select("*"),
    supabase.from("branches").select("*"),
  ]);

  if (countriesResult.error) {
    console.error("Error fetching countries:", countriesResult.error);
    return null;
  }
  if (branchesResult.error) {
    console.error("Error fetching branches:", branchesResult.error);
    return null;
  }

  const countries = countriesResult.data;
  const branchesData = branchesResult.data;

  if (!countries || countries.length === 0) {
    return (
      <div className="relative z-20 text-center py-10 text-gray-500">
        No branches found.
      </div>
    );
  }

  // Group branches by country_id
  const branchesByCountry = branchesData.reduce((acc, branch) => {
    if (branch.country_id !== null) {
      if (!acc[branch.country_id]) {
        acc[branch.country_id] = [];
      }
      acc[branch.country_id].push(branch);
    }
    return acc;
  }, {} as Record<number, typeof branchesData>);

  // Transform to Branch interface
  const formattedBranches: Branch[] = countries
    .map((country) => {
      const countryBranches = branchesByCountry[country.id] || [];
      if (countryBranches.length === 0) return null;

      return {
        country: country.name,
        image_url: country.image_url || "",
        locations: countryBranches.map((b) => b.address),
        contacts: countryBranches.map((b) => b.phone_number || ""),
        branchCount: countryBranches.length,
        isHeadquarters: countryBranches.some((b) => b.head_quarter),
        region: country.region_name || "",
      };
    })
    .filter((b): b is Branch => b !== null);

  return (
    <BranchesGrid
      branches={formattedBranches}
      sectionTitle={sectionTitle}
      sectionSubtitle={sectionSubtitle}
      anchorId={anchorId}
      labels={labels}
    />
  );
}

function BranchesSkeleton({
  sectionTitle,
  sectionSubtitle,
}: {
  sectionTitle: string;
  sectionSubtitle: string;
}) {
  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-4 md:mb-4">
        <SectionTitle
          titleColor="heading"
          outlineColor="var(--color-neutral-light)"
          title={sectionTitle}
          
          background={sectionTitle.split(" ").pop()}
          align="center"
        />
        <p className="mt-3 md:mt-4 text-primary-medium max-w-3xl mx-auto leading-relaxed px-4">
          {sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 px-4 sm:px-0 lg:grid-cols-5 gap-4 w-full">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-white rounded-sm p-4 shadow-sm border border-gray-100 flex flex-col h-40 animate-pulse"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gray-200 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
            <div className="mt-auto flex justify-between">
              <div className="h-3 bg-gray-200 rounded w-1/4" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

