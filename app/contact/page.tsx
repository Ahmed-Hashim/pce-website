import PageHero from "../components/ui/PageHero";
import CTAComponent from "../components/home/CTAComponent";
import OurBranchesSection, { branches } from "../components/home/OurBranchesSection";
import OfficeContactsSection from "../components/contact/OfficeContactsSection";
import DirectContactsSection from "../components/contact/DirectContactsSection";
import { footerData } from "../components/layout/FooterData";

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

const officeSectionTitle = "Office Contacts";
const officeBackgroundText = "OFFICES";

const directContactsTitle = "Direct Contacts";
const directContactsBackgroundText = "CONTACT";

const contactChannels = [
  { label: "General", value: "info@pce.com", href: "mailto:info@pce.com" },
  { label: "Business", value: "business@pce.com", href: "mailto:business@pce.com" },
  { label: "Careers", value: "careers@pce.com", href: "mailto:careers@pce.com" },
  { label: "Phone", value: "+20 100 686 8963", href: "tel:+201006868963" },
];

const hours = {
  title: "Office Hours",
  items: [
    { label: "Sunday – Thursday", value: "9:00 AM – 6:00 PM" },
    { label: "Friday – Saturday", value: "By appointment" },
  ],
};



const mapImage = "/map-placeholder.png";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumbs={pageHero.breadcrumbs}
        imageSrc={pageHero.imageSrc}
      />

      <CTAComponent
        title={cta.title}
        description={cta.description}
        primaryButtonText={cta.primaryButtonText}
        secondaryButtonText={cta.secondaryButtonText}
      />

      <OfficeContactsSection
        title={officeSectionTitle}
        backgroundText={officeBackgroundText}
        offices={footerData.offices}
        sectionProps={{ background: "bg-background" }}
      />

      <DirectContactsSection
        title={directContactsTitle}
        backgroundText={directContactsBackgroundText}
        contactChannels={contactChannels}
        hours={hours}
        mapImage={mapImage}
        sectionProps={{ background: "bg-background" }}
      />

      <OurBranchesSection
        sectionTitle="Global Presence"
        sectionSubtitle="Strategic locations across key markets"
        branches={branches}
      />
    </div>
  );
}
