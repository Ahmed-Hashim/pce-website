import PageHero from "../../components/ui/PageHero";
import SectionTitle from "../../components/ui/SectionTitle";
import CareersForm from "../../components/careers/CareersForm";
import { jobsData } from "../../data/jobs";

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = jobsData.find((j) => j.slug === slug);

  if (!job) {
    const hero = {
      title: "Position Not Found",
      subtitle: "",
      imageSrc: "/4.png",
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Careers", href: "/careers" },
      ],
    };
    return (
      <div className="min-h-screen">
        <PageHero title={hero.title} subtitle={hero.subtitle} breadcrumbs={hero.breadcrumbs} imageSrc={hero.imageSrc} />
      </div>
    );
  }

  const hero = {
    title: job.title,
    subtitle: `${job.department} • ${job.location}`,
    imageSrc: "/3.png",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Careers", href: "/careers" },
      { label: job.title, href: `/careers/${job.slug}` },
    ],
  };

  const labels = {
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    cvLink: "Link to CV",
    message: "Message",
  };

  const emailTo = "careers@pce.com";

  return (
    <div className="min-h-screen">
      <PageHero title={hero.title} subtitle={hero.subtitle} breadcrumbs={hero.breadcrumbs} imageSrc={hero.imageSrc} />

      <section className="py-(--space-section-y-md) bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title="Role Overview"
            titleColor="var(--color-primary-dark)"
            align="left"
            className="mb-6"
            fontSize="md:text-3xl lg:text-4xl"
            underline={false}
          />
          <div className="rounded-sm border border-secondary-dark/40 bg-background p-6">
            <div className="flex flex-wrap items-center gap-3 text-secondary-dark">
              <span className="text-xs rounded-full bg-primary-dark/90 text-button-text px-3 py-1">{job.type}</span>
              <span>{job.department}</span>
              <span>•</span>
              <span>{job.location}</span>
            </div>
            <p className="mt-4 text-secondary-dark leading-relaxed">{job.description}</p>
            {job.requirements && job.requirements.length > 0 ? (
              <ul className="mt-4 space-y-2 text-secondary-dark">
                {job.requirements.map((req, i) => (
                  <li key={`req-${i}`} className="flex items-start">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-medium mr-3" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-(--space-section-y-md) bg-background">
        <SectionTitle
          title="Apply Now"
          titleColor="var(--color-primary-dark)"
          align="center"
          className="mb-2"
          fontSize="md:text-3xl lg:text-4xl"
          underline={false}
        />
        <CareersForm
          buttonLabel="Reveal Application Form"
          submitLabel="Send Application"
          emailTo={emailTo}
          jobTitle={job.title}
          labels={labels}
          helperText="Provide accurate contact information and a link to your CV."
        />
      </section>
    </div>
  );
}

export function generateStaticParams() {
  return jobsData.map((j) => ({ slug: j.slug }));
}

