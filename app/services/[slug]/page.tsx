import React from "react";
import PageHero from "../../components/ui/PageHero";
import { projectsData } from "../../data/projects";
import SectorDescriptionSection from "../../components/sectors/SectorDescriptionSection";
import SectorGridSection, {
  SectorGridItem,
} from "../../components/sectors/SectorGridSection";
import Statistics from "../../components/home/Statistics";
import SectorFeaturedImageSection from "../../components/sectors/SectorFeaturedImageSection";
import SectorTeamSection from "../../components/sectors/SectorTeamSection";
import SectorFeaturedProjectsSection from "../../components/sectors/SectorFeaturedProjectsSection";
import RelatedProjects from "../../components/services/RelatedProjects";
import RelatedNews from "../../components/services/RelatedNews";
import { createClient } from "@/utils/supabase/supabaseServer";
import { getSectorBySlug, sectorsData } from "../../data/sectors"; // Keep for static params and fallback
import { Tables } from "@/utils/supabase/supabase";

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

  // Helper to slugify a string
  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-"); // Replace multiple - with single -
  };

  // Find service by matching slug
  let service = services.find((s) => slugify(s.name) === slug);

  if (!service) {
    // Fallback: try to match by name (slugify name) or just return null
    const localSector = getSectorBySlug(slug);
    if (localSector) {
      const { data: serviceByName, error: nameError } = await supabase
        .from("services")
        .select("*")
        .ilike("name", localSector.title)
        .single();

      if (!nameError && serviceByName) {
        service = serviceByName;
      } else {
        return null;
      }
    } else {
      return null;
    }
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

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try to fetch from Supabase first
  const supabaseData = await getServiceData(slug);

  const localService = getSectorBySlug(slug);

  // If neither found, 404
  if (!supabaseData && !localService) {
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

  // Prefer Supabase data, fallback to local
  const service = supabaseData?.service as Tables<"services">;
  const sectionTitles = supabaseData?.sectionTitles || [];

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
  const featuredImageSrc = heroImage;
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

  const featuredProjectsTitle = "Featured Projects / Case Studies";
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <div className="min-h-screen">
      <PageHero
        title={pageHero.title}
        // subtitle={pageHero.subtitle || ""}
        breadcrumbs={pageHero.breadcrumbs}
      />

      {/* SectorDescriptionSection */}
      <SectorDescriptionSection
        description={description || ""}
        sectionProps={{ background: "bg-background" }}
      />

      {/* Render Dynamic Sections from DB or Fallback */}
      {displaySections.map((section, index) => {
        const isFirstSection = index === 0;
        const columns = 4;
        const background =
          isFirstSection || index === 1
            ? "bg-neutral-light/20"
            : "bg-background";

        return (
          <React.Fragment key={index}>
            <SectorGridSection
              title={section.title}
              groups={section.groups}
              columns={columns}
              sectionProps={{ background }}
            />

            {/* Insert Static Metrics & Image after the first section (Overview) */}
            {isFirstSection && (
              <>
                <Statistics />
                <SectorFeaturedImageSection
                  imageSrc={featuredImageSrc || "/2.png"}
                  alt={title}
                  sectionProps={{ background: "bg-background" }}
                />
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
          sectionProps={{ background: "bg-neutral-light/20" }}
        />
      )}

      {/* Related Projects Section */}
      {service?.id ? (
        <RelatedProjects serviceId={service.id} />
      ) : (
        <SectorFeaturedProjectsSection
          title={featuredProjectsTitle}
          items={featuredProjects}
        />
      )}

      <RelatedNews serviceName={title} />
    </div>
  );
}

export function generateStaticParams() {
  return sectorsData.map((s) => ({ slug: s.slug }));
}
