"use client";

import React from "react";
import Image from "next/image";
import { FiX, FiPhone, FiMapPin } from "react-icons/fi";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
    twitter: <FaXTwitter />,
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
      className={`fixed inset-0 z-100 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
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
   bg-linear-to-br from-primary-dark to-black  text-primary-dark border-l border-secondary-dark shadow-xl 
  transition-transform duration-300 will-change-transform
  ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-secondary-dark bg-white ">
          <div className="flex items-center gap-3">
            <Image
              src={branding.logoSrc}
              alt={branding.logoAlt ?? branding.name}
              width={40}
              height={40}
            />
            <div>
              <p className="text-xl font-semibold text-primary-medium">
                {branding.name}
              </p>
              {branding.tagline && (
                <p className="text-sm text-secondary-dark">
                  {branding.tagline}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={closeLabel}
            className="p-2 rounded-md border border-text/20 hover:bg-text/10 hover:border-text/30 transition-all duration-300"
          >
            <FiX className="w-5 h-5 text-primary-medium/70" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 ">
          {companySection && (
            <div>
              <p className="text-white">
                {companySection.description}
              </p>
            </div>
          )}

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-secondary-light mb-3">
              {getInTouchTitle}
            </h4>
            <div className="space-y-3">
              {phone && (
                <div className="flex items-center gap-3 text-white">
                  <FiPhone className="w-4 h-4" />
                  <span>{phone}</span>
                </div>
              )}
              {address && (
                <div className="flex items-center gap-3 text-white">
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
                  className="w-10 h-10 grid place-items-center rounded-full bg-primary-dark/10 text-secondary-dark border hover:text-primary-medium hover:bg-primary-dark/15 hover:shadow-accent hover:shadow-md transition-colors"
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
