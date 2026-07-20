"use client";

import { motion } from "framer-motion";
import { techStack } from "@/data/portfolio";
import { brandIcons } from "@/lib/brand-icons";
import { Section, SectionHeading } from "../ui/section";

/** Short monogram for brands with no available mark (OpenAI, AWS). */
const MONOGRAM: Record<string, string> = { OpenAI: "AI", AWS: "AWS" };

function TechTile({ name, index }: { name: string; index: number }) {
  const icon = brandIcons[name];
  const monogram = MONOGRAM[name];

  return (
    // Entrance is driven by the parent's stagger variants; the inner element
    // owns the idle float so the two animations don't fight over `y`.
    <motion.li
      className="group relative"
      variants={{
        hidden: { opacity: 0, scale: 0.7 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
      }}
    >
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{
          duration: 4.5 + (index % 5) * 0.7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: (index % 7) * 0.35,
        }}
        className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl glass transition-all duration-300 group-hover:scale-110 group-hover:border-white/20 md:h-24 md:w-24"
        title={name}
      >
        {icon ? (
          <svg
            role="img"
            aria-label={name}
            viewBox="0 0 24 24"
            className="h-8 w-8 fill-gray-300 transition-colors duration-300 md:h-9 md:w-9"
            style={{ ["--brand" as string]: icon.hex }}
          >
            <path d={icon.path} className="group-hover:fill-[var(--brand)]" />
          </svg>
        ) : (
          <span
            aria-label={name}
            className="font-mono text-lg font-semibold text-gray-300 transition-colors duration-300 group-hover:text-indigo-300 md:text-xl"
          >
            {monogram ?? name.slice(0, 2)}
          </span>
        )}
      </motion.div>
      <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-gray-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {name}
      </span>
    </motion.li>
  );
}

export function TechCloud() {
  return (
    <Section id="stack">
      <SectionHeading
        eyebrow="Tech Stack"
        title="The Toolkit"
        align="center"
        subtitle="Everything I use day to day to design, build, automate and ship."
      />

      <div className="relative mt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(79,70,229,0.4), transparent 70%)",
          }}
        />
        <motion.ul
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {techStack.map((name, i) => (
            <TechTile key={name} name={name} index={i} />
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}
