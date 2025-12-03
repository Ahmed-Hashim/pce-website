"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface LegalPageLayoutProps {
  title: string;
  content: string;
  toc: TOCItem[];
}

export default function LegalPageLayout({ content, toc }: LegalPageLayoutProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                On this page
              </h3>
              <nav className="flex flex-col space-y-1">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({
                        behavior: "smooth",
                      });
                      setActiveId(item.id);
                    }}
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
            
            <div className="p-6 bg-gray-50 rounded-sm border border-gray-100">
              <h4 className="font-semibold text-primary-dark mb-2">Need Help?</h4>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                If you have any questions regarding our policies, please contact our legal team.
              </p>
              <a 
                href="/contact" 
                className="text-xs font-bold text-primary-medium hover:text-primary-dark underline decoration-2 underline-offset-2"
              >
                Contact Support →
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9">
          <div 
            className="prose prose-lg max-w-none 
              prose-headings:text-primary-dark prose-headings:font-bold prose-headings:scroll-mt-32
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
              prose-h3:text-xl prose-h3:mt-8 prose-h3:text-primary-medium
              prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:text-gray-600 prose-li:mb-2
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-a:text-primary-medium prose-a:font-medium hover:prose-a:text-primary-dark prose-a:transition-colors"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}
