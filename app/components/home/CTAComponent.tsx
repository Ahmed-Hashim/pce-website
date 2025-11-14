"use client";

import { FaArrowRight } from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";
import { useEffect, useRef } from "react";

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
}

interface CTAComponentProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  contactInfo?: ContactInfo[];
}

export default function CTAComponent({
  title = "Ready to Start Your Next Project?",
  description = "Get in touch with our expert team to discuss your project requirements and discover how we can bring your vision to life.",
  primaryButtonText = "Get Free Consultation",
  secondaryButtonText = "View Our Services",
}: CTAComponentProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        parallaxRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-[var(--space-section-y-mobile)] sm:py-[var(--space-section-y-sm)] md:py-[var(--space-section-y-md)] lg:py-[var(--space-section-y-lg)] px-[var(--space-section-x-mobile)] sm:px-[var(--space-section-x-sm)] md:px-[var(--space-section-x-md)] lg:px-[var(--space-section-x-lg)] overflow-hidden bg-linear-to-br from-[--color-bg] via-[--color-bg]/90 to-[--color-bg]/80 hover-effect">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-accent)_1px,transparent_1px)] bg-size-[20px_20px]"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - CTA Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <SectionTitle
              titleColor="accent"
              outlineColor="var(--color-bg)"
              title={title}
              background={title.split(" ").pop()}
              align="left"
              className="mb-6"
            />
            <p className="text-base md:text-xl text-bg leading-relaxed mb-8 font-light">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-linear-to-r from-accent to-accent/80 text-button-text px-6 md:px-8 py-3 md:py-4 rounded-xl text-sm sm:text-base md:text-lg font-semibold hover:shadow-2xl hover:shadow-bg/25 transition-all duration-300 hover:scale-105 transform"
              >
                <span>{primaryButtonText}</span>
                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <a
                href="/services"
                className="group inline-flex items-center justify-center gap-2 border-2 border-accent/30 text-bg px-6 md:px-8 py-3 md:py-4 rounded-xl text-sm sm:text-base md:text-lg font-semibold hover:bg-accent hover:text-heading hover:border-accent transition-all duration-300 hover:scale-105 transform backdrop-blur-sm bg-bg/5"
              >
                <span>{secondaryButtonText}</span>
                <FaArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </a>
            </div>
          </div>

          {/* Right Side - Contact Information */}
          <div className="bg-bg/90 backdrop-blur-xl border border-accent/50 rounded-2xl p-6 md:p-8 shadow-2xl shadow-bg/10 animate-fade-in-up animation-delay-200">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-1 bg-linear-to-r from-heading to-heading/50 rounded-full"></div>
              <h4 className="text-2xl font-bold text-accent mx-4">
                Get In Touch
              </h4>
              <div className="w-12 h-1 bg-linear-to-l from-heading to-heading/50 rounded-full"></div>
            </div>

            {/* Quick Contact Form */}
            <div className="mt-8 pt-6 ">
              <form className="space-y-4">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-heading  rounded-xl text-heading placeholder-foreground-secondary focus:outline-none focus:border-bg focus:ring-2 focus:ring-bg/50 transition-all duration-300 backdrop-blur-sm"
                  />
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-bg/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-heading  rounded-xl text-heading placeholder-foreground-secondary focus:outline-none focus:border-bg focus:ring-2 focus:ring-bg/50 transition-all duration-300 backdrop-blur-sm"
                  />
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-bg/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <div className="relative group">
                  <textarea
                    placeholder="Tell us about your project..."
                    rows={3}
                    className="w-full px-4 py-3 bg-heading  rounded-xl text-heading placeholder-foreground-secondary focus:outline-none focus:border-bg focus:ring-2 focus:ring-bg/50 transition-all duration-300 resize-none backdrop-blur-sm"
                  />
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-bg/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-bg to-bg/80 text-button-text py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-bg/25 transition-all duration-300 hover:scale-105 transform group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Send Inquiry
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-accent/30 rounded-full animate-pulse"></div>
      <div className="absolute top-20 right-20 w-6 h-6 bg-accent/20 rounded-full animate-pulse animation-delay-200"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-accent/25 rounded-full animate-pulse animation-delay-400"></div>
      <div className="absolute bottom-10 right-10 w-3 h-3 bg-accent/35 rounded-full animate-pulse animation-delay-600"></div>
    </section>
  );
}
