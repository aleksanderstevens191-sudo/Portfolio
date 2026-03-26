"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Sparkles, WandSparkles } from "lucide-react";

const floatingMetrics = [
  {
    label: "Conversion Lift",
    value: "40%",
    position: "top-4 right-5 sm:right-12",
  },
  {
    label: "MRR Growth",
    value: "$5K+",
    position: "bottom-24 left-2 sm:left-8",
  },
  {
    label: "Accounts",
    value: "500+",
    position: "bottom-10 right-0 sm:right-10",
  },
];

type HeroSectionProps = {
  onRecruiterOpen: () => void;
};

export function HeroSection({ onRecruiterOpen }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <div className="absolute inset-0 -z-10">
        <div className="grid-overlay absolute inset-0 opacity-50" />
        <div className="absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_top,_rgba(110,155,255,0.22),_transparent_55%)]" />
        <div className="absolute left-[-6rem] top-24 h-72 w-72 rounded-full bg-cyan/15 blur-[110px]" />
        <div className="absolute right-[-3rem] top-20 h-80 w-80 rounded-full bg-violet/15 blur-[130px]" />
      </div>

      <div className="section-shell grid items-center gap-14 pb-20 lg:grid-cols-[minmax(0,1fr)_480px]">
        <motion.div style={{ y: heroY }} className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan/85">
              <Sparkles className="h-3.5 w-3.5" />
              Night Sky Portfolio
            </span>
            <span className="glass-chip rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em] text-muted/75">
              TAMS / UNT
            </span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.75 }}
              className="max-w-4xl text-balance text-5xl font-semibold leading-[0.95] text-foreground sm:text-6xl lg:text-[5.4rem]"
            >
              AI & Finance Student Building{" "}
              <span className="gradient-text">Scalable Systems</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.75 }}
              className="max-w-2xl text-lg text-muted/80 sm:text-xl"
            >
              Bridging data, finance, and systems thinking to drive measurable
              impact.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.75 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:translate-y-[-1px]"
            >
              View Work
              <ArrowDownRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={onRecruiterOpen}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border/25 bg-white/5 px-6 py-3 text-sm font-medium text-foreground transition hover:border-cyan/35 hover:bg-white/10"
            >
              Recruiter Mode
              <WandSparkles className="h-4 w-4 text-cyan" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.75 }}
            className="grid gap-4 sm:grid-cols-3"
          >
            {[
              ["Financial modeling", "Decision-ready valuations and scenario analysis."],
              ["Systems thinking", "Scalable workflows with measurable operating lift."],
              ["Data clarity", "Structured reporting that accelerates executive decisions."],
            ].map(([title, copy]) => (
              <div
                key={title}
                className="glass-panel rounded-[28px] p-5"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-cyan/75">
                  {title}
                </p>
                <p className="mt-3 text-sm text-muted/78">{copy}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: orbY }}
          className="relative mx-auto hidden h-[520px] w-full max-w-[480px] lg:block"
        >
          <div className="absolute inset-0 rounded-full border border-white/5 bg-[radial-gradient(circle_at_center,_rgba(154,177,255,0.12),_transparent_62%)] blur-[2px]" />
          <div className="hero-ring absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/15" />
          <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/20" />

          <motion.div
            animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="glass-panel absolute left-1/2 top-1/2 flex h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-cyan/75">
              Aleksander
            </p>
            <p className="mt-3 text-5xl font-semibold text-foreground">AS</p>
            <p className="mt-3 max-w-[10rem] text-sm text-muted/80">
              Finance-minded builder for analytical systems.
            </p>
          </motion.div>

          {floatingMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4.2 + index,
                ease: "easeInOut",
              }}
              className={`glass-panel absolute ${metric.position} rounded-[24px] px-5 py-4`}
            >
              <p className="text-xs uppercase tracking-[0.26em] text-muted/70">
                {metric.label}
              </p>
              <p className="mt-2 flex items-center gap-2 text-2xl text-foreground">
                {metric.value}
                <ArrowUpRight className="h-4 w-4 text-cyan" />
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
