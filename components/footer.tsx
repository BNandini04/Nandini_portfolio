import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";

const socials = [
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
  { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: Github, href: profile.github, label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row md:px-10">

        <div className="flex items-center gap-1">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="rounded-lg p-2.5 text-gray-500 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>

        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
