import React, { Suspense } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FooterContent } from "./FooterData";
import { getFooterData } from "./footerService";

const socialIconMap: Record<string, React.ReactNode> = {
  facebook: <FaFacebookF />,
  twitter: <FaTwitter />,
  linkedin: <FaLinkedinIn />,
  instagram: <FaInstagram />,
};

export default function Footer() {
  return (
    <Suspense fallback={<FooterSkeleton />}>
      <FooterContentLoader />
    </Suspense>
  );
}

async function FooterContentLoader() {
  "use cache";
  const data = await getFooterData();
  return <FooterView data={data} />;
}

function FooterView({ data }: { data: FooterContent }) {
  return (
    <footer className="relative">
      {/* Overlay to ensure readability over background image */}
      <div className="absolute inset-0 bg-neutral-light/95 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Columns */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
}

function FooterSkeleton() {
  return (
    <footer className="relative py-12">
      <div className="absolute inset-0 bg-neutral-light/95 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-20 w-full bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-secondary-dark flex justify-between">
          <div className="h-4 w-48 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
