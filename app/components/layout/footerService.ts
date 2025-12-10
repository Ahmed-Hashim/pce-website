import { createClient } from "@/utils/supabase/supabaseServer";
import { FooterContent, FooterLink, FooterOffice, FooterSocial } from "./FooterData";
import { cache } from "react";
import { Database } from "@/utils/supabase/supabase";
import { slugify } from "@/lib/slugify";
import { cacheLife } from "next/cache";

type BranchRow = Database['public']['Tables']['branches']['Row'];
type CountryRow = Database['public']['Tables']['countries']['Row'];

// Define the shape of the data returned by the join query
interface BranchWithCountry extends BranchRow {
  countries: Pick<CountryRow, 'name'> | null;
}

export const getFooterData = cache(async (): Promise<FooterContent> => {
  "use cache";
  cacheLife("days");

  const supabase = await createClient();

  // Fetch all necessary data in parallel
  const [
    { data: contactInfo },
    { data: aboutInfo },
    { data: branches },
    { data: services },
  ] = await Promise.all([
    supabase.from("contact_info").select("*").single(),
    supabase.from("about").select("*").single(),
    supabase
      .from("branches")
      .select("*, countries(name)")
      .order("id")
      .returns<BranchWithCountry[]>(),
    supabase
      .from("services")
      .select("id, name")
      .order("id"), 
  ]);

  // Map Socials
  const socials: FooterSocial[] = [];
  if (contactInfo) {
    if (contactInfo.facebook) socials.push({ icon: "facebook", href: contactInfo.facebook, ariaLabel: "Facebook" });
    if (contactInfo.x) socials.push({ icon: "twitter", href: contactInfo.x, ariaLabel: "Twitter" }); // Map X to Twitter icon for now
    if (contactInfo.linkedin) socials.push({ icon: "linkedin", href: contactInfo.linkedin, ariaLabel: "LinkedIn" });
    if (contactInfo.instagram) socials.push({ icon: "instagram", href: contactInfo.instagram, ariaLabel: "Instagram" });
  }

  // Map Offices
  const offices: FooterOffice[] = branches?.map((branch) => ({
    title: branch.head_quarter 
      ? `Headquarters • ${branch.countries?.name || "Unknown"}`
      : `Operations • ${branch.countries?.name || "Unknown"}`,
    addressLines: branch.address ? branch.address.split(",") : [],
    phone: branch.phone_number || "",
  })) || [];

  // Map Services Links
  const serviceLinks: FooterLink[] = services?.map((service) => ({
    label: service.name,
    href: `/services/${slugify(service.name)}`,
  })) || [];

  // Construct Footer Content
  return {
    offices,
    columns: [
      {
        title: "Our company",
        description: aboutInfo?.footer_description || "Empowering businesses to thrive.",
        socials,
      },
      {
        title: "Resources",
        links: [
          { label: "Contact us", href: "/contact" },
          { label: "Careers", href: "/careers" },
          { label: "Blog", href: "/blog" },
        ],
      },
      {
        title: "Services",
        links: serviceLinks,
      },
    ],
    bottom: {
      copyright: `© ${new Date().getFullYear()} ${contactInfo?.company_name || "PCE"}. All rights reserved.`,
      links: [
        { label: "Policy & privacy", href: "/policy-privacy" },
        { label: "Terms & conditions", href: "/terms-and-conditions" },
      ],
    },
  };
});
