import Link from "next/link";
import Image from "next/image";

export interface ProjectCardProps {
  href: string;
  title: string;
  category: string;
  year: string;
  imageSrc: string;
  className?: string;
}

export default function ProjectCard({ href, title, category, year, imageSrc, className = "" }: ProjectCardProps) {
  return (
    <Link href={href} className={`group block ${className}`}>
      <div className="relative h-88 md:h-96 lg:h-104 rounded-sm overflow-hidden border bg-secondary-dark/10 transition-all duration-300 hover:shadow-xl">
        <Image
          src={imageSrc}
          alt={title}
          width={800}
          height={600}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="relative rounded-sm bg-primary-dark/90 p-5 shadow-xl">
            <div className="absolute -left-3 bottom-5 w-2 h-12 bg-primary-medium rounded-full"></div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h6 className="text-white font-semibold">{title}</h6>
                <small className="text-white/80">{category}</small>
              </div>
              <div className="text-xs text-white/70">{year}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
