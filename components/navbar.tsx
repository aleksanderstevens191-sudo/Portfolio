"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";

import { navItems } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type NavbarProps = {
  onRecruiterOpen: () => void;
};

export function Navbar({ onRecruiterOpen }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-4 py-4 sm:px-6">
        <div
          className={cn(
            "section-shell glass-panel flex items-center justify-between rounded-full px-4 py-3 transition-all duration-300 sm:px-6",
            isScrolled && "shadow-glow",
          )}
        >
          <Link href="#top" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/20 bg-white/5 text-sm font-semibold text-foreground">
              AS
            </span>
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan/70">
                Aleksander Stevens
              </p>
              <p className="text-xs text-muted/75">Finance x Systems x AI</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted/80 transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={onRecruiterOpen}
              className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-sm text-foreground transition hover:border-cyan/45 hover:bg-cyan/15"
            >
              <Sparkles className="h-4 w-4 text-cyan" />
              Recruiter Mode
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/20 bg-white/5 text-foreground lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed inset-x-4 top-[5.75rem] z-40 rounded-[28px] border border-border/20 bg-surface/80 p-5 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setIsMobileOpen(false);
                  onRecruiterOpen();
                }}
                className="rounded-2xl border border-cyan/25 bg-cyan/10 px-4 py-3 text-left text-sm text-foreground"
              >
                Enter Recruiter Mode
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
