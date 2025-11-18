"use client";

import { FaArrowRight } from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";
import Link from "next/link";
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
  primaryButtonText = "Get Consultation",
  secondaryButtonText = "View Our Sectors",
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
    <section className="relative overflow-hidden md:px-8 bg-background">
      {/* Animated Background Pattern */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - CTA Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <SectionTitle
              titleColor="accent"
              outlineColor="var(--color-primary-dark)"
              title={title}
              className="text-center md:text-left items-center md:items-start mb-6"
            />
            <p className="text-base md:text-xl text-primary-dark leading-relaxed mb-8 font-light">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/contact" className="btn btn-primary">
                <span>{primaryButtonText}</span>
                <FaArrowRight className="btn-icon" />
              </Link>

              <Link href="/sectors" className="btn btn-secondary">
                <span>{secondaryButtonText}</span>
                <FaArrowRight className="btn-icon" />
              </Link>
            </div>
          </div>

          {/* Right Side - Contact Information */}
          <div className="bg-background/90 backdrop-blur-xl border border-primary-medium/50 rounded-sm md:p-8 shadow-2xl shadow-primary-dark/10 animate-fade-in-up animation-delay-200">
            <div className="flex items-center justify-center pt-6">
              <div className="w-12 h-1 bg-linear-to-r from-neutral-light to-neutral-light/50 rounded-full"></div>
              <h4 className="text-primary-dark font-bold mx-4">Get In Touch</h4>
              <div className="w-12 h-1 bg-linear-to-l from-neutral-light to-neutral-light/50 rounded-full"></div>
            </div>

            {/* Quick Contact Form */}
            <div className="mt-4">
              <form className="space-y-4 p-4">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none  transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none  transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
                <div className="relative group">
                  <textarea
                    placeholder="Tell us about your project..."
                    rows={3}
                    className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none  transition-all duration-300 resize-none backdrop-blur-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary cursor-pointer btn-block"
                >
                  <span className="flex items-center justify-center gap-2">
                    Send Inquiry
                    <FaArrowRight className="btn-icon-sm" />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div
        className="absolute top-10 left-10 w-4 h-4 bg-primary-medium/30"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      ></div>
      <div
        className="absolute top-20 right-20 w-6 h-6 bg-primary-medium/20"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      ></div>
      <div
        className="absolute bottom-20 left-20 w-5 h-5 bg-primary-medium/25"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      ></div>
      <div
        className="absolute bottom-10 right-10 w-3 h-3 bg-primary-medium/35"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      ></div>
    </section>
  );
}
