import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Star } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Particles } from "@/components/particles";
import { AiAssistant } from "@/components/ai-assistant";
import { LaptopMockup } from "@/components/laptop-mockup";
import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

type Params = { params: Promise<{ slug: string }> };

/** Pre-render every case study at build time. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: project.name,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Particles density={0.00005} />
      <Nav />

      <main id="main" className="relative z-10 pt-32">
        <Section className="py-0 md:py-0">
          <Reveal>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
            >
              <ArrowLeft size={15} /> All projects
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-2">
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

            <h1 className="mt-8 break-words text-balance text-4xl font-semibold tracking-tight text-gradient sm:text-5xl md:text-7xl lg:text-8xl">
              {project.name}
            </h1>

            <p className="mt-8 max-w-2xl text-pretty text-xl leading-relaxed text-gray-400">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-20">
            <LaptopMockup label={project.name} accent={project.accent} />
          </Reveal>
        </Section>

        <Section>
          <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Overview
              </h2>
              <div className="mt-8 space-y-6">
                {project.description.map((p, i) => (
                  <p key={i} className="text-pretty text-lg leading-relaxed text-gray-400">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <GlassCard interactive={false} className="p-8">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-400">
                  Technology
                </h3>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li key={t}>
                      <Badge className="font-mono">{t}</Badge>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-indigo-400">
                  Highlights
                </h3>
                <ul className="mt-6 space-y-3">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/15">
                        <Check size={12} className="text-indigo-300" />
                      </span>
                      <span className="text-sm leading-relaxed text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </Section>

        {project.modules && (
          <Section>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-indigo-400">
                Platform
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {project.modules.length} Modules
              </h2>
              <p className="mt-6 max-w-2xl text-pretty text-lg text-gray-400">
                Every stage of a legal case, modelled as software.
              </p>
            </Reveal>

            <RevealGroup
              className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.05}
            >
              {project.modules.map((m, i) => (
                <RevealItem key={m}>
                  <GlassCard className="flex h-full items-center gap-4 p-6">
                    <span className="font-mono text-sm text-indigo-500/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-gray-200">{m}</span>
                  </GlassCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </Section>
        )}

        <Section>
          <Reveal>
            <GlassCard interactive={false} className="p-10 md:p-16">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-indigo-400">
                Next project
              </p>
              <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
                <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
                  {next.name}
                </h2>
                <ButtonLink href={`/projects/${next.slug}`} size="lg">
                  View case study <ArrowRight size={16} />
                </ButtonLink>
              </div>
            </GlassCard>
          </Reveal>
        </Section>
      </main>

      <Footer />
      <AiAssistant />
    </>
  );
}
