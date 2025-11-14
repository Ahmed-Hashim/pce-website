"use client";
import { useState } from "react";
import { WhoWeAreData as WhoWeAreDataType } from "./WhoWeAreData";
import VideoPlayer from "../ui/VideoPlayer";
import SectionTitle from "../ui/SectionTitle";

interface VideoErrorFallbackProps {
  title: string;
  description: string;
}

const VideoErrorFallback = ({
  title,
  description,
}: VideoErrorFallbackProps) => (
  <div className="relative w-full h-60 md:h-80 bg-linear-to-br from-slate-100 to-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center shadow-lg">
    <div className="text-center p-8 max-w-md">
      <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-3">{title}</h4>
      <p className="text-slate-600 leading-relaxed text-sm md:text-base">{description}</p>
      <div className="mt-6">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh Page
        </button>
      </div>
    </div>
  </div>
);

export default function WhoWeAreSection({ data }: { data: WhoWeAreDataType }) {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="py-[var(--space-section-y-mobile)] sm:py-[var(--space-section-y-sm)] md:py-[var(--space-section-y-md)] lg:py-[var(--space-section-y-lg)] bg-bg relative overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <SectionTitle
            title={data.sectionTitle}
            titleColor="heading"
            outlineColor="var(--color-heading)"
            background={data.sectionTitle}
            align="center"
          />
        </div>

        {/* Video and Description */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-base md:text-xl text-text-secondary leading-relaxed">
              {data.sectionDescription}
            </p>
          </div>

          {/* Video Container */}
          {videoError ? (
            <VideoErrorFallback
              title={data.rightColumn.video.fallbackTitle}
              description={data.rightColumn.video.fallbackDescription}
            />
          ) : (
            <VideoPlayer
              videoSrc={data.rightColumn.video.src}
              poster={data.rightColumn.video.poster}
              title={data.rightColumn.video.title}
              subTitle={data.rightColumn.video.subTitle}
              onError={() => setVideoError(true)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
