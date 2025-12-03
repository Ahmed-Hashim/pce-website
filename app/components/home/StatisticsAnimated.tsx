"use client";
import React, { useEffect, useRef, useState } from "react";

// Define the type so the parent knows what to pass
export type StatItem = {
  id?: number;
  title: string;
  stat: string;
};

export default function StatisticsAnimated({ stats }: { stats: StatItem[] }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const hasAnimated = useRef(false);
  
  // Initial State: 0s
  const [displayValues, setDisplayValues] = useState<string[]>(
    stats.map((s) => {
       const m = s.stat.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
       return m ? `${m[1]}0${m[3]}` : s.stat;
    })
  );

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setInView(true);
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
        const val = from + (to - from) * eased;
        update(to % 1 !== 0 ? Number(val.toFixed(1)) : Math.round(val));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    stats.forEach((s, i) => {
      const parsed = parseValue(s.stat || "");
      if (!parsed) return;
      animate(0, parsed.target, 1500, (v) => {
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
    <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <h3 className="font-extrabold text-white text-4xl sm:text-5xl tracking-tight">
              {displayValues[index]}
            </h3>
            <small className="uppercase text-xs md:text-sm tracking-wide text-white/60 mt-2 block">
              {stat.title}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}