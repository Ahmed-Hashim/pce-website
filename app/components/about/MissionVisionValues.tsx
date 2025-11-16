import SectionTitle from "../ui/SectionTitle";

interface MissionVisionValuesProps {
  title: string;
  background?: string;
  description?: string;
  mission: string | string[];
  vision: string | string[];
  values: string[];
  labels?: {
    mission: string;
    vision: string;
    values: string;
  };
}

export default function MissionVisionValues({ title, background, description, mission, vision, values, labels = { mission: "Mission", vision: "Vision", values: "Values" } }: MissionVisionValuesProps) {
  return (
    <section>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle title={title} background={background} outlineColor="var(--color-neutral-light)" titleColor="var(--color-primary-dark)" align="center" />
        {description ? (
          <p className="mt-4 max-w-3xl mx-auto text-left text-secondary-dark text-sm md:text-base leading-tight">{description}</p>
        ) : null}

        <div className="mt-12 grid md:grid-cols-3 gap-10 items-start justify-items-center">
          <div className="text-center">
            <div className="flex items-center gap-3">
              <span className="inline-block h-5 w-0.5 bg-primary-medium"></span>
              <h3 className=" uppercase tracking-wide text-primary-dark">{labels.mission}</h3>
            </div>
            {typeof mission === "string" ? (
              <p className="mt-4 text-left text-primary-dark  md:text-base leading-tight">{mission}</p>
            ) : (
              <div className="mt-4 space-y-3">
                {mission.map((item, i) => (
                  <div key={`m-${i}`} className="flex items-start justify-center gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-medium"></span>
                    <p className="text-primary-dark text-sm md:text-base leading-tight text-left">{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:border-l md:border-secondary-dark/20 md:pl-8 text-center">
            <div className="flex items-center justify-left gap-3">
              <span className="inline-block h-5 w-0.5 bg-primary-medium"></span>
              <h3 className=" uppercase tracking-wide text-primary-dark">{labels.vision}</h3>
            </div>
            {typeof vision === "string" ? (
              <p className="mt-4 text-left text-primary-dark text-sm md:text-base leading-tight">{vision}</p>
            ) : (
              <div className="mt-4 space-y-3">
                {vision.map((item, i) => (
                  <div key={`v-${i}`} className="flex items-start justify-center gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-medium"></span>
                    <p className="text-primary-dark text-sm md:text-base leading-tight text-center">{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:border-l md:border-secondary-dark/20 md:pl-8 text-center">
            <div className="flex items-center justify-left gap-3">
              <span className="inline-block h-5 w-0.5 bg-primary-medium"></span>
              <h3 className=" uppercase tracking-wide text-primary-dark">{labels.values}</h3>
            </div>
            <div className="mt-4 space-y-3">
              {values.map((v, i) => (
                <div key={`val-${i}`} className="flex items-start justify-left gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-medium"></span>
                  <p className="text-primary-dark text-sm md:text-base leading-tight text-center">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
