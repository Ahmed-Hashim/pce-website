"use client";

interface TriangleIconProps {
  className?: string;
  title?: string;
}

export default function TriangleIcon({
  className = "text-primary-dark/20",
  title = "Triangle icon",
}: TriangleIconProps) {
  return (
    <svg
      className={`${className} w-8 h-8 `}
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