"use client";

import { motion } from "framer-motion";

/**
 * Abstract laptop mockup. Renders a stylised dashboard rather than a
 * screenshot so no image assets are required — swap the screen contents for a
 * real <Image> once product captures are available.
 */
export function LaptopMockup({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="relative mx-auto w-full max-w-4xl" style={{ perspective: 1600 }}>
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

          <div className="grid grid-cols-[auto_1fr] gap-5 p-5 md:p-8">
            {/* Sidebar */}
            <div className="hidden w-36 space-y-2.5 sm:block">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-7 rounded-lg"
                  style={{
                    background: i === 1 ? `${accent}33` : "rgba(255,255,255,0.04)",
                  }}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.5 }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-16 rounded-xl border border-white/[0.06] bg-white/[0.03] md:h-20"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                  />
                ))}
              </div>

              {/* Bar chart */}
              <div className="flex h-28 items-end gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 md:h-40">
                {[42, 68, 35, 88, 56, 72, 48, 95, 61].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      background: `linear-gradient(to top, ${accent}, ${accent}22)`,
                    }}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.05, duration: 0.7, ease: "easeOut" }}
                  />
                ))}
              </div>

              <div className="space-y-2">
                {[100, 82, 64].map((w, i) => (
                  <motion.div
                    key={i}
                    className="h-2.5 rounded-full bg-white/[0.05]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${w}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 + i * 0.08, duration: 0.6 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Base */}
        <div className="h-3.5 rounded-b-xl border-x border-b border-white/10 bg-gradient-to-b from-[#1F2937] to-[#0B1120]" />
        <div className="mx-auto h-1.5 w-1/4 rounded-b-lg bg-[#111827]" />
      </motion.div>
    </div>
  );
}
