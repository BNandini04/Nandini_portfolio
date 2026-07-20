"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number };

/**
 * Ambient drifting particles on a canvas. Deliberately canvas rather than DOM
 * nodes — a few hundred animated divs would tank scroll performance.
 */
export function Particles({ density = 0.00008 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let particles: Particle[] = [];
    let frame = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.round(w * h * density), 140);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 0.5,
        a: Math.random() * 0.5 + 0.15,
      }));
    };

    const tick = () => {
      const { innerWidth: w, innerHeight: h } = window;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap rather than bounce — bouncing creates visible edge clustering.
        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 180, 252, ${p.a})`;
        ctx.fill();
      }

      frame = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
    />
  );
}
