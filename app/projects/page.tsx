import PageHero from "../components/ui/PageHero";
import ProjectsPageClient from "../components/projects/ProjectsPageClient";
import { getProjects, getProjectFilters } from "../actions/projectActions";

const pageHero = {
  title: "Projects",
  subtitle: "Selected Work",
  imageSrc: "/4.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
  ],
};

export default async function ProjectsPage() {
  "use cache";

  // Fetch projects and filters from database
  const [projects, filters] = await Promise.all([
    getProjects(),
    getProjectFilters(),
  ]);

  return (
    <>
      <PageHero
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumbs={pageHero.breadcrumbs}
        imageSrc={pageHero.imageSrc}
      />

      <ProjectsPageClient projects={projects} filters={filters} />
    </>
  );
}
