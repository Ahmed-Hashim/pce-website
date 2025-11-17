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
    <div className="rounded-sm border border-secondary-dark p-6 bg-background shadow-sm">
      {person.imageSrc ? (
        <div className="relative mx-auto w-36 h-36 md:w-40 md:h-40 rounded-sm overflow-hidden shrink-0 shadow-sm">
          <Image src={person.imageSrc} alt={person.name} fill className="object-cover" />
        </div>
      ) : null}
      <div className="mt-4 text-center">
        <h4 className="text-base md:text-lg font-semibold text-primary-dark">{person.name}</h4>
        <p className="text-xs text-secondary-dark">{person.title || person.role}</p>
      </div>
      {person.description ? (
        <p className="mt-3 text-sm text-secondary-dark leading-relaxed">{person.description}</p>
      ) : null}
    </div>
  );
}
