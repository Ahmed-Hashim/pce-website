// app/components/layout/FooterData.ts
// Centralized, editable content for the Footer component.

export type FooterLink = { label: string; href: string; badge?: string };
export type FooterSocial = { ariaLabel: string; href: string; icon: 'facebook' | 'twitter' | 'linkedin' | 'instagram' };

export interface FooterOffice {
  title: string;
  addressLines: string[];
  phone: string;
}

export interface FooterContent {
 
  offices: FooterOffice[];
  columns: Array<
    | {
        title: string;
        description: string;
        socials: FooterSocial[];
      }
    | {
        title: string;
        links: FooterLink[];
      }
    | {
        title: string;
        newsletter: { placeholder: string; submitAriaLabel: string };
      }
  >;
  bottom: {
    copyright: string;
    links: FooterLink[];
  };
}

export const footerData: FooterContent = {

  offices: [
    {
      title: "Operations • Canada",
      addressLines: [
        "Suite 45, 8082 Boner Pange,",
        "Elivator, CA 48998",
      ],
      phone: "+1 (009) 544 7818",
    },
    {
      title: "Headquarters • Egypt",
      addressLines: [
        "993 Renner Burg, West Rond,",
        "MT 94251-030",
      ],
      phone: "+1 (009) 544 7818",
    },
    {
      title: "Headquarters • USA",
      addressLines: [
        "993 Renner Burg, West Rond,",
        "MT 94251-030",
      ],
      phone: "+1 (009) 544 7818",
    },
  ],
  columns: [
    {
      title: "Our company",
      description:
        "Our mission is to empowers businesses off our all size to thrive in an businesses ever changing marketplaces.",
      socials: [
        { ariaLabel: "Facebook", href: "#", icon: "facebook" },
        { ariaLabel: "Twitter", href: "#", icon: "twitter" },
        { ariaLabel: "LinkedIn", href: "#", icon: "linkedin" },
        { ariaLabel: "Instagram", href: "#", icon: "instagram" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Contact us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Engineering Design", href: "#" },
        { label: "Site Supervision", href: "#" },
        { label: "Project Management", href: "#" },
      ],
    },
    
  ],
  bottom: {
    copyright: "© 2025 PCE All right reserved.",
    links: [
      { label: "Policy & privacy", href: "#" },
      { label: "Terms & conditions", href: "#" },
    ],
  },
};

