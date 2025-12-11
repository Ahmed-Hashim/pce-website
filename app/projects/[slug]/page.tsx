import type { Metadata } from "next";
import ProjectHeader, { StatPoint } from "../../components/ui/ProjectHeader";
import PageHero from "../../components/ui/PageHero";
import ProjectGallery from "../../components/ui/ProjectGallery";
import ProjectOverview from "../../components/ui/ProjectOverview";
import ProjectTeam from "../../components/ui/ProjectTeam";
import { createClient } from "@/utils/supabase/supabaseServer";
import Section from "@/app/components/ui/Section";
import { SectionTitle } from "@/app/components/ui";



async function getProject(slug: string) {
  "use cache";
  const supabase = await createClient();
  return await supabase
    .from("projects")
    .select(
      `
      *,
      clients (
        name,
        logo_link
      ),
      project_team (
        leadership_team (
          full_name,
          position,
          avatar_url,
          description,
          projects_count,
          experience_years,
          title
        )
      ),
      project_gallery (
        image_url
      ),
      projects_categories (
        categories (
          name
        )
      ),
      projects_sectors (
        sectors (
          name
        )
      )
    `
    )
    .eq("slug", slug)
    .single();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: project } = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const description = project.overview?.substring(0, 160) || `Explore the ${project.name} project by PCE.`;
  const sectors = project.projects_sectors
    ?.map((s: { sectors: { name: string } | null }) => s.sectors?.name)
    .filter((name): name is string => Boolean(name)) || [];

  return {
    title: project.name,
    description,
    keywords: ["PCE project", project.name, project.location, ...sectors].filter((k): k is string => Boolean(k)),
    openGraph: {
      title: `${project.name} | PCE Projects`,
      description,
      type: "article",
      images: project.main_image_url ? [project.main_image_url] : undefined,
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: project, error } = await getProject(slug);

  if (error || !project) {
    const pageHero = {
      title: "Project Not Found",
      subtitle: "",
      imageSrc: "/4.png",
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
      ],
    };
    return (
      <div className="min-h-screen bg-primary-dark">
        <PageHero
          title={pageHero.title}
          subtitle={pageHero.subtitle}
          breadcrumbs={pageHero.breadcrumbs}
          imageSrc={pageHero.imageSrc}
        />
      </div>
    );
  }

  const pageHero = {
    title: project.name,
    subtitle: project.location || "",
    imageSrc: project.main_image_url || "/4.png",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: project.name, href: `/projects/${project.slug}` },
    ],
  };

  const stats = (project.points as unknown as StatPoint[]) || [];
  const gallery =
    (project.project_gallery
      ?.map((g) => g.image_url)
      .filter(Boolean) as string[]) || [];

  const categories =
    (project.projects_categories
      ?.map((c) => c.categories?.name)
      .filter(Boolean) as string[]) || [];
  const sectors =
    (project.projects_sectors
      ?.map((s) => s.sectors?.name)
      .filter(Boolean) as string[]) || [];

  const team =
    (project.project_team
      ?.map((t) => t.leadership_team)
      .filter(Boolean) as {
        full_name: string;
        position: string | null;
        avatar_url: string | null;
        description: string | null;
        projects_count: number | null;
        experience_years: number | null;
        title: string;
      }[]) || [];

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumbs={pageHero.breadcrumbs}
        imageSrc={pageHero.imageSrc}
        stats={stats}
      />

      {/* Main Content: Overview + Meta */}
      <Section container={true}>
        <ProjectOverview
          overview={project.overview}
          client={project.clients}
          categories={categories}
          sectors={sectors}
          location={project.location}
          projectName={project.name}
        />
      </Section>

      {/* Gallery Section */}
      <Section className="bg-neutral-light/30">

          <SectionTitle
           
            title="Visuals from the Field"
            align="left"
          />

          <div className="mt-2">
            <ProjectGallery images={gallery} projectName={project.name} />
          </div>

      </Section>

      {/* Project Team Section */}
      {team.length > 0 && (
        <Section className="bg-background" container={true}>
          <ProjectTeam team={team} />
        </Section>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select("slug");
  return (projects || []).map((p) => ({ slug: p.slug }));
}
