import SectionTitle from "../ui/SectionTitle";
import { FaBullseye, FaCheck, FaEye, FaGem } from "react-icons/fa";

interface MissionVisionValuesProps {
  title: string;
  background?: string;
  mission: string[];
  vision: string[];
  values: string[];
  labels?: {
    mission: string;
    vision: string;
    values: string;
  };
}

export default function MissionVisionValues({ title, background, mission, vision, values, labels = { mission: "Mission", vision: "Vision", values: "Values" } }: MissionVisionValuesProps) {
  return (
    <section className="py-(--space-section-y-md) bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle title={title} background={background} outlineColor="var(--color-neutral-light)" titleColor="var(--color-primary-dark)" align="center" />
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-10">
          <div className="rounded-2xl border border-secondary-dark bg-white/50 backdrop-blur-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary-dark text-2xl"><FaBullseye /></span>
              <h3 className="text-xl font-semibold text-primary-medium">{labels.mission}</h3>
            </div>
            <ul className="space-y-3 text-primary-dark">
              {mission.map((item, i) => (
                <li key={`m-${i}`} className="flex items-start">
                  <span className="text-primary-medium mr-3"><FaCheck /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-secondary-dark bg-white/50 backdrop-blur-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary-dark text-2xl"><FaEye /></span>
              <h3 className="text-xl font-semibold text-primary-medium">{labels.vision}</h3>
            </div>
            <ul className="space-y-3 text-primary-dark">
              {vision.map((item, i) => (
                <li key={`v-${i}`} className="flex items-start">
                  <span className="text-primary-medium mr-3"><FaCheck /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-secondary-dark bg-white/50 backdrop-blur-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary-dark text-2xl"><FaGem /></span>
              <h3 className="text-xl font-semibold text-primary-medium">{labels.values}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {values.map((v, i) => (
                <span key={`val-${i}`} className="px-4 py-2 rounded-full  text-primary-medium text-sm font-medium">
                  <li className="px-4 py-2 rounded-full text-primary-dark text-sm font-medium">{v}</li>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

