"use client";

import { profile, stats } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading eyebrow="01 — About" title="From support tickets to security audits." />

      <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <RevealGroup className="space-y-6">
          {profile.summary.map((p, i) => (
            <RevealItem key={i}>
              <p className="text-balance text-xl leading-relaxed text-text-muted first:text-2xl first:text-text">
                {p}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="self-start">
          <TiltCard tilt={4} className="glass grid grid-cols-2 gap-6 rounded-3xl p-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-medium text-signal">
                  {s.value}
                  <span className="text-xl text-signal/70">{s.suffix}</span>
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-text-faint">
                  {s.label}
                </div>
                <div className="mt-0.5 text-xs text-text-muted">{s.note}</div>
              </div>
            ))}
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
