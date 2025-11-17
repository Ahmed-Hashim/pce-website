import PageHero from "../../components/ui/PageHero";
import ServiceDetailSection from "../../components/services/ServiceDetailSection";
import SectionTitle from "../../components/ui/SectionTitle";
import { getServiceBySlug, servicesData } from "../../data/services";

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    const pageHero = {
      title: "Service Not Found",
      subtitle: "",
      imageSrc: "/bg-2.png",
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
      ],
    };
    return (
      <div className="min-h-screen bg-primary-dark">
        <PageHero title={pageHero.title} subtitle={pageHero.subtitle} breadcrumbs={pageHero.breadcrumbs} imageSrc={pageHero.imageSrc} />
      </div>
    );
  }

  const pageHero = {
    title: service.title,
    subtitle: service.subtitle || "",
    imageSrc: service.heroImage,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: service.title, href: `/services/${service.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-dark">
      <PageHero title={pageHero.title} subtitle={pageHero.subtitle} breadcrumbs={pageHero.breadcrumbs} imageSrc={pageHero.imageSrc} />

      <section className="py-[var(--space-section-y-md)] bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle title={service.title} background="SERVICES" outlineColor="var(--color-neutral-light)" titleColor="var(--color-primary-dark)" align="left" />
          {service.description ? (
            <p className="mt-4 text-secondary-dark">{service.description}</p>
          ) : null}
        </div>
      </section>

      {service.sections.map((sec, i) => (
        <ServiceDetailSection key={`sec-${i}`} title={sec.title} icon={null} items={sec.items || []} />
      ))}
    </div>
  );
}

export function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}
