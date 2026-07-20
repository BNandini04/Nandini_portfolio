"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Glassmorphism surface with a pointer-tracked highlight.
 *
 * Layers, back to front: a hover-only gradient border, the pointer spotlight,
 * a hairline sheen along the top edge, then content. The spotlight is driven by
 * CSS custom properties so it costs no React work beyond the coordinate state.
 */
export function GlassCard({
  children,
  className,
  interactive = true,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={
        interactive
          ? (e) => {
              const r = ref.current?.getBoundingClientRect();
              if (!r) return;
              setPos({
                x: ((e.clientX - r.left) / r.width) * 100,
                y: ((e.clientY - r.top) / r.height) * 100,
              });
            }
          : undefined
      }
      className={cn(
        // `isolate` + `-z-10` on the overlays keeps children painting above them
        // without a wrapper, so layout classes here apply to the children.
        "group relative isolate overflow-hidden rounded-2xl glass",
        "transition-[transform,border-color,box-shadow] duration-300 ease-out",
        interactive &&
          "hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9),0_0_28px_-14px_rgba(79,70,229,0.55)]",
        className,
      )}
    >
      {interactive && (
        <>
          {/* Gradient border, revealed on hover. The mask punches out the
              interior so only a 1px rim of the gradient shows. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(140deg, rgba(129,140,248,0.55), rgba(79,70,229,0.12) 45%, transparent 70%)",
              padding: 1,
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* Pointer spotlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(340px circle at ${pos.x}% ${pos.y}%, rgb(99 102 241 / 0.16), transparent 70%)`,
            }}
          />
        </>
      )}

      {/* Hairline sheen along the top edge — reads as a lit surface. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      {children}
    </div>
  );
}
