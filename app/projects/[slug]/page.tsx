import PageHero from "../../components/ui/PageHero";
import Image from "next/image";
import { projectsData, getProjectBySlug } from "../../data/projects";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
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
        <PageHero title={pageHero.title} subtitle={pageHero.subtitle} breadcrumbs={pageHero.breadcrumbs} imageSrc={pageHero.imageSrc} />
      </div>
    );
  }

  const pageHero = {
    title: project.title,
    subtitle: project.location,
    imageSrc: project.heroImage,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: project.title, href: `/projects/${project.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-dark">
      <PageHero title={pageHero.title} subtitle={pageHero.subtitle} breadcrumbs={pageHero.breadcrumbs} imageSrc={pageHero.imageSrc} />

      <section className="py-(--space-section-y-md) bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          {/* <SectionTitle title={project.title} background={project.category.toUpperCase()} outlineColor="var(--color-neutral-light)" titleColor="var(--color-primary-dark)" align="left" /> */}

          {project.stats && project.stats.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.stats.map((s, i) => (
                <div key={`stat-${i}`} className="rounded-sm border border-secondary-dark bg-white/60 p-4">
                  <div className="text-sm text-secondary-dark">{s.label}</div>
                  <div className="text-xl font-semibold text-primary-medium mt-1">{s.value}</div>
                </div>
              ))}
            </div>
          ) : null}

          {project.sections && project.sections.length > 0 ? (
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {project.sections.map((sec, i) => (
                <div key={`sec-${i}`} className="rounded-sm border border-secondary-dark bg-white/60 p-6">
                  <h3 className="text-lg font-semibold text-primary-medium">{sec.title}</h3>
                  {sec.content ? (
                    <p className="mt-3 text-secondary-dark">{sec.content}</p>
                  ) : null}
                  {sec.items && sec.items.length > 0 ? (
                    <ul className="mt-3 space-y-2 text-secondary-dark">
                      {sec.items.map((it, idx) => (
                        <li key={`item-${idx}`} className="flex items-start">
                          <span className="text-primary-medium mr-3">•</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}

          {project.gallery && project.gallery.length > 0 ? (
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-2">
              {project.gallery.map((src, i) => (
                <div key={`gal-${i}`} className="relative h-44 md:h-52 lg:h-64 overflow-hidden">
                  <Image src={src} alt={`${project.title} ${i + 1}`} width={1200} height={800} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

export function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}
