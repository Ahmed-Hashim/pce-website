import Link from "next/link";

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
  imageSrc: string;
}

export default function PageHero({ title, subtitle, breadcrumbs, imageSrc }: PageHeroProps) {
  return (
    <section className="relative h-[48vh] md:h-[40vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-primary-dark/90 to-primary-dark/80" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-end pb-10">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((bc, i) => (
              <li key={`${bc.label}-${i}`} className="flex items-center gap-2">
                <Link href={bc.href} className="text-white/80 hover:text-white transition-colors">
                  {bc.label}
                </Link>
                {i < breadcrumbs.length - 1 ? (
                  <span className="text-white/40">/</span>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-base md:text-lg text-white/80 max-w-2xl">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}

