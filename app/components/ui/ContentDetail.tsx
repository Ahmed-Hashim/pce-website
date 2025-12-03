"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import PageHero from "./PageHero";
import Section from "./Section";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaLink } from "react-icons/fa";

interface Breadcrumb {
  label: string;
  href: string;
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface ContentDetailProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  breadcrumbs: Breadcrumb[];
  date?: string;
  tag?: string;
  content: string[]; // HTML strings
  toc?: TOCItem[];
}

const subscribe = () => () => {};

export default function ContentDetail({
  title,
  subtitle,
  imageSrc,
  breadcrumbs,
  date,
  tag,
  content,
  toc,
}: ContentDetailProps) {
  const [activeId, setActiveId] = useState<string>("");
  const shareUrl = useSyncExternalStore(
    subscribe,
    () => window.location.href,
    () => ""
  );

  useEffect(() => {
    if (!toc || toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  const copyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  const hasTOC = toc && toc.length > 0;

  return (
    <>
      <PageHero title={title}  breadcrumbs={breadcrumbs} imageSrc={imageSrc} />
      <Section background="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`grid grid-cols-1 ${hasTOC ? "lg:grid-cols-12" : ""} gap-12`}>
            
            {/* Left Sidebar: TOC */}
            {hasTOC && (
              <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-24">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                    On this page
                  </h3>
                  <nav className="flex flex-col space-y-1">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className={`text-sm py-2 px-3 border-l-2 transition-all duration-300 block ${
                          item.level === 3 ? "ml-4 text-xs" : ""
                        } ${
                          activeId === item.id
                            ? "border-primary-dark text-primary-dark font-medium bg-gray-50"
                            : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className={`${hasTOC ? "lg:col-span-7" : "col-span-full"}`}>
              <div className="flex items-center gap-4 text-secondary-dark mb-6">
                {date ? <div className="text-xs md:text-sm font-medium">{date}</div> : null}
                {tag ? (
                  <div className="rounded-full bg-primary-dark/10 text-primary-dark text-xs px-3 py-1 font-semibold">
                    {tag}
                  </div>
                ) : null}
              </div>

              <div className="space-y-4">
                {content.map((html, i) => (
                  <div
                    key={i}
                    className="blog-content text-secondary-dark leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                ))}
              </div>
            </div>

            {/* Right Sidebar: Share Buttons */}
            {hasTOC && (
              <div className="hidden lg:block lg:col-span-2">
                <div className="sticky top-24">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                    Share
                  </h3>
                  <div className="flex flex-col gap-3">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-sm text-gray-600 hover:text-primary-dark hover:bg-gray-50 transition-colors"
                      title="Share on Facebook"
                    >
                      <FaFacebookF className="w-5 h-5" />
                      <span className="text-sm font-medium">Facebook</span>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-sm text-gray-600 hover:text-primary-dark hover:bg-gray-50 transition-colors"
                      title="Share on Twitter"
                    >
                      <FaTwitter className="w-5 h-5" />
                      <span className="text-sm font-medium">Twitter</span>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-sm text-gray-600 hover:text-primary-dark hover:bg-gray-50 transition-colors"
                      title="Share on LinkedIn"
                    >
                      <FaLinkedinIn className="w-5 h-5" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(title + " " + shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-sm text-gray-600 hover:text-primary-dark hover:bg-gray-50 transition-colors"
                      title="Share on WhatsApp"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      <span className="text-sm font-medium">WhatsApp</span>
                    </a>
                    <button
                      onClick={copyLink}
                      className="flex items-center gap-3 p-2 rounded-sm text-gray-600 hover:text-primary-dark hover:bg-gray-50 transition-colors text-left"
                      title="Copy Link"
                    >
                      <FaLink className="w-5 h-5" />
                      <span className="text-sm font-medium">Copy Link</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Mobile Share (Visible only on small screens if needed, or keep hidden) */}
            {/* We can add a mobile sticky bar if requested, but for now sidebar is fine */}
          </div>
        </div>
      </Section>
    </>
  );
}
