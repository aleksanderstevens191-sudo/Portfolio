"use client";

import { motion } from "framer-motion";

import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";
import { experienceItems } from "@/lib/portfolio-data";

export function ExperienceSection() {
  return (
    <MotionSection id="experience" className="section-shell py-24 sm:py-28">
      <SectionHeading
        eyebrow="Experience"
        title="A track record of turning analysis into practical wins."
        description="From finance operations to research and leadership, each role sharpened a different part of the operating toolkit: decision support, structured analytics, and collaborative execution."
      />

      <div className="relative mt-14">
        <div className="absolute left-4 top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-cyan/50 via-violet/30 to-transparent md:block" />

        <div className="space-y-8">
          {experienceItems.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.role}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              className="grid gap-4 md:grid-cols-[40px_minmax(0,1fr)]"
            >
              <div className="relative hidden md:flex md:items-start md:justify-center">
                <span className="mt-4 h-3 w-3 rounded-full border border-cyan/50 bg-cyan shadow-[0_0_18px_rgba(84,215,255,0.55)]" />
              </div>

              <div className="glass-panel rounded-[32px] p-6 sm:p-8">
                <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan/80">
                      {item.company}
                    </p>
                    <h3 className="mt-3 text-2xl text-foreground">{item.role}</h3>
                  </div>
                  <div className="text-sm text-muted/72 sm:text-right">
                    <p>{item.timeframe}</p>
                    <p>{item.location}</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                  <p className="text-base text-muted/82">{item.description}</p>
                  <ul className="space-y-3">
                    {item.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex gap-3 text-sm text-foreground/90"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                        <span className="text-muted/84">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
