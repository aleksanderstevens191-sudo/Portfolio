export type NavItem = {
  label: string;
  href: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  timeframe: string;
  location: string;
  description: string;
  achievements: string[];
};

export type FeaturedProject = {
  title: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

export type SkillMetric = {
  label: string;
  value: number;
  tone: "cyan" | "violet" | "blue";
};

export type ImpactMetric = {
  label: string;
  value: string;
  footnote: string;
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Contact", href: "#contact" },
];

export const aboutCopy =
  "Aleksander Stevens is a mathematics student at the Texas Academy of Mathematics and Science (UNT) focused on finance, systems, and data-driven decision making. He has experience supporting financial operations, building valuation models, and translating complex data into structured insights for decision-makers. Aleksander combines technical and business thinking to design scalable systems and deliver measurable results.";

export const experienceItems: ExperienceItem[] = [
  {
    company: "Mailmoo",
    role: "Finance & Operations Analyst",
    timeframe: "2024 - Present",
    location: "Growth Operations",
    description:
      "Optimized revenue systems across finance and operations by pairing pipeline discipline with clearer reporting for executive decisions.",
    achievements: [
      "Managed a 500+ account pipeline with structured prioritization.",
      "Improved conversion rate by 40% through data-backed operational changes.",
      "Generated $5K+ in monthly recurring revenue growth.",
      "Built executive reporting systems used for decision support.",
    ],
  },
  {
    company: "Mobile Computing Lab",
    role: "Research Assistant",
    timeframe: "2023 - 2024",
    location: "Research Analytics",
    description:
      "Supported experimental workflows with clean datasets, validation checks, and concise communication for technical stakeholders.",
    achievements: [
      "Maintained structured datasets for ongoing research programs.",
      "Validated analytical outputs before handoff to senior researchers.",
      "Communicated findings in a clear format for quick interpretation.",
    ],
  },
  {
    company: "Career Readiness Club",
    role: "Co-Founder & Co-President",
    timeframe: "2023 - Present",
    location: "Leadership",
    description:
      "Launched a student organization focused on practical professional development, collaboration, and event execution.",
    achievements: [
      "Built the organization from scratch with a repeatable operating model.",
      "Organized 4+ events that connected students with career resources.",
      "Led cross-functional collaboration across planning, outreach, and execution.",
    ],
  },
];

export const featuredProjects: FeaturedProject[] = [
  {
    title: "EOG Resources",
    subtitle: "Corporate Finance Valuation Model",
    summary:
      "A rigorous valuation build that translates operating assumptions into executive-ready finance outputs.",
    highlights: [
      "Constructed a DCF model with 200+ formulas.",
      "Benchmarked the company using EV/EBITDA comparable analysis.",
      "Stress tested scenarios to frame downside and upside outcomes.",
    ],
    tags: ["DCF", "Valuation", "Corporate Finance"],
  },
  {
    title: "AI Inventory Optimization System",
    subtitle: "Systems Architecture",
    summary:
      "A cross-functional operations concept for forecasting inventory needs and tightening fulfillment decisions.",
    highlights: [
      "Designed the end-to-end system architecture.",
      "Coordinated requirements across technical and business collaborators.",
      "Mapped data workflows for prediction, feedback loops, and actioning.",
    ],
    tags: ["AI Systems", "Operations", "Forecasting"],
  },
  {
    title: "Workflow Process Optimization Tool",
    subtitle: "Process Design",
    summary:
      "A process intelligence toolkit that exposes friction points and translates them into stakeholder-facing documentation.",
    highlights: [
      "Documented as-is and to-be process maps.",
      "Identified bottlenecks and surfaced measurable improvements.",
      "Created deliverables that made implementation easier for stakeholders.",
    ],
    tags: ["Optimization", "Documentation", "Analytics"],
  },
];

export const skillMetrics: SkillMetric[] = [
  { label: "Finance", value: 92, tone: "blue" },
  { label: "Excel", value: 95, tone: "cyan" },
  { label: "Python", value: 84, tone: "violet" },
  { label: "Data Analysis", value: 90, tone: "blue" },
];

export const impactMetrics: ImpactMetric[] = [
  {
    label: "40% Conversion Increase",
    value: "40%",
    footnote: "Pipeline improvements and execution discipline.",
  },
  {
    label: "$5K+ MRR Growth",
    value: "$5K+",
    footnote: "Revenue lift tied to better operational systems.",
  },
  {
    label: "500+ Accounts Managed",
    value: "500+",
    footnote: "Structured oversight across a high-volume account base.",
  },
];

export const growthChartData = [
  { month: "Jan", revenue: 22, conversion: 14, efficiency: 48 },
  { month: "Feb", revenue: 28, conversion: 18, efficiency: 54 },
  { month: "Mar", revenue: 35, conversion: 20, efficiency: 59 },
  { month: "Apr", revenue: 43, conversion: 24, efficiency: 63 },
  { month: "May", revenue: 51, conversion: 28, efficiency: 70 },
  { month: "Jun", revenue: 63, conversion: 31, efficiency: 78 },
];

export const dashboardKpis = [
  {
    label: "Revenue Growth",
    value: "+28.4%",
    insight: "Quarter-over-quarter performance trend.",
  },
  {
    label: "Conversion Rate",
    value: "40% Lift",
    insight: "Operational changes translated into measurable wins.",
  },
  {
    label: "Efficiency",
    value: "78 / 100",
    insight: "Process clarity and system throughput score.",
  },
];

export const projectImpactBars = [
  { name: "Valuation", impact: 92 },
  { name: "Systems", impact: 88 },
  { name: "Research", impact: 76 },
  { name: "Operations", impact: 94 },
];

export const recruiterPitch =
  "Aleksander Stevens is a mathematics student at TAMS who combines finance fluency with systems thinking. He has already driven a 40% conversion improvement, supported $5K+ in MRR growth, and built reporting and decision frameworks that scale. He is a strong hire for teams that need analytical rigor, execution speed, and someone who can translate complexity into clear action.";

export const recruiterBullets = [
  "Finance + technical hybrid",
  "Proven execution with measurable 40% improvement",
  "Strong analytical mindset with systems-first thinking",
];

export const suggestedChatPrompts = [
  "What are his strengths?",
  "Why should we hire him?",
  "Tell me about his experience",
];

export const tickerItems = [
  "MAILMOO +40% CVR",
  "MRR +$5K",
  "PIPELINE 500+",
  "DCF MODEL 200+ FORMULAS",
  "TAMS / UNT",
  "SYSTEMS + FINANCE",
];

export const chatKnowledgeBase = [
  "Aleksander Stevens is a mathematics student at the Texas Academy of Mathematics and Science (UNT).",
  "He focuses on finance, systems thinking, and data-driven decision making.",
  "At Mailmoo, he managed a 500+ account pipeline, improved conversion by 40%, supported $5K+ MRR growth, and built executive reporting systems.",
  "He served as a research assistant in the Mobile Computing Lab, maintaining structured datasets, validating analytical outputs, and communicating findings.",
  "He co-founded and co-led the Career Readiness Club, built the organization from scratch, organized 4+ events, and led cross-functional collaboration.",
  "His skills include financial modeling, Excel, Python, data analysis, and process optimization.",
].join("\n");

export const chatSystemPrompt = `You are an AI assistant representing Aleksander Stevens. You answer questions about his background, skills, experience, and why he is a strong candidate. Be clear, confident, concise, and professional. Sound like a sharp, analytical candidate.\n\nKnowledge Base:\n${chatKnowledgeBase}`;
