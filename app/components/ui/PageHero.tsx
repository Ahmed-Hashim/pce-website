import Link from "next/link";
import Image from "next/image";

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
  imageSrc?: string;
  bgColor?: string;
}

export default function PageHero({ title, subtitle, breadcrumbs, imageSrc, bgColor  }: PageHeroProps) {
  return (
    <section className={`relative h-[48vh] md:h-[40vh] overflow-hidden bg-primary-dark`}>
      {imageSrc &&
          <Image
            src={imageSrc}
            alt={title}
            fill
            priority={true}
            className="object-cover z-0 opacity-20"
            sizes="100vw"
            quality={75} // Optional: slightly lower quality for speed, default is 75
          />
      }
      
      {
        !bgColor && <div className={`absolute inset-0 bg-background/5 z-10 ${imageSrc ? "opacity-85" : ""}`} />
      }
      {/* Overlay - Adjusted z-index to sit on top of image but below text */}
      

      {/* Content - High z-index to sit on top of everything */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-end pb-10">
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
        <h1 className="font-bold text-white drop-shadow-lg">{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-white/80 max-w-2xl">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}