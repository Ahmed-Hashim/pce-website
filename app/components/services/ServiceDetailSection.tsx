import { ReactNode } from "react";

interface ServiceDetailSectionProps {
  title: string;
  icon: ReactNode;
  items: string[];
}

export default function ServiceDetailSection({ title, icon, items }: ServiceDetailSectionProps) {
  return (
    <section className="py-[var(--space-section-y-md)] bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-sm border border-secondary-dark bg-white/50 backdrop-blur-sm p-6 md:p-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-primary-medium text-3xl">{icon}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-medium">{title}</h2>
          </div>
          <ul className="space-y-3 text-secondary-dark">
            {items.map((item, i) => (
              <li key={`item-${i}`} className="flex items-start">
                <span className="text-primary-medium mr-3">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
