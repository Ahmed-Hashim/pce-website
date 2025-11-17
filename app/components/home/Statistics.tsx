"use client";
import React, { useEffect, useRef, useState } from "react";
import TriangleIcon from "../ui/TriangleIcon";

interface Stat {
  icon?: React.ReactNode;
  value: string;
  label: string;
}

interface StatisticsProps {
  title: string;
  eyebrow?: string;
  background?: string;
  stats: Stat[];
  titleColor?: string;
  backgroundTextColor?: string;
  outlineColor?: string;
  backgroundOpacity?: number;
}

const Statistics: React.FC<StatisticsProps> = ({
  title,
  eyebrow,
  background,
  stats,
  titleColor,
  backgroundTextColor,
  outlineColor,
  backgroundOpacity,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [displayValues, setDisplayValues] = useState<string[]>(stats.map((s) => s.value));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;

    const parseValue = (val: string) => {
      const m = val.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
      if (!m) return null;
      return { prefix: m[1] || "", target: Number(m[2]), suffix: m[3] || "" };
    };

    const animate = (from: number, to: number, duration: number, update: (v: number) => void) => {
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 2);
        const val = Math.round(from + (to - from) * eased);
        update(val);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    stats.forEach((s, i) => {
      const parsed = parseValue(s.value);
      if (!parsed) return;
      animate(0, parsed.target, 1000 + i * 200, (v) => {
        setDisplayValues((prev) => {
          const next = [...prev];
          next[i] = `${parsed.prefix}${v}${parsed.suffix}`;
          return next;
        });
      });
    });

    hasAnimated.current = true;
  }, [inView, stats]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-primary-dark">
      <TriangleIcon className="absolute left-6 top-6 w-6 h-6 text-white/10" />
      <TriangleIcon className="absolute right-7 bottom-6 w-7 h-7 text-white/10" />
      <TriangleIcon className="absolute right-6 bottom-6 w-6 h-6 text-white/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="font-extrabold text-white tracking-tight">
                {displayValues[index]}
              </h3>
              <small className="uppercase text-xs md:text-lg tracking-wide text-white/60">
                {stat.label}
              </small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
