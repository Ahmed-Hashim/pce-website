"use client";

import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title: "Build the Future with Us",
    description: "Empowering innovation through smart design, technology, and strategy.",
    image: "/1.png",
    link: "#learn-more",
    buttonText: "Learn More",
  },
  {
    id: 2,
    title: "Design Beyond Limits",
    description: "Delivering creative solutions that drive progress and success.",
    image: "/2.png",
    link: "#discover",
    buttonText: "Discover More",
  },
  {
    id: 3,
    title: "Innovate. Create. Elevate.",
    description: "We craft experiences that transform ideas into impact.",
    image: "/3.png",
    link: "#contact",
    buttonText: "Get Started",
  },
];

const navLabels = {
  prev: "Previous slide",
  next: "Next slide",
};

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const SLIDE_DURATION = 10000; // ms

  // Drag/Swipe handling
  const dragStartX = useRef<number | null>(null);
  const dragStartTime = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const SWIPE_THRESHOLD_PX = 50;
  const SWIPE_MAX_DURATION_MS = 600;

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === current) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartTime.current = performance.now();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDragging.current || dragStartX.current === null) {
      isDragging.current = false;
      dragStartX.current = null;
      return;
    }
    const deltaX = e.clientX - dragStartX.current;
    const duration = performance.now() - dragStartTime.current;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD_PX && duration < SWIPE_MAX_DURATION_MS) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    isDragging.current = false;
    dragStartX.current = null;
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (isDragging.current) {
      handlePointerUp(e);
    }
    isDragging.current = false;
    dragStartX.current = null;
  };

  // Real-time progress animation and auto-advance
  useEffect(() => {
    let rafId: number;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        nextSlide();
        return; // cleanup will happen when current changes
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <section
      className="relative min-h-[80vh] md:h-screen overflow-hidden text-white touch-manipulation select-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-800 ease-in-out ${
            index === current 
              ? "opacity-100 z-10 scale-100" 
              : "opacity-0 z-0 scale-105"
          }`}
        >
          {/* Animated Background with Ken Burns effect */}
          <div
            className={`absolute inset-0 bg-fixed bg-center bg-cover transition-transform duration-2000ms ease-out ${
              index === current ? "scale-110" : "scale-100"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Animated Content */}
          <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6">
            <div
              className={`transition-all duration-800 ease-out ${
                index === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-heading animate-fade-in-up drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-6 text-foreground-secondary animate-fade-in-up animation-delay-200 max-w-2xl mx-auto leading-relaxed">
                {slide.description}
              </p>
              <div className="animate-fade-in-up animation-delay-400">
                <a
                  href={slide.link}
                  className="inline-flex items-center gap-2 bg-accent text-button-text px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <span>{slide.buttonText}</span> 
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        aria-label={navLabels.prev}
        className="hidden lg:flex items-center justify-center absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 md:p-3 rounded-full text-white transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-30"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        disabled={isAnimating}
        aria-label={navLabels.next}
        className="hidden lg:flex items-center justify-center absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 md:p-3 rounded-full text-white transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-30"
      >
        <FaArrowRight />
      </button>

      {/* Enhanced Dots indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === i 
                ? "bg-accent scale-125 w-8" 
                : "bg-white/50 hover:bg-white hover:scale-110"
            }`}
          ></button>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-30">
        <div 
          className="h-full bg-accent"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </section>
  );
};

export default HeroSection;
