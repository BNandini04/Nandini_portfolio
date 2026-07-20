import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "../ui/section";
import { RevealGroup, RevealItem } from "../ui/reveal";
import { GlassCard } from "../ui/glass-card";
import { Badge } from "../ui/badge";

export function Projects() {
  // Featured leads the grid: it spans both columns, so anything ahead of it
  // would be stranded next to an empty cell.
  const ordered = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  );

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Featured Products"
        title="Things I've Built"
        subtitle="Production AI products with real users — each one owned end to end, from architecture through deployment."
      />

      <RevealGroup className="mt-20 grid gap-6 lg:grid-cols-2" stagger={0.12}>
        {ordered.map((project) => (
          // min-w-0 stops a long project name (grid items default to
          // min-width:auto) from widening the track past the viewport.
          <RevealItem
            key={project.slug}
            className={cn("min-w-0", project.featured && "lg:col-span-2")}
          >
            <Link href={`/projects/${project.slug}`} className="block h-full">
              <GlassCard className="h-full p-8 md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      className={
                        project.featured
                          ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-200"
                          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      }
                    >
                      {project.featured && <Star size={11} className="mr-1.5" />}
                      {project.status}
                    </Badge>
                    <Badge>{project.category}</Badge>
                  </div>
                  <ArrowUpRight
                    size={22}
                    className="shrink-0 text-gray-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-300"
                  />
                </div>

                <h3
                  className={cn(
                    "mt-8 break-words font-semibold tracking-tight text-white",
                    project.featured
                      ? "text-3xl sm:text-4xl md:text-6xl"
                      : "text-2xl sm:text-3xl md:text-4xl",
                  )}
                >
                  {project.name}
                </h3>

                <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-gray-400 md:text-lg">
                  {project.summary}
                </p>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {project.tech.slice(0, project.featured ? 10 : 6).map((t) => (
                    <li key={t}>
                      <Badge className="font-mono">{t}</Badge>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-300">
                  View case study
                  <ArrowUpRight size={14} />
                </p>
              </GlassCard>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
