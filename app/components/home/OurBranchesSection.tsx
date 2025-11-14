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
}

const OurBranchesSection: React.FC<OurBranchesSectionProps> = ({
  sectionTitle = "Global Presence",
  sectionSubtitle = "Strategic locations across key markets, delivering excellence worldwide",
  branches = [
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
  ],
  anchorId = "our-branches",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id={anchorId} className="relative bg-white overflow-hidden">
      {/* Parallax World Map Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{ backgroundImage: "url('/world.png')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-background/90 to-background/70" />
      {/* Top Divider - positioned above background but below content */}
      <div className="relative mb-10 z-10">
        {/* <hr className="h-4 bg-accent border-none" /> */}
      </div>
      {/* **All background layers stay inside this section** */}

      {/* Actual content */}
      <div className="relative z-20 max-w-7xl mx-auto pt-6 md:pt-8 lg:pt-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionTitle
            titleColor="heading"
            outlineColor="var(--color-heading)"
            title={sectionTitle}
            background={sectionTitle.split(" ").pop()}
            align="center"
          />
          <p className="mt-3 md:mt-4 text-lg md:text-xl text-heading max-w-3xl mx-auto leading-relaxed px-4">
            {sectionSubtitle}
          </p>
        </div>

        {/* Branches Grid - First Row (3 cards) */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full">
            {branches.slice(0, 3).map((branch, index) => (
              <div
                key={`${branch.country}-${index}`}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-border-subtle transition-all duration-500 hover:border-accent hover:scale-105 hover:shadow-2xl flex flex-col touch-manipulation ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Headquarters Badge */}
                {branch.isHeadquarters && (
                  <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 z-10 bg-accent text-button-text px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    HQ
                  </div>
                )}

                {/* Country Header with Circular Flag */}
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-border-subtle transition-colors duration-300 shrink-0">
                    <Image
                      width={250}
                      height={250}
                      src={branch.flagImage}
                      alt={`${branch.country} flag`}
                      className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-heading truncate">
                      {branch.country}
                    </h3>
                    <p className="text-xs md:text-sm text-foreground-secondary capitalize">
                      {branch.region} Region
                    </p>
                  </div>
                </div>

                {/* Locations with Contact Info */}
                <div className="mb-3 flex-1">
                  <h4 className="text-xs md:text-sm font-semibold text-foreground-secondary mb-2 md:mb-3 uppercase tracking-wide">
                    Locations & Contact
                  </h4>
                  <div className="space-y-2 md:space-y-3">
                    {branch.locations.map((location, idx) => (
                      <div
                        key={`${branch.country}-location-${idx}`}
                        className="border-l-2 border-accent pl-2 md:pl-3"
                      >
                        <div className="text-foreground text-xs md:text-sm leading-relaxed mb-1">
                          {location}
                        </div>
                        {branch.contacts[idx] && (
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-3 h-3 text-accent shrink-0"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            <span className="text-foreground text-xs font-medium break-all">
                              {branch.contacts[idx]}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Branches Grid - Second Row (2 cards centered) */}
        <div className="flex justify-center pb-12 md:pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full max-w-4xl">
            {branches.slice(3, 5).map((branch, index) => (
              <div
                key={`${branch.country}-${index + 3}`}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-border-subtle transition-all duration-500 hover:border-accent hover:scale-105 hover:shadow-2xl flex flex-col touch-manipulation ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                {/* Headquarters Badge */}
                {branch.isHeadquarters && (
                  <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 z-10 bg-accent text-button-text px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    HQ
                  </div>
                )}

                {/* Country Header with Circular Flag */}
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-border-subtle transition-colors duration-300 shrink-0">
                    <Image
                      width={250}
                      height={250}
                      src={branch.flagImage}
                      alt={`${branch.country} flag`}
                      className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-heading truncate">
                      {branch.country}
                    </h3>
                    <p className="text-xs md:text-sm text-foreground-secondary capitalize">
                      {branch.region} Region
                    </p>
                  </div>
                </div>

                {/* Locations with Contact Info */}
                <div className="mb-3 flex-1">
                  <h4 className="text-xs md:text-sm font-semibold text-foreground-secondary mb-2 md:mb-3 uppercase tracking-wide">
                    Locations & Contact
                  </h4>
                  <div className="space-y-2 md:space-y-3">
                    {branch.locations.map((location, idx) => (
                      <div
                        key={`${branch.country}-location-${idx}`}
                        className="border-l-2 border-accent pl-2 md:pl-3"
                      >
                        <div className="text-foreground text-xs md:text-sm leading-relaxed mb-1">
                          {location}
                        </div>
                        {branch.contacts[idx] && (
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-3 h-3 text-accent shrink-0"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            <span className=" text-xs font-medium text-accent break-all">
                              {branch.contacts[idx]}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurBranchesSection;
