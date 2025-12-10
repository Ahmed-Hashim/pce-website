import Image from "next/image";
import SectionTitle from "../ui/SectionTitle";
import Section from "../ui/Section";
import { createClient } from "@/utils/supabase/supabaseServer";
import { Suspense } from "react";
import type { ComponentProps } from "react";
import WhoWeAreVideo from "./WhoWeAreVideo";

interface WhoWeAreSectionProps {
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
}

export default function WhoWeAreSection({ sectionProps }: WhoWeAreSectionProps) {
  return (
    <Section
      {...sectionProps}
      container={sectionProps?.container ?? false}
      className={`relative overflow-hidden ${sectionProps?.className || ""}`}
    >
      {/* Optimized background image with next/image */}
      <Image
        src="/Cover.png"
        alt=""
        fill
        priority={false}
        quality={75}
        sizes="100vw"
        className="object-cover object-center"
        style={{ zIndex: 0 }}
      />
      {/* Overlay for parallax effect */}
      <div className="absolute inset-0 bg-black/20" style={{ zIndex: 1 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Suspense fallback={<WhoWeAreSkeleton />}>
          <WhoWeAreContent />
        </Suspense>
      </div>
    </Section>
  );
}

function WhoWeAreSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center animate-pulse">
      <div className="space-y-6">
        {/* Title Skeleton */}
        <div className="h-10 w-48 bg-white/20 rounded-md mb-6"></div>
        {/* Text Skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-full bg-white/20 rounded-md"></div>
          <div className="h-4 w-5/6 bg-white/20 rounded-md"></div>
          <div className="h-4 w-4/6 bg-white/20 rounded-md"></div>
          <div className="h-4 w-full bg-white/20 rounded-md"></div>
        </div>
      </div>
      <div className="w-full">
        {/* Video Skeleton */}
        <div className="aspect-video bg-white/10 rounded-sm border border-white/20"></div>
      </div>
    </div>
  );
}

async function WhoWeAreContent() {
  "use cache";
  const supabase = await createClient();
  const { data: aboutData, error } = await supabase
    .from("about")
    .select("who_we_are, who_we_are_video_link")
    .limit(1)
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    return (
      <div className="text-center py-12 col-span-full">
        <p className="text-zinc-600 dark:text-zinc-400">
          Unable to load content.
        </p>
      </div>
    );
  }

  if (!aboutData) {
    return null;
  }

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Left Column - Title and Description */}
      <div className="space-y-6">
        <SectionTitle
          title="Who We Are"
          titleColor="text-white"
          className="text-center md:text-left items-center md:items-start mb-6"
        />
        <p className="max-w-lg text-white">{aboutData.who_we_are}</p>
      </div>

      {/* Right Column - Video */}
      <div className="w-full">
        <WhoWeAreVideo src={aboutData.who_we_are_video_link} />
      </div>
    </div>
  );
}
