import Section from "../ui/Section";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { ComponentProps } from "react";

interface ProjectsPaginationSectionProps {
  page: number;
  totalPages: number;
  prevLabel?: string;
  nextLabel?: string;
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
  padLength?: number;
  sectionProps?: Omit<ComponentProps<typeof Section>, "children">;
}

export default function ProjectsPaginationSection({
  page,
  totalPages,
  prevLabel = "Previous",
  nextLabel = "Next",
  onPrev,
  onNext,
  isPrevDisabled,
  isNextDisabled,
  padLength = 2,
  sectionProps,
}: ProjectsPaginationSectionProps) {
  const pad = (n: number) => n.toString().padStart(padLength, "0");
  return (
    <Section {...sectionProps} className={`${sectionProps?.className || ""} pt-0`}>
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={onPrev}
          aria-label={prevLabel}
          className="inline-flex items-center justify-center w-10 h-10 rounded-sm border border-border bg-primary-dark text-button-text hover:bg-primary-medium transition-colors"
          disabled={isPrevDisabled}
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm tracking-widest text-secondary-dark">
          {pad(page)} / {pad(totalPages)}
        </span>
        <button
          onClick={onNext}
          aria-label={nextLabel}
          className="inline-flex items-center justify-center w-10 h-10 rounded-sm border border-border bg-primary-dark text-button-text hover:bg-primary-medium transition-colors"
          disabled={isNextDisabled}
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </Section>
  );
}
