import SectionTitle from "../ui/SectionTitle";

interface AwardItem {
  year: string;
  title: string;
  issuer: string;
}

interface CertItem {
  code: string;
  title: string;
  issuer: string;
}

interface AwardsCertificationsProps {
  title: string;
  background?: string;
  awards: AwardItem[];
  certifications: CertItem[];
  labels?: {
    awards: string;
    certifications: string;
  };
}

export default function AwardsCertifications({ title, background, awards, certifications, labels = { awards: "Awards", certifications: "Certifications" } }: AwardsCertificationsProps) {
  return (
    <section className="py-[var(--space-section-y-md)] bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle title={title} background={background} outlineColor="var(--color-neutral-light)" titleColor="var(--color-primary-dark)" align="center" />
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-10">
          <div className="rounded-2xl border border-secondary-dark bg-white/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-primary-medium mb-4">{labels.awards}</h3>
            <ul className="space-y-4 text-secondary-dark">
              {awards.map((a, i) => (
                <li key={`award-${i}`} className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-primary-medium" />
                  <span className="flex-1">{a.title}</span>
                  <span className="mx-2 text-secondary-dark">{a.issuer}</span>
                  <span className="text-primary-medium font-medium">{a.year}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-secondary-dark bg-white/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-primary-medium mb-4">{labels.certifications}</h3>
            <ul className="space-y-4 text-secondary-dark">
              {certifications.map((c, i) => (
                <li key={`cert-${i}`} className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-primary-medium" />
                  <span className="flex-1">{c.title}</span>
                  <span className="mx-2 text-secondary-dark">{c.issuer}</span>
                  <span className="text-primary-medium font-medium">{c.code}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

