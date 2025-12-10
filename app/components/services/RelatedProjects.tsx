import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "../ui/ProjectCard";
import Section from "../ui/Section";
import { createClient } from "@/utils/supabase/supabaseServer";
import { Suspense } from "react";

interface RelatedProjectsProps {
  serviceId: number;
}

export default function RelatedProjects({ serviceId }: RelatedProjectsProps) {
  return (
    <Section id="related-projects" className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: `url("/Layout.png")`,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <SectionTitle
            title="Related Projects"
            outlineColor="var(--color-primary-dark)"
            titleColor="text-white"
            align="center"
          />
        </div>

        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectList serviceId={serviceId} />
        </Suspense>
      </div>
    </Section>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="grid px-4 lg:px-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className="aspect-4/3 w-full bg-gray-200 dark:bg-zinc-800 rounded-sm animate-pulse" 
        />
      ))}
    </div>
  );
}

async function ProjectList({ serviceId }: { serviceId: number }) {
  "use cache";
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("service_id", serviceId)
    .order("id", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Supabase Error:", error);
    return null;
  }

  if (!projects || projects.length === 0) {
    return (
        <div className="text-center col-span-full py-12">
            <p className="text-white/70">No related projects found.</p>
        </div>
    );
  }

  return (
    <div className="grid px-4 lg:px-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          href={`/projects/${project.id}`} // Or slug if available, but schema shows id. Schema doesn't show slug.
          title={project.name}
          category={project.location || "Project"} // Use location as category/subtitle
          year={project.date ? new Date(project.date).getFullYear().toString() : ""}
          imageSrc={project.main_image_url || "/2.png"} // Fallback image
        />
      ))}
    </div>
  );
}
