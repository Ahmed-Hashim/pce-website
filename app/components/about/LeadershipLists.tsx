import SectionTitle from "../ui/SectionTitle";
import LeaderCard from "../ui/LeaderCard";
import Section from "../ui/Section";
import type { ComponentProps } from "react";
import { createClient } from "@/utils/supabase/supabaseServer";
import { Suspense } from "react";

interface LeadershipListsProps {
  title: string;
  background?: string;
  teamType: string; // Added to filter by type
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
  className?: string;
  gridClassName?: string;
}

export default function LeadershipLists({
  title,
  teamType,
  sectionProps,
  className = "",
  gridClassName = "grid sm:grid-cols-3 lg:grid-cols-5 gap-7 justify-items-center",
}: LeadershipListsProps) {
  return (
    <Section
      {...sectionProps}
      container={sectionProps?.container ?? false}
      className={`${className} ${sectionProps?.className || ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={title}
          outlineColor="var(--color-neutral-light)"
          titleColor="var(--color-primary-dark)"
          align="center"
        />
        <div className="mt-4">
          <Suspense fallback={<LeadershipSkeleton gridClassName={gridClassName} />}>
            <LeadershipList teamType={teamType} gridClassName={gridClassName} />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}

function LeadershipSkeleton({ gridClassName }: { gridClassName: string }) {
  return (
    <div className={gridClassName}>
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-full h-80 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

async function LeadershipList({ teamType, gridClassName }: { teamType: string; gridClassName: string }) {
  "use cache";
  const supabase = await createClient();
  const { data: directors, error } = await supabase
    .from("leadership_team")
    .select("*")
    .eq("type", teamType)
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase Error:", error);
    return (
      <div className="text-center py-12 col-span-full">
        <p className="text-zinc-600 dark:text-zinc-400">
          Unable to load team members.
        </p>
      </div>
    );
  }

  if (!directors || directors.length === 0) {
    return <p className="text-center col-span-full">No team members found</p>;
  }

  return (
    <div className={gridClassName}>
      {directors.map((m, i) => (
        <LeaderCard
          key={`leader-${i}`}
          person={{
            name: m.full_name,
            role: m.title,
            imageSrc: m.avatar_url || undefined,
            title: m.title,
            description: m.description || undefined,
            stats: {
              projects: m.projects_count || 0,
              years: m.experience_years || 0,
              scope: [], // Not available in DB
            },
            locations: [], // Not available in DB
          }}
        />
      ))}
    </div>
  );
}
