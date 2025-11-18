import React from "react";

export interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  background?: string;
  align?: "left" | "center" | "right";
  className?: string;
  outlineColor?: string;
  outlineWidth?: number;
  backgroundOpacity?: number;
  titleColor?: string;
  backgroundTextColor?: string;
  underline?: boolean;
  fontSize?: string;
}

export default function SectionTitle({
  title,
  align = "center",
  className = "",
  titleColor = "",
  underline = true,
  fontSize = "",  
}: SectionTitleProps) {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : align === "right"
      ? "items-end text-right"
      : "items-center text-center";
  
  return (
    <div className={`relative w-full flex flex-col ${alignment} ${className}`}>
      {/* Title with NO margins */}
      <h2
        className={`relative z-10 font-extrabold leading-tight ${fontSize || "md:text-4xl lg:text-5xl"}`}
        style={{
          color: titleColor || undefined,
          textShadow: "var(--text-shadow-soft)",
          margin: 0, // ✅ Force zero margin
          padding:0,
        }}
      >
        {title}
      </h2>
      
      {/* Underline - minimal spacing */}
      {underline && (
        <div className="relative z-10 mt-2">
          <div 
            className="w-20 md:w-24 h-1 rounded-full"
            style={{
              background: `linear-gradient(to right, transparent, var(--color-primary-medium), transparent)`
            }}
          />
        </div>
      )}
    </div>
  );
}