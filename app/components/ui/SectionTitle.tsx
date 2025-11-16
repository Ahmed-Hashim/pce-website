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
  outlineColor = "var(--color-primary-medium)",
  outlineWidth = 0.5,
  backgroundOpacity = 0.3,
  titleColor = "",
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
      {/* Background word (faint luxury) */}
      {background && (
        <span
          aria-hidden="true"
          className="absolute select-none pointer-events-none inset-x-0 -top-4 md:-top-6 font-extrabold tracking-widest text-[2rem] md:text-[3rem] lg:text-[4rem]"
          style={{
            color: "transparent",
            WebkitTextStrokeWidth: outlineWidth,
            WebkitTextStrokeColor: backgroundTextColor || outlineColor,
            opacity: backgroundOpacity,
            lineHeight: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textShadow: "0 0 40px rgba(163, 140, 98, 0.05)",
          }}
        >
          {background}
        </span>
      )}

      {/* Eyebrow with decorative lines */}
      {eyebrow && (
        <div className="relative z-10 flex items-center justify-center gap-4 mb-3 md:mb-4">
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-(--color-primary-medium) to-transparent" />
          <p className="uppercase tracking-widest text-xs md:text-sm font-medium text-neutral-light whitespace-nowrap">
            {eyebrow}
          </p>
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-(--color-primary-medium) to-transparent" />
        </div>
      )}

      {/* Main title */}
      <h2
        className="relative z-10 mt-2 md:mt-4 font-extrabold leading-tight text-3xl md:text-4xl lg:text-5xl"
        style={{
          color: titleColor,
          textShadow: "var(--text-shadow-soft)",
        }}
      >
        {title}
      </h2>

      {/* Subtle underline */}
      <div className="relative z-10 mt-4 md:mt-6">
        <div className="w-20 md:w-24 h-1 mx-auto rounded-full bg-linear-to-r from-transparent via-(--color-primary-medium) to-transparent" />
      </div>
    </div>
  );
}
