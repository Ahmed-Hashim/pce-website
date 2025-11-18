import PageHero from "../components/ui/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import CareersForm from "../components/careers/CareersForm";
import Link from "next/link";
import { jobsData } from "../data/jobs";

const pageHero = {
  title: "Careers",
  subtitle: "Join our team",
  imageSrc: "/3.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Careers", href: "/careers" },
  ],
};

const intro = {
  title: "Build with precision",
  description:
    "We are looking for disciplined, collaborative people to help deliver engineering design and supervision across key markets.",
};

const emailTo = "careers@pce.com";

const labels = {
  name: "Full Name",
  email: "Email Address",
  phone: "Phone Number",
  cvLink: "Link to CV",
  message: "Message",
};

const buttonLabel = "Apply Now";
const submitLabel = "Send Application";
const helperText = "Provide accurate contact information and a link to your CV.";

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumbs={pageHero.breadcrumbs}
        imageSrc={pageHero.imageSrc}
      />

      <section className="py-(--space-section-y-md) bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title={intro.title}
            titleColor="var(--color-primary-dark)"
            align="left"
            className="mb-4"
            fontSize="md:text-3xl lg:text-4xl"
            underline={false}
          />
          <p className="text-secondary-dark leading-relaxed">{intro.description}</p>
        </div>
      </section>

      <section className="py-(--space-section-y-md) bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title="Open Positions"
            titleColor="var(--color-primary-dark)"
            align="left"
            className="mb-8"
            fontSize="md:text-3xl lg:text-4xl"
            underline={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {jobsData.map((job) => (
              <div key={job.slug} className="group rounded-sm border border-secondary-dark/40 bg-background p-6 hover:border-primary-medium/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-primary-dark font-semibold tracking-tight">{job.title}</h4>
                    <div className="mt-1 text-secondary-dark text-sm">{job.department}</div>
                  </div>
                  <span className="text-xs rounded-full bg-primary-dark/90 text-button-text px-3 py-1">{job.type}</span>
                </div>
                <div className="mt-3 text-secondary-dark text-sm">{job.location}</div>
                <p className="mt-4 text-secondary-dark leading-relaxed text-sm">{job.description}</p>
                {job.requirements && job.requirements.length > 0 ? (
                  <ul className="mt-3 space-y-1 text-secondary-dark text-sm">
                    {job.requirements.map((req, i) => (
                      <li key={`${job.slug}-req-${i}`} className="flex items-start">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-medium mr-3" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-6">
                  <Link href={`/careers/${job.slug}`} className="btn btn-primary">
                    <span>Join</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-(--space-section-y-md) bg-background">
        <CareersForm
          buttonLabel={buttonLabel}
          submitLabel={submitLabel}
          emailTo={emailTo}
          labels={labels}
          helperText={helperText}
        />
      </section>
    </div>
  );
}
