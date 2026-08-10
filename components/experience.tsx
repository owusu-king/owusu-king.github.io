"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { experience } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null);

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        eyebrow="02 — Experience"
        title="Access log."
        description="Every entry below is a system I've had my hands on — logged like the audit trails I was trained to read."
      />

      <div className="mt-14 space-y-4">
        {experience.map((job, i) => {
          const open = openId === job.id;
          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -3, borderColor: "var(--color-signal)" }}
              className="glass overflow-hidden rounded-2xl transition-shadow hover:shadow-[0_12px_40px_-16px_rgba(62,214,184,0.25)]"
            >
              <button
                type="button"
                onClick={() => setOpenId(open ? null : job.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={open}
              >
                <div className="flex items-start gap-4 sm:items-center">
                  <span className="hidden font-mono text-xs text-text-faint sm:block">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <div>
                    <div className="font-display text-lg font-medium text-text">
                      {job.role}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-text-faint">
                      <span className="text-signal">{job.company}</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {job.location}
                      </span>
                      <span>{job.period}</span>
                    </div>
                  </div>
                </div>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 text-text-faint"
                >
                  <ChevronDown size={18} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-border"
                  >
                    <div className="px-6 py-6 sm:pl-16">
                      <p className="text-text-muted">{job.summary}</p>
                      <ul className="mt-4 space-y-2.5">
                        {job.points.map((point, idx) => (
                          <li
                            key={idx}
                            className="flex gap-3 text-sm text-text-muted"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {job.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border-strong px-3 py-1 font-mono text-[11px] text-text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
