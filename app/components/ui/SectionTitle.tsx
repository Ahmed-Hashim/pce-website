import React from "react";

export interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  background?: string; // large faint word behind
  align?: "left" | "center" | "right";
  className?: string;
  outlineColor?: string; // stroke color for background word
  outlineWidth?: number; // stroke width in px
  backgroundOpacity?: number; // 0..1 opacity for outline
  titleColor?: string; // color for the main title text
  backgroundTextColor?: string; // color for the background text (when not using outline)
}

export default function SectionTitle({
  eyebrow,
  title,
  background,
  align = "center",
  className = "",
  outlineColor = "var(--color-accent)",
  outlineWidth = 0.5,
  backgroundOpacity = 0.2,
  titleColor = "var(--color-bg)",
  backgroundTextColor,
}: SectionTitleProps) {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : align === "right"
      ? "items-end text-right"
      : "items-center text-center";

  return (
    <div className={`relative w-full ${alignment} ${className}`}>
      {/* Background word with luxury styling */}
      {background ? (
        <span
          aria-hidden="true"
          className={`absolute py-4 select-none pointer-events-none inset-x-0 -top-8 md:-top-12 text-7xl md:text-8xl font-extrabold tracking-wider`}
          style={{
            lineHeight: 1,
            color: "transparent",
            WebkitTextStrokeWidth: outlineWidth,
            WebkitTextStrokeColor: backgroundTextColor || outlineColor,
            opacity: backgroundOpacity,
            whiteSpace: "nowrap",
            overflow: "hidden",
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 90%)",
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 90%)",
            textShadow: "0 0 40px rgba(163, 140, 98, 0.1)",
          }}
        >
          {background}
        </span>
      ) : null}

      {/* Luxury eyebrow with decorative elements */}
      {eyebrow ? (
        <div className="relative z-10 flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-px bg-linear-to-r from-transparent via-accent to-transparent" />
          <p className="uppercase tracking-[0.3em] text-sm md:text-base font-medium text-[--color-text] whitespace-nowrap">
            {eyebrow}
          </p>
          <div className="w-12 h-px bg-linear-to-r from-transparent via-accent to-transparent" />
        </div>
      ) : null}

      {/* Main title with luxury gradient effect */}
      <h2
        className={`relative z-10 mt-4 text-4xl md:text-6xl font-bold  bg-linear-to-r from-${titleColor} via-accent to-${titleColor} bg-clip-text text-transparent py-4`}
        style={{
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {title}
      </h2>
      
      {/* Subtle decorative underline */}
      <div className="relative z-10 mt-6">
        <div className="w-24 h-1 bg-linear-to-r from-transparent via-accent to-transparent mx-auto rounded-full" />
      </div>
    </div>
  );
}
