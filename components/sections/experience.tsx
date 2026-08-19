import { Check, MapPin } from "lucide-react";
import { experience } from "@/data/portfolio";
import { Section, SectionHeading } from "../ui/section";
import { Reveal, RevealGroup, RevealItem } from "../ui/reveal";
import { GlassCard } from "../ui/glass-card";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've Shipped"
        subtitle="One company, two promotions, and full ownership of the engineering function."
      />

      <div className="mt-20 space-y-8">
        {experience.map((job) => (
          <Reveal key={job.role}>
            <GlassCard className="p-8 md:p-12">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-3xl font-semibold text-white md:text-4xl">
                      {job.company}
                    </h3>
                    <span
                      className={
                        job.current
                          ? "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300"
                          : "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-400"
                      }
                    >
                      <span
                        className={
                          job.current
                            ? "h-1.5 w-1.5 rounded-full bg-emerald-400"
                            : "h-1.5 w-1.5 rounded-full bg-gray-500"
                        }
                      />
                      {job.period}
                    </span>
                  </div>
                  <p className="mt-2 text-lg text-indigo-300">{job.role}</p>
                  <p className="mt-1 text-sm text-gray-500">{job.legalEntity}</p>
                </div>
                <p className="flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin size={14} />
                  {job.location}
                </p>
              </div>

              <RevealGroup className="mt-10 grid gap-x-10 gap-y-4 md:grid-cols-2">
                {job.achievements.map((a) => (
                  <RevealItem key={a} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/15">
                      <Check size={12} className="text-indigo-300" />
                    </span>
                    <span className="text-pretty leading-relaxed text-gray-300">{a}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
