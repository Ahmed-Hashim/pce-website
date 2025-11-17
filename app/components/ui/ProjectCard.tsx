import Link from "next/link";
import Image from "next/image";

export interface ProjectCardProps {
  href: string;
  title: string;
  category: string;
  year: string;
  imageSrc: string;
}

export default function ProjectCard({ href, title, category, year, imageSrc }: ProjectCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
        <Image src={imageSrc} alt={title} width={800} height={600} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="rounded-xl bg-primary-dark/90 p-3">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <div className="text-sm font-semibold">{title}</div>
                <div className="text-xs text-white/80">{category}</div>
              </div>
              <div className="text-xs text-white/70">{year}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

