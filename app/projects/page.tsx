import { Suspense } from "react";
import type { Metadata } from "next";
import PageHero from "../components/ui/PageHero";
import ProjectsPageClient from "../components/projects/ProjectsPageClient";
import { getProjects, getProjectFilters } from "../actions/projectActions";
import Section from "../components/ui/Section";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse PCE's portfolio of engineering projects across infrastructure, construction, and development sectors in the Middle East and beyond.",
  keywords: ["engineering projects", "construction projects", "infrastructure portfolio", "project showcase", "case studies", "completed projects"],
  openGraph: {
    title: "Projects | PCE",
    description: "Browse PCE's portfolio of engineering projects across infrastructure, construction, and development sectors.",
    type: "website",
    images: [
      {
        url: "/4.png",
        width: 1200,
        height: 630,
        alt: "PCE Projects Portfolio",
      },
    ],
  },
  alternates: {
    canonical: "/projects",
  },
};

const pageHero = {
  title: "Projects",
  subtitle: "Selected Work",
  imageSrc: "/4.png",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
  ],
};

export default async function ProjectsPage() {
  "use cache";

  // Fetch projects and filters from database with proper error handling
  const [projectsResult, filtersResult] = await Promise.all([
    getProjects(),
    getProjectFilters(),
  ]);

  // JSON-LD Structured Data for CollectionPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "PCE Projects",
    "description": "Browse PCE's portfolio of engineering projects across infrastructure, construction, and development sectors.",
    "url": "https://pce-website.com/projects", // Replace with actual domain if known, or use relative? Better to use absolute if possible, but placeholder is fine.
    "isPartOf": {
        "@type": "WebSite",
        "name": "PCE",
        "url": "https://pce-website.com"
    }
  };

  // Handle fetch errors gracefully
  if (projectsResult.error !== null || filtersResult.error !== null) {
    const errorMessage = projectsResult.error ?? filtersResult.error;
    console.error("Error loading projects page:", errorMessage);

    return (
      <>
        <PageHero
          title={pageHero.title}
          subtitle={pageHero.subtitle}
          breadcrumbs={pageHero.breadcrumbs}
          // imageSrc={pageHero.imageSrc}
        />
        <Section container={true}>
          <div className="flex flex-col items-center justify-center py-24 text-center">
             <div className="w-16 h-16 mb-6 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
             </div>
            <h2 className="text-3xl font-bold text-primary-dark mb-3">
              Unable to load projects
            </h2>
            <p className="text-secondary-dark max-w-md mx-auto mb-8">
              We encountered an issue while retrieving the project portfolio. Please try again later.
            </p>
            <Link href="/" className="px-6 py-3 bg-primary-dark text-white rounded-sm hover:bg-primary-medium transition-colors">
                Return Home
            </Link>
          </div>
        </Section>
      </>
    );
  }

  // At this point TypeScript knows both results have data (error is null)
  const projects = projectsResult.data;
  const filters = filtersResult.data;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        title={pageHero.title}
        subtitle={pageHero.subtitle}
        breadcrumbs={pageHero.breadcrumbs}
        // imageSrc={pageHero.imageSrc}
      />

      <Suspense fallback={<div className="min-h-screen bg-primary-dark/80 flex items-center justify-center text-white">Loading projects...</div>}>
        <ProjectsPageClient
          projects={projects}
          filters={filters}
        />
      </Suspense>
    </>
  );
}

