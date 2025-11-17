import Link from "next/link";
import Image from "next/image";

interface ContentCardProps {
  href: string;
  title: string;
  imageSrc: string;
  date?: string;
  tag?: string;
  excerpt?: string;
  ctaLabel?: string;
  className?: string;
}

export default function ContentCard({ href, title, imageSrc, date, tag, excerpt, ctaLabel, className = "" }: ContentCardProps) {
  return (
    <Link href={href} className={`group block ${className}`}>
      <div className="overflow-hidden rounded-sm bg-white border border-foreground-secondary/50">
        <div className="relative aspect-4/3">
          <Image src={imageSrc} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
          {tag ? (
            <div className="absolute top-3 left-3 rounded-full bg-primary-dark/90 text-button-text text-[0.7rem] px-3 py-1 tracking-wide uppercase">
              {tag}
            </div>
          ) : null}
          {date ? (
            <div className="absolute top-3 right-3 rounded-full bg-primary-dark/90 text-button-text text-[0.7rem] px-3 py-1">
              {date}
            </div>
          ) : null}
        </div>
        <div className="p-5">
          <h6 className="mt-1 text-primary-dark font-semibold tracking-tight">
            {title}
          </h6>
          {excerpt ? (
            <p className="mt-3 text-foreground-secondary text-sm leading-relaxed">
              {excerpt}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
