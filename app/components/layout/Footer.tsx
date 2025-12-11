import React, { Suspense } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FooterContent } from "./FooterData";
import { getFooterData } from "./footerService";
import Image from "next/image";

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
    <footer className="relative bg-gradient-to-br from-black to-primary-dark border-t border-white/10">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

          {/* Column 1: Company Info (Occupies 5 columns) */}
          {"description" in data.columns[0] && (
            <div className="md:col-span-12 lg:col-span-5 space-y-8">
              <h5 className="text-2xl font-bold text-white tracking-tight">
                {data.columns[0].title}
              </h5>
              <p className="text-neutral-light text-base leading-relaxed max-w-md">
                {data.columns[0].description}
              </p>
              <div className="flex gap-4 pt-2">
                {data.columns[0].socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.ariaLabel}
                    className="group text-neutral-light hover:text-white transition-all duration-300 p-3 bg-white/5 rounded-full hover:bg-primary-medium hover:shadow-sm hover:shadow-primary-medium"
                  >
                    {socialIconMap[social.icon]}
                  </a>
                )
                )}
              </div>
            </div>
          )}

          {/* Links Section Wrapper (Occupies 7 columns) */}
          <div className="md:col-span-12 lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-10 md:gap-16 pt-2">

            {/* Column 2: Quick Links */}
            {"links" in data.columns[1] && (
              <div className="flex flex-col space-y-7">
                <h5 className="text-sm font-bold text-white uppercase tracking-widest opacity-90">
                  {data.columns[1].title}
                </h5>
                <ul className="space-y-4">
                  {data.columns[1].links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="group flex items-center text-primary-medium text-[15px] hover:text-white transition-colors"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary-medium mr-0 group-hover:mr-2 transition-all duration-300"></span>
                        {link.label}
                      </a>
                      {link.badge && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-primary-medium/20 text-primary-medium/90 border border-primary-medium/30 font-medium">
                          {link.badge}
                        </span>
                      )}
                    </li>
                  )
                  )}
                </ul>
              </div>
            )}

            {/* Column 3: Services */}
            {"links" in data.columns[2] && (
              <div className="flex flex-col space-y-7">
                <h5 className="text-sm font-bold text-white uppercase tracking-widest opacity-90">
                  {data.columns[2].title}
                </h5>
                <ul className="space-y-4">
                  {data.columns[2].links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="group flex items-center text-primary-medium text-[15px] hover:text-white transition-colors"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary-medium mr-0 group-hover:mr-2 transition-all duration-300"></span>
                        {link.label}
                      </a>
                    </li>
                  )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Powered By */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white text-xs tracking-wide font-medium">
            {data.bottom.copyright}
          </p>

          <div className="flex items-center gap-3 bg-primary-medium px-5 py-2.5 rounded-full border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-[10px] uppercase tracking-widest text-primary-dark font-semibold">Powered by</span>
            <a
              href="https://hbs-group.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 opacity-100 transition-opacity"
              aria-label="Hyper Business Solution"
            >
              <span className="text-xs font-bold text-white group-hover:text-primary-dark transition-colors">Hyper Business Solution</span>
              <Image
                src="/logo-hbs.png"
                alt="HBS Logo"
                width={20}
                height={15}
                className="object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-all"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSkeleton() {
  return (
    <footer className="relative py-12 bg-primary-dark">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 w-32 bg-white/10 rounded animate-pulse" />
              <div className="h-20 w-full bg-white/5 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex justify-between">
          <div className="h-4 w-48 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
