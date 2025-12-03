"use client";

import { FaArrowRight, FaCheckCircle, FaExclamationCircle, FaTimes, FaShieldAlt } from "react-icons/fa";
import SectionTitle from "../ui/SectionTitle";
import Link from "next/link";
import { useEffect, useRef, useState, useActionState } from "react";
import type { ComponentProps } from "react";
import Section from "../ui/Section";
import { submitContactForm, ContactState } from "@/app/actions/contact";

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
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
}

const initialState: ContactState = {
  message: "",
  type: "idle",
};

export default function CTAComponent({
  title = "Ready to Start Your Next Project?",
  description = "Get in touch with our expert team to discuss your project requirements and discover how we can bring your vision to life.",
  primaryButtonText = "Get Consultation",
  secondaryButtonText = "View Our Sectors",
  sectionProps,
}: CTAComponentProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const [showDialog, setShowDialog] = useState(false);
  const [captcha, setCaptcha] = useState<{ num1: number; num2: number } | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: ""
  });

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

  const lastStateRef = useRef(state);

  useEffect(() => {
    // Only update UI if the state has changed (prevent cascading renders)
    if (state !== lastStateRef.current) {
      // Defer state updates to avoid synchronous render warning
      const timer = setTimeout(() => {
        if (state.type !== "idle") {
          setShowDialog(true);
        }
        if (state.type === "success") {
          setFormData({ name: "", email: "", description: "" });
        }
      }, 0);

      lastStateRef.current = state;
      return () => clearTimeout(timer);
    }
  }, [state]);

  const captchaInitialized = useRef(false);
  useEffect(() => {
    if (!captchaInitialized.current) {
      // Defer random generation to avoid synchronous render warning and hydration mismatch
      const timer = setTimeout(() => {
        setCaptcha({
          num1: Math.floor(Math.random() * 10),
          num2: Math.floor(Math.random() * 10),
        });
        captchaInitialized.current = true;
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeDialog = () => {
    setShowDialog(false);
    setCaptcha({
      num1: Math.floor(Math.random() * 10),
      num2: Math.floor(Math.random() * 10),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <Section
      {...sectionProps}
      container={sectionProps?.container ?? false}
      className={`relative overflow-hidden md:px-8 bg-background ${sectionProps?.className || ""}`}
    >
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

              <Link href="/services" className="btn btn-secondary">
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
              <form action={formAction} className="space-y-4 p-4">
                {/* Honeypot Field (Invisible) */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none  transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none  transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
                <div className="relative group">
                  <textarea
                    name="description"
                    required
                    placeholder="Tell us about your project..."
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none  transition-all duration-300 resize-none backdrop-blur-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn btn-primary cursor-pointer btn-block disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isPending ? "Sending..." : "Send Inquiry"}
                    {!isPending && <FaArrowRight className="btn-icon-sm" />}
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

      {/* Feedback Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50">
          <div
            role="presentation"
            onClick={closeDialog}
            className="absolute inset-0 bg-black/60 transition-opacity"
          />

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-md bg-background rounded-sm border border-secondary-dark shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-secondary-dark">
                <h3 className="font-semibold text-primary-medium">
                  {state.type === "success"
                    ? "Success"
                    : state.type === "require_captcha"
                    ? "Security Check"
                    : "Notification"}
                </h3>

                <button
                  type="button"
                  onClick={closeDialog}
                  aria-label="Close"
                  className="p-2 rounded-md hover:bg-neutral-light transition-colors text-secondary-dark"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-6 flex flex-col items-center text-center">
                {state.type === "success" ? (
                  <FaCheckCircle className="text-green-600 w-12 h-12 mb-4" />
                ) : state.type === "require_captcha" ? (
                  <FaShieldAlt className="text-blue-600 w-12 h-12 mb-4" />
                ) : (
                  <FaExclamationCircle className="text-red-600 w-12 h-12 mb-4" />
                )}

                <p className="text-primary-dark text-lg font-medium mb-4">
                  {state.message}
                </p>

                {state.type === "require_captcha" && captcha && (
                  <form action={formAction} className="w-full flex flex-col gap-4">
                    <input type="hidden" name="name" value={formData.name} />
                    <input type="hidden" name="email" value={formData.email} />
                    <input type="hidden" name="description" value={formData.description} />
                    <input type="hidden" name="math_num1" value={captcha.num1} />
                    <input type="hidden" name="math_num2" value={captcha.num2} />

                    <div className="flex items-center justify-center gap-4">
                      <div className="text-xl font-bold text-primary-dark bg-neutral-light px-4 py-2 rounded-sm border border-secondary-dark">
                        {captcha.num1} + {captcha.num2} = ?
                      </div>
                      <input
                        name="math_answer"
                        type="number"
                        required
                        placeholder="Answer"
                        className="w-24 h-12 px-4 rounded-sm bg-background border border-secondary-dark text-primary-dark placeholder:text-secondary-dark focus:outline-none focus:ring-1 focus:ring-primary-dark text-center"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full h-12 px-5 rounded-sm bg-primary-dark text-button-text hover:bg-primary-medium/90 transition-all duration-300 focus:outline-none focus:ring-0 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isPending ? "Verifying..." : "Verify & Send"}
                    </button>
                  </form>
                )}
              </div>

              {state.type !== "require_captcha" && (
                <div className="p-4 border-t border-secondary-dark flex justify-end">
                  <button
                    onClick={closeDialog}
                    className="px-4 py-2 bg-primary-dark text-white rounded-sm hover:bg-primary-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
