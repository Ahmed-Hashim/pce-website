import type { Metadata } from "next";
import HeroSection from "./components/home/HeroSection";
import WhoWeAreSection from "./components/home/WhoWeAreSection";
import OurBranchesSection from "./components/home/OurBranchesSection";
import ClientsSection from "./components/home/ClientsSection";
import CoreServicesOverview from "./components/home/CoreServicesOverview";
import FeaturedProjectsPreview from "./components/home/FeaturedProjectsPreview";
import CTAComponent from "./components/home/CTAComponent";
// import { whoWeAreData } from "./components/home/WhoWeAreData";
import Statistics from "./components/home/Statistics";
// import CEOSection from "./components/home/CEOSection";
import HoldingGroupSection from "./components/home/HoldingGroupSection";
import ValuesMarqueeSection from "./components/home/ValuesMarqueeSection";

import OurExpertiseSection from "./components/home/OurExpertiseSection";

export const metadata: Metadata = {
  title: "Home",
  description: "Precision Consulting Engineering (PCE) - Leading engineering consultancy delivering world-class infrastructure, construction management, and project supervision across the Middle East. 30+ years of excellence.",
  keywords: ["engineering consulting", "construction management", "infrastructure development", "PCE", "Saudi Arabia engineering", "Middle East construction"],
  openGraph: {
    title: "PCE | Precision Consulting Engineering",
    description: "Leading engineering consultancy delivering world-class infrastructure and construction management across the Middle East.",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  return (
    <div className=" relative min-h-screen items-center justify-center ">
      <HeroSection />

      {/* Section props passed for consistency */}
      <ValuesMarqueeSection />
      <WhoWeAreSection

        sectionProps={{ container: false }}
      />
      <ClientsSection sectionProps={{ container: false }} />

      <OurExpertiseSection />

      {/* <CEOSection
        eyebrow={sectionTitles.ceos.eyebrow}
        title={sectionTitles.ceos.title}
        background={sectionTitles.ceos.background}
        outlineColor={sectionTitles.ceos.outlineColor}
        titleColor={sectionTitles.ceos.titleColor}
        ceos={ceos}
        companies={companyDescriptions}
      /> */}
      <CoreServicesOverview />

      <FeaturedProjectsPreview
        sectionProps={{ container: true, className: "bg-primary-dark/95" }}
      />

      <OurBranchesSection sectionProps={{ container: false }} />

      <Statistics />

      <HoldingGroupSection />

      <CTAComponent sectionProps={{ container: false }} />
    </div>
  );
}
