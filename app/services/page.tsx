import PageHero from "../components/ui/PageHero";
import ServiceDetailSection from "../components/services/ServiceDetailSection";
import { FaDraftingCompass, FaHardHat } from "react-icons/fa";

const pageHero = {
  title: "Services",
  subtitle: "What We Do",
  imageSrc: "/bg-2.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
  ],
};

const engineeringDesign = {
  title: "Engineering Design",
  background: "DESIGN",
  items: [
    "Concept, Preliminary and Schematic design, Detailed design and Construction documents",
    "Specifications",
    "Bill of materials",
    "Value Engineering",
  ],
};

const siteSupervision = {
  title: "Site Supervision",
  background: "SUPERVISION",
  items: [
    "Daily Project inspection and supervision",
    "Design review",
    "Shop drawing review",
    "Material submittal and approval",
    "Project specification conformity",
    "Safety compliance",
  ],
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-primary-dark">
      <PageHero title={pageHero.title} subtitle={pageHero.subtitle} breadcrumbs={pageHero.breadcrumbs} imageSrc={pageHero.imageSrc} />

      <ServiceDetailSection title={engineeringDesign.title} icon={<FaDraftingCompass />} items={engineeringDesign.items} />

      <ServiceDetailSection title={siteSupervision.title} icon={<FaHardHat />} items={siteSupervision.items} />
    </div>
  );
}
