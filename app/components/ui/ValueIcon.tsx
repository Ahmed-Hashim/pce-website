"use client";

interface ValueIconProps {
  className?: string;
  title?: string;
}

export default function ValueIcon({
  className = "w-8 h-8 text-primary-medium",
  title = "Value icon",
}: ValueIconProps) {
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
        d="M12 2l3.5 6.5L22 12l-6.5 3.5L12 22l-3.5-6.5L2 12l6.5-3.5L12 2z"
      />
    </svg>
  );
}

