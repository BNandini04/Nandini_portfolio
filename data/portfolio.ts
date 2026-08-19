/**
 * Single source of truth for every piece of content on the site.
 * Sections, project pages, OG images and the AI assistant all read from here.
 */

export const profile = {
  name: "B. Nandini",
  role: "Head of Engineering",
  company: "HireHappi",
  legalEntity: "Emmess Technologies Pvt Ltd",
  experience: "16 Months",
  location: "Bengaluru, Karnataka",
  tagline: "Building AI Products that solve real-world problems.",
  roles: ["Head of Engineering", "AI Full Stack Developer", "Product Builder"],
  intro:
    "I build production-ready AI applications using modern LLMs, Retrieval-Augmented Generation, Agentic Workflows and scalable Full Stack technologies.",
  email: "nandininaidu783@gmail.com",
  phone: "+91 8792364236",
  linkedin: "https://www.linkedin.com/in/nandinib-naidu",
  // TODO: replace with the real GitHub profile URL.
  github: "https://github.com/your-username",
  resume: "/Nandini_Resume.pdf",
  /** Profile photo in public/. Rendered at the centre of the hero AI orb. */
  avatar: "/profile.jpg",
  siteUrl: "https://nandinib-portfolio.netlify.app",
} as const;

export const journey = [
  {
    stage: "Commerce Student",
    detail:
      "Started outside of computer science entirely — balance sheets before build pipelines.",
  },
  {
    stage: "BCA Graduate",
    detail:
      "Made the switch to software and taught myself the full web stack alongside the degree.",
  },
  {
    stage: "AI Full Stack Developer Intern",
    detail:
      "Joined HireHappi and shipped against real production traffic from the first month.",
  },
  {
    stage: "Full Time AI Engineer",
    detail:
      "Converted to full time within 3 months and took ownership of core AI systems.",
  },
  {
    stage: "Head of Engineering",
    detail:
      "Now own architecture, deployments and the engineering direction of the company.",
  },
] as const;

export const education = [
  {
    qualification: "Bachelor of Computer Applications (BCA)",
    institution: "St. Francis College, Bengaluru",
    period: "2021 – 2024",
  },
  {
    qualification: "Commerce with Computers",
    institution: "St. Jerome's College, Bengaluru",
    period: "2019 – 2021",
  },
] as const;

export const aboutStatement = [
  "I believe software should not only work—it should solve meaningful business problems.",
  "Over the past 16 months I have designed, developed and deployed AI-powered SaaS products that are currently used by real users and businesses.",
] as const;

export const skills = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "C++", "C"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "HTML5", "CSS3", "TailwindCSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "REST APIs"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Vector Databases"],
  },
  {
    category: "AI",
    items: [
      "RAG",
      "LLM Integration",
      "Prompt Engineering",
      "ChatGPT",
      "Claude",
      "Gemini",
      "Embeddings",
      "Vector Search",
    ],
  },
  {
    category: "Automation",
    items: ["n8n", "GitHub Actions", "CI/CD"],
  },
  {
    category: "DevOps",
    items: ["Git", "GitHub", "CI/CD"],
  },
  {
    category: "Developer Tools",
    items: [
      "Cursor",
      "Claude Code",
      "Kiro",
      "Antigravity",
      "VS Code",
      "n8n",
    ],
  },
] as const;

