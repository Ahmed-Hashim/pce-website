import { Suspense } from "react";
import SectionTitle from "../ui/SectionTitle";
import Section from "../ui/Section";
import { createClient } from "@/utils/supabase/supabaseServer";
import ClientsMarquee, { Client } from "./ClientsMarquee";
import type { ComponentProps } from "react";

// 1. Main Component (Synchronous Wrapper)
export default function ClientsSection({
  sectionProps,
}: {
  sectionProps?: Omit<ComponentProps<typeof Section>, "children">;
}) {
  return (
    <section
      id="our-clients"
      className="py-0"
    >
      <div className="mx-auto border-0 lg:border-y md:border-y lg:border-primary-medium py-12 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center lg:pl-10 gap-8 md:gap-0">
          {/* Left Column: Title/Copy */}
          <div className="lg:col-span-1 relative border-0 lg:border-r lg:border-primary-medium text-center ">
            <SectionTitle
              title="Our Clients"
              titleColor="accent"
              outlineColor="var(--color-primary-medium)"
              background="Clients"
              align="center"
            />
          </div>

          {/* Right Column: Wide Marquee of Logos */}
          <div className="lg:col-span-2">
            <Suspense fallback={<ClientsSkeleton />}>
              <ClientsDataContent />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

// 2. The Async Content (Fetches ONCE)
async function ClientsDataContent() {
  "use cache";
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching clients:", error);
    return null;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-36 text-gray-500">
        No clients found.
      </div>
    );
  }

  // Map to Client interface
  const clients: Client[] = data.map((item) => ({
    id: item.id,
    name: item.name,
    logo: item.logo_link,
  }));

  return <ClientsMarquee clients={clients} />;
}

// 3. Loading State
function ClientsSkeleton() {
  return (
    <div className="flex overflow-hidden relative h-36 items-center">
      <div className="flex animate-pulse gap-8 px-4 w-full">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-200/20 rounded-full shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
