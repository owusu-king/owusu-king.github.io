"use client";

import { Award, BadgeCheck } from "lucide-react";
import { awards, certifications, education } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/tilt-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

export function Awards() {
  return (
    <section id="awards" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        eyebrow="05 — Recognition"
        title="Credentials that back the claims."
      />

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <h3 className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-faint">
            <Award size={14} className="text-amber" /> Awards
          </h3>
          <RevealGroup className="space-y-4">
            {awards.map((a) => (
              <RevealItem key={a.title}>
                <TiltCard tilt={4} className="glass rounded-2xl border-l-2 border-l-amber/60 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-display text-sm font-medium text-text">
                      {a.title}
                    </h4>
                    <span className="shrink-0 font-mono text-[10px] text-text-faint">
                      {a.date}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {a.detail}
                  </p>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div>
          <h3 className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-faint">
            <BadgeCheck size={14} className="text-signal" /> Certifications
          </h3>
          <Reveal>
            <div className="glass divide-y divide-border rounded-2xl">
              {certifications.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-panel-2/40"
                >
                  <div>
                    <div className="text-sm font-medium text-text">{c.name}</div>
                    <div className="mt-0.5 font-mono text-[11px] text-text-faint">
                      {c.provider}
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] text-text-faint">
                    {c.date}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <h3 className="mb-5 mt-10 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-faint">
            Education
          </h3>
          <RevealGroup className="space-y-3">
            {education.map((e) => (
              <RevealItem key={e.id}>
                <div className="rounded-xl border border-border px-5 py-4 transition-colors hover:border-signal/30">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-text">{e.degree}</div>
                      <div className="mt-0.5 text-xs text-text-muted">
                        {e.school} — {e.location}
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] text-text-faint">
                      {e.period}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">
                    {e.detail}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
