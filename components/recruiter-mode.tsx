"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";

import { recruiterBullets, recruiterPitch } from "@/lib/portfolio-data";

type RecruiterModeProps = {
  open: boolean;
  onClose: () => void;
};

const cards = [
  {
    title: "Who he is",
    body: "A mathematics student at TAMS who bridges finance, data, and systems thinking to solve practical operating problems.",
  },
  {
    title: "Key achievements",
    body: "Drove a 40% conversion increase, supported $5K+ in MRR growth, and built reporting frameworks for executive visibility.",
  },
  {
    title: "Why hire him",
    body: "He brings sharp analytical instincts, strong communication, and the ability to turn complex information into scalable execution.",
  },
];

export function RecruiterMode({ open, onClose }: RecruiterModeProps) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!open) {
      setTypedText("");
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(recruiterPitch.slice(0, index));

      if (index >= recruiterPitch.length) {
        window.clearInterval(timer);
      }
    }, 17);

    return () => window.clearInterval(timer);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="glass-panel relative max-h-[92vh] w-full max-w-5xl overflow-auto rounded-[36px] p-6 sm:p-8 lg:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground"
              aria-label="Close recruiter mode"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan/85">
                <Sparkles className="h-3.5 w-3.5" />
                Recruiter Mode
              </div>

              <h2 className="mt-6 text-4xl leading-tight text-foreground sm:text-5xl">
                A 10-second pitch for high-context hiring.
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-muted/84">
                This overlay condenses Aleksander’s profile into the fastest
                possible recruiter read.
              </p>

              <div className="mt-8 rounded-[30px] border border-white/8 bg-black/15 p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.32em] text-cyan/78">
                  Auto-generated pitch summary
                </p>
                <p className="mt-5 min-h-[10rem] text-lg leading-8 text-foreground sm:text-xl">
                  {typedText}
                  <span className="ml-1 inline-block h-5 w-px animate-pulse bg-cyan/70 align-middle" />
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {cards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.25 + index * 0.08 }}
                  className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6"
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan/78">
                    {card.title}
                  </p>
                  <p className="mt-4 text-base text-muted/82">{card.body}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-[30px] border border-violet/15 bg-violet/5 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-violet/82">
                Quick bullets
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {recruiterBullets.map((bullet, index) => (
                  <motion.div
                    key={bullet}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.5 + index * 0.08 }}
                    className="rounded-[22px] border border-white/8 bg-black/10 p-4 text-sm text-foreground"
                  >
                    {bullet}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
