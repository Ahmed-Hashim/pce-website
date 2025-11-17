import SectionTitle from "../ui/SectionTitle";
import LeaderCard from "./LeaderCard";

interface PersonItem {
  name: string;
  role: string;
  imageSrc?: string;
  title?: string;
  description?: string;
  stats?: {
    projects?: number;
    years?: number;
    scope?: string[];
  };
  locations?: string[];
}

interface LeadershipListsProps {
  title: string;
  background?: string;
  directors: PersonItem[];
  
}

export default function LeadershipLists({ title, background, directors = [] }: LeadershipListsProps) {
  return (
    <section className="py-(--space-section-y-md) bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle title={title} background={background} outlineColor="var(--color-neutral-light)" titleColor="var(--color-primary-dark)" align="center" />
        <div className="gap-6 lg:gap-8 mt-10">
          <div className="rounded-sm border border-secondary-dark bg-primary-medium/10 backdrop-blur-sm p-6">
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
              {directors.map((m, i) => (
                <LeaderCard key={`leader-${i}`} person={m} />
              ))}
            </div>
          </div>
         
        </div>
      </div>
    </section>
  );
}
