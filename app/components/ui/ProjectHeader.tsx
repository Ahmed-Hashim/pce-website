import Link from "next/link";
import Image from "next/image";
import Section from "./Section";

interface Breadcrumb {
  label: string;
  href: string;
}

export interface StatPoint {
  title: string;
  description: string;
}

interface ProjectHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
  imageSrc: string;
  stats: StatPoint[];
}

export default function ProjectHeader({ title, subtitle, breadcrumbs, imageSrc, stats }: ProjectHeaderProps) {
  return (
    <Section className="bg-primary-dark pt-32 pb-16 relative overflow-hidden" container={true}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary-dark/80" />
      </div>

      {/* Background Decor (optional) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(95,117,176,0.1),transparent_50%)] pointer-events-none" />

      <div className="relative z-10">
        
        {/* Top Header: Breadcrumbs & Title */}
        <div className="mb-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs md:text-sm capitalize tracking-widest">
              {breadcrumbs.map((bc, i) => (
                <li key={`${bc.label}-${i}`} className="flex items-center gap-2">
                  <Link href={bc.href} className="text-primary-medium hover:text-white transition-colors">
                    {bc.label}
                  </Link>
                  {i < breadcrumbs.length - 1 ? (
                    <span className="text-white/20">/</span>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
          
          <div className="max-w-4xl">
            <h1 className="font-light text-white tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-primary-medium font-light max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* The "Box": Image + Stats */}
        <div className="rounded-sm overflow-hidden bg-primary-dark border border-white/10 shadow-2xl">
          
          {/* Main Image */}
          <div className="relative h-[50vh] md:h-[60vh] w-full group">
            <Image
              src={imageSrc}
              alt={title}
              fill
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="100vw"
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-primary-dark/80 via-transparent to-transparent opacity-60" />
          </div>

          {/* Stats Bar (Attached to bottom of image box) */}
          {stats.length > 0 && (
            <div className="bg-primary-dark/95 backdrop-blur-sm border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                {stats.map((s, i) => (
                  <div key={`stat-${i}`} className="p-6 md:p-8 text-center group/stat hover:bg-white/5 transition-colors">
                    <p className=" font-light text-white tracking-tight group-hover/stat:text-primary-medium transition-colors">
                      {s.description}
                    </p>
                    <span className=" text-primary-medium mt-2 capitalize tracking-widest">
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </Section>
  );
}
