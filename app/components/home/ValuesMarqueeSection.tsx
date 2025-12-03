import { Suspense } from "react";
import { createClient } from "@/utils/supabase/supabaseServer";
import MarqueeContent from "./MarqueeContent";
import { coreValues } from "@/app/data/values";

export default function ValuesMarqueeSection() {
  return (
    <div className="w-full">
      <Suspense fallback={<ValuesSkeleton />}>
        <ValuesList />
      </Suspense>
    </div>
  );
}

function ValuesSkeleton() {
  return (
    <div className="w-full h-24 bg-primary-dark animate-pulse flex items-center justify-center">
      <div className="w-1/2 h-8 bg-white/20 rounded"></div>
    </div>
  );
}

async function ValuesList() {
  "use cache";
  const supabase = createClient();
  const { data: aboutData } = await supabase
    .from("about")
    .select("values")
    .limit(1)
    .single();

  const values =
    aboutData?.values && Array.isArray(aboutData.values)
      ? (aboutData.values as string[])
      : coreValues;

  return <MarqueeContent items={values} />;
}

