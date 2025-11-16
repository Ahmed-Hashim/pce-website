"use client";

import React from "react";
import Marquee from "react-fast-marquee";


interface ValuesMarqueeSectionProps {
  items: string[];
  separatorIcon?: React.ReactNode;
  speed?: number;
  title?: string;
  eyebrow?: string;
  background?: string;
}

export default function ValuesMarqueeSection({
  items,
  separatorIcon,
  speed = 22,
}: ValuesMarqueeSectionProps) {
  return (
 
        <Marquee speed={speed} autoFill={true} pauseOnHover={true} gradient={false} className="bg-primary-dark">
          <div className="flex items-center gap-8 p-5">
            {items.map((label, index) => (
              <React.Fragment key={index}>
                <span className="text-3xl font-semibold text-white mx-4">
                  {label}
                </span>

                {separatorIcon && index < items.length && (
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center animate-spin"
                    style={{ animationDuration: '4s' }}
                  >
                    {separatorIcon}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </Marquee>

  );
}
