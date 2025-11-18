import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";
import TriangleIcon from "../ui/TriangleIcon";

interface AwardItem {
  year: string;
  title: string;
  issuer: string;
  imageSrc?: string;
}

interface CertItem {
  code: string;
  title: string;
  issuer: string;
  year?: string;
  imageSrc?: string;
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

export default function AwardsCertifications({
  title,
  background,
  awards,
  certifications,
  labels = { awards: "Awards", certifications: "Certifications" },
}: AwardsCertificationsProps) {
  const timeline = [
    ...awards.map((a) => ({
      kind: "award" as const,
      title: a.title,
      issuer: a.issuer,
      year: a.year,
      imageSrc: a.imageSrc,
      sortYear: parseInt(a.year || "0", 10) || 0,
    })),
    ...certifications.map((c) => ({
      kind: "cert" as const,
      title: c.title,
      issuer: c.issuer,
      year: c.year || c.code,
      imageSrc: c.imageSrc,
      sortYear: parseInt((c.year || "0") as string, 10) || 0,
    })),
  ].sort((a, b) => b.sortYear - a.sortYear);

  return (
    <section className="py-(--space-section-y-md) bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={title} background={background} className="mb-16" />

        {/* Horizontal Timeline - Desktop */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-20 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary-medium to-transparent opacity-60" />
            <div className="overflow-x-auto">
              <div className="flex items-start justify-center gap-16 w-full px-8">
                {timeline.map((item, index) => {
                  const badgeText =
                    item.kind === "award"
                      ? labels.awards
                      : labels.certifications;
                  return (
                    <div
                      key={`timeline-${item.title}-${index}`}
                      className="relative flex flex-col items-center min-w-[300px]"
                    >
                      <div className="text-center mb-4">
                        <span className="text-primary-medium font-semibold text-lg">
                          {item.year}
                        </span>
                      </div>
                      <div className="absolute top-19 left-1/2 -translate-x-1/2 z-10">
                        <div className="relative w-5 h-5">
                          {/* <TriangleIcon className="absolute inset-0 w-5 h-5 text-white" /> */}
                          <TriangleIcon className="absolute inset-0 w-5 h-5 text-primary-medium rotate-180" />
                        </div>
                      </div>
                      <div className="mt-24 w-[300px]">
                        <div className="group bg-white/60 backdrop-blur-sm rounded-sm p-6 shadow-sm border border-neutral-light/30 hover:border-primary-medium/40 hover:shadow-md transition-all duration-300 relative">
                          <div className="absolute -top-2 -left-2 z-20">
                            <span className="text-xs px-3 py-1 rounded-sm bg-primary-medium text-white uppercase tracking-wide shadow-md">
                              {badgeText}
                            </span>
                          </div>
                          <div className="relative w-20 h-20 mx-auto mb-4 rounded-sm overflow-hidden ">
                            {item.imageSrc ? (
                              <Image
                                src={item.imageSrc}
                                alt={item.title}
                                fill
                                className="object-contain"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-10 h-10 bg-primary-medium/20 rounded" />
                              </div>
                            )}
                          </div>
                          <div className="text-center">
                            <span className="leading-tight text-sm text-primary-dark group-hover:text-primary-medium transition-colors duration-300 mb-2">
                              {item.title}
                            </span>
                            <p className="text-secondary-dark text-xs">
                              {item.issuer}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-px h-16 bg-linear-to-b from-primary-medium/40 to-transparent" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Timeline - Mobile/Tablet */}
        <div className="lg:hidden">
          <div className="relative space-y-8">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-primary-medium to-transparent opacity-60" />

            {timeline.map((item, index) => {
              const badgeText =
                item.kind === "award" ? labels.awards : labels.certifications;

              return (
                <div
                  key={`mobile-timeline-${item.title}-${index}`}
                  className="relative flex items-start gap-6 pl-4"
                >
                  <div className="absolute left-8 -translate-x-1/2 top-6 z-10">
                    <TriangleIcon className="w-4 h-4 text-primary-medium" />
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 group backdrop-blur-sm rounded-sm p-6 shadow-sm border border-neutral-light/30 hover:border-primary-medium/40 hover:shadow-md transition-all duration-300 relative">
                    {/* Badge - Top Left */}
                    <div className="absolute -top-2 -left-2 z-20">
                      <span className="text-xs px-3 py-1 rounded-sm bg-primary-medium text-white uppercase tracking-wide shadow-md">
                        {badgeText}
                      </span>
                    </div>

                    {/* Year Above Content */}
                    <div className="mb-1">
                      <span className="text-primary-medium font-semibold text-sm">
                        {item.year}
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      {/* Image */}
                      <div className="relative w-16 h-16 shrink-0 rounded-sm overflow-hidden ">
                        {item.imageSrc && (
                          <Image
                            src={item.imageSrc}
                            alt={item.title}
                            fill
                            className="object-contain"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-primary-dark group-hover:text-primary-medium transition-colors duration-300 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-secondary-dark text-sm">
                          {item.issuer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
