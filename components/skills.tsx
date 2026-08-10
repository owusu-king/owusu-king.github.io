"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/tilt-card";
import { RevealGroup, RevealItem } from "@/components/reveal";

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        eyebrow="03 — Skills"
        title="A toolkit built for defense and delivery."
        description="Grouped by domain, not ranked by invented percentages — depth shown in what each domain actually covers."
      />

      <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <RevealItem key={group.category}>
            <TiltCard className="glass h-full overflow-hidden rounded-2xl p-6">
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-signal/5 blur-2xl transition-colors group-hover/tilt:bg-signal/10" />
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-medium text-text">
                  {group.category}
                </h3>
                <div className="flex gap-0.5">
                  {Array.from({ length: 4 }).map((_, barIdx) => (
                    <motion.span
                      key={barIdx}
                      className="w-1 rounded-full bg-signal/70"
                      initial={{ height: 0 }}
                      whileInView={{ height: 6 + barIdx * 3 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + barIdx * 0.08 }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-border-strong bg-panel-2/60 px-2.5 py-1.5 font-mono text-[11px] text-text-muted transition-colors group-hover/tilt:border-signal/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
