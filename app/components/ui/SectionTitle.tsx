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
  title,
  align = "center",
  className = "",
  titleColor = "",
}: SectionTitleProps) {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : align === "right"
      ? "items-end text-right"
      : "items-center text-center";
  return (
    <div className={`relative w-full flex flex-col ${alignment} ${className}`}>
      {/* Main title */}
      <h2
        className="relative z-10 mt-2 md:mt-4 font-extrabold leading-tight  md:text-4xl lg:text-5xl"
        style={{
          color: titleColor,
          textShadow: "var(--text-shadow-soft)",
        }}
      >
        {title}
      </h2>
      {/* Subtle underline */}
      <div className="relative z-10 mt-4 md:mt-6">
        <div className="w-20 md:w-24 h-1 rounded-full bg-linear-to-r from-transparent via-(--color-primary-medium) to-transparent" />
      </div>
    </div>
  );
}
