"use client";
import { useState } from "react";
import { submitCareerApplication } from "@/app/actions/careers";

interface CareersFormProps {
  buttonLabel: string;
  submitLabel: string;
  emailTo: string;
  jobTitle?: string;
  careerId?: number | null;
  labels: {
    name: string;
    email: string;
    phone: string;
    cvLink: string;
    message: string;
  };
  helperText?: string;
}

export default function CareersForm({ buttonLabel, submitLabel, labels, helperText, careerId }: CareersFormProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const toggle = () => setOpen((v) => !v);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(form);
    if (careerId) {
      formData.append("career_id", careerId.toString());
    }

    // Call server action
    const result = await submitCareerApplication({ message: "", type: "idle" }, formData);

    if (result.type === "success") {
      setStatus("success");
      setSuccessMessage(result.message);
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={toggle}
          className="btn btn-primary"
        >
          <span>{buttonLabel}</span>
        </button>
      </div>

      {open ? (
        <div className="mt-8 rounded-sm border border-secondary-dark/40 bg-background p-6">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-primary-dark/10 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary-dark"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-dark mb-2">
                Application Received
              </h3>
              <p className="text-secondary-dark max-w-md">
                {successMessage}
              </p>
              <button
                onClick={toggle}
                className="mt-8 text-primary-medium hover:text-primary-dark transition-colors font-medium text-sm"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {helperText ? (
                <p className="text-secondary-dark mb-4">{helperText}</p>
              ) : null}
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Honeypot Field */}
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
                    name="full_name"
                    aria-label={labels.name}
                    placeholder={labels.name}
                    className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none"
                    required
                  />
                </div>
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    aria-label={labels.email}
                    placeholder={labels.email}
                    className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none"
                    required
                  />
                </div>
                <div className="relative group">
                  <input
                    type="tel"
                    name="phone_number"
                    aria-label={labels.phone}
                    placeholder={labels.phone}
                    className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none"
                    required
                  />
                </div>
                <div className="relative group">
                  <input
                    type="url"
                    name="cv_url"
                    aria-label={labels.cvLink}
                    placeholder={labels.cvLink}
                    className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none"
                    required
                  />
                </div>
                <div className="md:col-span-2 relative group">
                  <textarea
                    name="message"
                    aria-label={labels.message}
                    placeholder={labels.message}
                    rows={4}
                    className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={status === "submitting"}
                  >
                    <span>{status === "submitting" ? "Sending..." : submitLabel}</span>
                  </button>
                </div>
              </form>

              {status === "error" ? (
                <div className="mt-4 rounded-sm border border-red-500/50 bg-red-50 p-4 text-red-600">
                  {errorMessage}
                </div>
              ) : null}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
