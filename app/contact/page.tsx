import PageHero from "../components/ui/PageHero";
import CTAComponent from "../components/home/CTAComponent";
import OurBranchesSection, { branches } from "../components/home/OurBranchesSection";
import SectionTitle from "../components/ui/SectionTitle";
import Image from "next/image";
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

      <section className="py-(--space-section-y-md) bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title="Office Contacts"
            background="OFFICES"
            outlineColor="var(--color-neutral-light)"
            titleColor="var(--color-primary-dark)"
            align="left"
            className="mb-8"
            fontSize="md:text-3xl lg:text-4xl"
            underline={false}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {footerData.offices.map((office, i) => (
              <div
                key={`office-${i}`}
                className="rounded-sm border border-secondary-dark/40 bg-background p-6"
              >
                <h4 className="text-primary-dark font-semibold tracking-tight">
                  {office.title}
                </h4>
                <div className="mt-3 text-secondary-dark space-y-1">
                  {office.addressLines.map((line, idx) => (
                    <div key={`addr-${i}-${idx}`}>{line}</div>
                  ))}
                </div>
                <div className="mt-4 text-primary-dark">
                  {office.phone}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-(--space-section-y-md) bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title="Direct Contacts"
            background="CONTACT"
            outlineColor="var(--color-neutral-light)"
            titleColor="var(--color-primary-dark)"
            align="left"
            className="mb-8"
            fontSize="md:text-3xl lg:text-4xl"
            underline={false}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {contactChannels.map((c, i) => (
              <a
                key={`cc-${i}`}
                href={c.href}
                className="group block rounded-sm border border-secondary-dark/40 bg-background p-5 hover:border-primary-medium/50 transition-colors"
              >
                <div className="text-xs uppercase tracking-wide text-secondary-dark/80">
                  {c.label}
                </div>
                <div className="mt-1 text-primary-dark font-semibold">
                  {c.value}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-sm border border-secondary-dark/40 bg-background p-6">
              <h4 className="text-primary-dark font-semibold tracking-tight">
                {hours.title}
              </h4>
              <div className="mt-3 space-y-2">
                {hours.items.map((h, i) => (
                  <div key={`hr-${i}`} className="flex items-center justify-between">
                    <div className="text-secondary-dark">{h.label}</div>
                    <div className="text-primary-dark font-medium">{h.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-sm overflow-hidden border border-secondary-dark">
              <div className="relative h-64 md:h-80 lg:h-96">
                <Image src={mapImage} alt="Map" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <OurBranchesSection
        sectionTitle="Global Presence"
        sectionSubtitle="Strategic locations across key markets"
        branches={branches}
      />
    </div>
  );
}

