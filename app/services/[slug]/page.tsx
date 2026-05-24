import React from "react";
import type { Metadata } from "next";
import PageHero from "../../components/ui/PageHero";
import SectorDescriptionSection from "../../components/sectors/SectorDescriptionSection";
import SectorGridSection, {
  SectorGridItem,
} from "../../components/sectors/SectorGridSection";
import Statistics from "../../components/home/Statistics";
import SectorFeaturedImageSection from "../../components/sectors/SectorFeaturedImageSection";
import SectorTeamSection from "../../components/sectors/SectorTeamSection";
import RelatedProjects from "../../components/services/RelatedProjects";
import RelatedNews from "../../components/services/RelatedNews";
import { createClient } from "@/utils/supabase/supabaseServer";
import { Tables } from "@/utils/supabase/supabase";
import { slugify } from "@/lib/slugify";

type ServiceSectionWithDetails = Tables<"service_section_titles"> & {
  service_sections: Pick<Tables<"service_sections">, "title" | "points">[];
};

// Helper to fetch service data from Supabase
async function getServiceData(slug: string) {
  "use cache";
  const supabase = await createClient();

  // 1. Fetch all services to match slug manually
  // Since 'slug' column doesn't exist, we must fetch services and slugify names to find a match.
  const { data: services, error: servicesError } = await supabase
    .from("services")
    .select("*");

  if (servicesError || !services) {
    console.error(
      "Supabase Services Fetch Error:",
      servicesError || "No services found"
    );
    return null;
  }

  // Find service by matching slug
  const service = services.find((s) => slugify(s.name) === slug);

  if (!service) {
    return null;
  }

  // 2. Fetch section titles and sections
  const { data: sectionTitles, error: sectionsError } = await supabase
    .from("service_section_titles")
    .select(
      `
      *,
      service_sections (
        title,
        points
      )
    `
    )
    .eq("service_id", service.id)
    .order("order");

  if (sectionsError) {
    console.error("Supabase Sections Fetch Error:", sectionsError);
  }

  // 3. Fetch team members
  const { data: teamMembers, error: teamError } = await supabase
    .from("leadership_team")
    .select("*")
    .eq("service_id", service.id);

  if (teamError) {
    console.error("Supabase Team Fetch Error:", teamError);
  }

  return {
    service,
    sectionTitles: sectionTitles || [],
    teamMembers: teamMembers || [],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getServiceData(slug);

  if (!data) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  const { service } = data;
  const description = service.brief?.substring(0, 160) || `Learn about PCE's ${service.name} services.`;

  return {
    title: service.name,
    description,
    keywords: ["PCE service", service.name, "engineering service", "construction consulting"],
    openGraph: {
      title: `${service.name} | PCE Services`,
      description,
      type: "article",
      images: service.image_url ? [service.image_url] : undefined,
    },
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try to fetch from Supabase first
  const supabaseData = await getServiceData(slug);

  // If not found, 404
  if (!supabaseData) {
    const pageHero = {
      title: "Sector Not Found",
      subtitle: "",
      imageSrc: "/2.png",
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
      ],
    };
    return (
      <div className="min-h-screen bg-primary-dark">
        <PageHero
          title={pageHero.title}
          subtitle={pageHero.subtitle}
          breadcrumbs={pageHero.breadcrumbs}
          imageSrc={pageHero.imageSrc}
        />
      </div>
    );
  }

  const service = supabaseData.service as Tables<"services">;
  const sectionTitles = supabaseData.sectionTitles || [];

  // Map service fields
  const title = service.name;
  const subtitle = service.cta_subtitle;
  const description = service.brief || "";
  const heroImage = service.image_url || "/2.png";

  const pageHero = {
    title: title,
    subtitle: subtitle,
    imageSrc: heroImage,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Sectors", href: "/services" },
      { label: title, href: `/services/${slug}` },
    ],
  };

  // Prepare display sections (from DB)
  let displaySections: { title: string; groups: SectorGridItem[] }[] = [];

  if (sectionTitles && sectionTitles.length > 0) {
    displaySections = (
      sectionTitles as unknown as ServiceSectionWithDetails[]
    ).map((st) => ({
      title: st.title,
      groups: st.service_sections.map((ss) => ({
        title: ss.title,
        items: Array.isArray(ss.points) ? ss.points.map(String) : [],
      })),
    }));
  }

  // Metrics
  // const featuredImageSrc = heroImage;
  const teamTitle = "Team Members / Experts";
  const teamMembers = (
    (supabaseData?.teamMembers || []) as Tables<"leadership_team">[]
  ).map((m) => ({
    name: m.full_name,
    role: m.position || m.title || "",
    title: m.title || "",
    imageSrc: m.avatar_url || "/1.png",
    description: m.description || "",
    stats: {
      projects: m.projects_count || 0,
      years: m.experience_years || 0,
      scope: [],
    },
    locations: [],
  }));

  return (
    <div className="min-h-screen bg-primary-dark">
      <PageHero
        title={pageHero.title}
        // subtitle={pageHero.subtitle || ""}
        breadcrumbs={pageHero.breadcrumbs}
        // imageSrc={pageHero.imageSrc}
      />

      {/* SectorDescriptionSection */}
      <SectorDescriptionSection
        description={description || ""}
        sectionProps={{ background: "bg-primary-dark" }}
        textColor="text-neutral-200"
      />

      {/* Render Dynamic Sections from DB */}
      {displaySections.map((section, index) => {
        const isFirstSection = index === 0;
        const columns = 4;
        const background =
          isFirstSection || index === 1
            ? "bg-white/5"
            : "bg-primary-dark";

        return (
          <React.Fragment key={index}>
            <SectorGridSection
              title={section.title}
              groups={section.groups}
              columns={columns}
              sectionProps={{ background }}
              titleColor="text-white"
              textColor="text-neutral-200"
            />

            {/* Insert Static Metrics & Image after the first section (Overview) */}
            {isFirstSection && (
              <>
                <Statistics />
                {/* <SectorFeaturedImageSection
                  imageSrc={featuredImageSrc || "/2.png"}
                  alt={title}
                  sectionProps={{ background: "bg-background" }}
                /> */}
              </>
            )}
          </React.Fragment>
        );
      })}

      {/* SectorTeamSection */}
      {teamMembers.length > 0 && (
        <SectorTeamSection
          title={teamTitle}
          members={teamMembers}
          sectionProps={{ background: "bg-white/5" }}
          titleColor="text-white"
        />
      )}

      {/* Related Projects Section */}
      <RelatedProjects serviceId={service.id} />

      <RelatedNews serviceName={title} />
    </div>
  );
}

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("name");

  if (!services || services.length === 0) {
    return [{ slug: "no-services-found" }];
  }

  return services.map((s) => ({ slug: slugify(s.name) }));
}
