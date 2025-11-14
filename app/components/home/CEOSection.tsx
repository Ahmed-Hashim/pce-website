"use client";
import Image from "next/image";
import SectionTitle from "../ui/SectionTitle";
import { useState } from "react";

interface CEO {
  name: string;
  title: string;
  company: string;
  description: string;
  imageSrc: string;
}

interface CompanyInfo {
  name: string;
  description: string;
}

interface CEOSectionProps {
  eyebrow?: string;
  title: string;
  background?: string;
  outlineColor?: string;
  titleColor?: string;
  backgroundTextColor?: string;
  ceos: CEO[];
  companies?: CompanyInfo[];
}

export default function CEOSection({
  title,
  background,
  ceos,
}: CEOSectionProps) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const uiLabels = {
    flipCardLabel: "Flip leader card",
    frontAriaLabel: "Leader profile front",
    backAriaLabel: "Leader description back",
  };

  const toggleFlip = (i: number) =>
    setFlipped((prev) => {
      const isFlipped = !!prev[i];
      const next: Record<number, boolean> = {};
      next[i] = !isFlipped; // ensure only one card is flipped at a time
      return next;
    });

  return (
    <section className="py-[var(--space-section-y-mobile)] sm:py-[var(--space-section-y-sm)] md:py-[var(--space-section-y-md)] lg:py-[var(--space-section-y-lg)] px-[var(--space-section-x-mobile)] sm:px-[var(--space-section-x-sm)] md:px-[var(--space-section-x-md)] lg:px-[var(--space-section-x-lg)] bg-linear-to-br from-accent/30 to-heading/20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title={title}
          background={background}
          outlineColor="var(--color-heading)"
          titleColor="bg"
          align="center"
          className="mb-20"
        />
    
        {/* CEO Profiles */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {ceos.map((ceo, index) => (
            <div
              key={index}
              role="button"
              aria-label={uiLabels.flipCardLabel}
              tabIndex={0}
              onClick={() => toggleFlip(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleFlip(index);
                }
              }}
              className="group relative bg-linear-to-b from-white/95 to-white/80 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out hover:-translate-y-2 cursor-pointer perspective-[1000px] overflow-hidden"
            >
              {/* Luxury accent border */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Flip wrapper */}
              <div
                className={`relative w-full h-[420px] transform-3d transition-transform duration-700 ${
                  flipped[index] ? "transform-[rotateY(180deg)]" : ""
                }`}
              >
                {/* Front face */}
                <div
                  aria-label={uiLabels.frontAriaLabel}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center [backface-visibility:hidden]"
                >
                  <div className="relative w-56 h-56 mb-8 rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-700">
                    <Image
                      src={ceo.imageSrc}
                      alt={ceo.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Luxury frame effect */}
                    <div className="absolute inset-0 rounded-full bg-linear-to-br from-transparent via-accent/5 to-transparent" />
                  </div>

                  <div className="relative z-10 space-y-4">
                    <h3 className="text-3xl font-bold bg-linear-to-r from-bg to-accent bg-clip-text text-transparent mb-2">
                      {ceo.name}
                    </h3>

                    <div className="inline-flex items-center px-6 py-2 bg-bg rounded-full border border-accent/30">
                      <p className="text-xl font-semibold text-heading tracking-wide">
                        {ceo.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back face */}
                <div
                  aria-label={uiLabels.backAriaLabel}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center [backface-visibility:hidden]"
                >
                  <div className="relative z-10 space-y-4">

                    <div className="px-4 my-4 py-6 bg-bg rounded-2xl border border-accent/30 shadow-sm ">
                      <p className="text-foreground-secondary text-sm  tracking-normal">
                        {ceo.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-accent/40 rounded-full" />
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-heading/30 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
