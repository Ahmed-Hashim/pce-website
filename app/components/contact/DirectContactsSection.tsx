import { createClient } from "@/utils/supabase/supabaseServer";
import { Suspense } from "react";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";
import type { ComponentProps } from "react";


interface ContactChannel {
  label: string;
  value: string;
  href: string;
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



export default function DirectContactsSection({
  title = "Direct Contacts",
  backgroundText = "CONTACT",
  titleColor = "text-white",
  outlineColor = "var(--color-neutral-light)",
  align = "left",
  fontSize = "md:text-3xl lg:text-4xl",
  underline = false,
  mapImage = "/map.jpeg",
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
      <div className="mt-10 w-full">
        <div className="h-64 md:h-80 lg:h-96 bg-gray-200 dark:bg-zinc-800 rounded-sm animate-pulse" />
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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {contactChannels.map((c, i) => (
          <a
            key={`cc-${i}`}
            href={c.href}
            className="group block rounded-sm border border-primary-medium  p-5 hover:border-primary-medium/50 transition-colors"
          >
            <div className="text-xs uppercase tracking-wide text-primary-medium">
              {c.label}
            </div>
            <div className="mt-1 text-white font-semibold text-sm">
              {c.value}
            </div>
          </a>
        ))}
      </div>

      <div className="mt-10 w-full">
        <div className="rounded-sm overflow-hidden border border-secondary-dark">
          <div className="relative h-64 md:h-80 lg:h-96 w-full">
            {data.map_link ? (
              <a
                href={data.map_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative group"
              >
                <Image src={"/map.jpeg"} alt="Map" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                  <span className="sr-only">Open Map</span>
                </div>
                 {/* Overlay Image */}
                <div className="absolute bottom-0 left-0 w-[35%] md:w-[25%] z-10 border-t border-r border-white/20 shadow-2xl">
                   <Image
                     src="/mapleft.jpeg"
                     alt="Map Detail"
                     width={400}
                     height={300}
                     className="w-full h-auto object-cover block"
                   />
                </div>
              </a>
            ) : (
              <div className="relative w-full h-full">
                <Image src={mapImage} alt="Map" fill className="object-cover" />
                 {/* Overlay Image */}
                <div className="absolute bottom-0 left-0 w-[35%] md:w-[25%] z-10 border-t border-r border-white/20 shadow-2xl">
                   <Image
                     src="/mapleft.jpeg"
                     alt="Map Detail"
                     width={400}
                     height={300}
                     className="w-full h-auto object-cover block"
                   />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
