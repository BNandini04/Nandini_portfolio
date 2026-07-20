import { Boxes, Bot, Cpu, Server, Wrench } from "lucide-react";
import { skills } from "@/data/portfolio";
import { Section, SectionHeading } from "../ui/section";
import { RevealGroup, RevealItem } from "../ui/reveal";
import { GlassCard } from "../ui/glass-card";
import { Badge } from "../ui/badge";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Frontend: Boxes,
  Backend: Server,
  AI: Bot,
  Automation: Cpu,
  "Developer Tools": Wrench,
};

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Capabilities"
        title="Skills & Tooling"
        subtitle="The stack I reach for when taking a product from an idea to something running in production."
      />

      <RevealGroup className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => {
          const Icon = ICONS[group.category] ?? Boxes;
          return (
            <RevealItem key={group.category}>
              <GlassCard className="h-full p-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 transition-all duration-300 group-hover:border-indigo-400/45 group-hover:bg-indigo-500/20 group-hover:shadow-[0_0_20px_-6px_rgba(99,102,241,0.8)]">
                    <Icon
                      size={18}
                      className="text-indigo-300 transition-colors duration-300 group-hover:text-indigo-200"
                    />
                  </span>
                  <h3 className="text-lg font-medium text-white">{group.category}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge>{item}</Badge>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
