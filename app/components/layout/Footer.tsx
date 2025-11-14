// components/layout/Footer.tsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { footerData, FooterContent } from './FooterData';

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

const Footer: React.FC<FooterProps> = ({ data = footerData, backgroundImageSrc = '/bg-comp.png' }) => {
  return (
    <footer
      className="relative bg-bg text-foreground bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageSrc})` }}
    >
      {/* Overlay to ensure readability over background image */}
      <div className="absolute inset-0 bg-bg/95 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        

        {/* Main Columns */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Our company */}
          {('description' in data.columns[0]) && (
            <div>
              <h3 className="text-lg font-semibold text-heading">{(data.columns[0]).title}</h3>
              <p className="text-foreground-secondary mt-3">{(data.columns[0]).description}</p>
              <div className="flex gap-4 mt-6">
                {(data.columns[0]).socials.map((social: { href: string; ariaLabel: string; icon: keyof typeof socialIconMap }, i: number) => (
                  <a key={i} href={social.href} aria-label={social.ariaLabel} className="text-foreground-secondary hover:text-accent transition-colors">
                    {socialIconMap[social.icon]}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {('links' in data.columns[1]) && (
            <div>
              <h3 className="text-lg font-semibold text-heading">{(data.columns[1] ).title}</h3>
              <ul className="space-y-2 mt-3">
                {(data.columns[1]).links.map((link: { href: string; label: string; badge?: string }, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <a href={link.href} className="text-foreground-secondary hover:text-accent transition-colors">{link.label}</a>
                    {link.badge && (
                      <span className="ml-1 inline-block text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent">{link.badge}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Services */}
          {('links' in data.columns[2]) && (
            <div>
              <h3 className="text-lg font-semibold text-heading">{(data.columns[2]).title}</h3>
              <ul className="space-y-2 mt-3">
                {(data.columns[2]).links.map((link: { href: string; label: string }, i: number) => (
                  <li key={i}>
                    <a href={link.href} className="text-foreground-secondary hover:text-accent transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Newsletter */}
          {('newsletter' in data.columns[3]) && (
            <div>
              <h3 className="text-lg font-semibold text-heading">{(data.columns[3] ).title}</h3>
              <div className="mt-4 flex items-center">
                <input
                  type="email"
                  aria-label={(data.columns[3]).newsletter.placeholder}
                  placeholder={(data.columns[3]).newsletter.placeholder}
                  className="w-full h-12 px-4 rounded-l-xl bg-bg/40 border border-border-subtle text-foreground placeholder:text-foreground-secondary focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="button"
                  aria-label={(data.columns[3]).newsletter.submitAriaLabel}
                  className="h-12 px-4 rounded-r-xl bg-accent text-button-text hover:bg-accent/90 transition-all duration-300 border border-border-subtle border-l-0 flex items-center justify-center"
                >
                  <FiSend />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-foreground-secondary">{data.bottom.copyright}</p>
          <div className="flex gap-6">
            {data.bottom.links.map((l, i) => (
              <a key={i} href={l.href} className="text-foreground-secondary hover:text-accent transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
