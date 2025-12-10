import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import CompanyCard from "../ui/CompanyCard";
import Section from "../ui/Section";
import { createClient } from "@/utils/supabase/supabaseServer";
import { Tables } from "@/utils/supabase/supabase";

// 1. Main Component (Synchronous Wrapper)
export default function HoldingGroupSection() {
  return (
    <Section container={false} className="bg-primary-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* We wrap the content in Suspense so the Section background loads instantly */}
        <Suspense fallback={<LoadingSkeleton />}>
          <GroupDataContent />
        </Suspense>
      </div>
    </Section>
  );
}

// 2. The Async Content (Fetches ONCE)
async function GroupDataContent() {
  "use cache";
  const supabase = await createClient();

  // ✅ OPTIMIZED: One single request for everything
  const { data, error } = await supabase
    .from("group_data")
    .select("*")
    .order("id", { ascending: true });

  if (error) console.error(error);
  if (!data || data.length === 0) return null;

  // ⚡ JS Filtering is faster than a second DB call
  const holdingCompany = data.find((item) => item.holding === true);
  const subsidiaries = data.filter((item) => item.holding === false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-end">
      {/* --- Left Column: Title + Holding Card --- */}
      <div className="flex flex-col gap-6">
        <SectionTitle
          title="Our Group"
          outlineColor="var(--color-primary-medium)"
          titleColor="text-white"
          className="text-center md:text-left items-center md:items-start"
        />

        {/* Render Holding Card if it exists */}
        {holdingCompany ? (
          <HoldingCard data={holdingCompany} />
        ) : (
          <div className="p-4 border border-dashed border-gray-400/30 rounded text-sm text-gray-500">
            Holding company data missing
          </div>
        )}
      </div>

      {/* --- Right Column: Subsidiaries Grid --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 lg:gap-6">
        {subsidiaries.map((company) => (
          <CompanyCard
            key={company.id}
            name={company.name}
            logo={company.logo_url || ""}
            // Fallback for missing abbreviation
            abbrev={company.name.substring(0, 2).toUpperCase()}
            href={company.website_link || "#"}
          />
        ))}
      </div>
    </div>
  );
}

// 3. Extracted UI Component for the Holding Card (Cleaner Code)
function HoldingCard({ data }: { data: Tables<'group_data'> }) {
  const hasLink = !!data.website_link;
  const Wrapper = hasLink ? Link : "div";
  const wrapperProps = hasLink
    ? { href: data.website_link, className: "block cursor-pointer" }
    : { className: "block cursor-default" };

  // Logic to determine style based on Link vs No Link
  const containerClass = hasLink
    ? "bg-white border-white/10 hover:bg-white/80"
    : "bg-primary-dark border-white/10 hover:bg-primary-dark/95"; // Darker background for button style

  const iconBgClass = hasLink ? "bg-black/20 text-white" : "bg-primary-dark/20 text-white";
  const logoClass = hasLink ? "object-contain" : "object-contain invert-100 brightness-0"; // Invert logo for dark bg
  const textColorClass = hasLink ? "text-primary-dark" : "text-white";

  return (
    // @ts-expect-error - Dynamic components sometimes annoy TS
    <Wrapper {...wrapperProps}>
      <div
        className={`relative border rounded-sm p-6 sm:p-7 flex items-center gap-6 transition-colors ${containerClass}`}
      >
        <div className={`absolute top-3 right-3 z-10 rounded-md p-1 ${iconBgClass}`}>
          <LinkIcon size={16} />
        </div>

        {/* Link Layout (Standard) */}
        {hasLink ? (
          <>
            <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0">
              {data.logo_url && (
                <Image src={data.logo_url} alt={data.name} fill className={logoClass} />
              )}
            </div>
            <div className="flex-1">
              <h5 className="font-bold tracking-wide text-primary-dark">{data.name}</h5>
              {data.description && (
                <p className={`text-left leading-tight mt-2 text-sm ${textColorClass}`}>
                  {data.description}
                </p>
              )}
            </div>
          </>
        ) : (
          // Button Layout (Inverted/Dark)
          <div className="flex-1">
            <div className="flex justify-center mb-4">
              <div className="relative w-36 h-16">
                {data.logo_url && (
                  <Image src={data.logo_url} alt={data.name} fill className={logoClass} />
                )}
              </div>
            </div>
            {data.description && (
              <h5 className={`text-left leading-tight ${textColorClass}`}>
                {data.description}
              </h5>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
}

// 4. Loading State
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-end">
      <div className="flex flex-col gap-6">
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded" />
        <div className="h-48 w-full bg-gray-200 animate-pulse rounded" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 lg:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-32 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>
    </div>
  );
}