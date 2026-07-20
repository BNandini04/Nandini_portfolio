"use client";

import { motion } from "framer-motion";
import { aboutStatement, journey } from "@/data/portfolio";
import { Section, SectionHeading } from "../ui/section";
import { Reveal } from "../ui/reveal";

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title="My Journey"
        subtitle="Five steps from a commerce classroom to owning engineering at an AI company."
      />

      <div className="relative mt-20 max-w-3xl">
        {/* Spine — grows as the section scrolls into view. */}
        <motion.div
          aria-hidden
          className="absolute left-[15px] top-2 w-px origin-top bg-gradient-to-b from-indigo-500 via-indigo-500/40 to-transparent"
          style={{ height: "calc(100% - 1rem)" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />

        <ol className="space-y-12">
          {journey.map((step, i) => (
            <Reveal as="li" key={step.stage} delay={i * 0.12} className="relative pl-14">
              <span
                aria-hidden
                className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-indigo-500/30 bg-[#030712]"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500 shadow-[0_0_14px_2px_rgba(79,70,229,0.8)]" />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-600">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-2xl font-medium text-white md:text-3xl">
                {step.stage}
              </h3>
              <p className="mt-2 max-w-lg text-pretty leading-relaxed text-gray-400">
                {step.detail}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal className="mt-20 max-w-3xl border-l-2 border-indigo-500/50 pl-8">
        {aboutStatement.map((line, i) => (
          <p
            key={i}
            className="text-pretty text-xl leading-relaxed text-gray-300 first:text-2xl first:font-medium first:text-white md:text-2xl md:first:text-3xl [&:not(:first-child)]:mt-6"
          >
            {line}
          </p>
        ))}
      </Reveal>
    </Section>
  );
}
