import { Suspense } from "react";
import { createClient } from "@/utils/supabase/supabaseServer";
import FeaturedProjectsCarousel, { Project } from "./FeaturedProjectsCarousel";
import Section from "../ui/Section";
import type { ComponentProps } from "react";

interface FeaturedProjectsPreviewProps {
  title?: string;
  subtitle?: string;
  tagText?: string;
  viewProjectLabel?: string;
  viewAllLabel?: string;
  maxWidthClass?: string;
  paddingXClass?: string;
  itemsPerViewConfig?: { sm: number; md: number; lg: number };
  cardAspectClass?: string;
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
}

export default function FeaturedProjectsPreview(props: FeaturedProjectsPreviewProps) {
  return (
    <Suspense fallback={<ProjectsSkeleton {...props} />}>
      <FeaturedProjectsData {...props} />
    </Suspense>
  );
}

function ProjectsSkeleton(props: FeaturedProjectsPreviewProps) {
  const { 
    sectionProps, 
    maxWidthClass = "max-w-7xl",
    // itemsPerViewConfig = { sm: 1, md: 1, lg: 3 }
  } = props;

  return (
    <Section
      {...sectionProps}
      container={sectionProps?.container ?? false}
      className={`${sectionProps?.className || ""}`}
    >
      <div className="text-center mb-12">
        <div className="h-10 w-64 bg-white/10 rounded mx-auto mb-4 animate-pulse" />
        <div className="h-6 w-96 bg-white/5 rounded mx-auto animate-pulse" />
      </div>

      <div className={`${maxWidthClass} mx-auto px-8`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-4/3 bg-white/5 rounded-sm animate-pulse" />
          ))}
        </div>
      </div>
    </Section>
  );
}

async function FeaturedProjectsData(props: FeaturedProjectsPreviewProps) {
  "use cache";
  const supabase = await createClient();

  // Fetch projects that are marked as featured (or just latest 6 if no featured flag)
  // Assuming there might be an 'is_featured' column, otherwise we just take the latest.
  // Checking schema from previous reads, I didn't see is_featured explicitly, so I'll order by date/id.
  const { data: projectsData, error } = await supabase
    .from("projects")
    .select(`
      id,
      name,
      overview,
      main_image_url,
      location,
      date,
      slug,
      projects_categories (
        categories (
          name
        )
      )
    `)
    .order("date", { ascending: false }) // or order by id if date is null
    .limit(6);

  if (error) {
    console.error("Error fetching featured projects:", JSON.stringify(error, null, 2));
    return null;
  }

  if (!projectsData || projectsData.length === 0) {
    return null;
  }

  // Define the expected shape of the Supabase response
  type ProjectResponse = {
    id: number;
    name: string;
    overview: string | null;
    main_image_url: string | null;
    location: string | null;
    date: string | null;
    slug: string | null;
    projects_categories: {
      categories: {
        name: string;
      } | null;
    }[];
  };

  const projects: Project[] = (projectsData as unknown as ProjectResponse[]).map((p) => {
    // Extract category name safely
    const categoryName = p.projects_categories?.[0]?.categories?.name || "Project";

    return {
      id: p.id,
      title: p.name,
      description: p.overview || "",
      image: p.main_image_url || "/4.png", // Fallback image
      category: categoryName,
      location: p.location || "",
      year: p.date ? new Date(p.date).getFullYear().toString() : "",
      link: `/projects/${p.slug}`,
    };
  });

  return <FeaturedProjectsCarousel projects={projects} {...props} />;
}
