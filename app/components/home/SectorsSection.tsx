import { createClient } from "@/utils/supabase/supabaseServer";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import SectorCard, { SectorCardProps } from "../ui/SectorCard";
import type { ComponentProps } from "react";

interface SectorsSectionProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  sectionEyebrow?: string;
  sectionProps?: Omit<ComponentProps<typeof Section>, "children">;
}

export default async function SectorsSection({
  sectionTitle = "Our Sectors",
  sectionProps,
}: SectorsSectionProps) {
  const supabase = createClient();

  // Fetch sectors from the database
  const { data: sectors, error } = await supabase
    .from("sectors")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching sectors:", error);
    return null;
  }

  if (!sectors || sectors.length === 0) {
    return null;
  }

  // Transform to SectorCardProps
  const formattedSectors: SectorCardProps[] = sectors.map((sector) => ({
    id: sector.id,
    name: sector.name,
    slug: sector.slug || "",
    description: sector.description || "",
    imageUrl: sector.image_url || "/images/placeholder.jpg",
    iconUrl: sector.icon_url || undefined,
  }));

  return (
    <Section
      {...sectionProps}
      className={`py-16 ${sectionProps?.className || ""}`}
      container={true}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

      
      <SectionTitle
        title={sectionTitle}
        titleColor="text-white"
        align="center"
        className="mb-12"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {formattedSectors.map((sector) => (
          <SectorCard key={sector.id} {...sector} />
        ))}
      </div>
      </div>
    </Section>
  );
}
