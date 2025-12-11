import Link from "next/link";
import Image from "next/image";

export interface ProjectCardProps {
  href: string;
  title: string;
  category: string;
  year: string;
  imageSrc: string;
  className?: string;
  aspectClass?: string;
}

export default function ProjectCard({ href, title, category, year, imageSrc, className = "", aspectClass = "aspect-4/3" }: ProjectCardProps) {
  return (
    <Link href={href} className={`group block relative overflow-hidden ${className} ${aspectClass}`}>
      <div className="absolute inset-0 bg-neutral-200 animate-pulse" /> {/* Placeholder background */}
      
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {/* Overlay Gradient - Always visible but subtle, stronger on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-white/70 uppercase tracking-wider">{category}</span>
          <h3 className="text-xl font-bold text-white leading-tight">{title}</h3>
          <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
             <span className="text-sm text-white/60 mt-2 block">{year}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
