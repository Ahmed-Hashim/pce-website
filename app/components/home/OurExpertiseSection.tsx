import { Suspense } from "react";
import SectionTitle from "../ui/SectionTitle";
import Section from "../ui/Section";
import { createClient } from "@/utils/supabase/supabaseServer";
import ExpertiseGrid, { ExpertiseItem } from "./ExpertiseGrid";
import type { ComponentProps } from "react";

// 1. Main Component (Synchronous Wrapper)
export default function OurExpertiseSection({
  title = "Our Expertise",
  sectionProps,
}: {
  title?: string;
  sectionProps?: Omit<ComponentProps<typeof Section>, "children">;
}) {
  return (
    <Section
      {...sectionProps}
      container={sectionProps?.container ?? false}
      className={`relative bg-primary-dark/95 ${
        sectionProps?.className || ""
      }`}
    > <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,var(--color-primary-dark)_0%,transparent_50%),radial-gradient(circle_at_75%_75%,var(--color-secondary-light)_0%,transparent_50%)]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background Pattern */}
     
        {/* Header Section */}
        <div className="text-center mb-16">
          <SectionTitle
            title={title}
            outlineColor="var(--color-primary-dark)"
            titleColor="text-white"
            align="center"
          />
        </div>

        {/* Async Content */}
        <Suspense fallback={<ExpertiseSkeleton />}>
          <ExpertiseDataContent />
        </Suspense>
      </div>
    </Section>
  );
}

// 2. The Async Content (Fetches ONCE)
async function ExpertiseDataContent() {
  "use cache";
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("expertise")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching expertise:", error);
    return null;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No expertise items found.
      </div>
    );
  }

  // Map to ExpertiseItem interface
  const items: ExpertiseItem[] = data.map((item) => ({
    id: item.id,
    title: item.name,
    iconUrl: item.icon_url || "",
  }));

  return <ExpertiseGrid items={items} />;
}

// 3. Loading State
function ExpertiseSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 lg:gap-8">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="bg-white rounded-sm p-8 shadow-sm border border-gray-100 flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-gray-200 animate-pulse rounded-sm mb-8" />
          <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
}
