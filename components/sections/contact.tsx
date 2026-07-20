import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Section } from "../ui/section";
import { Reveal, RevealGroup, RevealItem } from "../ui/reveal";
import { GlassCard } from "../ui/glass-card";
import { ButtonLink } from "../ui/button";

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Linkedin, label: "LinkedIn", value: "Connect with me", href: profile.linkedin },
  { icon: Github, label: "GitHub", value: "See my code", href: profile.github },
];

export function Contact() {
  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-3xl glass p-10 md:p-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full opacity-50 blur-[130px]"
          style={{
            background: "radial-gradient(circle, rgba(79,70,229,0.45), transparent 70%)",
          }}
        />

        <div className="relative">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-indigo-400">
              Get in touch
            </p>
            <h2 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-gradient md:text-6xl lg:text-7xl">
              Let&apos;s Build Something Amazing Together.
            </h2>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-gray-400">
              Open to conversations about AI products, engineering leadership and
              anything genuinely hard to build.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${profile.email}`} size="lg">
              <Mail size={16} /> Say Hello
            </ButtonLink>
            <ButtonLink href={profile.resume} download size="lg" variant="secondary">
              <Download size={16} /> Download Resume
            </ButtonLink>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-4 md:grid-cols-3">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <RevealItem key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="block h-full"
                >
                  <GlassCard className="flex h-full items-center gap-4 p-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10">
                      <Icon size={18} className="text-indigo-300" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        {label}
                      </p>
                      <p className="truncate text-sm text-gray-200">{value}</p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-gray-600 transition-colors group-hover:text-indigo-300"
                    />
                  </GlassCard>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
