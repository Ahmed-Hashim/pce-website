import type { Metadata } from "next";
import PageHero from "../components/ui/PageHero";
import CTAComponent from "../components/home/CTAComponent";
import Statistics from "../components/home/Statistics";
import CoreServicesOverview from "../components/home/CoreServicesOverview";

import { cacheLife } from "next/cache";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore PCE's comprehensive engineering services including design, supervision, project management, and construction consultancy across multiple sectors.",
  keywords: ["engineering services", "design services", "project supervision", "construction management", "engineering consultancy", "infrastructure services"],
  openGraph: {
    title: "Services | PCE",
    description: "Explore PCE's comprehensive engineering services including design, supervision, and project management.",
    type: "website",
  },
  alternates: {
    canonical: "/services",
  },
};

const pageHero = {
  title: "Services",
  subtitle: "What We Do",
  imageSrc: "/1.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
  ],
};


export default async function ServicesPage() {
  "use cache";
  cacheLife("hours");
  // const [services, stats] = await Promise.all([ getStats()]);
  const cta = {
    title: "Need a specialist for your next project?",
    description:
      "Talk to our team about engineering design, supervision, and delivery.",
    primaryButtonText: "Get Consultation",
    secondaryButtonText: "Explore Services",
  };
  return (
    <div className="min-h-screen">
      <PageHero
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumbs={pageHero.breadcrumbs}
        // imageSrc={pageHero.imageSrc}
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
