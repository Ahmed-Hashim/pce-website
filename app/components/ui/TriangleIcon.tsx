"use client";

interface TriangleIconProps {
  className?: string;
  title?: string;
}

export default function TriangleIcon({
  className = "w-8 h-8 text-primary-medium",
  title = "Triangle icon",
}: TriangleIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M12 2 L22 20 L2 20 Z"
      />
    </svg>
  );
}