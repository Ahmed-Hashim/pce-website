import { Suspense } from "react";
import { createClient } from "@/utils/supabase/supabaseServer";
import HeroSlider, { HeroSlide } from "./HeroSlider";

// 1. Main Component (Synchronous Wrapper)
export default function HeroSection() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HeroDataContent />
    </Suspense>
  );
}

// 2. The Async Content (Fetches ONCE)
async function HeroDataContent() {
  "use cache";
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hero")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching hero data:", error);
    return null; // Or some error state
  }

  if (!data || data.length === 0) {
    return null;
  }

  // Map database rows to HeroSlide interface
  const slides: HeroSlide[] = data.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.image_url || "",
    link: item.cta_link || "#",
    buttonText: item.cta_name,
  }));

  return <HeroSlider slides={slides} />;
}

// 3. Loading State
function LoadingSkeleton() {
  return (
    <section className="relative w-full h-[calc(100dvh-5.5rem)] bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-slate-800 animate-pulse" />
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-8 md:px-16 max-w-5xl mx-auto">
        <div className="w-full max-w-3xl flex flex-col items-center gap-6">
          {/* Title Skeleton */}
          <div className="h-12 sm:h-16 md:h-20 w-3/4 bg-white/10 rounded animate-pulse" />
          <div className="h-12 sm:h-16 md:h-20 w-1/2 bg-white/10 rounded animate-pulse" />
          
          {/* Description Skeleton */}
          <div className="h-6 sm:h-8 w-2/3 bg-white/10 rounded animate-pulse mt-4" />
          <div className="h-6 sm:h-8 w-1/2 bg-white/10 rounded animate-pulse" />

          {/* Button Skeleton */}
          <div className="h-12 sm:h-14 w-40 sm:w-48 bg-white/10 rounded animate-pulse mt-8" />
        </div>
      </div>
    </section>
  );
}
