"use client";

import { useState } from "react";
import VideoPlayer from "../ui/VideoPlayer";

interface VideoErrorFallbackProps {
  title: string;
  description: string;
  refreshLabel: string;
}

function VideoErrorFallback({
  title,
  description,
  refreshLabel,
}: VideoErrorFallbackProps) {
  return (
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
}

interface WhoWeAreVideoProps {
  src: string | null;
}

export default function WhoWeAreVideo({ src }: WhoWeAreVideoProps) {
  const [videoError, setVideoError] = useState(false);

  // If no source is provided, we can either return null or a specific message.
  // Returning null might collapse the layout if not handled, so we keep the structure.
  if (!src) {
    return null;
  }

  if (videoError) {
    return (
      <VideoErrorFallback
        title="Unable to Load Video"
        description="We encountered an issue playing this video. Please try refreshing the page."
        refreshLabel="Refresh Page"
      />
    );
  }

  return (
    <VideoPlayer
      videoSrc={src}
      onError={() => setVideoError(true)}
    />
  );
}
