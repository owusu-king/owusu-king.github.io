"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/tilt-card";
import { RevealGroup, RevealItem } from "@/components/reveal";

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        eyebrow="04 — Projects"
        title="Systems built to replace paper with process."
        description="Two full-stack platforms that took manual, paper-based workflows and made them automatic."
      />

      <RevealGroup className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <RevealItem key={project.id}>
            <TiltCard tilt={5} className="glass flex h-full flex-col overflow-hidden rounded-3xl">
              <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-panel-2 to-bg-soft">
                <div className="grid-field absolute inset-0 opacity-60" />
                <span className="font-display text-4xl font-medium text-text-faint/40 transition-transform duration-500 group-hover/tilt:scale-110">
                  {project.title
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 3)
                    .join("")}
                </span>
                <span className="absolute right-4 top-4 rounded-full border border-border-strong bg-bg/60 px-2.5 py-1 font-mono text-[10px] text-text-faint">
                  {project.year}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-xl font-medium text-text">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {project.description}
                </p>

                <div className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-faint">
                      Challenge
                    </span>
                    <p className="mt-1 text-text-muted">{project.challenge}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-signal">
                      Outcome
                    </span>
                    <p className="mt-1 text-text-muted">{project.outcome}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border-strong px-3 py-1 font-mono text-[11px] text-text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <motion.a
                    href={project.links.github}
                    whileTap={{ scale: 0.94 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-xs font-medium text-text-muted transition-colors hover:border-signal/40 hover:text-signal"
                  >
                    <Github size={14} /> Code
                  </motion.a>
                  <motion.a
                    href={project.links.demo}
                    whileTap={{ scale: 0.94 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-xs font-medium text-text-muted transition-colors hover:border-signal/40 hover:text-signal"
                  >
                    <ExternalLink size={14} /> Live demo
                  </motion.a>
                </div>
              </div>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
