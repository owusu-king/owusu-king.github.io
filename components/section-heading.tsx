"use client";

import { motion } from "framer-motion";
import { RevealText } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="inline-block font-mono text-xs uppercase tracking-widest text-signal"
      >
        {eyebrow}
      </motion.span>
      <h2 className="mt-3 text-balance font-display text-3xl font-medium tracking-tight text-text sm:text-4xl">
        <RevealText text={title} delay={0.05} />
      </h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-4 text-balance text-lg text-text-muted"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
