import { Suspense } from "react";
import { createClient } from "@/utils/supabase/supabaseServer";
import Section from "../ui/Section";
import TriangleIcon from "../ui/TriangleIcon";
import StatisticsAnimated, { StatItem } from "./StatisticsAnimated"; // Import the client component

// 1. The Main Component (Synchronous Wrapper)
export default function Statistics() {
  return (
    <Section className="relative overflow-hidden bg-primary-dark">
      {/* Background Decors render immediately */}
      <TriangleIcon className="absolute left-6 top-6 w-6 h-6 text-white/10" />
      <TriangleIcon className="absolute right-7 bottom-6 w-7 h-7 text-white/10" />
      <TriangleIcon className="absolute right-6 bottom-6 w-6 h-6 text-white/10" />

      {/* Suspense Boundary */}
      <Suspense fallback={<StatsSkeleton />}>
        {/* The Async Component goes here */}
        <StatisticsList />
      </Suspense>
    </Section>
  );
}

// 2. The Async Fetcher with "use cache"
async function StatisticsList() {
  "use cache"; // ✅ Experimental Next.js directive for caching this specific function

  const supabase = await createClient();
  const { data: stats, error } = await supabase
    .from("statistics")
    .select("title, stat")
    .order("id", { ascending: true });

  if (error || !stats || stats.length === 0) {
    return null; 
  }

  // Pass data to the Client Component
  return <StatisticsAnimated stats={stats as StatItem[]} />;
}

// 3. The Loading Skeleton
function StatsSkeleton() {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            {/* Number placeholder */}
            <div className="h-10 w-24 bg-white/10 rounded animate-pulse" />
            {/* Title placeholder */}
            <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}