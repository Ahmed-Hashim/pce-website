"use client";
import Image from "next/image";
import { useState } from "react";
import TriangleIcon from "./TriangleIcon";

interface CEO {
  name: string;
  title: string;
  description: string;
  imageSrc: string;
}

interface CEOCardProps {
  ceo: CEO;
  index?: number;
  className?: string;
}

export default function CEOCard({ ceo, index = 0, className = "" }: CEOCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div
      role="button"
      aria-label={`View details for ${ceo.name}`}
      tabIndex={0}
      onClick={toggleFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFlip();
        }
      }}
      className={`group relative bg-white rounded-sm  shadow-sm hover:shadow-md transition-all duration-500 ease-out cursor-pointer overflow-hidden perspective-1000 ${className}`}
    >
      {/* Flip wrapper */}
      <div
        className={`relative w-full h-96 transform-3d transition-transform duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center backface-hidden">
          <div className="relative w-48 h-48 mb-6 rounded-sm overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-500">
            <Image
              src={ceo.imageSrc}
              alt={ceo.name}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-2xl font-semibold text-primary-dark">{ceo.name}</h3>
          <p className="text-lg text-secondary-dark font-medium">{ceo.title}</p>
        </div>

        {/* Back face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180 px-6">
          <h3 className="text-xl font-semibold text-primary-dark mb-4">{ceo.name}</h3>
          <p className="text-base text-secondary-dark leading-tight">{ceo.description}</p>
        </div>
      </div>

      {/* Interaction indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <TriangleIcon />
      </div>
    </div>
  );
}
