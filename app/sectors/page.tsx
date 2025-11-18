import PageHero from "../components/ui/PageHero";
import CTAComponent from "../components/home/CTAComponent";
import { sectionTitles } from "../data/sectionTitles";
import Statistics from "../components/home/Statistics";
import CoreServicesOverview from "../components/home/CoreServicesOverview";
import { coreSectorsData } from "../data/coreSectors";

const pageHero = {
  title: "Sectors",
  subtitle: "What We Do",
  imageSrc: "/2.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Sectors", href: "/sectors" },
  ],
};

export default function SectorsPage() {
  const stats = [
    { value: "16+", label: "Years of experience" },
    { value: "400+", label: "Staff" },
    { value: "600+", label: "Completed Projects" },
    { value: "$10B+", label: "Projects Value" },
  ];
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

      <CoreServicesOverview title={coreSectorsData.title} services={coreSectorsData.services} />
      <Statistics
        title={sectionTitles.statistics.title}
        eyebrow={sectionTitles.statistics.eyebrow}
        background={sectionTitles.statistics.background}
        stats={stats}
        titleColor={sectionTitles.statistics.titleColor}
        backgroundTextColor={sectionTitles.statistics.backgroundTextColor}
        outlineColor={sectionTitles.statistics.outlineColor}
      />
      <CTAComponent
        title={cta.title}
        description={cta.description}
        primaryButtonText={cta.primaryButtonText}
        secondaryButtonText={cta.secondaryButtonText}
      />

    </div>
  );
}
