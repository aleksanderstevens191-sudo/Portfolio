"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Mail, Phone, Sparkles } from "lucide-react";

import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";

type ContactSectionProps = {
  onRecruiterOpen: () => void;
};

const contactMethods = [
  {
    label: "Email",
    value: "aleksanderstevens191@gmail.com",
    href: "mailto:aleksanderstevens191@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "(832) 600-9740",
    href: "tel:8326009740",
    icon: Phone,
  },
  {
    label: "GitHub",
    value: "github.com/aleksanderstevens191-sudo",
    href: "https://github.com/aleksanderstevens191-sudo",
    icon: Github,
  },
];

export function ContactSection({ onRecruiterOpen }: ContactSectionProps) {
  return (
    <MotionSection id="contact" className="section-shell py-24 sm:py-28">
      <div className="glass-panel rounded-[36px] p-6 sm:p-8 lg:p-10">
        <SectionHeading
          eyebrow="Contact"
          title="Built for recruiters, operators, and teams that value analytical execution."
          description="Reach Aleksander directly by email or phone, browse the GitHub portfolio, or use recruiter mode for the fastest high-context overview."
        />

        <div className="mt-10 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {contactMethods.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.label === "GitHub" ? "_blank" : undefined}
                  rel={item.label === "GitHub" ? "noreferrer" : undefined}
                  className="group rounded-[26px] border border-white/8 bg-white/[0.03] p-5 transition hover:border-cyan/30 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan/20 bg-cyan/10 text-cyan">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.24em] text-cyan/78">
                        {item.label}
                      </p>
                      <p className="mt-2 truncate text-sm text-foreground transition group-hover:text-cyan/95">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
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
      </div>
    </MotionSection>
  );
}
