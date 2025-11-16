"use client";

import Image from "next/image";
import SectionTitle from "../ui/SectionTitle";
import CompanyCard from "../ui/CompanyCard";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";

interface Company {
  name: string;
  logo?: string;
  abbrev?: string;
  description?: string;
  established?: string;
  href?: string;
}

interface HoldingGroupProps {
  title: string;
  subtitle?: string;
  companies: Company[];
  holdingLogo?: string;
  holdingName?: string;
  holdingAlt?: string;
  holdingDescription?: string;
  holdingEstablished?: string;
  holdingHref?: string;
}

export default function HoldingGroupSection({
  title,
  companies,
  holdingLogo = "/logos/ph.png",
  holdingName = "PRECISION HOLDING",
  holdingAlt = "Holding Logo",
  holdingDescription,
  holdingEstablished,
  holdingHref,
}: HoldingGroupProps) {

  return (
    <section className="bg-neutral-light/20">
      <div className="max-w-6xl mx-auto px-(--space-section-x-mobile) sm:px-(--space-section-x-sm) md:px-(--space-section-x-md) lg:px-(--space-section-x-lg) py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-end">
          <div className="flex flex-col gap-6">
            <SectionTitle
              title={title}
              background={title.split(" ").pop()}
              outlineColor="var(--color-primary-medium)"
              titleColor="accent"
              align="left"
              className="mb-4 md:mb-6"
            />

            {holdingHref ? (
              <Link href={holdingHref} className="block cursor-pointer">
                <div className="relative bg-primary-dark/5 border border-white/10 rounded-xl p-6 sm:p-7 flex items-center gap-6 hover:bg-white/10 transition-colors">
                  <div className="absolute top-3 right-3 z-10 rounded-md bg-black/20 text-white p-1">
                    <LinkIcon size={16} />
                  </div>
                  <div className="relative w-24 h-24 md:w-32 md:h-32">
                    <Image src={holdingLogo} alt={holdingAlt} fill className="object-contain" />
                  </div>
                  <div className="flex-1">
                    {holdingName && (
                      <h5 className="font-bold tracking-wide">{holdingName}</h5>
                    )}
                    {holdingEstablished && (
                      <p className="text-primary-dark text-sm mt-1">{holdingEstablished}</p>
                    )}
                    {holdingDescription && (
                      <p className="text-primary-dark  leading-relaxed">{holdingDescription}</p>
                    )}
                  </div>
                </div>
              </Link>
            ) : (
              <button type="button" className="relative bg-primary-dark/5 border border-white/10 rounded-xl p-6 sm:p-7 flex items-center gap-6 hover:bg-primary-dark/10 transition-colors cursor-pointer">
                <div className="absolute top-3 right-3 z-10 rounded-md bg-black/20 text-white p-1">
                  <LinkIcon size={16} />
                </div>
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                  <Image src={holdingLogo} alt={holdingAlt} fill className="object-contain" />
                </div>
                <div className="flex-1">
                  {holdingName && (
                    <h5 className="font-bold tracking-wide ">{holdingName}</h5>
                  )}
                  {holdingEstablished && (
                    <p className=" mt-1">{holdingEstablished}</p>
                  )}
                  {holdingDescription && (
                    <p className="mt-3 leading-relaxed">{holdingDescription}</p>
                  )}
                </div>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 lg:gap-6">
            {companies.map((company) => (
              <CompanyCard
                key={company.name}
                name={company.name}
                logo={company.logo}
                abbrev={company.abbrev}
                href={company.href}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
