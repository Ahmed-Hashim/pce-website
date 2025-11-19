import ProjectCard from "./ProjectCard";

export interface ProjectListItem {
  slug: string;
  title: string;
  category: string;
  year: string;
  heroImage: string;
}

interface ProjectsGridProps {
  items: ProjectListItem[];
  gridClass?: string;
  className?: string;
}

export default function ProjectsGrid({ items, gridClass = "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2", className = "" }: ProjectsGridProps) {
  return (
    <div className={className}>
      <div className={gridClass}>
        {items.map((p,index) => (
          <ProjectCard
            key={index}
            href={`/projects/${p.slug}`}
            title={p.title}
            category={p.category}
            year={p.year}
            imageSrc={p.heroImage}
          />
        ))}
      </div>
    </div>
  );
}
