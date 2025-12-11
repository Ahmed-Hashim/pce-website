import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";
import { createClient } from "@/utils/supabase/supabaseServer";
import { Suspense } from "react";

interface AwardsCertificationsProps {
  title: string;
  background?: string;
  labels?: {
    awards: string;
    certifications: string;
  };
}

export default function AwardsCertifications({
  title,
  background,
  labels = { awards: "Awards", certifications: "Certifications" },
}: AwardsCertificationsProps) {
  return (
    <section className="relative bg-primary-dark ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={title} background={background} titleColor="text-white" className="mb-7" />
        <div
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat "
        style={{
          backgroundImage: `url("./awards-bg-1.webp")`,
        
        }}
      />

 
        <Suspense fallback={<AwardsSkeleton />}>
          <AwardsList labels={labels} />
        </Suspense>
      </div>
    </section>
  );
}

function AwardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="w-full max-w-sm bg-gray-200 dark:bg-zinc-800 rounded-xl animate-pulse aspect-3/4" />
      ))}
    </div>
  );
}

async function AwardsList({ labels }: { labels: { awards: string; certifications: string } }) {
  "use cache";
  const supabase = await createClient();

  const { data: items, error } = await supabase
    .from("awards_certifications")
    .select("*")
    .order("year", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error);
    return (
      <div className="text-center py-12 col-span-full">
        <p className="text-zinc-600 dark:text-zinc-400">
          Unable to load awards and certifications.
        </p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <p className="text-center col-span-full">No awards or certifications found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  justify-items-center">
      {items.map((item, index) => {
        // Determine type/category text
        // Assuming 'type' in DB is 'award' or 'certification' or similar
        // Default to labels.awards if unknown, or check string content
        // const isCert = (item.type || "").toLowerCase().includes("cert");/
        // const badgeText = isCert ? labels.certifications : labels.awards;

        return (
          <div
            key={`${item.title}-${index}`}
            className="group relative pt-6 h-full w-full max-w-sm"
          >
            {/* Tabs */}
            

            {/* Main Card Body */}
            <div className=" rounded-xl p-4 pt-6 shadow-lg shadow-primary-dark bg-accent/5 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full flex flex-col relative z-0">
              
              {/* Image Frame */}
              <div className="bg-white p-2 rounded-sm shadow-inner mb-4 mx-auto w-3/4 aspect-3/4 relative transform group-hover:translate-y-[-2px] transition-transform duration-300">
                <div className="relative w-full h-full border border-neutral-light/50">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-contain p-1"
                    />
                  ) : (
                    <Image
                       src="/cert.png" //{item.image_url}
                      alt={item.title}
                      fill
                      className="object-contain p-1"
                    />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="text-center mt-auto">
                <h3 className="text-sm font-semibold text-white mb-1 leading-tight line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[10px] text-neutral-light font-light line-clamp-1">
                  {item.subtitle || item.type} 
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
