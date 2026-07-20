"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/portfolio";
import { ButtonLink } from "../ui/button";
import { BLOB_SHAPE, ProfileBlob } from "../profile-blob";

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-20"
    >
      {/* Ambient glow — sits behind content, never intercepts pointer events. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-50 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(79,70,229,0.35), rgba(79,70,229,0) 70%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          {/* The orb carries the photo on lg+; below that it's hidden, so the
              avatar appears here instead. */}
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mb-8 lg:hidden"
          >
            {/* Blob-clipped, matching the ProfileBlob treatment used on lg+. */}
            <div className="relative h-[180px] w-[180px]">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  borderRadius: "52% 48% 56% 44% / 44% 52% 48% 56%",
                  background:
                    "linear-gradient(150deg, #6366F1, #4F46E5 55%, #3730A3 100%)",
                }}
              />
              <div
                className="relative h-[87%] w-[87%] translate-x-[7.5%] translate-y-[7.5%] overflow-hidden bg-[#111827]"
                style={{
                  borderRadius: BLOB_SHAPE,
                  boxShadow: "0 20px 50px -20px rgba(0,0,0,0.9)",
                }}
              >
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  sizes="180px"
                  priority
                  style={{ objectPosition: "center 24%" }}
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-gray-300">
              {profile.role} @ {profile.company}
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="text-balance text-6xl font-semibold leading-[0.95] tracking-tight text-gradient sm:text-7xl lg:text-8xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-6 font-mono text-sm tracking-wide text-indigo-300 sm:text-base"
          >
            {profile.roles.join("  •  ")}
          </motion.p>

          <motion.p
            custom={3}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-gray-400 sm:text-xl"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            custom={4}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="#projects" size="lg">
              View Projects <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href={profile.resume} download size="lg" variant="secondary">
              <Download size={16} /> Download Resume
            </ButtonLink>
            <ButtonLink href="#contact" size="lg" variant="ghost">
              <Mail size={16} /> Contact Me
            </ButtonLink>
          </motion.div>

          <motion.div
            custom={5}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-10 flex items-center gap-2 text-sm text-gray-500"
          >
            <MapPin size={14} />
            {profile.location}
            <span className="mx-1 text-gray-700">/</span>
            {profile.experience} building AI products
          </motion.div>
        </div>

        <div className="relative hidden lg:block">
          <ProfileBlob />
        </div>
      </div>
    </section>
  );
}
