"use client";

import SectionTitle from "../ui/SectionTitle";

interface NewsletterSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  placeholder: string;
  buttonLabel: string;
  consentText?: string;
}

export default function NewsletterSection({
  title,
  description,
  placeholder,
  buttonLabel,
  consentText,
}: NewsletterSectionProps) {
  return (
    <section className="py-(--space-section-y-md) bg-neutral-light"
    style={{
      background: "url(/pat-bg.png) no-repeat center center / cover",
    }}>
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center md:text-left items-center md:items-start">
          <SectionTitle
            title={title}
            outlineColor="var(--color-primary-dark)"
            className="text-center md:text-left items-center md:items-start "
          />
          {description && (
            <p className="mt-4 text-secondary-dark leading-relaxed text-sm md:text-base">{description}</p>
          )}
        </div>

        <div className="max-w-xl mx-auto">
          <form className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0">
            <input
              type="email"
              aria-label={placeholder}
              placeholder={placeholder}
              className="w-full h-12 px-4 rounded-xl sm:rounded-l-xl sm:rounded-r-none bg-background border border-secondary-dark text-primary-dark placeholder:text-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary-medium"
            />
            <button
              type="button"
              aria-label={buttonLabel}
              className="h-12 px-5 rounded-xl sm:rounded-r-xl sm:rounded-l-none bg-primary-dark text-button-text hover:bg-primary-medium/90 transition-all duration-300 border border-secondary-dark sm:border-l-0"
            >
              {buttonLabel}
            </button>
          </form>
          {consentText && (
            <p className="mt-3 text-xs md:text-[0.8rem] text-secondary-dark">{consentText}</p>
          )}
        </div>
      </div>
    </section>
  );
}
