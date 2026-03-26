"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";

import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";

type ContactSectionProps = {
  onRecruiterOpen: () => void;
};

export function ContactSection({ onRecruiterOpen }: ContactSectionProps) {
  return (
    <MotionSection id="contact" className="section-shell py-24 sm:py-28">
      <div className="glass-panel rounded-[36px] p-6 sm:p-8 lg:p-10">
        <SectionHeading
          eyebrow="Contact"
          title="Built for recruiters, operators, and teams that value analytical execution."
          description="Use recruiter mode for the fastest overview, browse the GitHub portfolio, or ask the AI assistant in the bottom-right for a concise summary of Aleksander’s background and fit."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Open to finance, analytics, and systems-oriented opportunities.",
              "Best suited for roles that need both business context and technical clarity.",
              "Prepared to communicate complex work in a way decision-makers can use.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[26px] border border-white/8 bg-white/[0.03] p-5 text-sm text-muted/80"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <button
              type="button"
              onClick={onRecruiterOpen}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:translate-y-[-1px]"
            >
              <Sparkles className="h-4 w-4" />
              Enter Recruiter Mode
            </button>

            <Link
              href="https://github.com/aleksanderstevens191-sudo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border/20 bg-white/5 px-5 py-3 text-sm text-foreground transition hover:border-cyan/35 hover:bg-white/10"
            >
              <Github className="h-4 w-4 text-cyan" />
              View GitHub
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
