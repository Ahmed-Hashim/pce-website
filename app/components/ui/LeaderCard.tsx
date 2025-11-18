"use client";
import Image from "next/image";
import { useState } from "react";

interface PersonItem {
  name: string;
  role: string;
  imageSrc?: string;
  title?: string;
  description?: string;
  stats: {
    projects: number;
    years: number;
    scope: string[];
  };
  locations?: string[];
}

interface LeaderCardProps {
  person: PersonItem;
}

export default function LeaderCard({ person }: LeaderCardProps) {
  const labels = { projects: "Projects", years: "Years" };
  const getInitials = (text: string) =>
    text
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();
  const [isFlipped, setIsFlipped] = useState(false);
  const toggleFlip = () => setIsFlipped(!isFlipped);
  return (
    <div
      role="button"
      aria-label={`View details for ${person.name}`}
      tabIndex={0}
      onClick={toggleFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFlip();
        }
      }}
      className={`group relative w-full h-72 rounded-sm border border-secondary-dark/30 bg-background p-3 lg:p-3 shadow-sm hover:shadow-md hover:border-primary-medium/40 transition-all cursor-pointer overflow-hidden perspective-1000`}
   >
      <div className={`relative w-full h-full transform-3d transition-transform duration-500 ${isFlipped ? "rotate-y-180" : ""}`}>
        <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center text-center px-3">
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-sm overflow-hidden border border-secondary-dark/40">
            {person.imageSrc ? (
              <Image src={person.imageSrc} alt={person.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary-dark/5 text-primary-dark font-semibold">
                {getInitials(person.name)}
              </div>
            )}
          </div>
          <h4 className="mt-6 text-lg md:text-xl font-semibold tracking-tight text-primary-dark">{person.name}</h4>
          <p className="mt-1 tracking-tighter text-secondary-dark/80">{person.title || person.role}</p>
        </div>
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center px-6">
          <h4 className="text-lg md:text-xl font-semibold tracking-tight text-primary-dark">{person.name}</h4>
          {person.description ? (
            <p className="mt-3 text-secondary-dark text-sm md:text-base leading-tight">{person.description}</p>
          ) : null}
          {person.stats && (person.stats.projects !== undefined || person.stats.years !== undefined) ? (
            <div className="mt-5 flex items-center justify-center gap-8">
              {person.stats.projects > 0 ? (
                <div className="text-center">
                  <div className="text-xl font-semibold text-primary-dark">{person.stats.projects}</div>
                  <div className="text-xs text-secondary-dark">{labels.projects}</div>
                </div>
              ) : null}
              {person.stats.years > 0 ? (
                <div className="text-center">
                  <div className="text-xl font-semibold text-primary-dark">{person.stats.years}</div>
                  <div className="text-xs text-secondary-dark">{labels.years}</div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
