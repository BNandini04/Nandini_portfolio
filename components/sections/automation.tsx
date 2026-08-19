import { Workflow } from "lucide-react";
import { automations } from "@/data/portfolio";
import { Section, SectionHeading } from "../ui/section";
import { RevealGroup, RevealItem } from "../ui/reveal";
import { GlassCard } from "../ui/glass-card";
import { Badge } from "../ui/badge";

export function Automation() {
  return (
    <Section id="automation">
      <SectionHeading
        eyebrow="Automation"
        title="AI Automation & Workflow Engineering"
        subtitle="Status-driven pipelines that take manual operational work off people's desks."
      />

      <RevealGroup className="mt-20 grid gap-6 lg:grid-cols-2" stagger={0.08}>
        {automations.map((a) => (
          <RevealItem key={a.title}>
            <GlassCard className="flex h-full flex-col p-8 md:p-10">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-400/45 group-hover:bg-indigo-500/20 group-hover:shadow-[0_0_22px_-6px_rgba(99,102,241,0.85)]">
                <Workflow
                  size={19}
                  className="text-indigo-300 transition-colors duration-300 group-hover:text-indigo-200"
                />
              </span>

              <h3 className="mt-6 text-pretty text-xl font-medium text-white md:text-2xl">
                {a.title}
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-gray-400">
                {a.summary}
              </p>

              <ul className="mt-6 space-y-3">
                {a.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400"
                    />
                    <span className="text-pretty text-sm leading-relaxed text-gray-300">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>

              {/* mt-auto keeps the tool row pinned to the bottom of both cards. */}
              <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                {a.tools.map((t) => (
                  <li key={t}>
                    <Badge>{t}</Badge>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
