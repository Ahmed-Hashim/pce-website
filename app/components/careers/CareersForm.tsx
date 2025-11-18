"use client";
import { useState } from "react";

interface CareersFormProps {
  buttonLabel: string;
  submitLabel: string;
  emailTo: string;
  jobTitle?: string;
  labels: {
    name: string;
    email: string;
    phone: string;
    cvLink: string;
    message: string;
  };
  helperText?: string;
}

export default function CareersForm({ buttonLabel, submitLabel, emailTo, labels, helperText, jobTitle }: CareersFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const toggle = () => setOpen((v) => !v);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Career Application${jobTitle ? ` (${jobTitle})` : ""}: ${name}`);
    const body = encodeURIComponent(
      `${jobTitle ? `Job: ${jobTitle}\n` : ""}Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCV: ${cvLink}\n\nMessage:\n${message}`
    );
    const href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    window.location.href = href;
    setSent(true);
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
          {helperText ? (
            <p className="text-secondary-dark mb-4">{helperText}</p>
          ) : null}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <input
                type="text"
                aria-label={labels.name}
                placeholder={labels.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none"
                required
              />
            </div>
            <div className="relative group">
              <input
                type="email"
                aria-label={labels.email}
                placeholder={labels.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none"
                required
              />
            </div>
            <div className="relative group">
              <input
                type="tel"
                aria-label={labels.phone}
                placeholder={labels.phone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none"
                required
              />
            </div>
            <div className="relative group">
              <input
                type="url"
                aria-label={labels.cvLink}
                placeholder={labels.cvLink}
                value={cvLink}
                onChange={(e) => setCvLink(e.target.value)}
                className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none"
                required
              />
            </div>
            <div className="md:col-span-2 relative group">
              <textarea
                aria-label={labels.message}
                placeholder={labels.message}
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input w-full px-3 py-2 rounded-sm placeholder-(--color-foreground-secondary) focus:outline-none resize-none"
                required
              />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="btn btn-primary btn-block">
                <span>{submitLabel}</span>
              </button>
            </div>
          </form>

          {sent ? (
            <div className="mt-4 rounded-sm border border-primary-medium/50 bg-primary-dark/5 p-4 text-primary-dark">
              Application prepared in your email client.
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
