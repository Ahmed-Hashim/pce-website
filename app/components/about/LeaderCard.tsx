import Image from "next/image";

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

interface LeaderCardProps {
  person: PersonItem;
}

export default function LeaderCard({ person }: LeaderCardProps) {
  return (
    <div className="group rounded-xl border border-secondary-dark p-4 bg-background/90 hover:bg-background transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
      {person.imageSrc ? (
        <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl overflow-hidden shrink-0 shadow-md">
          <Image src={person.imageSrc} alt={person.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      ) : null}
      <div className="mt-4 text-center">
        <h4 className="text-base md:text-lg font-semibold text-primary-medium">{person.name}</h4>
        <p className="text-xs text-secondary-dark">{person.title || person.role}</p>
      </div>
      {person.description ? (
        <p className="mt-3 text-xs text-primary-medium leading-relaxed">{person.description}</p>
      ) : null}
      {person.stats ? (
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-primary-medium bg-background px-3 py-2 text-center">
            <p className="text-sm font-bold text-primary-medium">{person.stats.projects ?? 0}</p>
            <p className="text-[10px] text-primary-medium">Projects</p>
          </div>
          <div className="rounded-lg border border-primary-medium bg-background px-3 py-2 text-center">
            <p className="text-sm font-bold text-primary-medium">{person.stats.years ?? 0}</p>
            <p className="text-[10px] text-primary-medium">Years</p>
          </div>
          <div className="rounded-lg border border-primary-medium bg-background px-3 py-2 text-center">
            <p className="text-sm font-bold text-primary-medium">{person.stats.scope?.length ?? 0}</p>
            <p className="text-[10px] text-primary-medium">Scope</p>
          </div>
        </div>
      ) : null}
      {person.stats?.scope && person.stats.scope.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {person.stats.scope.map((s, si) => (
            <span key={`scope-${si}`} className="px-3 py-1 rounded-full border border-secondary-dark text-primary-medium text-[11px]">
              {s}
            </span>
          ))}
        </div>
      ) : null}
      {person.locations && person.locations.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {person.locations.map((loc, li) => (
            <span key={`loc-${li}`} className="px-3 py-1 rounded-full border border-secondary-dark bg-primary-medium text-primary-dark text-[11px]">
              {loc}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
