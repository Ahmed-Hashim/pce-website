import PageHero from "../components/ui/PageHero";
import ProjectsPageClient from "../components/projects/ProjectsPageClient";
import { getProjects, getProjectFilters } from "../actions/projectActions";
import Section from "../components/ui/Section";

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

  // Fetch projects and filters from database with proper error handling
  const [projectsResult, filtersResult] = await Promise.all([
    getProjects(),
    getProjectFilters(),
  ]);

  // Handle fetch errors gracefully
  if (projectsResult.error !== null || filtersResult.error !== null) {
    const errorMessage = projectsResult.error ?? filtersResult.error;
    console.error("Error loading projects page:", errorMessage);

    return (
      <>
        <PageHero
          title={pageHero.title}
          subtitle={pageHero.subtitle}
          breadcrumbs={pageHero.breadcrumbs}
          // imageSrc={pageHero.imageSrc}
        />
        <Section container={true}>
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-primary-medium mb-4">
              Unable to load projects
            </h2>
            <p className="text-secondary-dark">
              Please try again later or contact support if the problem persists.
            </p>
          </div>
        </Section>
      </>
    );
  }

  // At this point TypeScript knows both results have data (error is null)
  const projects = projectsResult.data;
  const filters = filtersResult.data;

  return (
    <>
      <PageHero
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumbs={pageHero.breadcrumbs}
        imageSrc={pageHero.imageSrc}
      />

      <ProjectsPageClient
        projects={projects}
        filters={filters}
      />
    </>
  );
}

