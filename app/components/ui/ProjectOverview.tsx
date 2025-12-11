import React from "react";
import Image from "next/image";

interface ProjectOverviewProps {
  overview: string | null;
  client: {
    name: string;
    logo_link: string | null;
  } | null;
  categories: string[];
  sectors: string[];
  location: string | null;
  projectName: string;
}

export default function ProjectOverview({
  overview,
  client,
  categories,
  sectors,
  location,
  projectName,
}: ProjectOverviewProps) {
  return (
    <>
      {/* Overview */}
      <div className="mb-8 max-w-4xl">
        {overview && (
          <>
            <h2 className="font-extrabold md:text-4xl lg:text-5xl text-white ">
              Overview
            </h2>
            <div className="text-neutral-light leading-relaxed whitespace-pre-line font-light mt-2">
              {overview}
            </div>
          </>
        )}
      </div>

      {/* Meta Info Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/10 pt-8">
        {/* Client */}
        {client && (
          <div>
            <h6 className="font-bold text-primary-medium uppercase tracking-widest mb-3">
              Client
            </h6>
            {client.logo_link ? (
              <div className="relative h-12 w-32 ">
                
                <Image
                  src={client.logo_link}
                  alt={client.name}
                  fill
                  className="object-contain object-left invert brightness-0"
                />
              </div>
              
            ) : (
              <div className="text-white font-medium">
                {client.name}
              </div>
            )}
          </div>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <div>
            <h6 className="font-bold text-primary-medium uppercase tracking-widest mb-3">
              Categories
            </h6>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <span
                  key={i}
                  className="text-white font-medium"
                >
                  {cat}
                  {i < categories.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sectors */}
        {sectors.length > 0 && (
          <div>
            <h6 className="font-bold text-primary-medium uppercase tracking-widest mb-3">
              Sectors
            </h6>
            <div className="flex flex-wrap gap-2">
              {sectors.map((sec, i) => (
                <span
                  key={i}
                  className="text-white font-medium"
                >
                  {sec}
                  {i < sectors.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Location */}
        {location && location !== projectName && (
          <div>
            <h6 className="font-bold text-primary-medium uppercase tracking-widest mb-3">
              Location
            </h6>
            <div className=" font-medium">
              {location}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
