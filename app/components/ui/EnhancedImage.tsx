import Image from "next/image";
import { useState } from "react";

interface EnhancedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  caption?: string;
  subCaption?: string;
  showOverlay?: boolean;
  overlayGradient?: string;
  hoverEffect?: boolean | string;
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  rounded?: boolean | string;
  shadow?: boolean | string;
  border?: boolean | string;
  onClick?: () => void;
}

export default function EnhancedImage({
  src,
  alt,
  width = 600,
  height = 400,
  className = "",
  caption = "",
  subCaption = "",
  showOverlay = true,
  overlayGradient = "bg-linear-to-t from-primary-dark/60 via-transparent to-transparent",
  hoverEffect = true,
  priority = false,
  objectFit = "cover",
  rounded = true,
  shadow = true,
  border = true,
  onClick
}: EnhancedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const getRoundedClass = () => {
    if (rounded === true) return "rounded-2xl";
    if (typeof rounded === "string") return `rounded-${rounded}`;
    return "";
  };

  const getShadowClass = () => {
    if (shadow === true) return "shadow-2xl";
    if (typeof shadow === "string") return `shadow-${shadow}`;
    return "";
  };

  const getBorderClass = () => {
    if (border === true) return "border border-secondary-dark";
    if (typeof border === "string") {
      if (border.includes("border")) return border; // Full border class provided
      return `border border-${border}`; // Just the variant provided
    }
    return "";
  };

  const getHoverEffectClass = () => {
    if (hoverEffect === true) return "transition-transform duration-700 group-hover:scale-105";
    if (typeof hoverEffect === "string") return `transition-transform duration-700 group-hover:${hoverEffect}`;
    return "";
  };

  const containerClasses = `
    relative overflow-hidden
    ${getRoundedClass()}
    ${getShadowClass()}
    ${getBorderClass()}
    ${hoverEffect ? "group" : ""}
    ${onClick ? "cursor-pointer" : ""}
    ${className}
  `.trim();

  const imageClasses = `
    w-full h-full
    object-${objectFit}
    ${getHoverEffectClass()}
    ${isLoading ? "opacity-0" : "opacity-100"}
    ${hasError ? "hidden" : ""}
  `.trim();

  return (
    <div className={containerClasses} onClick={onClick}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-border/20">
          <div className="w-12 h-12 bg-primary-medium/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-primary-medium animate-spin" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-border/40">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-medium/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-primary-medium" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-secondary-dark text-sm">Image failed to load</p>
          </div>
        </div>
      )}

      {/* Main Image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imageClasses}
        onLoad={handleImageLoad}
        onError={handleImageError}
        priority={priority}
      />

      {/* Overlay */}
      {showOverlay && (caption || subCaption) && !hasError && (
        <div className={`absolute inset-0 ${overlayGradient}`}>
          <div className="absolute bottom-6 left-6 right-6">
            {caption && (
              <p className="text-white font-semibold text-lg">{caption}</p>
            )}
            {subCaption && (
              <p className="text-gray-300 text-sm">{subCaption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}