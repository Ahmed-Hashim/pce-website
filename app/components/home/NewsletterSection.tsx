"use client";

import { useActionState, useEffect, useState } from "react";
import { subscribeToNewsletter, NewsletterState } from "@/app/actions/newsletter";
import { FaCheckCircle, FaExclamationCircle, FaTimes, FaShieldAlt } from "react-icons/fa";
import Link from "next/link";
import { SectionTitle } from "../ui";

interface NewsletterSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  placeholder: string;
  buttonLabel: string;
  consentText?: string;
}

const initialState: NewsletterState = {
  message: "",
  type: "idle",
};

export default function NewsletterSection({
  placeholder,
  buttonLabel,
}: NewsletterSectionProps) {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialState
  );
  const [showDialog, setShowDialog] = useState(false);
  const [captcha, setCaptcha] = useState<{ num1: number; num2: number } | null>(
    null
  );
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (state.type !== "idle") {
      // Use setTimeout to avoid synchronous state update within effect
      const timer = setTimeout(() => setShowDialog(true), 0);
      return () => clearTimeout(timer);
    }
  }, [state]);

  useEffect(() => {
    // Generate simple math challenge on client-side
    // Use setTimeout to avoid synchronous state update within effect
    const timer = setTimeout(() => {
      setCaptcha({
        num1: Math.floor(Math.random() * 10),
        num2: Math.floor(Math.random() * 10),
      });
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const closeDialog = () => {
    setShowDialog(false);
    // Refresh captcha on close
    setCaptcha({
      num1: Math.floor(Math.random() * 10),
      num2: Math.floor(Math.random() * 10),
    });
  };

  return (
    <section
      className=" bg-primary-dark"
      // style={{
      //   background: "url(/pat-bg.png) no-repeat center center / cover",
      // }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
         
          title="Subscribe to Our"
          highlight="Newsletter"
          align="left"
          titleColor="text-white"
          
        />

        <div className="relative">
          <form
            action={formAction}
            className="flex flex-col sm:flex-row justify-center sm:justify-start items-stretch gap-3 sm:gap-0 w-full"
          >
            {/* Honeypot Field (Invisible) */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <input
              name="email"
              type="email"
              required
              aria-label={placeholder}
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-sm sm:rounded-l-sm sm:rounded-r-none bg-background border border-secondary-dark text-primary-dark placeholder:text-secondary-dark focus:outline-none focus:ring-0 z-10"
            />

            <button
              type="submit"
              disabled={isPending}
              aria-label={buttonLabel}
              className="h-12 px-5 w-full sm:w-auto rounded-sm sm:rounded-r-sm sm:rounded-l-none bg-primary-dark text-button-text hover:bg-primary-medium/90 transition-all duration-300 border border-primary-medium sm:border-l-0 focus:outline-none focus:ring-0 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap z-20"
            >
              {isPending ? "Subscribing..." : buttonLabel}
            </button>
          </form>
          <p className="absolute -bottom-6 left-0 text-xs text-neutral-light">
            By subscribing, you accept our{" "}
            <Link href="/terms-and-conditions" className="underline hover:text-primary-medium">
              Terms and Conditions
            </Link>
          </p>
        </div>
      </div>

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
                    <input type="hidden" name="email" value={email} />
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
                      {isPending ? "Verifying..." : "Verify & Subscribe"}
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
    </section>
  );
}