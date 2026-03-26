"use client";

import { motion } from "framer-motion";
import { Binary, LineChart, Network, ScrollText } from "lucide-react";

import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";
import { aboutCopy } from "@/lib/portfolio-data";

const pillars = [
  {
    icon: LineChart,
    title: "Finance",
    copy: "Valuation thinking, reporting rigor, and measurable business outcomes.",
  },
  {
    icon: Binary,
    title: "Data",
    copy: "Clean analytical structures that support fast interpretation and action.",
  },
  {
    icon: Network,
    title: "Systems",
    copy: "Workflows designed to scale without losing clarity.",
  },
  {
    icon: ScrollText,
    title: "Communication",
    copy: "Executive-ready narratives built from technical detail.",
  },
];

export function AboutSection() {
  return (
    <MotionSection id="about" className="section-shell py-24 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_0.95fr] lg:items-start">
        <SectionHeading
          eyebrow="About"
          title="Analytical depth with a builder’s instinct."
          description={aboutCopy}
        />

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="glass-panel noise-mask relative overflow-hidden rounded-[32px] p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <div
                  key={pillar.title}
                  className="rounded-[24px] border border-white/5 bg-white/[0.03] p-5"
                >
                  <Icon className="h-5 w-5 text-cyan" />
                  <p className="mt-4 text-lg text-foreground">{pillar.title}</p>
                  <p className="mt-2 text-sm text-muted/78">{pillar.copy}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-[24px] border border-cyan/15 bg-cyan/5 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan/78">
              Operating Style
            </p>
            <p className="mt-3 text-base text-foreground">
              Aleksander is strongest in roles where strategic thinking has to
              translate into clean execution, clear reporting, and systems that
              keep compounding over time.
            </p>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}
