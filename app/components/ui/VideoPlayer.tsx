"use client";
import { useState, useRef } from "react";

interface VideoPlayerProps {
  videoSrc: string;
  poster?: string;
  title?: string;
  subTitle?: string;
  onError?: () => void;
  className?: string;
  showControls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export default function VideoPlayer({
  videoSrc,
  poster = "",
  title = "",
  subTitle = "",
  onError,
  className = "",
  showControls = true,
  autoPlay = false,
  muted = false,
  loop = false
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          // If play fails, trigger error handler
          onError?.();
        });
        setHasStarted(true);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative rounded-sm overflow-hidden shadow-2xl border border-secondary-dark bg-secondary-dark/20 group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video bg-linear-to-br from-border/40 to-border/20 flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern Overlay - Only show when video is not playing */}
        {!hasStarted && (
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 gap-2 p-8">
              {[...Array(32)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-primary-medium/30 rounded-full"></div>
              ))}
            </div>
          </div>
        )}
        
        {/* Actual Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300"
          poster={poster}
          preload="metadata"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={onError}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video Overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-primary-dark/60 via-transparent to-transparent z-20"></div>
        
        {/* Video Title and Info */}
        {(title || subTitle) && (
          <div className="absolute bottom-6 left-6 right-6 z-30">
            {title && <p className="text-white font-semibold text-lg">{title}</p>}
            {subTitle && <p className="text-gray-300 text-sm">{subTitle}</p>}
          </div>
        )}
        
        {/* Play/Pause Button - Only show on hover or when paused */}
        {showControls && (!isPlaying || isHovered) && (
          <div className="absolute inset-0 flex items-center justify-center z-25 transition-opacity duration-300">
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-primary-medium/30 rounded-full flex items-center justify-center hover:bg-primary-medium/40 transition-all duration-300 scale-110 focus:outline-none focus:ring-2 focus:ring-primary-medium focus:ring-offset-2 focus:ring-offset-bg backdrop-blur-sm"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <svg className="w-8 h-8 text-primary-medium" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-primary-medium" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}