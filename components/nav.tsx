"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ui/button";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent the page scrolling behind the open mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled && "border-b border-white/[0.06] bg-[#030712]/80 backdrop-blur-xl",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <ButtonLink href={profile.resume} download size="sm" variant="secondary">
            Resume
          </ButtonLink>
        </div>

        {/* ml-auto keeps it right-aligned on mobile, where it is the only child. */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="ml-auto rounded-lg p-2 text-gray-300 transition-colors hover:bg-white/5 hover:text-white md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/[0.06] bg-[#030712]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-base text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
              <ButtonLink
                href={profile.resume}
                download
                className="mt-3"
                onClick={() => setOpen(false)}
              >
                Download Resume
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