export const experience = [
  {
    company: "HireHappi",
    legalEntity: "Emmess Technologies Pvt Ltd",
    role: "Head of Engineering",
    period: "Apr 2026 – Present",
    current: true,
    location: "Bengaluru, Karnataka",
    achievements: [
      "Lead technical strategy, product architecture, engineering execution and AI initiatives.",
      "Own end-to-end software delivery — planning, development, testing, deployment and maintenance.",
      "Drive AI-first engineering practices using modern LLMs, RAG pipelines, vector search and workflow automation.",
      "Mentor engineering efforts while keeping the architecture scalable and production ready.",
    ],
  },
  {
    company: "HireHappi",
    legalEntity: "Emmess Technologies Pvt Ltd",
    role: "AI Full Stack Developer (Intern → Full-Time)",
    period: "Mar 2025 – Apr 2026",
    current: false,
    location: "Bengaluru, Karnataka",
    achievements: [
      "Converted from internship to full-time on performance within three months.",
      "Built two production-grade AI products from scratch, owning architecture through deployment.",
      "Developed scalable full stack applications with React, Next.js, TypeScript, PostgreSQL, APIs and vector databases.",
      "Designed Retrieval-Augmented Generation pipelines and integrated multiple LLM providers.",
      "Implemented GitHub workflows and CI/CD pipelines for streamlined deployments.",
      "Worked extensively with Cursor, Claude Code, Gemini, ChatGPT, Kiro, Antigravity, VS Code and n8n.",
    ],
  },
] as const;

export type Project = {
  slug: string;
  name: string;
  status: string;
  category: string;
  featured: boolean;
  summary: string;
  description: string[];
  features: string[];
  modules?: string[];
  tech: string[];
  accent: string;
  /** Product screenshot in public/, shown in the case-study browser frame. */
  image: string;
  /** Alt text for the screenshot — describes what the capture actually shows. */
  imageAlt: string;
};

export const projects: Project[] = [
  {
    slug: "chooseyourcollege",
    name: "ChooseYourCollege.com",
    status: "Live Product",
    category: "AI Search Platform",
    featured: false,
    summary:
      "An AI-powered college discovery platform that helps students identify the best colleges using NIRF data, intelligent filtering and semantic search.",
    description: [
      "An AI-powered college discovery platform that helps students identify the best colleges using NIRF data, intelligent filtering and semantic search.",
      "Students describe what they want in plain language and the platform resolves it against structured ranking data and a vector index, so the results reflect intent rather than keyword overlap.",
      "The product is live and revenue generating, with an interactive dashboard surfacing rankings, comparisons and analytics.",
    ],
    features: [
      "AI Search",
      "Advanced Filters",
      "College Ranking",
      "Data Analytics",
      "Revenue Generating",
      "Interactive Dashboard",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "OpenAI",
      "Vector Search",
    ],
    accent: "#4F46E5",
    image: "/chooseyourcollege.png",
    imageAlt:
      "ChooseYourCollege.com landing page with the college search bar and platform statistics.",
  },
  {
    slug: "legalmaia",
    name: "LegalMaiA",
    status: "Featured Project",
    category: "AI Operating System",
    featured: true,
    summary:
      "A complete AI operating system for law firms — managing the entire lifecycle of a legal case, not just drafting.",
    description: [
      "A complete AI operating system for law firms.",
      "This is NOT just a legal drafting platform. It manages the complete lifecycle of a legal case — from intake and petition generation through hearings, citations, court records and firm-level analytics.",
      "Built using modern AI architecture with Retrieval-Augmented Generation, intelligent workflows and scalable backend infrastructure.",
    ],
    features: [
      "Retrieval-Augmented Generation",
      "Agentic Workflows",
      "eCourts Integration",
      "Role Based Access",
    ],
    modules: [
      "Case Management",
      "Petition Generator",
      "AI Drafting",
      "Hearings",
      "Timeline",
      "Document Repository",
      "Firm Management",
      "Citation Engine",
      "Court Records",
      "eCourts Integration",
      "Analytics",
      "Role Based Access",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Vector DB",
      "RAG",
      "OpenAI",
      "Gemini",
      "Claude",
      "n8n",
      "AWS",
    ],
    accent: "#6366F1",
    image: "/legalmaia.png",
    imageAlt:
      "LegalMaiA dashboard showing drafting activity, plan usage and recent case drafts.",
  },
  {
    slug: "resumetailor",
    name: "ResumeTailor",
    status: "Live Product",
    category: "AI Career Tooling",
    featured: false,
    summary:
      "An AI-powered resume optimization platform that customizes resumes according to specific job descriptions using Large Language Models.",
    description: [
      "An AI-powered resume optimization platform that customizes resumes according to specific job descriptions using Large Language Models.",
      "The system parses an existing resume, analyses the target job description, and rewrites the content to align with what the role actually asks for — while keeping the output ATS-parseable and human-sounding.",
    ],
    features: [
      "ATS Optimization",
      "Resume Parsing",
      "Job Description Analysis",
      "AI Suggestions",
      "Humanized Resume",
    ],
    tech: ["Next.js", "TypeScript", "OpenAI", "Supabase", "RAG"],
    accent: "#8B5CF6",
    image: "/resumetailor.png",
    imageAlt:
      "ResumeTailor landing page showing the free ATS score check and a sample keyword-match result.",
  },
];

