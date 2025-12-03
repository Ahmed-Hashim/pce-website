import { createClient } from "@/utils/supabase/supabaseServer";
import { Suspense } from "react";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";
import type { ComponentProps } from "react";
import { Json } from "@/utils/supabase/supabase";

interface ContactChannel {
  label: string;
  value: string;
  href: string;
}

interface HoursItem {
  label: string;
  value: string;
}

interface HoursInfo {
  title: string;
  items: HoursItem[];
}

interface DirectContactsSectionProps {
  title?: string;
  backgroundText?: string;
  titleColor?: string;
  outlineColor?: string;
  align?: "left" | "center" | "right";
  fontSize?: string;
  underline?: boolean;
  mapImage?: string;
  sectionProps?: Omit<ComponentProps<typeof Section>, "children">;
}

function parseOfficeHours(input: Json | null): HoursInfo {
  const defaultHours: HoursInfo = { title: "Office Hours", items: [] };

  if (!input) return defaultHours;

  let data = input;

  // 1. Handle stringified JSON
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse office_hours JSON:", e);
      return defaultHours;
    }
  }

  // Helper to validate a single item
  const isValidItem = (item: unknown): item is HoursItem => {
    return (
      typeof item === "object" &&
      item !== null &&
      "label" in item &&
      "value" in item &&
      typeof (item as Record<string, unknown>).label === "string" &&
      typeof (item as Record<string, unknown>).value === "string"
    );
  };

  // 2. Check if it's an array of HoursItem
  if (Array.isArray(data)) {
    const items = data.filter(isValidItem);
    if (items.length > 0) {
      return { ...defaultHours, items: items as unknown as HoursItem[] };
    }
  }

  // 3. Check if it's an object with title and items
  if (typeof data === "object" && data !== null && !Array.isArray(data)) {
    const record = data as Record<string, unknown>;

    if ("items" in record && Array.isArray(record.items)) {
      const items = record.items.filter(isValidItem);
      if (items.length > 0) {
        const title =
          typeof record.title === "string" ? record.title : defaultHours.title;
        return { title, items };
      }
    }
  }

  return defaultHours;
}

export default function DirectContactsSection({
  title = "Direct Contacts",
  backgroundText = "CONTACT",
  titleColor = "var(--color-primary-dark)",
  outlineColor = "var(--color-neutral-light)",
  align = "left",
  fontSize = "md:text-3xl lg:text-4xl",
  underline = false,
  mapImage = "/map-placeholder.png",
  sectionProps,
}: DirectContactsSectionProps) {
  return (
    <Section
      {...sectionProps}
      background={sectionProps?.background || "bg-background"}
      className={`${sectionProps?.className || ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title={title}
          background={backgroundText}
          outlineColor={outlineColor}
          titleColor={titleColor}
          align={align}
          className="mb-8"
          fontSize={fontSize}
          underline={underline}
        />

        <Suspense fallback={<ContactsSkeleton />}>
          <ContactsContent mapImage={mapImage} />
        </Suspense>
      </div>
    </Section>
  );
}

function ContactsSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-10">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 dark:bg-zinc-800 rounded-sm animate-pulse"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-64 bg-gray-200 dark:bg-zinc-800 rounded-sm animate-pulse" />
        <div className="h-64 bg-gray-200 dark:bg-zinc-800 rounded-sm animate-pulse" />
      </div>
    </div>
  );
}

async function ContactsContent({ mapImage }: { mapImage: string }) {
  "use cache";
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_info")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    return (
      <div className="text-center py-12 col-span-full">
        <p className="text-zinc-600 dark:text-zinc-400">
          Unable to load contacts.
        </p>
      </div>
    );
  }

  if (!data) return null;

  const contactChannels: ContactChannel[] = [];
  if (data.general_email)
    contactChannels.push({
      label: "General",
      value: data.general_email,
      href: `mailto:${data.general_email}`,
    });
  if (data.business_email)
    contactChannels.push({
      label: "Business",
      value: data.business_email,
      href: `mailto:${data.business_email}`,
    });
  if (data.careers_email)
    contactChannels.push({
      label: "Careers",
      value: data.careers_email,
      href: `mailto:${data.careers_email}`,
    });
  if (data.phone)
    contactChannels.push({
      label: "Phone",
      value: data.phone,
      href: `tel:${data.phone.replace(/[^0-9+]/g, "")}`,
    });

  const hours = parseOfficeHours(data.office_hours);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {contactChannels.map((c, i) => (
          <a
            key={`cc-${i}`}
            href={c.href}
            className="group block rounded-sm border border-secondary-dark/40 bg-background p-5 hover:border-primary-medium/50 transition-colors"
          >
            <div className="text-xs uppercase tracking-wide text-secondary-dark/80">
              {c.label}
            </div>
            <div className="mt-1 text-primary-dark font-semibold text-sm">
              {c.value}
            </div>
          </a>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-sm border border-secondary-dark/40 bg-background p-6">
          <h4 className="text-primary-dark font-semibold tracking-tight">
            {hours.title}
          </h4>
          <div className="mt-3 space-y-2">
            {hours.items.map((h, i) => (
              <div key={`hr-${i}`} className="flex items-center justify-between">
                <div className="text-secondary-dark">{h.label}</div>
                <div className="text-primary-dark font-medium">{h.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-sm overflow-hidden border border-secondary-dark">
          <div className="relative h-64 md:h-80 lg:h-96">
            {data.map_link ? (
              <a
                href={data.map_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative"
              >
                <Image src={mapImage} alt="Map" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors">
                  <span className="sr-only">Open Map</span>
                </div>
              </a>
            ) : (
              <Image src={mapImage} alt="Map" fill className="object-cover" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
