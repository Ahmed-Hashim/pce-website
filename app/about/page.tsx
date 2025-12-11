import type { Metadata } from "next";
import PageHero from "../components/ui/PageHero";
import CEOSection from "../components/about/CEOSection";
import Statistics from "../components/home/Statistics";
import OurBranchesSection from "../components/home/OurBranchesSection";
import MissionVisionValues from "../components/about/MissionVisionValues";
import LeadershipLists from "../components/about/LeadershipLists";
import AwardsCertifications from "../components/about/AwardsCertifications";

export const metadata: Metadata = {
  title: "About Us",
  description: "Discover PCE's 30+ years of engineering excellence. Learn about our mission, vision, leadership team, and global presence across the Middle East and beyond.",
  keywords: ["about PCE", "engineering company", "leadership team", "company history", "mission vision", "awards certifications"],
  openGraph: {
    title: "About Us | PCE",
    description: "Discover PCE's 30+ years of engineering excellence, our mission, and leadership team.",
    type: "website",
  },
  alternates: {
    canonical: "/about",
  },
};

const pageHero = {
  title: "About Us",
  subtitle: "Precision Consulting Engineering",
  imageSrc: "/1.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumbs={pageHero.breadcrumbs}
      // imageSrc={pageHero.imageSrc}
      />

      {/* <WhoWeAreSection data={whoWeAreData} /> */}
      <MissionVisionValues />

      <CEOSection
        title="Board Members"
        className="bg-primary-dark relative"
      />

      <LeadershipLists
        title="Management Team"
        background="Management Team"
        teamType="management_team"
        className="bg-primary-dark/20"
        gridClassName="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center"
      />
      <LeadershipLists
        title="Technical Team"
        background="Technical Team"
        teamType="technical_team"
        className="bg-background"
        gridClassName="grid sm:grid-cols-3 lg:grid-cols-3 gap-7 justify-items-center"
      />

      <AwardsCertifications
        title="Awards & Certifications"
        background="AWARDS"
      />

      <Statistics />

      <OurBranchesSection />
    </>
  );
}
