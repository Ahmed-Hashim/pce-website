// components/layout/Footer.tsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { footerData, FooterContent } from "./FooterData";

interface FooterProps {
  data?: FooterContent;
  backgroundImageSrc?: string;
}

const socialIconMap: Record<string, React.ReactNode> = {
  facebook: <FaFacebookF />,
  twitter: <FaTwitter />,
  linkedin: <FaLinkedinIn />,
  instagram: <FaInstagram />,
};

const Footer: React.FC<FooterProps> = ({ data = footerData }) => {
  return (
    <footer className="relative">
      {/* Overlay to ensure readability over background image */}
      <div className="absolute inset-0 bg-neutral-light/95 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Main Columns */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Our company */}
          {"description" in data.columns[0] && (
            <div>
              <h5 className="font-semibold text-primary-dark">
                {data.columns[0].title}
              </h5>
              <p className="text-secondary-dark mt-3">
                {data.columns[0].description}
              </p>
              <div className="flex gap-4 mt-6">
                {data.columns[0].socials.map(
                  (
                    social: {
                      href: string;
                      ariaLabel: string;
                      icon: keyof typeof socialIconMap;
                    },
                    i: number
                  ) => (
                    <a
                      key={i}
                      href={social.href}
                      aria-label={social.ariaLabel}
                      className="text-secondary-dark hover:text-primary-dark transition-colors"
                    >
                      {socialIconMap[social.icon]}
                    </a>
                  )
                )}
              </div>
            </div>
          )}

          {/* Resources */}
          {"links" in data.columns[1] && (
            <div>
              <h5 className="font-semibold text-primary-dark">
                {data.columns[1].title}
              </h5>
              <ul className="space-y-2 mt-3">
                {data.columns[1].links.map(
                  (
                    link: { href: string; label: string; badge?: string },
                    i: number
                  ) => (
                    <li key={i} className="flex items-center gap-2">
                      <a
                        href={link.href}
                        className="text-secondary-dark hover:text-primary-medium transition-colors"
                      >
                        {link.label}
                      </a>
                      {link.badge && (
                        <span className="ml-1 inline-block text-xs px-2 py-0.5 rounded-full bg-primary-medium/20 text-primary-medium">
                          {link.badge}
                        </span>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Services */}
          {"links" in data.columns[2] && (
            <div>
              <h5 className="font-semibold text-primary-dark">
                {data.columns[2].title}
              </h5>
              <ul className="space-y-2 mt-3">
                {data.columns[2].links.map(
                  (link: { href: string; label: string }, i: number) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-secondary-dark hover:text-primary-medium transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Newsletter */}
          {"newsletter" in data.columns[3] && (
            <div>
              <h5 className="font-semibold text-primary-dark">
                {data.columns[3].title}
              </h5>
              <div className="mt-4 flex items-center">
                <input
                  type="email"
                  aria-label={data.columns[3].newsletter.placeholder}
                  placeholder={data.columns[3].newsletter.placeholder}
                  className="w-full h-12 px-4 rounded-l-xl bg-background/40 border border-secondary-dark text-primary-dark placeholder:text-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary-medium"
                />
                <button
                  type="button"
                  aria-label={data.columns[3].newsletter.submitAriaLabel}
                  className="h-12 px-4 rounded-r-xl bg-primary-dark text-button-text hover:bg-primary-medium/90 transition-all duration-300 border border-secondary-dark border-l-0 flex items-center justify-center"
                >
                  <FiSend />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-secondary-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-secondary-dark">{data.bottom.copyright}</p>
          <div className="flex gap-6">
            {data.bottom.links.map((l, i) => (
              <a
                key={i}
                href={l.href}
                className="text-secondary-dark hover:text-primary-medium transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
