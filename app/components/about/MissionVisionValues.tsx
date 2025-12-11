import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";
import { LuTarget, LuEye, LuAward } from "react-icons/lu";
import { createClient } from "@/utils/supabase/supabaseServer";
import { Suspense } from "react";

export default function MissionVisionValues() {
  return (
    <Section className="relative w-full overflow-hidden">
        {/* Parallax background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: `url("./philo.png")`,
        }}
      />

 

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-5">
          <SectionTitle
            title="Our Philosophy"
            outlineColor="var(--color-neutral-light)"
            titleColor="text-white"
            align="center"
          />
        </div>

        {/* Content Grid */}
        <Suspense fallback={<MissionVisionSkeleton />}>
          <MissionVisionContent />
        </Suspense>
      </div>
    </Section>
  );
}

function MissionVisionSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 shadow-2xl rounded-sm overflow-hidden">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className="min-h-[500px] bg-gray-200 dark:bg-zinc-800 animate-pulse p-12 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="h-10 w-1/2 bg-gray-300 dark:bg-zinc-700 rounded-sm" />
            <div className="h-4 w-full bg-gray-300 dark:bg-zinc-700 rounded-sm" />
            <div className="h-4 w-full bg-gray-300 dark:bg-zinc-700 rounded-sm" />
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-zinc-700 rounded-sm" />
          </div>
          <div className="h-20 w-20 bg-gray-300 dark:bg-zinc-700 rounded-full self-end" />
        </div>
      ))}
    </div>
  );
}

async function MissionVisionContent() {
  "use cache";
  const supabase = await createClient();
  
  // Try fetching from 'about' table first as it matches the schema
  const { data: aboutData, error } = await supabase
    .from("about")
    .select("mission, vision, values")
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    return (
      <div className="text-center py-12 col-span-full text-red-500">
        Unable to load mission, vision, and values.
      </div>
    );
  }

  if (!aboutData) {
    return <div className="text-center py-12 col-span-full">No data found.</div>;
  }

  const { mission, vision, values } = aboutData;
  const labels = { mission: "Mission", vision: "Vision", values: "Values" };
  
  // Ensure values is an array of strings
  const valuesList = Array.isArray(values) ? values.map(String) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 shadow-2xl rounded-sm overflow-hidden pt-4">
      {/* VISION CARD - Left - Darkest Blue */}
      <div className="group relative p-12 flex flex-col justify-between min-h-[500px] bg-primary-dark/70 text-white transition-all duration-500 hover:z-10">
        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">
            <span className="block text-lg tracking-widest font-medium mb-1">Our</span>
            {labels.vision}
          </h3>
          <div className="text-neutral-light text-lg leading-relaxed font-light">
            <p className="text-white/90">{vision}</p>
          </div>
        </div>

        <div className="relative z-10 mt-12 flex justify-end">
          <LuEye className="w-20 h-20 text-neutral-light group-hover:text-primary-medium/50 group-hover:scale-110 transition-all duration-500" />
        </div>
      </div>

      {/* MISSION CARD - Center - Medium Blue */}
      <div className="group relative p-12 flex flex-col justify-between min-h-[500px] bg-primary-medium/70 text-white transition-all duration-500 hover:z-10 hover:scale-[1.02] hover:shadow-xl z-0">
        <div className="absolute inset-0 bg-linear-to-t from-primary-dark/20 to-transparent"></div>
        
        <div className="relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8 text-primary-dark">
            <span className="block text-lg tracking-widest font-medium mb-1">Our</span>
            {labels.mission}
          </h3>
          <div className="text-white/90 text-lg leading-relaxed font-light">
            <p className="text-white/90">{mission}</p>
          </div>
        </div>

        <div className="relative z-10 mt-12 flex justify-end">
          <LuTarget className="w-20 h-20 text-neutral-light group-hover:text-white/40 group-hover:scale-110 transition-all duration-500" />
        </div>
      </div>

      {/* VALUES CARD - Right - Light/White */}
      <div className="group relative p-12 flex flex-col justify-between min-h-[500px] bg-secondary-light/70 text-primary-dark transition-all duration-500 hover:z-10">
        <div className="absolute inset-0 bg-secondary-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8 text-primary-dark">
            <span className="text-primary-dark block text-lg tracking-widest font-medium mb-1">Our</span>
            {labels.values}
          </h3>
          <div className="text-secondary-dark text-lg leading-relaxed font-light">
            <ul className="space-y-4">
              {valuesList.map((v, i) => (
                <li key={`val-${i}`} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  <span className="font-medium text-white">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-10 mt-12 flex justify-end">
          <LuAward className="w-20 h-20 text-neutral-light group-hover:text-primary-medium/40 group-hover:scale-110 transition-all duration-500" />
        </div>
      </div>
    </div>
  );
}
