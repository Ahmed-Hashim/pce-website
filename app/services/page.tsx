import PageHero from "../components/ui/PageHero";
import CTAComponent from "../components/home/CTAComponent";
import { sectionTitles } from "../data/sectionTitles";
import Statistics from "../components/home/Statistics";
import CoreServicesOverview from "../components/home/CoreServicesOverview";
import { coreSectorsData } from "../data/coreSectors";
import { Suspense } from "react";
import { cacheLife } from "next/cache";

const pageHero = {
  title: "Sectors",
  subtitle: "What We Do",
  imageSrc: "/2.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Sectors", href: "/sectors" },
  ],
};

async function getStats() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stats/`, {
    method: "GET",
  });
  return res.json();
}

export default async function SectorsPage() {
  "use cache";
  cacheLife("hours");
  // const [services, stats] = await Promise.all([ getStats()]);
  const cta = {
    title: "Need a specialist for your next project?",
    description:
      "Talk to our team about engineering design, supervision, and delivery.",
    primaryButtonText: "Get Consultation",
    secondaryButtonText: "Explore Sectors",
  };
  return (
    <div className="min-h-screen">
      <PageHero
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumbs={pageHero.breadcrumbs}
        imageSrc={pageHero.imageSrc}
      />

      <CoreServicesOverview />

      <Statistics />
      <CTAComponent
        title={cta.title}
        description={cta.description}
        primaryButtonText={cta.primaryButtonText}
        secondaryButtonText={cta.secondaryButtonText}
      />
    </div>
  );
}
