"use client";

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
  placeholder,
  buttonLabel,
}: NewsletterSectionProps) {
  return (
    <section
      className=" bg-neutral-light"
      style={{
        background: "url(/pat-bg.png) no-repeat center center / cover",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className={`relative z-10 text-primary-dark shadow-shadow-soft font-extrabold leading-tight md:text-3xl lg:text-4xl text-center lg:text-left`}
        >
          {title}
        </h2>

        <div className="relative">
          <form className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-3 sm:gap-0 w-full">
            <input
              type="email"
              aria-label={placeholder}
              placeholder={placeholder}
              className="w-full h-12 px-4 rounded-sm sm:rounded-l-sm sm:rounded-r-none bg-background border border-secondary-dark text-primary-dark placeholder:text-secondary-dark focus:outline-none focus:ring-0"
            />
            <button
              type="button"
              aria-label={buttonLabel}
              className="h-12 px-5 w-full sm:w-auto rounded-sm sm:rounded-r-sm sm:rounded-l-none bg-primary-dark text-button-text hover:bg-primary-medium/90 transition-all duration-300 border border-secondary-dark sm:border-l-0 focus:outline-none focus:ring-0"
            >
              {buttonLabel}
            </button>
          </form>
          <p className="absolute -bottom-6 left-0 text-xs text-secondary-dark/80">
            By subscribing, you accept our{" "}
            <a href="/terms" className="underline hover:text-primary-dark">
              Terms and Conditions
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}