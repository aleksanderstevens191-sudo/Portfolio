import { recruiterBullets } from "@/lib/portfolio-data";

type QuestionMode = "personal" | "general" | "hybrid";

const missingInfoSignals = [
  "gpa",
  "age",
  "birthday",
  "email",
  "phone",
  "address",
  "linkedin",
  "salary",
];

export function buildMockResponse(
  question: string,
  mode: QuestionMode = "personal",
) {
  const lowerQuestion = question.toLowerCase();

  if (missingInfoSignals.some((signal) => lowerQuestion.includes(signal))) {
    return "I do not have that information in Aleksander’s portfolio context, so I do not want to guess.";
  }

  if (mode !== "personal") {
    if (
      lowerQuestion.includes("dcf") ||
      lowerQuestion.includes("valuation") ||
      lowerQuestion.includes("ev/ebitda")
    ) {
      return "A DCF estimates value by projecting future cash flows and discounting them back to the present, while EV/EBITDA compares enterprise value to operating earnings across similar companies. DCF is more assumption-driven and company-specific, while comps are faster and more market-relative.";
    }

    if (
      lowerQuestion.includes("python") ||
      lowerQuestion.includes("software") ||
      lowerQuestion.includes("system")
    ) {
      return "In general, strong software and systems work starts with clear inputs, clean data flow, measurable outputs, and feedback loops. That is also why Aleksander’s portfolio emphasizes system architecture, process design, and data workflows rather than just isolated technical tasks.";
    }

    if (lowerQuestion.includes("finance")) {
      return "In general, finance questions are best answered by separating the business driver, the metric that captures it, and the decision that follows from it. Aleksander’s work fits that pattern through valuation models, operational reporting, and measurable process improvement.";
    }
  }

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
