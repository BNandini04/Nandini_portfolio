"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Browser frame around a real product screenshot. Captures are 16:10, so the
 * screen area is locked to that ratio and the image fills it — a shorter or
 * taller capture is cropped rather than letterboxed.
 */
export function LaptopMockup({
  label,
  accent,
  image,
  alt,
}: {
  label: string;
  accent: string;
  image: string;
  alt: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-5xl" style={{ perspective: 1600 }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-10 -z-10 h-full rounded-full opacity-40 blur-[120px]"
        style={{ background: `radial-gradient(circle, ${accent}66, transparent 70%)` }}
      />

      <motion.div
        initial={{ rotateX: 18, opacity: 0, y: 40 }}
        whileInView={{ rotateX: 6, opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Screen */}
        <div className="overflow-hidden rounded-t-2xl border border-white/10 bg-[#0B1120] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-4 truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-gray-500">
              {label.toLowerCase().replace(/[^a-z0-9.]/g, "")}
            </span>
          </div>

          <div className="relative aspect-[16/10] w-full">
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>

        {/* Base */}
        <div className="h-3.5 rounded-b-xl border-x border-b border-white/10 bg-gradient-to-b from-[#1F2937] to-[#0B1120]" />
        <div className="mx-auto h-1.5 w-1/4 rounded-b-lg bg-[#111827]" />
      </motion.div>
    </div>
  );
}
