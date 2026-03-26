import OpenAI from "openai";

import { buildMockResponse } from "@/lib/mock-chat";
import { chatSystemPrompt } from "@/lib/portfolio-data";

export const runtime = "nodejs";

type ClientMessage = {
  role: "user" | "assistant";
  content: string;
};

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
          content: message.content.trim(),
        } satisfies ClientMessage;
      }

      return null;
    })
    .filter((message): message is ClientMessage => Boolean(message?.content))
    .slice(-10);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { messages?: unknown };
  const messages = sanitizeMessages(body.messages);
  const lastUserMessage =
    [...messages].reverse().find((message) => message.role === "user")?.content || "";

  if (!process.env.OPENAI_API_KEY) {
    return new Response(streamText(buildMockResponse(lastUserMessage)), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.5,
      stream: true,
      messages: [
        {
          role: "system",
          content: chatSystemPrompt,
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
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch {
    return new Response(streamText(buildMockResponse(lastUserMessage)), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  }
}
