import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import ProjectsGrid from "../components/ui/ProjectsGrid";
import { projectsData } from "../data/projects";

const pageHero = {
  title: "Projects",
  subtitle: "Selected Work",
  imageSrc: "/4.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
  ],
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen items-center justify-center">
      <PageHero title={pageHero.title} subtitle={pageHero.subtitle} breadcrumbs={pageHero.breadcrumbs} imageSrc={pageHero.imageSrc} />
      <ProjectsGrid items={projectsData} className="container" />
     
    </div>
  );
}
