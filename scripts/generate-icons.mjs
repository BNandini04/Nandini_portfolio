/**
 * Regenerates lib/brand-icons.ts from the `simple-icons` package.
 *
 * Run: node scripts/generate-icons.mjs
 *
 * Keeping the paths in a checked-in file means the tech cloud has no runtime
 * icon dependency — simple-icons stays a devDependency.
 */
import { writeFileSync } from "node:fs";
import * as si from "simple-icons";

/** Display name -> simple-icons export. Names must match data/portfolio.ts. */
const MAP = {
  React: "siReact",
  "Next.js": "siNextdotjs",
  "Node.js": "siNodedotjs",
  TypeScript: "siTypescript",
  PostgreSQL: "siPostgresql",
  Supabase: "siSupabase",
  Gemini: "siGooglegemini",
  Claude: "siClaude",
  n8n: "siN8n",
  Docker: "siDocker",
  GitHub: "siGithub",
  TailwindCSS: "siTailwindcss",
  "Framer Motion": "siFramer",
};

const header = `/**
 * Brand mark paths (24x24 viewBox) extracted from the \`simple-icons\` package
 * so the tech cloud ships without a runtime icon dependency.
 *
 * Regenerate with: node scripts/generate-icons.mjs
 *
 * OpenAI and AWS are absent from simple-icons (trademark removals) and are
 * rendered as monogram tiles by the TechCloud fallback.
 */
export const brandIcons: Record<string, { hex: string; path: string }> = {
`;

const body = Object.entries(MAP)
  .map(([name, slug]) => {
    const icon = si[slug];
    if (!icon) throw new Error(`simple-icons export "${slug}" not found for ${name}`);
    return `  ${JSON.stringify(name)}: { hex: ${JSON.stringify(`#${icon.hex}`)}, path: ${JSON.stringify(icon.path)} },`;
  })
  .join("\n");

writeFileSync("lib/brand-icons.ts", `${header}${body}\n};\n`);
console.log(`Wrote lib/brand-icons.ts (${Object.keys(MAP).length} icons)`);
