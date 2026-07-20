"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/portfolio";

/** Organic pebble shapes. Static — nothing morphs or loops. */
export const BLOB_SHAPE = "58% 42% 47% 53% / 48% 44% 56% 52%";
const BLOB_BACKDROP = "52% 48% 56% 44% / 44% 52% 48% 56%";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero visual in the style of the supplied reference: a solid accent blob with
 * the portrait clipped to a second organic shape on top.
 *
 * Hover is deliberately restrained — the group lifts slightly, the glow
 * brightens and the photo eases in. The shape itself never tilts or distorts,
 * so the rim stays even at every cursor position.
 *
 * The source photo is 851x1280 with a dark studio backdrop. Because it isn't a
 * transparent cutout, the portrait is clipped to the blob rather than spilling
 * past its edge as in the reference — the accent blob sits behind so the
 * layered shape still reads.
 */
export function ProfileBlob() {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const active = hovered && !reduceMotion;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center"
    >
      {/* Soft wash — brightens on hover */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 45% 40%, rgba(79,70,229,0.45), transparent 68%)",
        }}
        animate={{ opacity: active ? 1 : 0.7, scale: active ? 1.06 : 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      />

      {/* Lift group — accent blob and portrait move together, so the exposed
          rim keeps the same thickness all the way round. */}
      <motion.div
        className="relative flex h-full w-full items-center justify-center"
        animate={{ y: active ? -8 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* Accent blob — the reference's solid colour shape. A different pebble
            shape from the portrait, so the rim varies organically. */}
        <div
          aria-hidden
          className="absolute h-[94%] w-[94%]"
          style={{
            borderRadius: BLOB_BACKDROP,
            background:
              "linear-gradient(150deg, #6366F1, #4F46E5 55%, #3730A3 100%)",
          }}
        />

        {/* Portrait, clipped to the blob */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          className="relative h-[82%] w-[82%] overflow-hidden bg-[#111827]"
          style={{ borderRadius: BLOB_SHAPE }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ scale: active ? 1.04 : 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="440px"
              priority
              // Frames the crop on the head and shoulders.
              style={{ objectPosition: "center 24%" }}
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Drop shadow, deepens as the group lifts */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[6%] h-8 w-[70%] rounded-[50%] blur-2xl"
        style={{ background: "rgba(0,0,0,0.75)" }}
        animate={{ opacity: active ? 0.85 : 0.5, scaleX: active ? 1.05 : 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </div>
  );
}