/**
 * Workflow automation work. Lighter weight than `projects` — rendered as a
 * single section, with no individual detail pages.
 */
export const automations = [
  {
    title: "AI Content Creation Automation",
    summary:
      "An end-to-end AI content pipeline covering topic generation, scripting, storyboarding, visual generation, editing, approval and publishing.",
    points: [
      "Built reusable, status-driven workflows with human approval checkpoints to cut manual content production effort.",
      "Chained LLM generation into media production so a single approved topic runs through to a published asset.",
    ],
    tools: [
      "n8n",
      "LLMs",
      "Playwright",
      "ElevenLabs",
      "HeyGen",
      "Higgsfield",
      "Google Drive",
      "WhatsApp",
    ],
  },
  {
    title: "Social Media → WhatsApp → Zoho Lead Automation",
    summary:
      "An automated lead generation and qualification pipeline connecting Meta Ads, WhatsApp CTAs, WhatsApp conversations and Zoho CRM.",
    points: [
      "Automated lead creation, qualification and CRM updates based on WhatsApp responses.",
      "Reduced manual lead processing across the full flow: ad acquisition → WhatsApp conversation → qualification → Zoho CRM → follow-up.",
    ],
    tools: ["n8n", "Meta Ads", "WhatsApp Business", "Zoho CRM", "Webhooks"],
  },
] as const;

export const achievements = [
  { value: "3", label: "Production Products" },
  { value: "16", label: "Months Experience" },
  { value: "2", label: "Promotions" },
  { value: "100%", label: "End-to-End Ownership" },
] as const;

export const services = [
  {
    title: "AI Product Development",
    description:
      "From problem statement to a deployed product real users pay for.",
    icon: "Sparkles",
  },
  {
    title: "Full Stack Development",
    description:
      "Next.js and TypeScript front to back, with Postgres underneath.",
    icon: "Layers",
  },
  {
    title: "RAG Implementation",
    description:
      "Chunking, embeddings, vector search and retrieval that actually grounds answers.",
    icon: "Database",
  },
  {
    title: "AI Automation",
    description:
      "n8n workflows and agentic pipelines that remove manual operational work.",
    icon: "Workflow",
  },
  {
    title: "LLM Integration",
    description:
      "OpenAI, Gemini and Claude wired into products with fallbacks and cost control.",
    icon: "Brain",
  },
  {
    title: "Prompt Engineering",
    description:
      "Structured, evaluated prompts — not guesswork — for reliable model output.",
    icon: "MessageSquareCode",
  },
  {
    title: "Product Architecture",
    description:
      "System design that stays maintainable as the surface area multiplies.",
    icon: "Network",
  },
  {
    title: "Deployment",
    description:
      "CI/CD, AWS, observability and production releases that do not wake anyone up.",
    icon: "Rocket",
  },
] as const;

export const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "OpenAI",
  "Gemini",
  "Claude",
  "n8n",
  "Docker",
  "AWS",
  "GitHub",
  "TailwindCSS",
  "Framer Motion",
] as const;
