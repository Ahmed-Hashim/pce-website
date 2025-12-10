import SectionTitle from "../ui/SectionTitle";
import ServiceCard from "../ui/ServiceCard";
import Section from "../ui/Section";
import { createClient } from "@/utils/supabase/supabaseServer";
import { Suspense } from "react";

export default function CoreServicesOverview() {
  return (
    <Section id="our-services" className="relative overflow-hidden">
      {/* <BackgroundDecor /> */}
<div
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: `url("./Layout.png")`,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <SectionTitle
            title="Our Services"
            outlineColor="var(--color-primary-dark)"
            titleColor="text-white"
            align="center"
          />
        </div>

        {/* ✅ FIX: Added fallback so the user sees a skeleton while loading */}
        <Suspense fallback={<ServicesSkeleton />}>
          <ServiceList />
        </Suspense>
      </div>
    </Section>
  );
}

// ✅ FIX: Cleaned up redundant div wrappers
// function BackgroundDecor() {
//   return (
//     <div className="absolute inset-0 pointer-events-none">
//       <div className="absolute right-[-20px] top-[20%] w-64 h-64 sm:w-80 sm:h-80 opacity-10">
//         <svg
//           viewBox="0 0 100 100"
//           preserveAspectRatio="none"
//           className="w-full h-full rotate-12"
//         >
//           <path
//             d="M 0 50 L 100 0 L 100 100 Z"
//             fill="var(--color-primary-medium)"
//           />
//         </svg>
//       </div>
//       <div className="absolute left-8 bottom-8 w-16 h-16 opacity-20">
//         <svg
//           viewBox="0 0 100 100"
//           preserveAspectRatio="none"
//           className="w-full h-full"
//         >
//           <path
//             d="M 0 50 L 100 0 L 100 100 Z"
//             fill="var(--color-primary-dark)"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// }

// ✅ NEW: Simple loading state
function ServicesSkeleton() {
  return (
    <div className="grid px-4 lg:px-0 grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
      {[1, 2, 3, 4].map((i) => (
        <div 
          key={i} 
          className="h-64 w-full bg-gray-200 dark:bg-zinc-800 rounded-2xl animate-pulse" 
        />
      ))}
    </div>
  );
}

async function ServiceList() {
  "use cache";
  const supabase = await createClient();

  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase Error:", error);
    return (
      <div className="text-center py-12 col-span-full">
        <p className="text-zinc-600 dark:text-zinc-400">
          Unable to load services.
        </p>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return <p className="text-center col-span-full">No services found</p>;
  }

  return (
    <div className="grid px-4 lg:px-0 grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          title={service.name}
          icon={service.icon_url || ""}
          image={service.image_url || ""}
          short_description={service.short_description || ""}
          callToAction={service.cta_subtitle || ""}
        />
      ))}
    </div>
  );
}