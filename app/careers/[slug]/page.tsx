"use cache";
import type { Metadata } from "next";
import PageHero from "../../components/ui/PageHero";
import SectionTitle from "../../components/ui/SectionTitle";
import CareersForm from "../../components/careers/CareersForm";
import { createClient } from "@/utils/supabase/supabaseServer";

const generateSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

async function getCareerBySlug(slug: string) {
  const supabase = createClient();
  const { data: careers } = await supabase
    .from("careers")
    .select(`
      *,
      services (
        name
      )
    `);

  const jobs = careers?.map((career: { id: number; job_title: string; description: string; services: { name: string } | null }) => ({
    id: career.id,
    slug: generateSlug(career.job_title),
    title: career.job_title,
    department: career.services?.name || "General",
    location: "Riyadh, Saudi Arabia",
    type: "Full Time",
    description: career.description,
    requirements: []
  })) || [];

  return jobs.find((j) => j.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getCareerBySlug(slug);

  if (!job) {
    return {
      title: "Position Not Found",
      description: "The requested job position could not be found.",
    };
  }

  const description = job.description?.substring(0, 160) || `Apply for the ${job.title} position at PCE.`;

  return {
    title: `${job.title} - Career`,
    description,
    keywords: ["PCE careers", "job opening", job.title, job.department, "engineering jobs"],
    openGraph: {
      title: `${job.title} | PCE Careers`,
      description,
      type: "article",
    },
    alternates: {
      canonical: `/careers/${slug}`,
    },
  };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const supabase = createClient();
  const { data: careers } = await supabase
    .from("careers")
    .select(`
      *,
      services (
        name
      )
    `);

  const jobs = careers?.map((career: any) => ({
    id: career.id,
    slug: generateSlug(career.job_title),
    title: career.job_title,
    department: career.services?.name || "General",
    location: "Riyadh, Saudi Arabia",
    type: "Full Time",
    description: career.description,
    created_at: career.created_at,
    requirements: []
  })) || [];

  const job = jobs.find((j) => j.slug === slug);

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

      <section className="bg-background">
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

      <section className="bg-background">
        <SectionTitle
          title="Apply Now"
          titleColor="var(--color-primary-dark)"
          align="center"
          className="mb-2" // Reduced margin
          fontSize="md:text-3xl lg:text-4xl"
          underline={false}
        />
        <CareersForm
          buttonLabel="Reveal Application Form"
          submitLabel="Send Application"
          emailTo={emailTo}
          jobTitle={job.title}
          careerId={job.id}
          labels={labels}
          helperText="Provide accurate contact information and a link to your CV."
        />
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": job.title,
            "description": job.description,
            "identifier": {
              "@type": "PropertyValue",
              "name": "PCE",
              "value": job.id
            },
            "datePosted": (job as any).created_at || new Date().toISOString(),
            "validThrough": new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString(),
            "employmentType": "FULL_TIME",
            "hiringOrganization": {
              "@type": "Organization",
              "name": "PCE - Precision Consulting Engineering",
              "sameAs": "https://pce.com",
              "logo": "https://pce.com/pce-logo.png"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Riyadh",
                "addressRegion": "Riyadh",
                "addressCountry": "SA"
              }
            }
          })
        }}
      />
    </div>
  );
}

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: careers } = await supabase.from("careers").select("job_title");

  return careers?.map((c) => ({
    slug: generateSlug(c.job_title)
  })) || [];
}
