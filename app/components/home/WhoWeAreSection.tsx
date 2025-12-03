"use client";
import { useState } from "react";
import { WhoWeAreData as WhoWeAreDataType } from "./WhoWeAreData";
import VideoPlayer from "../ui/VideoPlayer";
import SectionTitle from "../ui/SectionTitle";
import Section from "../ui/Section";
import type { ComponentProps } from "react";

// No changes to the fallback component are needed
interface VideoErrorFallbackProps {
  title: string;
  description: string;
  refreshLabel: string;
}

const VideoErrorFallback = ({
  title,
  description,
  refreshLabel,
}: VideoErrorFallbackProps) => (
  <div className="w-full bg-section-light rounded-sm border border-neutral-light">
    <div className="text-center p-10 max-w-xl mx-auto">
      <h4 className="text-xl font-semibold text-primary-dark">{title}</h4>
      <p className="text-secondary-dark mt-3">{description}</p>
      <div className="mt-6">
        <button
          onClick={() => window.location.reload()}
          className="btn-primary px-5 py-2 rounded-sm transition-colors"
        >
          {refreshLabel}
        </button>
      </div>
    </div>
  </div>
);

interface WhoWeAreSectionProps {
  data: WhoWeAreDataType;
  sectionProps?: Omit<ComponentProps<typeof Section>, 'children'>;
}

export default function WhoWeAreSection({ data, sectionProps }: WhoWeAreSectionProps) {
  const [videoError, setVideoError] = useState(false);

  return (
    <Section
      {...sectionProps}
      container={sectionProps?.container ?? false}
      className={`relative overflow-hidden ${sectionProps?.className || ""}`}
    >
      {/* Parallax background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: `url("./Cover.png")`,
        }}
      />

 

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Using a larger gap to match the visual spacing in the image */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Title and Description */}
          {/* CHANGED: Removed text-center to align content to the left */}
          <div className="space-y-6">
            <SectionTitle
              title={data.sectionTitle}
              titleColor="text-white"
              className="text-center md:text-left items-center md:items-start mb-6"
            />
            {/* This text is now left-aligned by default */}
            <p className=" max-w-lg text-white">{data.sectionDescription}</p>
          </div>

          {/* Right Column - Video */}
          <div className="w-full">
            {videoError ? (
              <VideoErrorFallback
                title={data.videoErrorFallback.title}
                description={data.videoErrorFallback.description}
                refreshLabel={data.videoErrorFallback.refreshLabel}
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
      </div>
    </Section>
  );
}
