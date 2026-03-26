"use client";

import { useState } from "react";

import { AboutSection } from "@/components/about-section";
import { ChatbotWidget } from "@/components/chatbot-widget";
import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { FinanceDashboard } from "@/components/finance-dashboard";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { ProjectsSection } from "@/components/projects-section";
import { RecruiterMode } from "@/components/recruiter-mode";
import { ResumeDashboard } from "@/components/resume-dashboard";
import { SectionHeading } from "@/components/section-heading";
import { StarfieldCanvas } from "@/components/starfield-canvas";
import type { GithubRepo } from "@/lib/github";

type PortfolioPageProps = {
  repos: GithubRepo[];
};

export function PortfolioPage({ repos }: PortfolioPageProps) {
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-radial">
      <StarfieldCanvas />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8rem] top-[14rem] h-[28rem] w-[28rem] rounded-full bg-cyan/10 blur-[140px]" />
        <div className="absolute right-[-10rem] top-[30rem] h-[30rem] w-[30rem] rounded-full bg-violet/10 blur-[160px]" />
      </div>

      <Navbar onRecruiterOpen={() => setIsRecruiterOpen(true)} />

      <main className="relative">
        <HeroSection onRecruiterOpen={() => setIsRecruiterOpen(true)} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection repos={repos} />

        <section id="dashboard" className="section-shell py-24 sm:py-28">
          <SectionHeading
            eyebrow="Dashboard"
            title="An interactive view of trajectory, skills, and operating performance."
            description="A resume visualization and finance-inspired command center designed to help recruiters understand Aleksander’s signal quickly."
            align="center"
          />

          <div className="mt-14 space-y-8">
            <ResumeDashboard />
            <FinanceDashboard />
          </div>
        </section>

        <ContactSection onRecruiterOpen={() => setIsRecruiterOpen(true)} />
      </main>

      <RecruiterMode
        open={isRecruiterOpen}
        onClose={() => setIsRecruiterOpen(false)}
      />
      <ChatbotWidget />
    </div>
  );
}
