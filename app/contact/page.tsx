import type { Metadata } from "next";
import PageHero from "../components/ui/PageHero";
import CTAComponent from "../components/home/CTAComponent";
import OurBranchesSection from "../components/home/OurBranchesSection";
// import OfficeContactsSection from "../components/contact/OfficeContactsSection";
import DirectContactsSection from "../components/contact/DirectContactsSection";
// import { footerData } from "../components/layout/FooterData";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with PCE. Contact our offices across the Middle East for engineering consultancy, project inquiries, and partnership opportunities.",
  keywords: ["contact PCE", "engineering inquiry", "office locations", "get consultation", "project inquiry", "partnership"],
  openGraph: {
    title: "Contact Us | PCE",
    description: "Get in touch with PCE for engineering consultancy and project inquiries.",
    type: "website",
  },
  alternates: {
    canonical: "/contact",
  },
};

const pageHero = {
  title: "Contact Us",
  subtitle: "Let’s Build Together",
  imageSrc: "/4.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
  ],
};

const cta = {
  title: "Speak with our team",
  description:
    "Share your project goals and we’ll connect you with the right specialists for design, supervision, and delivery.",
  primaryButtonText: "Get Consultation",
  secondaryButtonText: "Explore Sectors",
};

// const officeSectionTitle = "Office Contacts";
// const officeBackgroundText = "OFFICES";

const directContactsTitle = "Direct Contacts";
// const directContactsBackgroundText = "CONTACT";

const mapImage = "/map-placeholder.png";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-primary-dark">
      <PageHero
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumbs={pageHero.breadcrumbs}
        // imageSrc={pageHero.imageSrc}
      />

      <CTAComponent
        title={cta.title}
        description={cta.description}
        primaryButtonText={cta.primaryButtonText}
        secondaryButtonText={cta.secondaryButtonText}
        sectionProps={{ id: "cta" }}
      />

   
      <OurBranchesSection />
      <DirectContactsSection
        title={directContactsTitle}

        mapImage={mapImage}
        sectionProps={{ background: "bg-background/5" }}
      />
    </div>
  );
}
