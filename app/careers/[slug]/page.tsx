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

  const jobs = careers?.map((career) => ({
    id: career.id,
    slug: generateSlug(career.job_title),
    title: career.job_title,
    department: career.services?.name || "General",
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
    <div className="min-h-screen bg-primary-dark selection:bg-secondary-light selection:text-primary-dark">
      <PageHero
        title={hero.title}
        breadcrumbs={hero.breadcrumbs}
        // imageSrc="/3.png"
      />

      {/* Role Overview - Dark Premium Style */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-medium/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary-light/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Column: Title & Context */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <p className="text-secondary-light font-medium tracking-widest text-sm uppercase">
                  Career Opportunity
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  {job.title}
                </h2>
                <div className="h-1 w-20 bg-linear-to-r from-secondary-light to-transparent rounded-full" />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-secondary-light">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5M12 6.75h1.5M15 6.75h1.5M9 10.5h1.5M12 10.5h1.5M15 10.5h1.5M9 14.25h1.5M12 14.25h1.5M15 14.25h1.5M9 18h1.5M12 18h1.5M15 18h1.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider">Department</p>
                    <p className="font-medium text-white">{job.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-neutral-300">
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-secondary-light">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider">Location</p>
                    <p className="font-medium text-white">Riyadh, Saudi Arabia</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-neutral-300">
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-secondary-light">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider">Type</p>
                    <p className="font-medium text-white">Full Time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Description & Requirements */}
            <div className="lg:col-span-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-8 md:p-12">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-secondary-light rounded-full" />
                  Role Overview
                </h3>
                <p className="text-neutral-300 leading-relaxed text-lg mb-10 font-light">
                  {job.description}
                </p>

                {job.requirements && job.requirements.length > 0 && (
                  <>
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <span className="w-1 h-8 bg-secondary-light rounded-full" />
                      Key Requirements
                    </h3>
                    <ul className="grid gap-4">
                      {job.requirements.map((req, i) => (
                        <li key={`req-${i}`} className="flex items-start group">
                          <div className="mt-1.5 mr-4 shrink-0 w-6 h-6 rounded-full bg-primary-medium/20 flex items-center justify-center group-hover:bg-secondary-light/20 transition-colors duration-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary-light" />
                          </div>
                          <span className="text-neutral-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Section - Clean & Minimal */}
      <section className="bg-neutral-100 py-20 md:py-28 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            Ready to make an impact?
          </h2>
          <p className="text-secondary-dark text-lg mb-10 max-w-2xl mx-auto">
            Join our team of visionaries and engineers building the future of infrastructure.
          </p>
          
          <CareersForm
            buttonLabel="Apply for this Position"
            submitLabel="Submit Application"
            emailTo={emailTo}
            jobTitle={job.title}
            careerId={job.id}
            labels={labels}
            helperText="Please ensure all your details are correct before submitting."
          />
        </div>
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
            "datePosted": job.created_at || new Date().toISOString(),
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

  if (!careers || careers.length === 0) {
    return [{ slug: "no-careers-found" }];
  }

  return careers.map((c) => ({
    slug: generateSlug(c.job_title)
  }));
}
