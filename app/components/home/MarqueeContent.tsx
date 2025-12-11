"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import TriangleIcon from "../ui/TriangleIcon";

interface MarqueeContentProps {
  items: string[];
  separatorIcon?: React.ReactNode;
  speed?: number;
}

export default function MarqueeContent({
  items,
  separatorIcon = <TriangleIcon className="text-secondary-dark" />,
  speed = 100,
}: MarqueeContentProps) {
  return (
    <Marquee
      speed={speed}
      autoFill={true}
      pauseOnHover={true}
      gradient={false}
      className="bg-primary-dark"
    >
      <div className="flex items-center gap-8 p-5">
        {items.map((label, index) => (
          <React.Fragment key={index}>
            <small className="text-3xl text-white mx-4">{label}</small>

            {separatorIcon && (
              <span
                aria-hidden="true"
                className="inline-flex items-center justify-center animate-spin"
                style={{ animationDuration: "4s" }}
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
