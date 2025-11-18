"use client";

import Image from "next/image";
import SectionTitle from "../ui/SectionTitle";
import { useState, useEffect } from "react";

interface Branch {
  country: string;
  flag: string;
  flagImage: string;
  locations: string[];
  contacts: string[];
  branchCount: number;
  isHeadquarters?: boolean;
  region: string;
}

interface OurBranchesSectionProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  sectionEyebrow?: string;
  branches?: Branch[];
  anchorId?: string;
  statsLabels?: {
    countries?: string;
    totalBranches?: string;
    global?: string;
    presence?: string;
  };
  labels?: {
    regionSuffix?: string;
    hqBadge?: string;
    locationsContacts?: string;
    viewDetails?: string;
    close?: string;
    branchCount?: string;
  };
}
export const branches = [
    {
      country: "Egypt",
      flag: "🇪🇬",
      flagImage: "https://flagcdn.com/w320/eg.png",
      locations: [
        "39 Babel St from Shooting club St., Dokki, Giza",
        "New Administrative Capital, Golden Tower 6th floor Office 615",
      ],
      contacts: ["+20 100 686 8963", "+20 100 012 7211"],
      branchCount: 2,
      isHeadquarters: true,
      region: "mena",
    },
    {
      country: "Saudi Arabia",
      flag: "🇸🇦",
      flagImage: "https://flagcdn.com/w320/sa.png",
      locations: [
        "4321 Othman Ibn Affan, Al Tawun, Riyadh",
        "3910-8349, Qabbani Tower, Al-Dubbat, Riyadh",
      ],
      contacts: ["+966 55 587 2422", "+966 55 587 2422"],
      branchCount: 2,
      region: "mena",
    },
    {
      country: "UAE",
      flag: "🇦🇪",
      flagImage: "https://flagcdn.com/w320/ae.png",
      locations: [
        "1502 Al Taawun St, Al-Maha, A-Block 15 Floor, Sharjah",
        "Sharjah Media City, Sharjah",
      ],
      contacts: ["+971 52 420 3858", "+971 56 933 9189"],
      branchCount: 2,
      region: "mena",
    },
    {
      country: "Italy",
      flag: "🇮🇹",
      flagImage: "https://flagcdn.com/w320/it.png",
      locations: ["100/3 VAI DON ELOI MONARI, Modena, Italy"],
      contacts: ["+39 3200477680"],
      branchCount: 1,
      region: "europe",
    },
    {
      country: "Iraq",
      flag: "🇮🇶",
      flagImage: "https://flagcdn.com/w320/iq.png",
      locations: ["Ainkawa 44003, Erbil, Iraq"],
      contacts: ["+964 7508310697"],
      branchCount: 1,
      region: "mena",
    },
  ];
const OurBranchesSection: React.FC<OurBranchesSectionProps> = ({
  sectionTitle = "Global Presence",
  sectionSubtitle = "Strategic locations across key markets, delivering excellence worldwide",
  branches = [],
  anchorId = "our-branches",
  labels = {
    regionSuffix: "Region",
    hqBadge: "HQ",
    locationsContacts: "Locations & Contacts",
    viewDetails: "View details",
    close: "Close",
    branchCount: "Branches",
  },
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const sortedBranches = branches.slice().sort(
    (a, b) => (b.isHeadquarters ? 1 : 0) - (a.isHeadquarters ? 1 : 0)
  );

  return (
    <section id={anchorId} className="relative md:py-10">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/world.png')" }}
      />

      <div className="absolute inset-0 bg-linear-to-br from-background/70 to-background/90" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-4 md:mb-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionTitle
            titleColor="heading"
            outlineColor="var(--color-neutral-light)"
            title={sectionTitle}
            background={sectionTitle.split(" ").pop()}
            align="center"
          />

          <p className="mt-3 md:mt-4 text-primary-medium max-w-3xl mx-auto leading-relaxed px-4">
            {sectionSubtitle}
          </p>
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 px-4 sm:px-0 lg:grid-cols-5 gap-4 w-full">
            {sortedBranches.map((branch, index) => (
              <button
                key={`${branch.country}-${index}`}
                type="button"
                onClick={() => setSelectedBranch(branch)}
                aria-label={`${labels.viewDetails}: ${branch.country}`}
                className={`group relative text-left bg-white rounded-sm p-4 shadow-sm hover:shadow-xl transition-all duration-500 ease-out border border-gray-100 hover:border-primary-medium/20 flex flex-col ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${branch.isHeadquarters ? "sm:col-span-2 lg:col-span-1" : ""}`}
                style={{ transitionDelay: `${300 + index * 80}ms` }}
              >
                {branch.isHeadquarters && (
                  <div className="absolute top-3 right-3 z-10 bg-primary-medium text-button-text px-3 py-1 rounded-full font-semibold tracking-wide">
                    {labels.hqBadge}
                  </div>
                )}

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border border-secondary-dark shrink-0">
                    <Image
                      width={250}
                      height={250}
                      src={branch.flagImage}
                      alt={`${branch.country} flag`}
                      className="w-full h-full"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-primary-dark ">
                      {branch.country}
                    </p>
                    <small className="text-secondary-dark capitalize">
                      {branch.region} {labels.regionSuffix}
                    </small>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <small className="text-secondary-dark">
                    {branch.branchCount} {labels.branchCount}
                  </small>
                  <small className="text-primary-medium">
                    {labels.viewDetails}
                  </small>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedBranch && (
          <div className="fixed inset-0 z-50">
            <div
              role="presentation"
              onClick={() => setSelectedBranch(null)}
              className="absolute inset-0 bg-black/60 transition-opacity"
            />

            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div
                role="dialog"
                aria-modal="true"
                className="relative w-full max-w-2xl bg-background rounded-sm border border-secondary-dark shadow-xl"
              >
                <div className="flex items-center justify-between p-6 border-b border-secondary-dark">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-secondary-dark">
                      <Image
                        width={80}
                        height={80}
                        src={selectedBranch.flagImage}
                        alt={`${selectedBranch.country} flag`}
                        className="w-full h-full"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-primary-medium">
                        {selectedBranch.country}
                      </h3>
                      <p className="text-secondary-dark capitalize">
                        {selectedBranch.region} {labels.regionSuffix}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedBranch(null)}
                    aria-label={labels.close}
                    className="px-3 py-2 rounded-md border border-secondary-dark text-secondary-dark hover:text-primary-medium hover:border-primary-medium transition-colors"
                  >
                    {labels.close}
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-4 text-secondary-dark">
                    {selectedBranch.branchCount} {labels.branchCount}
                  </div>

                  <h4 className="font-semibold text-secondary-dark mb-3 tracking-wide uppercase">
                    {labels.locationsContacts}
                  </h4>

                  <div className="space-y-3">
                    {selectedBranch.locations.map((location, idx) => (
                      <div
                        key={`${selectedBranch.country}-location-${idx}`}
                        className="border-l-2 border-primary-medium pl-3"
                      >
                        <div className="text-primary-dark mb-1">{location}</div>

                        {selectedBranch.contacts[idx] && (
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-3 h-3 text-primary-medium shrink-0"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>

                            <span className="text-primary-medium font-medium break-all">
                              {selectedBranch.contacts[idx]}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurBranchesSection;
