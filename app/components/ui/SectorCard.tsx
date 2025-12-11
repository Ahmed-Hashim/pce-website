import Link from "next/link";
import Image from "next/image";
import { RxTriangleRight } from "react-icons/rx";

export interface SectorCardProps {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  iconUrl?: string;
}

export default function SectorCard({
  name,
  description,
  imageUrl,
  iconUrl,
}: SectorCardProps) {
  return (
    <Link
      href={`/projects?sector=${encodeURIComponent(name)}`}
      className="group relative block w-full h-[400px] overflow-hidden rounded-sm cursor-pointer bg-neutral-900"
    >
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageUrl || "/image_placeholder.jpg"}
          alt={name}
          fill
          unoptimized={imageUrl?.includes("placehold.co")}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Gradient Overlay - Darkens on hover */}
      <div className="absolute inset-0 bg-linear-to-t from-primary-dark via-primary-dark/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

      {/* Decorative Border/Accent */}
      <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-secondary-light transition-all duration-700 ease-out group-hover:w-full z-20" />

      {/* Content Container */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
        {/* Icon (Optional) */}
        {iconUrl && (
          <div className="absolute top-6 right-6 w-12 h-12 p-2 bg-white/10 backdrop-blur-xs rounded-full border border-white/10 transition-all duration-500 group-hover:bg-primary-medium/20 group-hover:border-primary-medium/40">
            <Image
              src={iconUrl}
              alt={name}
              width={32}
              height={32}
              className="w-full h-full object-contain invert brightness-0 opacity-90"
              unoptimized={iconUrl?.includes("placehold.co")}
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-2 transform transition-transform duration-500 group-hover:-translate-y-1">
          {name}
        </h3>

        {/* Description - Reveal Effect */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="text-gray-300 text-sm leading-relaxed mb-4 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
              {description}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center text-secondary-light font-semibold text-sm transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="uppercase tracking-wider">Explore</span>
          <RxTriangleRight className="ml-1 text-xl" />
        </div>
      </div>
    </Link>
  );
}
