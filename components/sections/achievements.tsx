"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { achievements } from "@/data/portfolio";
import { Section } from "../ui/section";
import { RevealGroup, RevealItem } from "../ui/reveal";
import { GlassCard } from "../ui/glass-card";

/**
 * Animates the numeric part of a label like "3+" or "100%" while preserving
 * whatever prefix/suffix characters surround it.
 */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const target = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[\d]/g, "");
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;

    const duration = 1400;
    let raf = 0;
    let start: number | null = null;

    const step = (ts: number) => {
      start ??= ts;
      const p = Math.min((ts - start) / duration, 1);
      // easeOutExpo — fast start, gentle settle.
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} aria-label={value}>
      {Number.isNaN(target) ? value : `${n}${suffix}`}
    </span>
  );
}

export function Achievements() {
  return (
    <Section className="py-20 md:py-24">
      <RevealGroup className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {achievements.map((a) => (
          <RevealItem key={a.label}>
            <GlassCard className="h-full p-6 text-center md:p-8">
              <p className="text-4xl font-semibold tracking-tight text-gradient transition-transform duration-300 group-hover:scale-105 md:text-5xl">
                <CountUp value={a.value} />
              </p>
              <p className="mt-3 text-pretty text-sm leading-snug text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                {a.label}
              </p>
            </GlassCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
