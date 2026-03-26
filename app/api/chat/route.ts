import OpenAI from "openai";

import { buildMockResponse } from "@/lib/mock-chat";

export const runtime = "nodejs";

type ClientMessage = {
  role: "user" | "assistant";
  content: string;
};

type QuestionMode = "personal" | "general" | "hybrid";

const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const MAX_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 1_500;
const STREAM_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
  "X-Content-Type-Options": "nosniff",
} as const;

const portfolioContext = `
Name: Aleksander Stevens
Education: Mathematics student at the Texas Academy of Mathematics and Science (TAMS) at UNT
Core profile: finance + software + systems thinking + data-driven decision making

Experience:
- Mailmoo — Finance & Operations Analyst
  - Managed a 500+ account pipeline
  - Increased conversion rate by 40%
  - Generated $5K+ in monthly recurring revenue growth
  - Built executive reporting systems
- Mobile Computing Lab — Research Assistant
  - Maintained structured datasets
  - Validated analytical outputs
  - Communicated findings to senior researchers
- Career Readiness Club — Co-Founder & Co-President
  - Built the organization from scratch
  - Organized 4+ events
  - Led cross-functional collaboration

Featured projects:
- EOG Resources Corporate Finance Valuation Model
  - DCF model with 200+ formulas
  - EV/EBITDA comparable analysis
  - Scenario stress testing
- AI Inventory Optimization System
  - Built the system architecture
  - Coordinated across teams
  - Designed data workflows
- Workflow Process Optimization Tool
  - Mapped as-is and to-be processes
  - Identified bottlenecks
  - Created stakeholder documentation

Skills explicitly shown in the portfolio:
- Financial modeling
- Excel
- Python
- Data analysis
- Process optimization
`;

const systemPrompt = `
You are the portfolio assistant for Aleksander Stevens.

Your job:
1. Answer personal questions about Aleksander using only the portfolio context below and any facts explicitly provided by the user in the current conversation.
2. Answer general questions about finance, software, data, analytics, careers, recruiting, or systems clearly and helpfully.
3. Never hallucinate personal details. If a personal fact is not in the portfolio context, say that it is not available in the portfolio and do not guess.
4. Do not invent missing information such as GPA, age, graduation year, contact details, awards, certifications, exact tech stacks, employer details beyond what is listed, or anything else not explicitly provided.
5. If the question is general, answer it as a general question. Do not present general advice as if it is a fact about Aleksander.
6. If the question mixes both Aleksander and a general concept, answer the general concept first, then connect it back to Aleksander only using supported facts.
7. Be concise, professional, and precise. Prefer direct language over hype.
8. When explaining why Aleksander is a strong candidate, ground the answer in concrete evidence from the portfolio context.

Portfolio context:
${portfolioContext}
`.trim();

const personalSignals = [
  "aleksander",
  "his",
  "him",
  "he",
  "candidate",
  "resume",
  "background",
  "experience",
  "strength",
  "strengths",
  "hire",
  "mailmoo",
  "tams",
  "unt",
  "project",
  "projects",
  "skill",
  "skills",
];

const generalSignals = [
  "what is",
  "how do",
  "how does",
  "why is",
  "difference between",
  "explain",
  "tips",
  "best way",
  "best practice",
  "finance",
  "software",
  "python",
  "valuation",
  "dcf",
  "ev/ebitda",
  "data analysis",
  "system design",
  "career advice",
  "interview",
];

const missingInfoSignals = [
  "gpa",
  "grade",
  "sat",
  "act",
  "age",
  "birthday",
  "phone",
  "email",
  "address",
  "linkedin",
  "twitter",
  "instagram",
  "salary",
  "race",
  "religion",
];

function streamText(text: string) {
  const encoder = new TextEncoder();
  const words = text.split(" ");

  return new ReadableStream<Uint8Array>({
    start(controller) {
      let index = 0;

      const pushChunk = () => {
        if (index >= words.length) {
          controller.close();
          return;
        }

        const chunk = `${words[index]} `;
        controller.enqueue(encoder.encode(chunk));
        index += 1;
        setTimeout(pushChunk, 28);
      };

      pushChunk();
    },
  });
}

function sanitizeMessages(input: unknown): ClientMessage[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((message) => {
      if (
        message &&
        typeof message === "object" &&
        "role" in message &&
        "content" in message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string"
      ) {
        return {
          role: message.role,
          content: message.content.trim().slice(0, MAX_MESSAGE_LENGTH),
        } satisfies ClientMessage;
      }

      return null;
    })
    .filter((message): message is ClientMessage => Boolean(message?.content))
    .slice(-MAX_MESSAGES);
}

function detectQuestionMode(question: string): QuestionMode {
  const normalizedQuestion = question.toLowerCase();
  const hasPersonalSignal = personalSignals.some((signal) =>
    normalizedQuestion.includes(signal),
  );
  const hasGeneralSignal = generalSignals.some((signal) =>
    normalizedQuestion.includes(signal),
  );

  if (hasPersonalSignal && hasGeneralSignal) {
    return "hybrid";
  }

  if (hasPersonalSignal) {
    return "personal";
  }

  return "general";
}

function buildRoutingPrompt(mode: QuestionMode, question: string) {
  const lowerQuestion = question.toLowerCase();
  const asksForPotentiallyMissingInfo = missingInfoSignals.some((signal) =>
    lowerQuestion.includes(signal),
  );

  const baseGuardrail = asksForPotentiallyMissingInfo
    ? "The user may be asking for personal details that are not in the portfolio. If the requested fact is not explicitly supported, say you do not have that information in the portfolio."
    : "";

  if (mode === "personal") {
    return [
      "Routing mode: personal portfolio question.",
      "Answer about Aleksander using only the portfolio context and explicit user-provided facts.",
      "If the answer depends on a missing personal fact, clearly say that the information is not available in the portfolio.",
      baseGuardrail,
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (mode === "hybrid") {
    return [
      "Routing mode: hybrid question.",
      "Answer the general concept first in a concise way.",
      "Then relate it back to Aleksander only with facts supported by the portfolio context.",
      "Do not infer extra credentials or experience.",
      baseGuardrail,
    ]
      .filter(Boolean)
      .join(" ");
  }

  return [
    "Routing mode: general question.",
    "Answer the user directly with useful general guidance.",
    "Do not frame the answer as a fact about Aleksander unless the portfolio context explicitly supports it.",
    baseGuardrail,
  ]
    .filter(Boolean)
    .join(" ");
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { messages?: unknown };
  const messages = sanitizeMessages(body.messages);
  const lastUserMessage =
    [...messages].reverse().find((message) => message.role === "user")?.content || "";
  const questionMode = detectQuestionMode(lastUserMessage);

  if (!lastUserMessage) {
    return new Response("Please send a question for the portfolio assistant.", {
      status: 400,
      headers: STREAM_HEADERS,
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return new Response(streamText(buildMockResponse(lastUserMessage, questionMode)), {
      headers: STREAM_HEADERS,
    });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: OPENAI_MODEL,
      temperature: questionMode === "general" ? 0.45 : 0.25,
      max_tokens: 450,
      stream: true,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "system",
          content: buildRoutingPrompt(questionMode, lastUserMessage),
        },
        ...messages,
      ],
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        for await (const part of completion) {
          const chunk = part.choices[0]?.delta?.content;

          if (chunk) {
            controller.enqueue(encoder.encode(chunk));
          }
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: STREAM_HEADERS,
    });
  } catch {
    return new Response(streamText(buildMockResponse(lastUserMessage, questionMode)), {
      headers: STREAM_HEADERS,
    });
  }
}
