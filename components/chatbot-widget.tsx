"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, SendHorizonal, Sparkles, X } from "lucide-react";

import { suggestedChatPrompts } from "@/lib/portfolio-data";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const initialAssistantMessage: ChatMessage = {
  id: "welcome-message",
  role: "assistant",
  content:
    "I’m Aleksander’s AI assistant. Ask about strengths, experience, projects, or why he’d be a strong candidate.",
};

function makeMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: `${role}-${crypto.randomUUID()}`,
    role,
    content,
  };
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialAssistantMessage]);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const canSubmit = useMemo(
    () => input.trim().length > 0 && !isStreaming,
    [input, isStreaming],
  );

  useEffect(() => {
    if (!scrollAreaRef.current) {
      return;
    }

    scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
  }, [messages, isOpen]);

  const sendPrompt = async (prompt: string) => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isStreaming) {
      return;
    }

    const userMessage = makeMessage("user", trimmedPrompt);
    const assistantMessage = makeMessage("assistant", "");
    const transcript = messages.map(({ role, content }) => ({ role, content }));

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
    setIsOpen(true);
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...transcript, { role: "user", content: trimmedPrompt }],
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Streaming response unavailable.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let isDone = false;

      while (!isDone) {
        const { value, done } = await reader.read();
        isDone = done;

        const chunk = decoder.decode(value || new Uint8Array(), {
          stream: !done,
        });

        if (!chunk) {
          continue;
        }

        setMessages((current) =>
          current.map((message) =>
            message.id === assistantMessage.id
              ? {
                  ...message,
                  content: `${message.content}${chunk}`,
                }
              : message,
          ),
        );
      }
    } catch {
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessage.id
            ? {
                ...message,
                content:
                  "I couldn’t reach the live assistant, but I can still summarize Aleksander as a finance-and-systems candidate with strong measurable execution.",
              }
            : message,
        ),
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendPrompt(input);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-40 w-[min(380px,calc(100vw-2rem))] overflow-hidden rounded-[28px] border border-white/10 bg-surface/70 shadow-[0_18px_80px_rgba(3,7,20,0.65)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan/25 bg-cyan/10 text-cyan">
                  <Bot className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-cyan/80">
                    AI Guide
                  </p>
                  <p className="text-xs text-muted/74">
                    Aleksander Stevens assistant
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollAreaRef} className="max-h-[420px] space-y-4 overflow-y-auto px-5 py-5">
              <div className="rounded-[22px] border border-violet/15 bg-violet/5 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-violet/82">
                  <Sparkles className="h-3.5 w-3.5" />
                  Suggested prompts
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {suggestedChatPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendPrompt(prompt)}
                      disabled={isStreaming}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-xs text-muted/78 transition hover:border-cyan/25 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-[22px] px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-white text-slate-950"
                        : "border border-white/8 bg-white/[0.03] text-foreground"
                    }`}
                  >
                    {message.content || (
                      <span className="inline-flex items-center gap-2 text-muted/70">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" />
                        Thinking...
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-white/8 p-4">
              <div className="flex items-end gap-3 rounded-[22px] border border-white/10 bg-black/10 p-2">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about strengths, experience, or fit..."
                  className="max-h-28 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-foreground outline-none placeholder:text-muted/55"
                />
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <SendHorizonal className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="fixed bottom-5 right-4 z-40 inline-flex h-16 items-center gap-3 rounded-full border border-cyan/25 bg-surface/70 px-5 text-sm text-foreground shadow-[0_16px_50px_rgba(3,7,20,0.6)] backdrop-blur-2xl transition hover:border-cyan/40 hover:bg-surface/80"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan/12 text-cyan">
          <MessageCircle className="h-4 w-4" />
        </span>
        <span className="hidden sm:block">Ask the AI assistant</span>
      </button>
    </>
  );
}
