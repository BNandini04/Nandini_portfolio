import {
  Brain,
  Database,
  Layers,
  MessageSquareCode,
  Network,
  Rocket,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/portfolio";
import { Section, SectionHeading } from "../ui/section";
import { RevealGroup, RevealItem } from "../ui/reveal";
import { GlassCard } from "../ui/glass-card";

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Layers,
  Database,
  Workflow,
  Brain,
  MessageSquareCode,
  Network,
  Rocket,
};

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What I Do"
        title="How I Can Help"
        subtitle="End-to-end ownership across the whole surface of an AI product."
      />

      <RevealGroup className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
        {services.map((s) => {
          const Icon = ICONS[s.icon] ?? Sparkles;
          return (
            <RevealItem key={s.title}>
              <GlassCard className="h-full p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-400/45 group-hover:bg-indigo-500/20 group-hover:shadow-[0_0_22px_-6px_rgba(99,102,241,0.85)]">
                  <Icon
                    size={19}
                    className="text-indigo-300 transition-colors duration-300 group-hover:text-indigo-200"
                  />
                </span>
                <h3 className="mt-6 text-base font-medium text-white">{s.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-gray-400">
                  {s.description}
                </p>
              </GlassCard>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
