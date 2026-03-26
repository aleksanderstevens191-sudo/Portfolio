"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Star } from "lucide-react";

import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";
import type { GithubRepo } from "@/lib/github";
import { featuredProjects } from "@/lib/portfolio-data";

type ProjectsSectionProps = {
  repos: GithubRepo[];
};

const repoDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function ProjectsSection({ repos }: ProjectsSectionProps) {
  return (
    <MotionSection id="projects" className="section-shell py-24 sm:py-28">
      <SectionHeading
        eyebrow="Projects"
        title="Finance models, operating systems, and workflow design."
        description="The portfolio pairs structured financial thinking with system architecture and process optimization. Featured case studies sit alongside a live GitHub feed from Aleksander’s public repositories."
      />

      <div className="mt-14 grid gap-6">
        {featuredProjects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.7, delay: index * 0.08 }}
            className="glass-panel grid gap-6 rounded-[34px] p-6 sm:p-8 lg:grid-cols-[220px_minmax(0,1fr)]"
          >
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.32em] text-cyan/78">
                {project.subtitle}
              </p>
              <h3 className="text-3xl leading-tight text-foreground">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.22em] text-muted/76"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_0.95fr]">
              <p className="max-w-2xl text-base text-muted/84">{project.summary}</p>
              <ul className="space-y-3">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-sm text-muted/82"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan/78">
              GitHub Integration
            </p>
            <h3 className="mt-3 text-2xl text-foreground">
              Latest repositories from GitHub
            </h3>
          </div>

          <Link
            href="https://github.com/aleksanderstevens191-sudo"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-border/20 bg-white/5 px-4 py-2 text-sm text-foreground transition hover:border-cyan/35 hover:bg-white/10 sm:inline-flex"
          >
            View Profile
            <ArrowUpRight className="h-4 w-4 text-cyan" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {repos.length > 0 ? (
            repos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.htmlUrl}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="glass-panel group rounded-[28px] p-5 transition hover:border-cyan/30 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4 text-cyan" />
                      <p className="text-base text-foreground">{repo.name}</p>
                    </div>
                    <p className="mt-3 text-sm text-muted/76">
                      {repo.description || "Public GitHub repository from Aleksander."}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted/60 transition group-hover:text-cyan" />
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted/70">
                  <span>{repo.language || "Code"}</span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-violet" />
                    {repo.stars}
                  </span>
                  <span>Updated {repoDateFormatter.format(new Date(repo.updatedAt))}</span>
                </div>
              </motion.a>
            ))
          ) : (
            <div className="glass-panel rounded-[28px] p-6 text-sm text-muted/80 md:col-span-2 xl:col-span-3">
              GitHub repositories will populate here automatically when the
              public API is reachable. The layout already falls back cleanly if
              the feed is unavailable during build or deploy.
            </div>
          )}
        </div>
      </div>
    </MotionSection>
  );
}
