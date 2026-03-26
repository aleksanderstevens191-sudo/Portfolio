import { recruiterBullets } from "@/lib/portfolio-data";

export function buildMockResponse(question: string) {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes("strength")) {
    return "Aleksander’s strengths sit at the intersection of finance, systems thinking, and execution. He can move from analysis to action, whether that means building valuation models, improving operational conversion, or translating messy data into decision-ready insights.";
  }

  if (lowerQuestion.includes("hire")) {
    return "You should hire Aleksander because he combines analytical depth with measurable execution. He has already delivered a 40% conversion improvement, supported $5K+ in MRR growth, and built reporting systems that help teams make better decisions faster.";
  }

  if (lowerQuestion.includes("experience")) {
    return "Aleksander brings experience across finance operations, research, and leadership. At Mailmoo he improved conversion and reporting systems, in the Mobile Computing Lab he maintained and validated structured datasets, and through the Career Readiness Club he built an organization and led collaborative execution.";
  }

  if (lowerQuestion.includes("project")) {
    return "His featured work spans corporate finance valuation, AI-driven inventory optimization, and workflow process design. That mix shows he can operate in both quantitative and systems-oriented environments.";
  }

  return `Aleksander Stevens is a mathematics student at TAMS with a strong finance and systems focus. His profile stands out because he pairs analytical rigor with practical execution. Highlights include ${recruiterBullets.join(", ")}.`;
}
