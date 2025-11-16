"use client";

import Link from "next/link";
import { useState } from "react";
import { FaDraftingCompass, FaHardHat } from "react-icons/fa";
import { RxTriangleRight } from "react-icons/rx";

interface ServiceItem {
  title: string;
  description: string;
}

interface ServiceCardProps {
  title: string;
  icon: string;
  items: ServiceItem[];
  callToAction?: string;
  backgroundImage?: string;
  className?: string;
}

export default function ServiceCard({
  title,
  icon,
  items,
  callToAction,
  backgroundImage = "/bg-card.jpg",
  className = ""
}: ServiceCardProps) {
  const [isActive, setIsActive] = useState(false);
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
      className={`relative overflow-hidden rounded-xl group cursor-pointer ${className}`}
      onClick={() => setIsActive((prev) => !prev)}
    >
      {/* Triangle on the left side pointing right */}
<div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 opacity-20 pointer-events-none">
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    className="w-full h-full"
  >
    {/* Triangle pointing → */}
    <path
      d="M 0 50 L 100 0 L 100 100 Z"
      fill="var(--color-primary-dark)"
    />
  </svg>
</div>

      <div
        className={`absolute inset-0 bg-cover bg-center opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105 ${
          isActive ? "opacity-100 scale-110" : ""
        }`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-primary-dark group-hover:opacity-10 transition-opacity duration-700" />
      <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 text-center">
        <div className="mx-auto relative w-14 h-14">
          {/* <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50 100 L0 0 L100 0 Z" fill="var(--color-primary-dark)"  />
          </svg> */}
          <div className=" text-white  md:text-5xl lg:text-5xl sm:text-5xl">
            {getIcon(icon)}
          </div>
        </div>
        <h3 className="mt-6 text-white ">{title}</h3>
        <p className="mt-3 text-white/90 ">{items[0]?.description}</p>
        {callToAction && (
          <Link href="" className="mt-6 btn-ghost p-2 rounded-xl text-white font-medium text-sm sm:text-base hover:text-white/80 transition-colors inline-flex items-center justify-center gap-2">
            {callToAction}
            <RxTriangleRight />
          </Link>
        )}
      </div>
    </div>
  );
}
