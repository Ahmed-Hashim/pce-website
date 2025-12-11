"use cache";
import type { Metadata } from "next";
import PageHero from "../components/ui/PageHero";
import SectionTitle from "../components/ui/SectionTitle";

import Link from "next/link";
import { createClient } from "@/utils/supabase/supabaseServer";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join PCE's team of engineering professionals. Explore open positions and career opportunities in engineering, project management, and construction consultancy.",
  keywords: [
    "PCE careers",
    "engineering jobs",
    "job opportunities",
    "work at PCE",
    "engineering positions",
    "construction careers",
  ],
  openGraph: {
    title: "Careers | PCE",
    description:
      "Join PCE's team of engineering professionals. Explore open positions and career opportunities.",
    type: "website",
  },
  alternates: {
    canonical: "/careers",
  },
};

const pageHero = {
  title: "Careers",
  subtitle: "Join our team",
  imageSrc: "/3.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Careers", href: "/careers" },
  ],
};

export default async function CareersPage() {
  const supabase = createClient();
  const { data: careers } = await supabase.from("careers").select(`
      *,
      services (
        name
      )
    `);

  const jobs =
    careers?.map((career) => ({
      slug: career.job_title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, ""),
      title: career.job_title,
      department: career.services?.name || "General",
      location: "Riyadh, Saudi Arabia",
      type: "Full Time",
      description: career.description,
      requirements: [],
    })) || [];

  return (
    <div className="min-h-screen bg-primary-dark">
      <PageHero
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumbs={pageHero.breadcrumbs}
        // imageSrc={pageHero.imageSrc}
        bgColor="primary-dark"
      />

      {/* <hr className="border-primary-dark  h-3" /> */}

      <section className="bg-background/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle
            title="Open Positions"
            titleColor="text-white"
            align="left"
            className="mb-8"
            fontSize="md:text-3xl lg:text-4xl"
            underline={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div
                  key={job.slug}
                  className="group rounded-sm border border-secondary-dark/40 bg-white p-6 hover:border-primary-medium/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-primary-dark font-semibold tracking-tight">
                        {job.title}
                      </h4>
                      <div className="mt-1 text-secondary-dark text-sm">
                        {job.department}
                      </div>
                    </div>
                    {/* <span className="text-xs rounded-full bg-primary-dark/90 text-button-text px-3 py-1">{job.type}</span> */}
                  </div>

                  <p className="mt-4 text-secondary-dark leading-relaxed text-sm line-clamp-3">
                    {job.description}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={`/careers/${job.slug}`}
                      className="btn btn-primary"
                    >
                      <span>Join</span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-secondary-dark">
                No open positions at the moment.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
