import SectionTitle from "../ui/SectionTitle";
import CEOCard from "../ui/CEOCard";
import Section from "../ui/Section";
import { createClient } from "@/utils/supabase/supabaseServer";
import { Suspense } from "react";

interface CEOSectionProps {
  eyebrow?: string;
  title: string;
  background?: string;
  outlineColor?: string;
  titleColor?: string;
  backgroundTextColor?: string;
  className?: string;
}

export default function CEOSection({
  title,
  background,
  className = "",
}: CEOSectionProps) {
  return (
    <Section className={className || "relative"}>
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{ backgroundImage: `url("./Layout.png")` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle
          title={title}
          background={background}
          outlineColor="var(--color-neutral-light)"
          titleColor="text-white"
          align="center"
        />

        <Suspense fallback={<CEOSkeleton />}>
          <CEOList />
        </Suspense>
      </div>
    </Section>
  );
}

function CEOSkeleton() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-96 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}

async function CEOList() {
  "use cache";

  const supabase = await createClient();
  const { data: ceos, error } = await supabase
    .from("leadership_team")
    .select("*")
    .eq("type", "board_member")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase Error:", error);
    return (
      <div className="text-center py-12 col-span-full text-white">
        Unable to load board members.
      </div>
    );
  }

  if (!ceos || ceos.length === 0) {
    return (
      <p className="text-center col-span-full text-white">
        No board members found
      </p>
    );
  }

  return (
    <div className="mt-12 space-y-12">

      {/* FIRST ROW — ALWAYS 2 CARDS CENTERED */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ceos.slice(0, 2).map((ceo, index) => (
          <CEOCard
            key={ceo.id}
            ceo={{
              name: ceo.full_name,
              title: ceo.title,
              description: ceo.description || "",
              imageSrc: ceo.avatar_url || "",
            }}
            index={index}
          />
        ))}
      </div>

      {/* REMAINING ROWS — 3 COLS */}
      {ceos.length > 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ceos.slice(2).map((ceo, index) => (
            <CEOCard
              key={ceo.id}
              ceo={{
                name: ceo.full_name,
                title: ceo.title,
                description: ceo.description || "",
                imageSrc: ceo.avatar_url || "",
              }}
              index={index + 2}
            />
          ))}
        </div>
      )}

    </div>
  );
}
