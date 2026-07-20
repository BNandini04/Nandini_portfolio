import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10 md:py-36", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-indigo-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 text-pretty text-lg leading-relaxed text-gray-400 md:text-xl">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
