"use client";

import React from "react";
import Image from "next/image";
import { FiX, FiPhone, FiMapPin } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { footerData, FooterContent } from "./FooterData";

interface Branding {
  name: string;
  tagline?: string;
  logoSrc: string;
  logoAlt?: string;
}

interface DesktopSidePanelProps {
  open: boolean;
  onClose: () => void;
  data?: FooterContent;
  branding?: Branding;
}

export default function DesktopSidePanel({
  open,
  onClose,
  data = footerData,
  branding = {
    name: "PCE",
    tagline: "Business Solution",
    logoSrc: "/pce-logo.png",
    logoAlt: "PCE Logo",
  },
}: DesktopSidePanelProps) {
  const companySection = (() => {
    const first = data.columns[0];
    return "description" in first ? first : undefined;
  })();

  const socialIconMap: Record<string, React.ReactNode> = {
    facebook: <FaFacebookF />,
    twitter: <FaTwitter />,
    linkedin: <FaLinkedinIn />,
    instagram: <FaInstagram />,
  };

  const getInTouchTitle = "Get In Touch";
  const closeLabel = "Close panel";

  const firstOffice = data.offices?.[0];
  const address = firstOffice?.addressLines?.join(", ");
  const phone = firstOffice?.phone;

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-100 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Backdrop */}
      <div
  role="presentation"
  onClick={onClose}
  className={`fixed inset-0 bg-black/60 transition-opacity duration-300 
  ${open ? "opacity-100" : "opacity-0"}`}
/>


      {/* Panel (right side) */}
      <aside
  role="dialog"
  aria-modal="true"
  className={`fixed top-0 right-0 h-screen w-[360px] sm:w-[420px] 
  bg-bg text-foreground border-l border-border-subtle shadow-xl 
  transition-transform duration-300 will-change-transform
  ${open ? "translate-x-0" : "translate-x-full"}`}
>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border-subtle bg-bg">
          <div className="flex items-center gap-3">
            <Image
              src={branding.logoSrc}
              alt={branding.logoAlt ?? branding.name}
              width={40}
              height={40}
              className="brightness-0 invert"
            />
            <div>
              <p className="text-xl font-semibold text-heading">{branding.name}</p>
              {branding.tagline && (
                <p className="text-sm text-foreground-secondary">{branding.tagline}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={closeLabel}
            className="p-2 rounded-md border border-text/20 hover:bg-text/10 hover:border-text/30 transition-all duration-300"
          >
            <FiX className="w-5 h-5 text-heading/70" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 bg-bg">
          {companySection && (
            <div>
              <p className="text-foreground-secondary">{companySection.description}</p>
            </div>
          )}

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-heading mb-3">{getInTouchTitle}</h4>
            <div className="space-y-3">
              {phone && (
                <div className="flex items-center gap-3 text-foreground-secondary">
                  <FiPhone className="w-4 h-4" />
                  <span>{phone}</span>
                </div>
              )}
              {address && (
                <div className="flex items-center gap-3 text-foreground-secondary">
                  <FiMapPin className="w-4 h-4" />
                  <span>{address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Socials */}
          {companySection && (
            <div className="flex items-center gap-4">
              {companySection.socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.ariaLabel}
                  className="w-10 h-10 grid place-items-center rounded-full bg-foreground/10 text-foreground-secondary hover:text-accent hover:bg-foreground/15 transition-colors"
                >
                  {socialIconMap[social.icon]}
                </a>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
