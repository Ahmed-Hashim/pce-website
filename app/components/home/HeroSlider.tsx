"use client";

import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export interface HeroSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  buttonText: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
}

const HeroSlider = ({ slides }: HeroSliderProps) => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Settings
  const SLIDE_DURATION = 8000;
  const SWIPE_THRESHOLD_PX = 50;
  const SWIPE_MAX_DURATION_MS = 600;

  // Refs
  const dragStartX = useRef<number | null>(null);
  const dragStartTime = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  // --- Logic Handlers ---
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === current) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  // --- Touch/Swipe Logic ---
  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartTime.current = performance.now();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDragging.current || dragStartX.current === null) {
      isDragging.current = false;
      return;
    }
    const deltaX = e.clientX - dragStartX.current;
    const duration = performance.now() - dragStartTime.current;

    if (
      Math.abs(deltaX) > SWIPE_THRESHOLD_PX &&
      duration < SWIPE_MAX_DURATION_MS
    ) {
      if (deltaX < 0) nextSlide();
      else prevSlide();
    }

    isDragging.current = false;
    dragStartX.current = null;
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (isDragging.current) handlePointerUp(e);
  };

  // --- Effects ---
  useEffect(() => {
    if (isAnimating) return;
    let rafId: number;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        nextSlide();
        return;
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, isAnimating]);

  useEffect(() => {
    setProgress(0);
  }, [current]);

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-900 text-white select-none cursor-grab active:cursor-grabbing touch-pan-y
                 h-[calc(100dvh-5.5rem)]"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerMove={(e) => {
        if (isDragging.current) e.preventDefault();
      }}
    >
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1200 ease-in-out ${
              isActive
                ? "opacity-100 z-10 scale-100"
                : "opacity-0 z-0 scale-105"
            }`}
          >
            {/* Animated Background */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-8000 ease-linear ${
                isActive ? "scale-110" : "scale-100"
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40 bg-linear-to-b from-black/30 via-transparent to-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-8 md:px-16 max-w-5xl mx-auto">
              <div
                className={`transition-all duration-1000 ease-out flex flex-col items-center ${
                  isActive
                    ? "opacity-100 translate-y-0 delay-300"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg tracking-tight leading-tight">
                  {slide.title}
                </h1>

                <p
                  className={`text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md transition-all duration-1000 ease-out delay-500 ${
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {slide.description}
                </p>

                <div
                  className={`transition-all duration-1000 ease-out delay-700 ${
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <a
                    href={slide.link}
                    className="group inline-flex items-center gap-3 bg-primary-dark hover:bg-primary-medium text-white px-6 sm:px-8 py-3 sm:py-4 rounded-sm text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-600/20"
                  >
                    <span>{slide.buttonText}</span>
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="hidden lg:flex items-center justify-center absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 w-14 h-14 rounded-full text-white transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-30 group"
      >
        <FaArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="hidden lg:flex items-center justify-center absolute right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 w-14 h-14 rounded-full text-white transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-30 group"
      >
        <FaArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`transition-all duration-500 rounded-full ${
              current === i
                ? "bg-primary-dark w-10 h-3 shadow-lg shadow-primary-dark/50"
                : "bg-primary-medium w-3 h-3 hover:bg-secondary-light hover:scale-110"
            }`}
          />
        ))}
      </div>

      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
        <div
          className="h-full bg-primary-dark shadow-primary-medium transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
};

export default HeroSlider;
