"use client";

import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";

interface CompanyCardProps {
  name: string;
  logo?: string;
  abbrev?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function CompanyCard({ name, logo, abbrev, href, onClick, className = "" }: CompanyCardProps) {
  const getInitials = (text: string) =>
    text
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();

  const CardInner = (
    <div
      className={`relative bg-primary-dark/5 border border-white/10 rounded-xl overflow-hidden hover:bg-primary-dark/10 transition-colors duration-300 ${className}`}
    >
      <div className="absolute top-2 right-2 z-10">
        <div className="rounded-md bg-black/20 text-white p-1">
          <LinkIcon size={16} />
        </div>
      </div>
      <div className="relative w-full aspect-square flex items-center justify-center">
        {logo ? (
          <div className="relative w-full h-full">
            <Image src={logo} alt={name} fill className="object-contain p-3 lg:p-4" />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 rounded-lg bg-white/10 flex items-center justify-center text-neutral-light font-semibold">
              {abbrev || getInitials(name)}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block group cursor-pointer">
        {CardInner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="block w-full text-left cursor-pointer">
      {CardInner}
    </button>
  );
}
