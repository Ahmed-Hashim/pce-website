"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaDraftingCompass, FaHardHat } from "react-icons/fa";
import { RxTriangleRight } from "react-icons/rx";

interface ServiceItem {
  title: string;
  description: string;
}

interface ServiceCardProps {
  title: string;
  icon: string;
  image: string;
  items: ServiceItem[];
  callToAction?: string;
  backgroundImage?: string;
  className?: string;
}

export default function ServiceCard({
  title,
  icon,
  items,
  image,
  callToAction,
  className = "",
}: ServiceCardProps) {

  // Icon mapping
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      FaDraftingCompass: <FaDraftingCompass />,
      FaHardHat: <FaHardHat />,
    };
    return icons[iconName] || <FaDraftingCompass />;
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl group cursor-pointer ${image ? "w-full aspect-4/3 sm:aspect-video" : ""} ${className}`}
    >
      {/* Triangle on the left side pointing right */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 opacity-20 pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M 0 50 L 100 0 L 100 100 Z"
            fill="var(--color-primary-dark)"
          />
        </svg>
      </div>

      {/* Background Image - Only show if image exists */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out opacity-100 scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      {/* Dark Overlay - Different opacity based on image presence */}
      <div 
        className={`absolute inset-0 bg-primary-dark transition-opacity duration-700 
        ${image ? "opacity-10" : "opacity-100"}`} 
      />

      {/* Content - Image Style (Bottom Left Layout) */}
      {image && (
        <div className="relative z-10 px-6 py-6 sm:px-8 sm:py-8 h-full flex flex-col justify-end
          bg-linear-to-t from-primary-dark via-primary-dark/80 to-transparent">
          <div className="flex items-center gap-4">
            <div className="text-white text-4xl sm:text-5xl drop-shadow-lg">
              {getIcon(icon)}
            </div>
            <div className="text-left flex-1">
              <h3 className="text-white drop-shadow-lg text-xl sm:text-2xl font-bold">{title}</h3>
              <p className="mt-1 text-white/90 drop-shadow-lg text-sm sm:text-base">
                {items[0]?.description}
              </p>
            </div>
          </div>
          {callToAction && (
            <Link
              href=""
              className="mt-4 btn-ghost p-2 rounded-xl text-white font-medium text-sm sm:text-base hover:text-white/80 transition-colors inline-flex items-center gap-2"
            >
              {callToAction}
              <RxTriangleRight />
            </Link>
          )}
        </div>
      )}

      {/* Content - Icon Style (Centered Layout) */}
      {!image && (
        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 text-center">
          <div className="mx-auto relative w-14 h-14">
            <div className="text-white text-5xl drop-shadow-lg">
              {getIcon(icon)}
            </div>
          </div>
          <h3 className="mt-6 text-white drop-shadow-lg">{title}</h3>
          <p className="mt-3 text-white/90 drop-shadow-lg">
            {items[0]?.description}
          </p>
          {callToAction && (
            <Link
              href=""
              className="mt-6 btn-ghost p-2 rounded-xl text-white font-medium text-sm sm:text-base hover:text-white/80 transition-colors inline-flex items-center justify-center gap-2"
            >
              {callToAction}
              <RxTriangleRight />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
